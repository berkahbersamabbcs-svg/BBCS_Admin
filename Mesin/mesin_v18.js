// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN ANGSURAN BBCS
// FILE : Mesin/angsuran.js
// V18 - MESIN PERIODE
// =====================================

console.log(
    "Mesin Angsuran BBCS V18 mulai"
);


// =====================================
// KONFIGURASI
// =====================================

const BBCS_MESIN_ANGSURAN =
    "V18";


// =====================================
// VALIDASI PERIODE
// FORMAT: YYYY-MM
// =====================================

function mesinPeriodeValid(
    periode
){

    return /^\d{4}-\d{2}$/.test(
        periode || ""
    );

}


// =====================================
// BULAN BERIKUTNYA
// =====================================

function mesinBulanBerikutnya(
    periode
){

    if(
        !mesinPeriodeValid(
            periode
        )
    ){

        return "";

    }


    let tanggal =
        new Date(
            periode +
            "-01T00:00:00"
        );


    tanggal.setMonth(
        tanggal.getMonth() + 1
    );


    return (
        tanggal.getFullYear() +
        "-" +
        String(
            tanggal.getMonth() + 1
        ).padStart(2,"0")
    );

}


// =====================================
// BULAN SEBELUMNYA
// =====================================

function mesinBulanSebelumnya(
    periode
){

    if(
        !mesinPeriodeValid(
            periode
        )
    ){

        return "";

    }


    let tanggal =
        new Date(
            periode +
            "-01T00:00:00"
        );


    tanggal.setMonth(
        tanggal.getMonth() - 1
    );


    return (
        tanggal.getFullYear() +
        "-" +
        String(
            tanggal.getMonth() + 1
        ).padStart(2,"0")
    );

}


// =====================================
// BULAN SEKARANG
// =====================================

function mesinBulanSekarang(){

    let tanggal =
        new Date();


    return (
        tanggal.getFullYear() +
        "-" +
        String(
            tanggal.getMonth() + 1
        ).padStart(2,"0")
    );

}


// =====================================
// CARI PINJAMAN
// =====================================

function mesinCariPinjaman(
    idPinjaman
){

    if(
        !Array.isArray(pinjaman)
    ){

        return null;

    }


    return pinjaman.find(
        function(item){

            return item &&
                item.id == idPinjaman;

        }
    ) || null;

}


// =====================================
// CARI PERIODE
// =====================================

function mesinCariPeriode(
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


    return riwayatAngsuran.find(
        function(item){

            return item &&
                item.idPinjaman ==
                    idPinjaman &&
                item.periode ==
                    periode;

        }
    ) || null;

}


// =====================================
// HITUNG JASA
// =====================================
//
// RUMUS:
// saldo pokok × jasa / 100
//
// Contoh:
// 4.000 × 5% = 200
//
// =====================================

function mesinHitungJasa(
    saldoPokok,
    tarifJasa
){

    let pokok =
        Number(saldoPokok) || 0;


    let jasa =
        Number(tarifJasa) || 0;


    if(
        pokok <= 0 ||
        jasa <= 0
    ){

        return 0;

    }


    return Math.round(
        pokok *
        jasa /
        100
    );

}


// =====================================
// HITUNG DENDA
// =====================================
//
// RUMUS:
// saldo pokok × tarif denda / 100
//
// Contoh:
// 4.000 × 2% = 80
//
// =====================================

function mesinHitungDenda(
    saldoPokok,
    tarifDenda
){

    let pokok =
        Number(saldoPokok) || 0;


    let denda =
        Number(tarifDenda) || 0;


    if(
        pokok <= 0 ||
        denda <= 0
    ){

        return 0;

    }


    return Math.round(
        pokok *
        denda /
        100
    );

}


// =====================================
// HITUNG PERIODE
// =====================================
//
// Setiap periode mempunyai:
// - jasa
// - denda
// - status
// - jatuhTempo
//
// =====================================

function mesinBuatPeriode(

    dataPinjaman,
    periode,
    bulanPembayaran

){

    if(
        !dataPinjaman ||
        !mesinPeriodeValid(
            periode
        )
    ){

        return null;

    }


    // ---------------------------------
    // CEK PERIODE SUDAH ADA
    // ---------------------------------

    let lama =
        mesinCariPeriode(
            dataPinjaman.id,
            periode
        );


    if(lama){

        return lama;

    }


    // ---------------------------------
    // SALDO POKOK
    // ---------------------------------

    let saldoPokok =
        Number(
            dataPinjaman.sisaPokok
        ) || 0;


    // ---------------------------------
    // TARIF
    // ---------------------------------

    let tarifJasa =
        Number(
            dataPinjaman.jasa
        ) || 0;


    let tarifDenda =
        Number(
            dataPinjaman.denda
        ) || 0;


    // ---------------------------------
    // JASA PERIODE
    // ---------------------------------

    let jasa =
        mesinHitungJasa(
            saldoPokok,
            tarifJasa
        );


    // ---------------------------------
    // STATUS JATUH TEMPO
    // ---------------------------------
    //
    // Bulan pembayaran:
    // BELUM jatuh tempo.
    //
    // Bulan sebelumnya:
    // SUDAH jatuh tempo.
    //
    // ---------------------------------

    let jatuhTempo =
        periode <
        bulanPembayaran;


    // ---------------------------------
    // DENDA
    // ---------------------------------
    //
    // Periode berjalan:
    // Rp0
    //
    // Periode lewat:
    // dihitung dari saldo pokok.
    //
    // ---------------------------------

    let denda = 0;


    if(jatuhTempo){

        denda =
            mesinHitungDenda(
                saldoPokok,
                tarifDenda
            );

    }


    // ---------------------------------
    // DATA PERIODE
    // ---------------------------------

    let data = {

        id:
            mesinNomorAngsuranBaru(),

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
            periode,

        saldoPokok:
            saldoPokok,

        tarifJasa:
            tarifJasa,

        tarifDenda:
            tarifDenda,

        jasa:
            jasa,

        denda:
            denda,

        pokok:
            0,

        jatuhTempo:
            jatuhTempo,

        status:
            "BELUM_LUNAS",

        jumlahBayar:
            0,

        tanggalBayar:
            ""

    };


    return data;

}


// =====================================
// NOMOR ANGSURAN
// =====================================

function mesinNomorAngsuranBaru(){

    let nomor = 1;


    if(
        !Array.isArray(
            riwayatAngsuran
        )
    ){

        return "AG000001";

    }


    riwayatAngsuran.forEach(
        function(item){

            if(
                !item ||
                !item.id
            ){

                return;

            }


            if(
                item.id
                    .toString()
                    .startsWith("AG")
            ){

                let angka =
                    Number(
                        item.id
                            .toString()
                            .replace(
                                "AG",
                                ""
                            )
                    );


                if(
                    !isNaN(angka) &&
                    angka >= nomor
                ){

                    nomor =
                        angka + 1;

                }

            }

        }
    );


    return (
        "AG" +
        String(nomor)
            .padStart(6,"0")
    );

}


// =====================================
// SIMULASI RUMUS
// =====================================
//
// Fungsi ini hanya untuk TEST.
//
// Tidak mengubah database.
//
// =====================================

function mesinSimulasiAngsuran(

    saldoPokok,
    tarifJasa,
    tarifDenda

){

    let jasa =
        mesinHitungJasa(
            saldoPokok,
            tarifJasa
        );


    let denda =
        mesinHitungDenda(
            saldoPokok,
            tarifDenda
        );


    let total =
        jasa +
        denda +
        jasa;


    console.log(
        "===== SIMULASI ANGSURAN BBCS ====="
    );


    console.log(
        "Saldo Pokok :",
        rupiah(saldoPokok)
    );


    console.log(
        "Jasa Wajib :",
        rupiah(jasa)
    );


    console.log(
        "Denda :",
        rupiah(denda)
    );


    console.log(
        "Jasa Berjalan :",
        rupiah(jasa)
    );


    console.log(
        "TOTAL :",
        rupiah(total)
    );


    return {

        saldoPokok:
            Number(saldoPokok) || 0,

        jasaWajib:
            jasa,

        dendaTunggakan:
            denda,

        jasaBerjalan:
            jasa,

        total:
            total

    };

}


// =====================================
// TEST OTOMATIS
// =====================================

console.log(
    "Mesin Angsuran BBCS V18 siap"
);