// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN EKSEKUSI ANGSURAN
// FILE : Mesin/eksekusi.js
// =====================================

console.log(
    "Mesin Eksekusi BBCS mulai"
);


// =====================================
// TAMBAH PERIODE LUNAS
// =====================================

function eksekusiTandaiPeriodeLunas(
    dataPinjaman,
    periode
){

    if(
        !dataPinjaman ||
        !periode
    ){

        return false;

    }


    // ---------------------------------
    // SIAPKAN ARRAY
    // ---------------------------------

    if(
        !Array.isArray(
            dataPinjaman.periodeLunas
        )
    ){

        dataPinjaman.periodeLunas = [];

    }


    // ---------------------------------
    // CEK SUDAH LUNAS
    // ---------------------------------

    if(
        dataPinjaman.periodeLunas.includes(
            periode
        )
    ){

        return false;

    }


    // ---------------------------------
    // TAMBAHKAN
    // ---------------------------------

    dataPinjaman.periodeLunas.push(
        periode
    );


    return true;

}


// =====================================
// BUAT DAFTAR PERIODE YANG DISELESAIKAN
// =====================================

function eksekusiAmbilPeriodeSelesai(
    kewajiban
){

    if(!kewajiban){

        return [];

    }


    let hasil = [];


    // ---------------------------------
    // JASA WAJIB
    // ---------------------------------

    if(
        Array.isArray(
            kewajiban.periodeJasaWajib
        )
    ){

        kewajiban.periodeJasaWajib.forEach(
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


    // ---------------------------------
    // JASA BERJALAN
    // ---------------------------------

    if(
        Array.isArray(
            kewajiban.periodeJasaBerjalan
        )
    ){

        kewajiban.periodeJasaBerjalan.forEach(
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


    return hasil;

}

// =====================================
// EKSEKUSI PEMBAYARAN SIMULASI
// =====================================

function mesinEksekusiPembayaran(
    dataPinjaman,
    kewajiban
){

    if(
        !dataPinjaman ||
        !kewajiban
    ){

        return null;

    }


    // =================================
    // POKOK DIBAYAR
    // =================================

    let pokokDibayar =
        Number(
            kewajiban.pokokDibayar
        ) || 0;


    // =================================
    // SALDO AWAL
    // =================================

    let saldoAwal =
        Number(
            dataPinjaman.sisaPokok
        ) || 0;


    // =================================
    // VALIDASI POKOK
    // =================================

    if(
        pokokDibayar < 0
    ){

        pokokDibayar = 0;

    }


    if(
        pokokDibayar >
        saldoAwal
    ){

        pokokDibayar =
            saldoAwal;

    }


    // =================================
    // SALDO AKHIR
    // =================================

    let saldoAkhir =
        saldoAwal -
        pokokDibayar;


    // =================================
    // PERIODE SELESAI
    // =================================

    let periodeSelesai =
        eksekusiAmbilPeriodeSelesai(
            kewajiban
        );


    // =================================
    // TANDAI PERIODE LUNAS
    // =================================

    let periodeBaruLunas = [];


    periodeSelesai.forEach(
        function(periode){

            if(
                eksekusiTandaiPeriodeLunas(
                    dataPinjaman,
                    periode
                )
            ){

                periodeBaruLunas.push(
                    periode
                );

            }

        }
    );


    // =================================
    // UPDATE SALDO
    // =================================

    dataPinjaman.sisaPokok =
        saldoAkhir;


    // =================================
    // STATUS PINJAMAN
    // =================================

    if(
        saldoAkhir <= 0
    ){

        dataPinjaman.sisaPokok = 0;

        dataPinjaman.status =
            "Lunas";

    }
    else{

        dataPinjaman.status =
            "Aktif";

    }


    // =================================
    // HASIL EKSEKUSI
    // =================================

    let hasil = {

        saldoAwal:
            saldoAwal,

        pokokDibayar:
            pokokDibayar,

        saldoAkhir:
            saldoAkhir,

        jasaWajib:
            Number(
                kewajiban.jasaWajib
            ) || 0,

        denda:
            Number(
                kewajiban.dendaTunggakan ??
                kewajiban.denda
            ) || 0,

        jasaBerjalan:
            Number(
                kewajiban.jasaBerjalan
            ) || 0,

        totalBayar:
            Number(
                kewajiban.totalBayar ??
                kewajiban.total
            ) || 0,

        periodeSelesai:
            periodeSelesai,

        periodeBaruLunas:
            periodeBaruLunas,

        status:
            dataPinjaman.status

    };


    return hasil;

}

// =====================================
// SIMULASI EKSEKUSI SIKLUS TUNGGAKAN
// =====================================

function simulasiEksekusiTunggakan(){

    console.log(
        "===== EKSEKUSI PEMBAYARAN ====="
    );


    // ---------------------------------
    // DATA PINJAMAN
    // ---------------------------------

    let dataPinjaman = {

        id:
            "TEST",

        idAnggota:
            "TEST",

        nama:
            "SIMULASI",

        sisaPokok:
            4000,

        jasa:
            5,

        denda:
            2,

        periodePertama:
            "2026-09",

        periodeLunas:
            []

    };


    // ---------------------------------
    // KEWAJIBAN
    // ---------------------------------

    let kewajiban = {

        pokokDibayar:
            1000,

        jasaWajib:
            200,

        denda:
            80,

        jasaBerjalan:
            200,

        totalBayar:
            1480,

        periodeJasaWajib:
            [
                "2026-09"
            ],

        periodeJasaBerjalan:
            [
                "2026-10"
            ]

    };


    // ---------------------------------
    // EKSEKUSI
    // ---------------------------------

    let hasil =
        mesinEksekusiPembayaran(

            dataPinjaman,

            kewajiban

        );


    // ---------------------------------
    // TAMPIL
    // ---------------------------------

    console.log(
        "Saldo Awal :",
        rupiah(
            hasil.saldoAwal
        )
    );


    console.log(
        "Pokok Dibayar :",
        rupiah(
            hasil.pokokDibayar
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
        "TOTAL BAYAR :",
        rupiah(
            hasil.totalBayar
        )
    );


    console.log(
        "Saldo Akhir :",
        rupiah(
            hasil.saldoAkhir
        )
    );


    console.log(
        "Periode Selesai :",
        hasil.periodeSelesai
    );


    console.log(
        "Periode Baru Lunas :",
        hasil.periodeBaruLunas
    );


    console.log(
        "Status :",
        hasil.status
    );


    console.log(
        "Data Pinjaman :",
        dataPinjaman
    );


    return hasil;

}


// =====================================
// STATUS MESIN
// =====================================

console.log(
    "Mesin Eksekusi BBCS siap"
);
