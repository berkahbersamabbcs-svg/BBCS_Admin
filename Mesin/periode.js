// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN PERIODE ANGSURAN
// FILE : Mesin/periode.js
// VERSI : BBCS V18 FIX
// =====================================

console.log(
    "Mesin Periode BBCS mulai"
);


// =====================================
// VALIDASI PERIODE
// FORMAT: YYYY-MM
// =====================================

function periodeValid(periode){

    return /^\d{4}-(0[1-9]|1[0-2])$/.test(
        String(periode || "")
    );

}


// =====================================
// BULAN SEKARANG
// =====================================

function periodeBulanSekarang(){

    let tanggal = new Date();

    return (
        tanggal.getFullYear() +
        "-" +
        String(
            tanggal.getMonth() + 1
        ).padStart(2, "0")
    );

}


// =====================================
// BULAN BERIKUTNYA
// =====================================

function periodeBulanBerikutnya(periode){

    if(
        !periodeValid(periode)
    ){

        return "";

    }

    let bagian =
        String(periode).split("-");

    let tahun =
        Number(bagian[0]);

    let bulan =
        Number(bagian[1]);

    bulan++;

    if(
        bulan > 12
    ){

        bulan = 1;
        tahun++;

    }

    return (
        tahun +
        "-" +
        String(bulan).padStart(2, "0")
    );

}


// =====================================
// PERBANDINGAN PERIODE
// =====================================

function periodeSudahLewat(
    periode,
    bulanPembayaran
){

    if(
        !periodeValid(periode) ||
        !periodeValid(bulanPembayaran)
    ){

        return false;

    }

    return (
        periode <
        bulanPembayaran
    );

}


// =====================================
// PERIODE SEDANG BERJALAN
// =====================================

function periodeSedangBerjalan(
    periode,
    bulanPembayaran
){

    if(
        !periodeValid(periode) ||
        !periodeValid(bulanPembayaran)
    ){

        return false;

    }

    return (
        periode ===
        bulanPembayaran
    );

}


// =====================================
// CARI PINJAMAN
// =====================================

function periodeCariPinjaman(
    idPinjaman
){

    if(
        !Array.isArray(pinjaman)
    ){

        return null;

    }

    return (
        pinjaman.find(
            function(item){

                return (
                    item &&
                    item.id == idPinjaman
                );

            }
        ) || null
    );

}


// =====================================
// AMBIL PERIODE LUNAS
// =====================================
// SUMBER UTAMA:
// dataPinjaman.periodeLunas
//
// Tidak boleh menganggap periode yang
// belum ada di array sebagai lunas.
// =====================================

function periodeAmbilLunas(
    dataPinjaman
){

    if(
        !dataPinjaman
    ){

        return [];

    }

    if(
        !Array.isArray(
            dataPinjaman.periodeLunas
        )
    ){

        return [];

    }

    return [
        ...new Set(
            dataPinjaman.periodeLunas
                .filter(
                    function(periode){

                        return periodeValid(
                            periode
                        );

                    }
                )
        )
    ];

}


// =====================================
// CARI RIWAYAT PERIODE
// =====================================

function periodeCariRiwayat(
    idPinjaman,
    periode
){

    if(
        !Array.isArray(
            riwayatAngsuran
        )
    ){

        return null;

    }

    return (
        riwayatAngsuran.find(
            function(item){

                return (
                    item &&
                    item.idPinjaman == idPinjaman &&
                    item.periode == periode
                );

            }
        ) || null
    );

}


// =====================================
// CEK PERIODE SUDAH LUNAS
// =====================================
// PRIORITAS 1:
// periodeLunas pada data pinjaman
//
// PRIORITAS 2:
// riwayat angsuran dengan status LUNAS
//
// Contoh:
//
// periodeLunas:
// ["2026-09","2026-10","2026-11"]
//
// Maka:
//
// 09 = true
// 10 = true
// 11 = true
// 12 = false
// =====================================

function periodeSudahLunas(
    idPinjaman,
    periode
){

    if(
        !periodeValid(periode)
    ){

        return false;

    }


    let dataPinjaman =
        periodeCariPinjaman(
            idPinjaman
        );


    // =================================
    // SUMBER UTAMA
    // =================================

    let daftarLunas =
        periodeAmbilLunas(
            dataPinjaman
        );


    if(
        daftarLunas.includes(
            periode
        )
    ){

        return true;

    }


    // =================================
    // FALLBACK RIWAYAT
    // =================================

    let riwayat =
        periodeCariRiwayat(
            idPinjaman,
            periode
        );


    if(!riwayat){

        return false;

    }


    return (
        riwayat.status === "LUNAS" ||
        riwayat.status === "Lunas"
    );

}


// =====================================
// FILTER PERIODE BELUM LUNAS
// =====================================

function periodeFilterBelumLunas(
    semuaPeriode,
    idPinjaman
){

    if(
        !Array.isArray(
            semuaPeriode
        )
    ){

        return [];

    }

    return (
        semuaPeriode.filter(
            function(periode){

                return !periodeSudahLunas(
                    idPinjaman,
                    periode
                );

            }
        )
    );

}


// =====================================
// CARI PERIODE PERTAMA PINJAMAN
// =====================================

function periodeCariPertama(
    dataPinjaman
){

    if(!dataPinjaman){

        return "";

    }


    // =================================
    // PRIORITAS 1
    // =================================

    if(
        dataPinjaman.periodePertama &&
        periodeValid(
            dataPinjaman.periodePertama
        )
    ){

        return dataPinjaman.periodePertama;

    }


    // =================================
    // SUMBER TANGGAL
    // =================================

    let sumberTanggal =
        dataPinjaman.tanggalPinjaman ||
        dataPinjaman.tanggal ||
        dataPinjaman.tanggalPengajuan ||
        dataPinjaman.tanggalMulai ||
        dataPinjaman.createdAt ||
        "";


    if(!sumberTanggal){

        return "";

    }


    let teks =
        String(sumberTanggal);


    // =================================
    // FORMAT YYYY-MM-DD
    // =================================

    let cocokISO =
        teks.match(
            /^(\d{4})-(\d{2})/
        );


    if(cocokISO){

        let hasilISO =
            cocokISO[1] +
            "-" +
            cocokISO[2];

        if(
            periodeValid(
                hasilISO
            )
        ){

            return hasilISO;

        }

    }


    // =================================
    // FORMAT DD/MM/YYYY
    // =================================

    let cocokID =
        teks.match(
            /^(\d{1,2})\/(\d{1,2})\/(\d{4})/
        );


    if(cocokID){

        let hasilID =
            cocokID[3] +
            "-" +
            String(
                cocokID[2]
            ).padStart(2, "0");


        if(
            periodeValid(
                hasilID
            )
        ){

            return hasilID;

        }

    }


    // =================================
    // COBA PARSE DATE
    // =================================

    let tanggal =
        new Date(
            sumberTanggal
        );


    if(
        !isNaN(
            tanggal.getTime()
        )
    ){

        let hasilDate =
            tanggal.getFullYear() +
            "-" +
            String(
                tanggal.getMonth() + 1
            ).padStart(2, "0");


        if(
            periodeValid(
                hasilDate
            )
        ){

            return hasilDate;

        }

    }


    return "";

}


// =====================================
// DAFTAR SEMUA PERIODE
// =====================================

function mesinSemuaPeriode(
    dataPinjaman,
    bulanPembayaran
){

    if(
        !dataPinjaman ||
        !periodeValid(
            bulanPembayaran
        )
    ){

        return [];

    }


    let periodePertama =
        periodeCariPertama(
            dataPinjaman
        );


    if(!periodePertama){

        console.warn(
            "Periode pertama tidak ditemukan:",
            dataPinjaman
        );

        return [];

    }


    if(
        periodePertama >
        bulanPembayaran
    ){

        return [];

    }


    let hasil = [];

    let periode =
        periodePertama;


    while(
        periode <=
        bulanPembayaran
    ){

        hasil.push(
            periode
        );


        let berikutnya =
            periodeBulanBerikutnya(
                periode
            );


        if(!berikutnya){

            break;

        }


        if(
            berikutnya ===
            periode
        ){

            break;

        }


        periode =
            berikutnya;


        if(
            hasil.length > 240
        ){

            console.warn(
                "Pengaman periode aktif"
            );

            break;

        }

    }


    console.log(
        "Periode pertama:",
        periodePertama
    );

    console.log(
        "Bulan pembayaran:",
        bulanPembayaran
    );

    console.log(
        "Semua periode:",
        hasil
    );


    return hasil;

}


// =====================================
// HITUNG JASA BERJALAN
// =====================================

function periodeHitungJasaBerjalan(
    dataPinjaman
){

    if(
        !dataPinjaman
    ){

        return 0;

    }


    if(
        typeof mesinHitungJasa !==
        "function"
    ){

        console.error(
            "mesinHitungJasa() tidak ditemukan"
        );

        return 0;

    }


    return mesinHitungJasa(

        Number(
            dataPinjaman.sisaPokok
        ) || 0,

        Number(
            dataPinjaman.jasa
        ) || 0

    );

}


// =====================================
// HITUNG DENDA
// =====================================

function periodeHitungDenda(
    dataPinjaman
){

    if(
        !dataPinjaman
    ){

        return 0;

    }


    if(
        typeof mesinHitungDenda !==
        "function"
    ){

        console.error(
            "mesinHitungDenda() tidak ditemukan"
        );

        return 0;

    }


    return mesinHitungDenda(

        Number(
            dataPinjaman.sisaPokok
        ) || 0,

        Number(
            dataPinjaman.denda
        ) || 0

    );

}


// =====================================
// BUAT PERIODE BERJALAN
// =====================================

function periodeBuatBerjalan(
    dataPinjaman,
    bulanPembayaran
){

    if(
        !dataPinjaman ||
        !periodeValid(
            bulanPembayaran
        )
    ){

        return null;

    }


    let jasaBerjalan =
        periodeHitungJasaBerjalan(
            dataPinjaman
        );


    return {

        idPinjaman:
            dataPinjaman.id,

        idAnggota:
            dataPinjaman.idAnggota ||
            dataPinjaman.anggota ||
            "",

        namaAnggota:
            dataPinjaman.namaAnggota ||
            dataPinjaman.nama ||
            "",

        periode:
            bulanPembayaran,

        saldoPokok:
            Number(
                dataPinjaman.sisaPokok
            ) || 0,

        jasaWajib:
            0,

        denda:
            0,

        jasaBerjalan:
            jasaBerjalan,

        pokok:
            0,

        status:
            "BELUM_LUNAS"

    };

}


// =====================================
// SIMULASI PERIODE LANCAR
// =====================================

function simulasiPeriodeLancar(
    saldoPokok,
    jasa,
    denda
){

    saldoPokok =
        Number(
            saldoPokok
        ) || 0;


    jasa =
        Number(
            jasa
        ) || 0;


    denda =
        Number(
            denda
        ) || 0;


    let jasaBerjalan =
        saldoPokok *
        jasa /
        100;


    let hasil = {

        saldoPokok:
            saldoPokok,

        jasaWajib:
            0,

        denda:
            0,

        jasaBerjalan:
            jasaBerjalan,

        total:
            jasaBerjalan

    };


    console.log(
        "===== PERIODE LANCAR BBCS ====="
    );


    console.log(
        "Saldo Pokok :",
        rupiah(
            hasil.saldoPokok
        )
    );


    console.log(
        "Jasa Wajib :",
        rupiah(
            hasil.jasaWajib
        )
    );


    console.log(
        "Denda :",
        rupiah(
            hasil.denda
        )
    );


    console.log(
        "Jasa Berjalan :",
        rupiah(
            hasil.jasaBerjalan
        )
    );


    console.log(
        "Total Jasa + Denda :",
        rupiah(
            hasil.total
        )
    );


    return hasil;

}


// =====================================
// STATUS MESIN
// =====================================

console.log(
    "Mesin Periode BBCS siap"
);