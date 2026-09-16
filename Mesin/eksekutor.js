// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN EKSEKUTOR BBCS
// FILE : Mesin/eksekutor.js
// VERSI : TERINTEGRASI MESIN V18
// =====================================

console.log(
    "Mesin Eksekutor BBCS mulai"
);


// =====================================
// EKSEKUTOR PEMBAYARAN
// =====================================

function eksekutorPembayaran(
    idPinjaman,
    bulanPembayaran,
    pokokDibayar
){

    // =================================
    // CARI PINJAMAN
    // =================================

    let dataPinjaman =
        pinjaman.find(
            function(item){

                return (
                    item &&
                    item.id == idPinjaman
                );

            }
        );


    if(!dataPinjaman){

        return {

            berhasil: false,

            pesan:
                "Pinjaman tidak ditemukan"

        };

    }


    // =================================
    // SALDO AWAL
    // =================================

    let saldoAwal =
        Number(
            dataPinjaman.sisaPokok
        ) || 0;

// =================================
// VALIDASI PERIODE PERTAMA
// =================================
//
// Pinjaman tidak boleh dieksekusi
// sebelum periode angsuran pertama.
//
// Contoh:
// Pinjaman      : 2026-08
// Periode pertama: 2026-09
//
// Pembayaran 2026-08 = DITOLAK
// Pembayaran 2026-09 = BOLEH
//
// =================================

bulanPembayaran =
    typeof siklusNormalisasiPeriode ===
    "function"
        ? siklusNormalisasiPeriode(
            bulanPembayaran
        )
        : String(
            bulanPembayaran || ""
        ).substring(0,7);


let periodePertama =
    typeof periodeCariPertama ===
    "function"
        ? periodeCariPertama(
            dataPinjaman
        )
        : dataPinjaman.periodePertama || "";


periodePertama =
    typeof siklusNormalisasiPeriode ===
    "function"
        ? siklusNormalisasiPeriode(
            periodePertama
        )
        : String(
            periodePertama || ""
        ).substring(0,7);


if(
    periodePertama &&
    bulanPembayaran &&
    bulanPembayaran < periodePertama
){

    console.warn(
        "PEMBAYARAN DITOLAK - BELUM MASUK PERIODE",
        {
            idPinjaman:
                idPinjaman,

            bulanPembayaran:
                bulanPembayaran,

            periodePertama:
                periodePertama
        }
    );

    return {

        berhasil: false,

        pesan:
            "Belum masuk periode angsuran pertama",

        idPinjaman:
            idPinjaman,

        bulanPembayaran:
            bulanPembayaran,

        periodePertama:
            periodePertama

    };

}


    // =================================
    // VALIDASI POKOK
    // =================================

    pokokDibayar =
        Number(
            pokokDibayar
        ) || 0;


    if(
        pokokDibayar < 0
    ){

        return {

            berhasil: false,

            pesan:
                "Pokok pembayaran tidak valid"

        };

    }


    if(
        pokokDibayar >
        saldoAwal
    ){

        return {

            berhasil: false,

            pesan:
                "Pokok dibayar melebihi sisa pokok"

        };

    }


    // =================================
    // CEK MESIN KEWAJIBAN
    // =================================

    if(
        typeof mesinTotalKewajiban !==
        "function"
    ){

        console.error(
            "mesinTotalKewajiban() tidak ditemukan"
        );

        return {

            berhasil: false,

            pesan:
                "Mesin kewajiban belum aktif"

        };

    }


    // =================================
    // HITUNG KEWAJIBAN
    // =================================

    let data =
        mesinTotalKewajiban(
    dataPinjaman,
    bulanPembayaran,
    pokokDibayar
    );


    if(!data){

        return {

            berhasil: false,

            pesan:
                "Kewajiban pembayaran tidak tersedia"

        };

    }


    // =================================
    // NILAI KEWAJIBAN
    // =================================

    let jasaWajib =
        Number(
            data.jasaWajib
        ) || 0;


    let denda =
        Number(
            data.dendaTunggakan
        ) || 0;


    let jasaBerjalan =
        Number(
            data.jasaBerjalan
        ) || 0;


    let totalBayar =
        Number(
            data.total
        ) || 0;


    // =================================
    // PERIODE SELESAI
    // =================================
    //
    // Jangan lagi membentuk periode selesai
    // dari gabungan kewajiban secara manual.
    //
    // Mesin Kewajiban adalah sumber keputusan.
    //
    // =================================

    let periodeSelesai =
        Array.isArray(
            data.periodeSelesai
        )
            ? data.periodeSelesai
            : [];
            
            
    // =================================
    // HAPUS DUPLIKAT PERIODE
    // =================================

    periodeSelesai =
        [
            ...new Set(
                periodeSelesai
            )
        ];

    periodeSelesai =
        [
            ...new Set(
                periodeSelesai
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
        

    console.log(
        "Periode dari kewajiban:",
        periodeSelesai
    );


    // =================================
    // CEK PERIODE SUDAH LUNAS
    // =================================

    let daftarPeriodeSudahLunas = [];


    periodeSelesai.forEach(
        function(periode){

            if(
                typeof periodeSudahLunas ===
                "function"
            ){

                if(
                    periodeSudahLunas(
                        idPinjaman,
                        periode
                    )
                ){

                    daftarPeriodeSudahLunas.push(
                        periode
                    );

                }

            }

        }
    );


    console.log(
        "Periode sudah lunas:",
        daftarPeriodeSudahLunas
    );


    // =================================
    // FILTER PERIODE BARU
    // =================================

    let periodeBaruLunas =
        periodeSelesai.filter(
            function(periode){

                return (
                    !daftarPeriodeSudahLunas
                        .includes(periode)
                );

            }
        );


    console.log(
        "Periode baru yang diproses:",
        periodeBaruLunas
    );


    // =================================
    // JIKA SUDAH PERNAH DIPROSES
    // =================================

    if(
        periodeBaruLunas.length === 0
    ){

        return {

            berhasil: false,

            pesan:
                "Tidak ada periode baru yang dapat diproses"

        };

    }


    // =================================
    // HITUNG SALDO AKHIR
    // =================================

    let saldoAkhir =
        saldoAwal -
        pokokDibayar;


    if(
        saldoAkhir < 0
    ){

        saldoAkhir = 0;

    }


    // =================================
    // UPDATE SISA POKOK
    // =================================

    dataPinjaman.sisaPokok =
        saldoAkhir;


    // =================================
    // SIAPKAN PERIODE LUNAS
    // =================================

    if(
        !Array.isArray(
            dataPinjaman.periodeLunas
        )
    ){

        dataPinjaman.periodeLunas =
            [];

    }


    // =================================
    // TAMBAHKAN PERIODE BARU
    // =================================

    periodeBaruLunas.forEach(
        function(periode){

            if(
                !dataPinjaman
                    .periodeLunas
                    .includes(periode)
            ){

                dataPinjaman
                    .periodeLunas
                    .push(periode);

            }

        }
    );


    // =================================
    // STATUS PINJAMAN
    // =================================

    if(
        saldoAkhir <= 0
    ){

        dataPinjaman.status =
            "Lunas";

    }
    else{

        dataPinjaman.status =
            "Aktif";

    }


    // =================================
    // RIWAYAT ANGSURAN
    // =================================

    let riwayat = {

        idPinjaman:
            idPinjaman,

        idAnggota:
            dataPinjaman.idAnggota ||
            dataPinjaman.anggota ||
            "",

        namaAnggota:
            dataPinjaman.namaAnggota ||
            dataPinjaman.nama ||
            "",

        tanggal:
            typeof tanggalBBCSIndonesia ===
            "function"

            ?

            tanggalBBCSIndonesia()

            :

            new Date()
                .toLocaleDateString(
                    "id-ID"
                ),

        periode:
            bulanPembayaran,

        pokok:
            pokokDibayar,

        jasaWajib:
            jasaWajib,

        denda:
            denda,

        jasaBerjalan:
            jasaBerjalan,

        total:
            totalBayar,

        saldoSebelum:
            saldoAwal,

        saldoSesudah:
            saldoAkhir,

        periodeSelesai:
            periodeBaruLunas,

        status:
    saldoAkhir <= 0
        ? "LUNAS"
        : "AKTIF"
        
    };


    // =================================
    // SIMPAN RIWAYAT
    // =================================

    if(
        Array.isArray(
            riwayatAngsuran
        )
    ){

        riwayatAngsuran.push(
            riwayat
        );

    }


    // =================================
    // TRANSAKSI + KAS
    // =================================

    if(
        typeof catatTransaksiKas ===
        "function"
    ){

        catatTransaksiKas(

            "Pemasukan",

            "Angsuran",

            "Pembayaran Angsuran " +
            idPinjaman,

            totalBayar,

            dataPinjaman.idAnggota ||
            dataPinjaman.anggota ||
            "",

            dataPinjaman.namaAnggota ||
            dataPinjaman.nama ||
            "",

            "ANG-" +
            idPinjaman +
            "-" +
            bulanPembayaran

        );

    }


    // =================================
    // SIMPAN DATABASE
    // =================================

    if(
        typeof simpanDatabase ===
        "function"
    ){

        simpanDatabaseAman();

    }


    // =================================
    // HASIL
    // =================================

    let hasil = {

        berhasil:
            true,

        idPinjaman:
            idPinjaman,

        bulanPembayaran:
            bulanPembayaran,

        saldoAwal:
            saldoAwal,

        pokokDibayar:
            pokokDibayar,

        jasaWajib:
            jasaWajib,

        denda:
            denda,

        jasaBerjalan:
            jasaBerjalan,

        totalBayar:
            totalBayar,

        saldoAkhir:
            saldoAkhir,

        periodeSelesai:
            periodeBaruLunas,

        status:
            dataPinjaman.status

    };


    // =================================
    // TAMPIL HASIL
    // =================================

    console.log(
        "===== EKSEKUSI PEMBAYARAN ====="
    );


    console.log(
        "Saldo Awal :",
        rupiah(saldoAwal)
    );


    console.log(
        "Pokok Dibayar :",
        rupiah(pokokDibayar)
    );


    console.log(
        "Jasa Wajib :",
        rupiah(jasaWajib)
    );


    console.log(
        "Denda :",
        rupiah(denda)
    );


    console.log(
        "Jasa Berjalan :",
        rupiah(jasaBerjalan)
    );


    console.log(
        "TOTAL BAYAR :",
        rupiah(totalBayar)
    );


    console.log(
        "Saldo Akhir :",
        rupiah(saldoAkhir)
    );


    console.log(
        "Periode Selesai :",
        periodeBaruLunas
    );


    console.log(
        "Status :",
        dataPinjaman.status
    );


    return hasil;

}


// =====================================
// ALIAS
// =====================================

function eksekutor(){

    return eksekutorPembayaran.apply(
        null,
        arguments
    );

}


// =====================================
// SIMULASI EKSEKUTOR
// =====================================

function simulasiEksekutor(){

    console.log(
        "===== SIMULASI EKSEKUTOR ====="
    );


    let saldoAwal = 4000;

    let pokokDibayar = 1000;

    let jasaWajib = 200;

    let denda = 80;

    let jasaBerjalan = 200;

    let totalBayar =
        pokokDibayar +
        jasaWajib +
        denda +
        jasaBerjalan;

    let saldoAkhir =
        saldoAwal -
        pokokDibayar;


    console.log(
        "Saldo Awal :",
        rupiah(saldoAwal)
    );

    console.log(
        "Pokok Dibayar :",
        rupiah(pokokDibayar)
    );

    console.log(
        "Jasa Wajib :",
        rupiah(jasaWajib)
    );

    console.log(
        "Denda :",
        rupiah(denda)
    );

    console.log(
        "Jasa Berjalan :",
        rupiah(jasaBerjalan)
    );

    console.log(
        "TOTAL BAYAR :",
        rupiah(totalBayar)
    );

    console.log(
        "Saldo Akhir :",
        rupiah(saldoAkhir)
    );


    return {

        saldoAwal:
            saldoAwal,

        pokokDibayar:
            pokokDibayar,

        jasaWajib:
            jasaWajib,

        denda:
            denda,

        jasaBerjalan:
            jasaBerjalan,

        totalBayar:
            totalBayar,

        saldoAkhir:
            saldoAkhir

    };

}


// =====================================
// STATUS MESIN
// =====================================

console.log(
    "Mesin Eksekutor BBCS siap"
);
