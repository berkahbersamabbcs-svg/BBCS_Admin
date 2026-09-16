// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN FILTER PERIODE ANGSURAN
// FILE : Mesin/filter.js
// =====================================

console.log(
    "Mesin Filter BBCS mulai"
);


// =====================================
// NORMALISASI PERIODE
// =====================================

function filterNormalisasiPeriode(
    periode
){

    if(!periode){

        return "";

    }


    return periode
        .toString()
        .substring(0,7);

}
// =====================================
// CEK PERIODE LUNAS
// =====================================

function filterPeriodeLunas(
    idPinjaman,
    periode
){

    periode =
        filterNormalisasiPeriode(
            periode
        );

    if(!periode){
        return false;
    }


    // =================================
    // CARI PINJAMAN
    // =================================

    if(
        !Array.isArray(pinjaman)
    ){

        return false;

    }


    const dataPinjaman =
        pinjaman.find(
            function(item){

                return (
                    item &&
                    String(item.id) ===
                    String(idPinjaman)
                );

            }
        );


    if(!dataPinjaman){

        return false;

    }


    // =================================
    // CEK periodeLunas
    // =================================

    const daftarLunas =
        Array.isArray(
            dataPinjaman.periodeLunas
        )
        ? dataPinjaman.periodeLunas
        : [];


    return daftarLunas.some(
        function(item){

            return (
                filterNormalisasiPeriode(
                    item
                ) === periode
            );

        }
    );

}
// =====================================
// CEK PERIODE JATUH TEMPO
// =====================================
//
// Periode < bulan pembayaran
//
// Contoh:
//
// September < Oktober
// = JATUH TEMPO
//
// Oktober = bulan berjalan
// = BELUM jatuh tempo
//
// =====================================

function filterPeriodeJatuhTempo(
    periode,
    bulanPembayaran
){

    return (
        mesinPeriodeValid(periode) &&
        mesinPeriodeValid(bulanPembayaran) &&
        periode < bulanPembayaran
    );

}

// =====================================
// CEK PERIODE BERJALAN
// =====================================

function filterPeriodeBerjalan(
    periode,
    bulanPembayaran
){

    return (
        mesinPeriodeValid(periode) &&
        mesinPeriodeValid(bulanPembayaran) &&
        periode === bulanPembayaran
    );

}


// =====================================
// BUAT DAFTAR PERIODE
// =====================================
//
// Mulai dari periode pertama
// sampai bulan pembayaran.
//
// =====================================

function filterBuatDaftarPeriode(
    dataPinjaman,
    bulanPembayaran
){

    if(
        !dataPinjaman ||
        !periodeValid(bulanPembayaran)
    ){

        return [];

    }


    let periodeAwal =
        dataPinjaman.periodePertama ||
        "";


    if(
        !periodeValid(periodeAwal)
    ){

        return [];

    }


    let daftar = [];

    let periode =
        periodeAwal;


    // Pengaman maksimum
    // 120 periode / 10 tahun

    let batas = 120;


    while(
        periode <= bulanPembayaran &&
        daftar.length < batas
    ){

        daftar.push(
            periode
        );


        if(
            periode ===
            bulanPembayaran
        ){

            break;

        }


        periode =
            mesinBulanBerikutnya(
               periode
        );


        if(!periode){

            break;

        }

    }


    return daftar;

}


// =====================================
// FILTER SEMUA PERIODE BELUM LUNAS
// =====================================

function filterPeriodeBelumLunas(
    dataPinjaman,
    bulanPembayaran
){

    if(!dataPinjaman){

        return [];

    }


    let daftar =
        filterBuatDaftarPeriode(

            dataPinjaman,

            bulanPembayaran

        );


    return daftar.filter(
        function(periode){

            return !filterPeriodeLunas(

                dataPinjaman.id,

                periode

            );

        }
    );

}


// =====================================
// FILTER JASA WAJIB
// =====================================
//
// Syarat:
//
// 1. Belum lunas
// 2. Sudah lewat jatuh tempo
//
// =====================================

function filterJasaWajib(
    dataPinjaman,
    bulanPembayaran
){

    let daftar =
        filterPeriodeBelumLunas(

            dataPinjaman,

            bulanPembayaran

        );


    return daftar.filter(
        function(periode){

            return filterPeriodeJatuhTempo(

                periode,

                bulanPembayaran

            );

        }
    );

}


// =====================================
// FILTER DENDA
// =====================================
//
// Denda HANYA berasal dari:
//
// periode sudah jatuh tempo
// DAN belum lunas.
//
// BUKAN:
//
// jumlah bulan × denda
//
// =====================================

function filterDendaTunggakan(
    dataPinjaman,
    bulanPembayaran
){

    return filterJasaWajib(

        dataPinjaman,

        bulanPembayaran

    );

}


// =====================================
// FILTER JASA BERJALAN
// =====================================
//
// Hanya bulan pembayaran.
//
// Tidak boleh dikenakan denda.
//
// =====================================

function filterJasaBerjalan(
    dataPinjaman,
    bulanPembayaran
){

    let daftar =
        filterPeriodeBelumLunas(

            dataPinjaman,

            bulanPembayaran

        );


    return daftar.filter(
        function(periode){

            return filterPeriodeBerjalan(

                periode,

                bulanPembayaran

            );

        }
    );

}


// =====================================
// FILTER LENGKAP
// =====================================

function filterSemuaKewajiban(
    dataPinjaman,
    bulanPembayaran
){

    let jasaWajib =
        filterJasaWajib(

            dataPinjaman,

            bulanPembayaran

        );


    let denda =
        filterDendaTunggakan(

            dataPinjaman,

            bulanPembayaran

        );


    let jasaBerjalan =
        filterJasaBerjalan(

            dataPinjaman,

            bulanPembayaran

        );


    return {

        bulanPembayaran:
            bulanPembayaran,

        jasaWajib:
            jasaWajib,

        denda:
            denda,

        jasaBerjalan:
            jasaBerjalan,

        semuaBelumLunas:
            filterPeriodeBelumLunas(

                dataPinjaman,

                bulanPembayaran

            )

    };

}


// =====================================
// SIMULASI FILTER
// =====================================
//
// Contoh:
//
// periode pertama = 2026-09
// pembayaran      = 2026-10
//
// Hasil:
//
// Jasa Wajib
// → 2026-09
//
// Denda
// → 2026-09
//
// Jasa Berjalan
// → 2026-10
//
// =====================================

function simulasiFilterPeriode(){

    let dataPinjaman = {

        id:
            "TEST",

        periodePertama:
            "2026-09"

    };


    let hasil =
        filterSemuaKewajiban(

            dataPinjaman,

            "2026-10"

        );


    console.log(
        "===== FILTER PERIODE BBCS ====="
    );


    console.log(
        "Bulan Pembayaran :",
        hasil.bulanPembayaran
    );


    console.log(
        "Semua Belum Lunas :",
        hasil.semuaBelumLunas
    );


    console.log(
        "Jasa Wajib :",
        hasil.jasaWajib
    );


    console.log(
        "Denda :",
        hasil.denda
    );


    console.log(
        "Jasa Berjalan :",
        hasil.jasaBerjalan
    );


    return hasil;

}


// =====================================
// STATUS MESIN
// =====================================

console.log(
    "Mesin Filter BBCS siap"
);