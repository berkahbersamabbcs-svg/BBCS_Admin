// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN SIKLUS ANGSURAN
// FILE : Mesin/siklus.js
// VERSI : BBCS V18 - FIX PERIODE LUNAS
// =====================================

console.log(
    "Mesin Siklus BBCS mulai"
);


// =====================================
// NORMALISASI PERIODE
// =====================================

function siklusNormalisasiPeriode(
    periode
){

    if(
        periode === null ||
        periode === undefined
    ){

        return "";

    }


    return String(
        periode
    )
    .substring(0,7);

}


// =====================================
// AMBIL PERIODE LUNAS
// =====================================

function siklusAmbilPeriodeLunas(
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


    return dataPinjaman.periodeLunas
        .map(
            function(periode){

                return siklusNormalisasiPeriode(
                    periode
                );

            }
        )
        .filter(
            function(periode){

                return !!periode;

            }
        );

}


// =====================================
// CEK PERIODE LUNAS
// =====================================

function siklusSudahLunas(
    dataPinjaman,
    periode
){

    if(
        !dataPinjaman ||
        !periode
    ){

        return false;

    }


    let target =
        siklusNormalisasiPeriode(
            periode
        );


    if(!target){

        return false;

    }


    let lunas =
        siklusAmbilPeriodeLunas(
            dataPinjaman
        );


    return lunas.includes(
        target
    );

}


// =====================================
// ALIAS GLOBAL
// =====================================
//
// Dipakai oleh filter.js
//
// =====================================

function periodeSudahLunas(
    idPinjaman,
    periode
){

    if(
        !idPinjaman ||
        !periode
    ){

        return false;

    }


    if(
        !Array.isArray(
            pinjaman
        )
    ){

        return false;

    }


    let dataPinjaman =
        pinjaman.find(
            function(item){

                return (
                    item &&
                    item.id === idPinjaman
                );

            }
        );


    if(!dataPinjaman){

        return false;

    }


    return siklusSudahLunas(
        dataPinjaman,
        periode
    );

}


// =====================================
// FILTER PERIODE BELUM LUNAS
// =====================================

function siklusPeriodeBelumLunas(
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

            return !siklusSudahLunas(
                dataPinjaman,
                periode
            );

        }
    );

}


// =====================================
// TENTUKAN SIKLUS PEMBAYARAN
// =====================================

function mesinSiklusPembayaran(
    dataPinjaman,
    bulanPembayaran
){

    if(
        !dataPinjaman ||
        !bulanPembayaran
    ){

        return null;

    }


    // =================================
    // NORMALISASI BULAN PEMBAYARAN
    // =================================

    bulanPembayaran =
        siklusNormalisasiPeriode(
            bulanPembayaran
        );


    if(!bulanPembayaran){

        return null;

    }

// =================================
// PENGAMAN PERIODE PERTAMA
// =================================
//
// Pinjaman Agustus 2026
// tidak boleh memiliki siklus
// pembayaran Agustus 2026.
//
// Periode pertama = September 2026.
//
// =================================

let periodePertama =
    typeof periodeCariPertama ===
    "function"
        ? periodeCariPertama(
            dataPinjaman
        )
        : dataPinjaman.periodePertama || "";


periodePertama =
    siklusNormalisasiPeriode(
        periodePertama
    );


if(
    periodePertama &&
    bulanPembayaran < periodePertama
){

    console.warn(
        "Siklus pembayaran belum dimulai:",
        {
            idPinjaman:
                dataPinjaman.id,

            bulanPembayaran:
                bulanPembayaran,

            periodePertama:
                periodePertama
        }
    );

    return {

        idPinjaman:
            dataPinjaman.id,

        bulanPembayaran:
            bulanPembayaran,

        saldoPokok:
            Number(
                dataPinjaman.sisaPokok
            ) || 0,

        periodeLunas:
            siklusAmbilPeriodeLunas(
                dataPinjaman
            ),

        semuaPeriode:
            [],

        periodeBelumLunas:
            []

    };

}
    // =================================
    // AMBIL SEMUA PERIODE
    // =================================

    let semuaPeriode = [];


    if(
        typeof mesinSemuaPeriode ===
        "function"
    ){

        semuaPeriode =
            mesinSemuaPeriode(
                dataPinjaman,
                bulanPembayaran
            );

    }
    else if(
        typeof filterBuatDaftarPeriode ===
        "function"
    ){

        semuaPeriode =
            filterBuatDaftarPeriode(
                dataPinjaman,
                bulanPembayaran
            );

    }


    // =================================
    // NORMALISASI SEMUA PERIODE
    // =================================

    semuaPeriode =
        Array.isArray(
            semuaPeriode
        )

        ?

        semuaPeriode
            .map(
                function(periode){

                    return siklusNormalisasiPeriode(
                        periode
                    );

                }
            )
            .filter(
                function(periode){

                    return !!periode;

                }
            )

        :

        [];


    // =================================
    // HILANGKAN DUPLIKAT
    // =================================

    semuaPeriode =
        [
            ...new Set(
                semuaPeriode
            )
        ];


    // =================================
    // PERIODE BELUM LUNAS
    // =================================

    let belumLunas =
        siklusPeriodeBelumLunas(
            semuaPeriode,
            dataPinjaman
        );


    // =================================
    // HASIL
    // =================================

    return {

        idPinjaman:
            dataPinjaman.id,

        bulanPembayaran:
            bulanPembayaran,

        saldoPokok:
            Number(
                dataPinjaman.sisaPokok
            ) || 0,

        periodeLunas:
            siklusAmbilPeriodeLunas(
                dataPinjaman
            ),

        semuaPeriode:
            semuaPeriode,

        periodeBelumLunas:
            belumLunas

    };

}


// =====================================
// SIMULASI SIKLUS KE-2
// =====================================

function simulasiSiklusKedua(){

    console.log(
        "===== SIMULASI SIKLUS KE-2 ====="
    );


    let dataPinjaman = {

        id:
            "TEST",

        idAnggota:
            "TEST",

        nama:
            "SIMULASI",

        sisaPokok:
            3000,

        jasa:
            5,

        denda:
            2,

        periodePertama:
            "2026-09",

        periodeLunas:
            [
                "2026-09",
                "2026-10"
            ]

    };


    let hasil =
        mesinSiklusPembayaran(

            dataPinjaman,

            "2026-11"

        );


    console.log(
        "Saldo Pokok :",
        rupiah(
            hasil.saldoPokok
        )
    );


    console.log(
        "Periode Lunas :",
        hasil.periodeLunas
    );


    console.log(
        "Semua Periode :",
        hasil.semuaPeriode
    );


    console.log(
        "Belum Lunas :",
        hasil.periodeBelumLunas
    );


    return hasil;

}


// =====================================
// STATUS MESIN
// =====================================

console.log(
    "Mesin Siklus BBCS siap"
);