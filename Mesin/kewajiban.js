// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN KEWAJIBAN ANGSURAN
// FILE : Mesin/kewajiban.js
// =====================================

console.log(
    "Mesin Kewajiban BBCS mulai"
);


// =====================================
// AMBIL PERIODE LUNAS
// =====================================

function kewajibanAmbilPeriodeLunas(
    dataPinjaman
){

    if(!dataPinjaman){

        return [];

    }


    // ---------------------------------
    // SUMBER UTAMA:
    // periodeLunas pada pinjaman
    // ---------------------------------

    if(
        Array.isArray(
            dataPinjaman.periodeLunas
        )
    ){

        return [
            ...new Set(
                dataPinjaman.periodeLunas
                    .map(
                        function(p){

                            return String(p);

                        }
                    )
                    .filter(
                        function(p){

                            return periodeValid(p);

                        }
                    )
            )
        ];

    }


    return [];

}


// =====================================
// CEK PERIODE LUNAS
// =====================================

function kewajibanPeriodeSudahLunas(
    dataPinjaman,
    periode
){

    if(
        !dataPinjaman ||
        !periodeValid(periode)
    ){

        return false;

    }


    let periodeLunas =
        kewajibanAmbilPeriodeLunas(
            dataPinjaman
        );


    if(
        periodeLunas.includes(
            periode
        )
    ){

        return true;

    }


    // ---------------------------------
    // FALLBACK RIWAYAT
    // ---------------------------------

    if(
        Array.isArray(
            riwayatAngsuran
        )
    ){

        let riwayat =
            riwayatAngsuran.find(
                function(item){

                    return item &&
                        String(
                            item.idPinjaman
                        ) ===
                        String(
                            dataPinjaman.id
                        ) &&
                        String(
                            item.periode
                        ) ===
                        periode &&
                        (
                            item.status ===
                                "LUNAS" ||
                            item.status ===
                                "Lunas"
                        );

                }
            );


        if(riwayat){

            return true;

        }

    }


    return false;

}


// =====================================
// AMBIL SEMUA PERIODE
// =====================================

function kewajibanSemuaPeriode(
    dataPinjaman,
    bulanPembayaran
){

    if(
        typeof mesinSemuaPeriode !==
        "function"
    ){

        console.error(
            "mesinSemuaPeriode() tidak ditemukan"
        );

        return [];

    }


    return mesinSemuaPeriode(
        dataPinjaman,
        bulanPembayaran
    );

}


// =====================================
// PERIODE WAJIB
// =====================================
//
// Semua periode sebelum bulan pembayaran
// yang BELUM LUNAS.
//
// =====================================

function kewajibanPeriodeWajib(
    semuaPeriode,
    dataPinjaman
){

    if(
        !Array.isArray(
            semuaPeriode
        )
    ){

        return [];

    }


    return semuaPeriode.filter(
        function(periode){

            if(
                kewajibanPeriodeSudahLunas(
                    dataPinjaman,
                    periode
                )
            ){

                return false;

            }


            return true;

        }
    );

}


// =====================================
// PERIODE JASA WAJIB
// =====================================
//
// Jasa wajib hanya periode sebelum
// bulan pembayaran yang belum lunas.
//
// =====================================

function kewajibanPeriodeJasaWajib(
    semuaPeriode,
    dataPinjaman,
    bulanPembayaran
){

    return semuaPeriode.filter(
        function(periode){

            // Bulan berjalan bukan jasa wajib
            if(
                periode >=
                bulanPembayaran
            ){

                return false;

            }


            // Periode lunas tidak dihitung
            if(
                kewajibanPeriodeSudahLunas(
                    dataPinjaman,
                    periode
                )
            ){

                return false;

            }


            return true;

        }
    );

}


// =====================================
// PERIODE DENDA
// =====================================
//
// Denda hanya periode yang:
//
// 1. Sudah lewat
// 2. Belum lunas
//
// Bulan berjalan TIDAK kena denda.
//
// =====================================

function kewajibanPeriodeDenda(
    semuaPeriode,
    dataPinjaman,
    bulanPembayaran
){

    return semuaPeriode.filter(
        function(periode){

            if(
                periode >=
                bulanPembayaran
            ){

                return false;

            }


            if(
                kewajibanPeriodeSudahLunas(
                    dataPinjaman,
                    periode
                )
            ){

                return false;

            }


            return true;

        }
    );

}


// =====================================
// HITUNG JASA PER PERIODE
// =====================================

function kewajibanHitungJasa(
    dataPinjaman
){

    if(
        typeof mesinHitungJasa ===
        "function"
    ){

        return mesinHitungJasa(

            Number(
                dataPinjaman.sisaPokok
            ) || 0,

            Number(
                dataPinjaman.jasa
            ) || 0

        );

    }


    let pokok =
        Number(
            dataPinjaman.sisaPokok
        ) || 0;


    let jasa =
        Number(
            dataPinjaman.jasa
        ) || 0;


    return pokok * jasa / 100;

}


// =====================================
// HITUNG DENDA PER PERIODE
// =====================================

function kewajibanHitungDenda(
    dataPinjaman
){

    if(
        typeof mesinHitungDenda ===
        "function"
    ){

        return mesinHitungDenda(

            Number(
                dataPinjaman.sisaPokok
            ) || 0,

            Number(
                dataPinjaman.denda
            ) || 0

        );

    }


    let pokok =
        Number(
            dataPinjaman.sisaPokok
        ) || 0;


    let denda =
        Number(
            dataPinjaman.denda
        ) || 0;


    return pokok * denda / 100;

}

// =====================================
// TENTUKAN PERIODE SELESAI
// =====================================
//
// Fungsi ini menentukan periode yang benar-benar
// selesai berdasarkan kewajiban yang dikenakan.
//
// CATATAN:
// periodeLunas = status kewajiban periode,
// BUKAN status pinjaman.
//
// =====================================

function kewajibanTentukanPeriodeSelesai(
    dataPinjaman,
    bulanPembayaran,
    periodeJasaWajib,
    periodeDenda,
    periodeJasaBerjalan
){

    let hasil = [];


    // =================================
    // JASA WAJIB
    // =================================

    if(
        Array.isArray(
            periodeJasaWajib
        )
    ){

        periodeJasaWajib.forEach(
            function(periode){

                if(
                    !hasil.includes(
                        periode
                    )
                ){

                    hasil.push(
                        periode
                    );

                }

            }
        );

    }


    // =================================
    // DENDA
    // =================================
    //
    // Denda mengikuti periode tunggakan.
    // Jadi periode yang mempunyai denda
    // tetap menjadi kandidat periode selesai.
    //
    // =================================

    if(
        Array.isArray(
            periodeDenda
        )
    ){

        periodeDenda.forEach(
            function(periode){

                if(
                    !hasil.includes(
                        periode
                    )
                ){

                    hasil.push(
                        periode
                    );

                }

            }
        );

    }


    // =================================
    // JASA BERJALAN
    // =================================
    //
    // Bulan berjalan menjadi selesai apabila
    // jasa berjalan merupakan kewajiban periode
    // yang sedang dibayar.
    //
    // =================================

    if(
        Array.isArray(
            periodeJasaBerjalan
        )
    ){

        periodeJasaBerjalan.forEach(
            function(periode){

                if(
                    !hasil.includes(
                        periode
                    )
                ){

                    hasil.push(
                        periode
                    );

                }

            }
        );

    }


    // =================================
    // NORMALISASI
    // =================================

    return [
        ...new Set(
            hasil
                .map(
                    function(periode){

                        return String(
                            periode
                        ).substring(0,7);

                    }
                )
                .filter(
                    function(periode){

                        return !!periode;

                    }
                )
        )
    ];

}
// =====================================
// HITUNG KEWAJIBAN
// =====================================

function hitungKewajiban(
    dataPinjaman,
    bulanPembayaran,
    pokokDibayar
){

    if(
        !dataPinjaman ||
        !periodeValid(
            bulanPembayaran
        )
    ){

        return null;

    }


// =====================================
// PENGAMAN PERIODE PERTAMA
// =====================================
//
// Pinjaman belum boleh diproses sebelum
// periode pertama.
//
// Contoh:
// bulan pinjaman   : 2026-08
// periode pertama  : 2026-09
//
// Jika pembayaran : 2026-08
// hasil           : NULL
//
// =====================================

    let periodePertama =
        periodeCariPertama(
            dataPinjaman
        );


    if(
        periodeValid(periodePertama) &&
        bulanPembayaran < periodePertama
    ){

        console.warn(
            "Belum masuk periode angsuran:",
            {
                idPinjaman:
                    dataPinjaman.id,

                bulanPinjaman:
                    dataPinjaman.bulanPinjaman,

                periodePertama:
                    periodePertama,

                bulanPembayaran:
                    bulanPembayaran
            }
        );

        return null;

    }


    let saldoPokok =
        Number(
            dataPinjaman.sisaPokok
        ) || 0;


    pokokDibayar =
        Number(
            pokokDibayar
        ) || 0;


    // ---------------------------------
    // AMBIL SEMUA PERIODE
    // ---------------------------------

    let semuaPeriode =
        kewajibanSemuaPeriode(
            dataPinjaman,
            bulanPembayaran
        );


    // ---------------------------------
    // PERIODE JASA WAJIB
    // ---------------------------------

    let periodeJasaWajib =
        kewajibanPeriodeJasaWajib(
            semuaPeriode,
            dataPinjaman,
            bulanPembayaran
        );


    // ---------------------------------
    // PERIODE DENDA
    // ---------------------------------

    let periodeDenda =
        kewajibanPeriodeDenda(
            semuaPeriode,
            dataPinjaman,
            bulanPembayaran
        );


    // ---------------------------------
    // HITUNG PERIODE
    // ---------------------------------

    let jasaPeriode =
        kewajibanHitungJasa(
            dataPinjaman
        );


    let dendaPeriode =
        kewajibanHitungDenda(
            dataPinjaman
        );


    let jasaWajib =
        jasaPeriode *
        periodeJasaWajib.length;


    let dendaTunggakan =
        dendaPeriode *
        periodeDenda.length;


    // ---------------------------------
    // JASA BULAN BERJALAN
    // ---------------------------------
    //
    // Hanya dihitung kalau:
    // saldo pokok masih ada.
    //
    // ---------------------------------

    let jasaBerjalan = 0;

    let periodeJasaBerjalan = [];


    if(
        saldoPokok > 0 &&
        !kewajibanPeriodeSudahLunas(
            dataPinjaman,
            bulanPembayaran
        )
    ){

        jasaBerjalan =
            jasaPeriode;

        periodeJasaBerjalan =
            [
                bulanPembayaran
            ];

    }


    // =================================
    // TENTUKAN PERIODE SELESAI
    // =================================

    let periodeSelesai =
        kewajibanTentukanPeriodeSelesai(

            dataPinjaman,

            bulanPembayaran,

            periodeJasaWajib,

            periodeDenda,

            periodeJasaBerjalan

        );


    // ---------------------------------
    // TOTAL
    // ---------------------------------

    let total =
        pokokDibayar +
        jasaWajib +
        dendaTunggakan +
        jasaBerjalan;


    // ---------------------------------
    // HASIL
    // ---------------------------------

    return {

        idPinjaman:
            dataPinjaman.id,

        bulanPembayaran:
            bulanPembayaran,

        saldoPokok:
            saldoPokok,

        pokokDibayar:
            pokokDibayar,

        jasaWajib:
            jasaWajib,

        dendaTunggakan:
            dendaTunggakan,

        jasaBerjalan:
            jasaBerjalan,

        total:
            total,

        periodeJasaWajib:
            periodeJasaWajib,

        periodeDenda:
            periodeDenda,

        periodeJasaBerjalan:
            periodeJasaBerjalan,

        periodeSelesai:
            periodeSelesai

    };

}

// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN TOTAL KEWAJIBAN
// KOMPATIBILITAS MESIN EKSEKUTOR V18
// =====================================

function mesinTotalKewajiban(
    arg1,
    arg2,
    arg3
){

    console.log(
        "===== MESIN TOTAL KEWAJIBAN ====="
    );


    // =================================
    // NORMALISASI PARAMETER
    // =================================

    let dataPinjaman = null;
    let bulanPembayaran = "";
    let pokokDibayar = 0;


    // =================================
    // POLA 1
    //
    // mesinTotalKewajiban(
    //     dataPinjaman,
    //     bulanPembayaran,
    //     pokokDibayar
    // )
    // =================================

    if(
        arg1 &&
        typeof arg1 === "object" &&
        !Array.isArray(arg1)
    ){

        dataPinjaman =
            arg1;

        bulanPembayaran =
            arg2 || "";

        pokokDibayar =
            Number(arg3) || 0;

    }


    // =================================
    // POLA 2
    //
    // mesinTotalKewajiban({
    //     dataPinjaman,
    //     bulanPembayaran,
    //     pokokDibayar
    // })
    // =================================

    else if(
        arg1 &&
        typeof arg1 === "object"
    ){

        dataPinjaman =
            arg1.dataPinjaman ||
            arg1.pinjaman ||
            arg1.data ||
            null;

        bulanPembayaran =
            arg1.bulanPembayaran ||
            arg1.periode ||
            "";

        pokokDibayar =
            Number(
                arg1.pokokDibayar
            ) || 0;

    }


    // =================================
    // POLA 3
    //
    // mesinTotalKewajiban(
    //     idPinjaman,
    //     bulanPembayaran,
    //     pokokDibayar
    // )
    // =================================

    else if(
        typeof arg1 === "string"
    ){

        const idPinjaman =
            arg1;

        dataPinjaman =
            periodeCariPinjaman(
                idPinjaman
            );

        bulanPembayaran =
            arg2 || "";

        pokokDibayar =
            Number(arg3) || 0;

    }


    // =================================
    // VALIDASI PINJAMAN
    // =================================

    if(!dataPinjaman){

        console.error(
            "Data pinjaman tidak ditemukan"
        );

        return null;

    }


    // =================================
    // VALIDASI PERIODE
    // =================================

    if(
        !periodeValid(
            bulanPembayaran
        )
    ){

        console.error(
            "Periode pembayaran tidak valid:",
            bulanPembayaran
        );

        return null;

    }


    // =================================
    // VALIDASI MESIN
    // =================================

    if(
        typeof hitungKewajiban !==
        "function"
    ){

        console.error(
            "hitungKewajiban() tidak ditemukan"
        );

        return null;

    }


    // =================================
    // HITUNG KEWAJIBAN
    // =================================

    let hasil;

    try {

        hasil =
            hitungKewajiban(
                dataPinjaman,
                bulanPembayaran,
                pokokDibayar
            );

    } catch(error){

        console.error(
            "Error hitungKewajiban():",
            error
        );

        return null;

    }


    // =================================
    // VALIDASI HASIL
    // =================================

    if(!hasil){

        console.error(
            "hitungKewajiban() menghasilkan null"
        );

        return null;

    }


    // =================================
    // NORMALISASI NILAI
    // =================================

    hasil.idPinjaman =
        hasil.idPinjaman ||
        dataPinjaman.id ||
        "";

    hasil.bulanPembayaran =
        hasil.bulanPembayaran ||
        bulanPembayaran;

    hasil.saldoPokok =
        Number(
            hasil.saldoPokok
        ) || 0;

    hasil.pokokDibayar =
        Number(
            hasil.pokokDibayar
        ) || 0;

    hasil.jasaWajib =
        Number(
            hasil.jasaWajib
        ) || 0;

    hasil.dendaTunggakan =
        Number(
            hasil.dendaTunggakan
        ) || 0;

    hasil.jasaBerjalan =
        Number(
            hasil.jasaBerjalan
        ) || 0;


    // =================================
    // TOTAL
    // =================================

    hasil.total =
        hasil.pokokDibayar +
        hasil.jasaWajib +
        hasil.dendaTunggakan +
        hasil.jasaBerjalan;


    // =================================
    // ARRAY PERIODE
    // =================================

    hasil.periodeJasaWajib =
        Array.isArray(
            hasil.periodeJasaWajib
        )
            ? hasil.periodeJasaWajib
            : [];

    hasil.periodeDenda =
        Array.isArray(
            hasil.periodeDenda
        )
            ? hasil.periodeDenda
            : [];

    hasil.periodeJasaBerjalan =
        Array.isArray(
            hasil.periodeJasaBerjalan
        )
            ? hasil.periodeJasaBerjalan
            : [];

// =================================
// PERIODE SELESAI
// =================================
//
// Sumber keputusan berasal dari
// Mesin Kewajiban.
//
// Jangan membentuk ulang dari:
// periodeJasaWajib
// periodeDenda
// periodeJasaBerjalan
//
// =================================

hasil.periodeSelesai =
    Array.isArray(
        hasil.periodeSelesai
    )
        ? [
            ...new Set(
                hasil.periodeSelesai
                    .map(
                        function(periode){

                            return String(
                                periode
                            ).substring(0,7);

                        }
                    )
                    .filter(
                        function(periode){

                            return !!periode;

                        }
                    )
            )
        ]
        : [];
        
    // =================================
    // LOG
    // =================================

    console.log(
        "Pinjaman:",
        hasil.idPinjaman
    );

    console.log(
        "Periode:",
        hasil.bulanPembayaran
    );

    console.log(
        "Pokok:",
        rupiah(
            hasil.pokokDibayar
        )
    );

    console.log(
        "Jasa Wajib:",
        rupiah(
            hasil.jasaWajib
        )
    );

    console.log(
        "Denda:",
        rupiah(
            hasil.dendaTunggakan
        )
    );

    console.log(
        "Jasa Berjalan:",
        rupiah(
            hasil.jasaBerjalan
        )
    );

    console.log(
        "TOTAL:",
        rupiah(
            hasil.total
        )
    );


    return hasil;

}


// =====================================
// STATUS
// =====================================

console.log(
    "Mesin Total Kewajiban BBCS siap"
);


// =====================================
// TEST INTERNAL
// =====================================

function simulasiKewajibanSetelahLunas(){

    let dataPinjaman = {

        id:
            "TEST-DENDA-2",

        idAnggota:
            "BBTEST",

        nama:
            "TEST DENDA SEBAGIAN",

        sisaPokok:
            3000,

        jasa:
            5,

        denda:
            2,

        periodePertama:
            "2026-08",

        periodeLunas:
            [
                "2026-08"
            ]

    };


    let hasil =
        hitungKewajiban(

            dataPinjaman,

            "2026-11",

            0

        );


    console.log(
        "===== TEST KEWAJIBAN SETELAH PERIODE LUNAS ====="
    );


    console.log(
        JSON.stringify(
            hasil,
            null,
            2
        )
    );


    return hasil;

}


// =====================================
// STATUS MESIN
// =====================================

console.log(
    "Mesin Kewajiban BBCS siap"
);