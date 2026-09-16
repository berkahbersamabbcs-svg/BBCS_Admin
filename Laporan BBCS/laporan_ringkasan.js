// =====================================
// BERKAH BERSAMA CORE SYSTEM
// LAPORAN RINGKASAN BBCS
// V3.0 - AUDIT & SINKRONISASI
// =====================================

console.log("Laporan Ringkasan BBCS mulai");


// =====================================
// NILAI AMAN
// =====================================

function nilaiRingkasan(nilai){

    if(
        nilai === null ||
        nilai === undefined ||
        nilai === ""
    ){

        return 0;

    }

    if(typeof nilai === "string"){

        nilai =
            nilai
                .replace(/\./g, "")
                .replace(/,/g, ".");

    }

    let angka =
        Number(nilai);

    return Number.isFinite(angka)
        ? angka
        : 0;

}


// =====================================
// AMBIL JASA RIWAYAT
//
// Prioritas:
// 1. totalJasa
// 2. jasaBerjalan + jasaWajib
// 3. jasaBerjalan + jasaTertunggak
// 4. jasa
// =====================================

function ambilJasaRingkasan(a){

    if(!a){

        return 0;

    }


    // -----------------------------
    // TOTAL JASA
    // -----------------------------

    if(
        a.totalJasa !== undefined &&
        a.totalJasa !== null
    ){

        return nilaiRingkasan(
            a.totalJasa
        );

    }


    // -----------------------------
    // JASA BERJALAN
    // -----------------------------

    let jasaBerjalan =
        nilaiRingkasan(
            a.jasaBerjalan
        );


    // -----------------------------
    // JASA WAJIB
    // -----------------------------

    let jasaWajib =
        nilaiRingkasan(
            a.jasaWajib
        );


    // -----------------------------
    // KOMPATIBILITAS DATA LAMA
    // -----------------------------

    if(
        jasaWajib === 0 &&
        a.jasaWajib === undefined
    ){

        jasaWajib =
            nilaiRingkasan(
                a.jasaTertunggak
            );

    }


    // -----------------------------
    // STRUKTUR BARU
    // -----------------------------

    if(
        jasaBerjalan !== 0 ||
        jasaWajib !== 0
    ){

        return (
            jasaBerjalan +
            jasaWajib
        );

    }


    // -----------------------------
    // DATA LAMA
    // -----------------------------

    return nilaiRingkasan(
        a.jasa
    );

}


// =====================================
// TAMPIL LAPORAN RINGKASAN
// =====================================

function tampilLaporanRingkasan(){

    console.log(
        "Laporan Ringkasan BBCS dimulai"
    );


    // =================================
    // ANGGOTA
    // =================================

    let jumlahAnggota =
        Array.isArray(anggota)
        ? anggota.length
        : 0;


    // =================================
    // SIMPANAN
    // =================================

    let simpananPokok = 0;
    let simpananWajib = 0;
    let simpananSukarela = 0;


    if(Array.isArray(rekening)){

        rekening.forEach(function(r){

            simpananPokok +=
                nilaiRingkasan(
                    r.simpananPokok
                );


            simpananWajib +=
                nilaiRingkasan(
                    r.simpananWajib
                );


            simpananSukarela +=
                nilaiRingkasan(
                    r.simpananSukarela
                );

        });

    }


    let totalSimpanan =
        simpananPokok +
        simpananWajib +
        simpananSukarela;


    // =================================
    // PINJAMAN
    // =================================

    let totalPinjaman = 0;

    let jumlahPinjamanAktif = 0;

    let jumlahPinjamanLunas = 0;

    let totalSisaPinjaman = 0;


    if(Array.isArray(pinjaman)){

        pinjaman.forEach(function(p){

            let jumlah =
                nilaiRingkasan(
                    p.jumlah
                );


            let sisa =
                nilaiRingkasan(
                    p.sisaPokok
                );


            totalPinjaman +=
                jumlah;


            totalSisaPinjaman +=
                sisa;


            if(
                String(p.status)
                    .toLowerCase() ===
                "aktif"
            ){

                jumlahPinjamanAktif++;

            }


            if(
                String(p.status)
                    .toLowerCase() ===
                "lunas"
            ){

                jumlahPinjamanLunas++;

            }

        });

    }


    // =================================
    // POKOK TERBAYAR BERDASARKAN
    // DATA PINJAMAN
    //
    // Ini digunakan sebagai audit.
    // Tidak mengubah database.
    // =================================

    let pokokTerbayarPinjaman =
        totalPinjaman -
        totalSisaPinjaman;


    if(
        pokokTerbayarPinjaman < 0
    ){

        pokokTerbayarPinjaman = 0;

    }


    // =================================
    // ANGSURAN
    // =================================

    let totalPokokDibayar = 0;

    let totalJasa = 0;

    let totalDenda = 0;

    let totalAngsuran = 0;

    let jumlahPembayaran = 0;


    if(
        Array.isArray(
            riwayatAngsuran
        )
    ){

        riwayatAngsuran.forEach(
            function(a){

                totalPokokDibayar +=
                    nilaiRingkasan(
                        a.pokok
                    );


                totalJasa +=
                    ambilJasaRingkasan(
                        a
                    );


                totalDenda +=
                    nilaiRingkasan(
                        a.denda
                    );


                totalAngsuran +=
                    nilaiRingkasan(
                        a.total
                    );


                jumlahPembayaran++;

            }
        );

    }


    // =================================
    // AUDIT SELISIH POKOK
    // =================================

    let selisihPokok =
        pokokTerbayarPinjaman -
        totalPokokDibayar;


    // Hindari -0
    if(
        Math.abs(selisihPokok) < 0.000001
    ){

        selisihPokok = 0;

    }


    // =================================
    // KAS
    // =================================

    let pemasukanKas = 0;

    let pengeluaranKas = 0;


    if(Array.isArray(kas)){

        kas.forEach(function(k){

            let jumlah =
                nilaiRingkasan(
                    k.jumlah
                );


            let jenis =
                String(
                    k.jenis || ""
                ).toLowerCase();


            if(
                jenis === "pemasukan"
            ){

                pemasukanKas +=
                    jumlah;

            }


            if(
                jenis === "pengeluaran"
            ){

                pengeluaranKas +=
                    jumlah;

            }

        });

    }


    let saldoKas =
        pemasukanKas -
        pengeluaranKas;


    // =================================
    // TARGET HTML
    // =================================

    let tempat =
        document.getElementById(
            "laporanData"
        );


    if(!tempat){

        console.warn(
            "Element laporanData tidak ditemukan"
        );

        return;

    }


    // =================================
    // TAMPIL RINGKASAN
    // =================================

    tempat.innerHTML = `

        <div class="info">

            <h3>
                📊 RINGKASAN BBCS
            </h3>

            <hr>


            <!-- =========================
                 ANGGOTA
            ========================== -->

            <h4>
                👥 ANGGOTA
            </h4>

            Jumlah Anggota :
            <b>
                ${jumlahAnggota}
            </b>


            <!-- =========================
                 SIMPANAN
            ========================== -->

            <h4>
                💰 SIMPANAN
            </h4>

            Simpanan Pokok :
            <b>
                ${rupiah(simpananPokok)}
            </b>

            <br>

            Simpanan Wajib :
            <b>
                ${rupiah(simpananWajib)}
            </b>

            <br>

            Simpanan Sukarela :
            <b>
                ${rupiah(simpananSukarela)}
            </b>

            <br>

            Total Simpanan :
            <b>
                ${rupiah(totalSimpanan)}
            </b>


            <!-- =========================
                 PINJAMAN
            ========================== -->

            <h4>
                💳 PINJAMAN
            </h4>

            Total Pinjaman :
            <b>
                ${rupiah(totalPinjaman)}
            </b>

            <br>

            Pinjaman Aktif :
            <b>
                ${jumlahPinjamanAktif}
            </b>

            <br>

            Pinjaman Lunas :
            <b>
                ${jumlahPinjamanLunas}
            </b>

            <br>

            Sisa Pinjaman :
            <b>
                ${rupiah(totalSisaPinjaman)}
            </b>


            <!-- =========================
                 ANGSURAN
            ========================== -->

            <h4>
                🧾 ANGSURAN
            </h4>

            Jumlah Pembayaran :
            <b>
                ${jumlahPembayaran}
            </b>

            <br>

            Pokok Dibayar :
            <b>
                ${rupiah(totalPokokDibayar)}
            </b>

            <br>

            Jasa :
            <b>
                ${rupiah(totalJasa)}
            </b>

            <br>

            Denda :
            <b>
                ${rupiah(totalDenda)}
            </b>

            <br>

            Total Angsuran :
            <b>
                ${rupiah(totalAngsuran)}
            </b>


            <!-- =========================
                 AUDIT POKOK
            ========================== -->

            <h4>
                🔎 AUDIT POKOK
            </h4>

            Pokok Terbayar dari Pinjaman :
            <b>
                ${rupiah(pokokTerbayarPinjaman)}
            </b>

            <br>

            Pokok dari Riwayat Angsuran :
            <b>
                ${rupiah(totalPokokDibayar)}
            </b>

            <br>

            Selisih Pokok :
            <b>
                ${rupiah(selisihPokok)}
            </b>


            <!-- =========================
                 KAS
            ========================== -->

            <h4>
                🏦 KAS
            </h4>

            Pemasukan Kas :
            <b>
                ${rupiah(pemasukanKas)}
            </b>

            <br>

            Pengeluaran Kas :
            <b>
                ${rupiah(pengeluaranKas)}
            </b>

            <br>

            Saldo Kas :
            <b>
                ${rupiah(saldoKas)}
            </b>

        </div>

    `;


    // =================================
    // LOG AUDIT
    // =================================

    console.log(
        "AUDIT BBCS:",
        {
            totalPinjaman:
                totalPinjaman,

            totalSisaPinjaman:
                totalSisaPinjaman,

            pokokTerbayarPinjaman:
                pokokTerbayarPinjaman,

            pokokRiwayat:
                totalPokokDibayar,

            selisihPokok:
                selisihPokok,

            totalJasa:
                totalJasa,

            totalDenda:
                totalDenda,

            totalAngsuran:
                totalAngsuran,

            pemasukanKas:
                pemasukanKas,

            pengeluaranKas:
                pengeluaranKas,

            saldoKas:
                saldoKas
        }
    );


    console.log(
        "Laporan Ringkasan BBCS selesai"
    );

}


// =====================================
// SELESAI
// =====================================

console.log(
    "Laporan Ringkasan BBCS siap"
);