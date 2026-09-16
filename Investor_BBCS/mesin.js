// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN INVESTOR BBCS
// V2.3
// BAGIAN 1
// DATABASE & HELPER
// =====================================

"use strict";

console.log("====================================");
console.log("MESIN INVESTOR BBCS V2.3 MEMUAT...");
console.log("====================================");


// =====================================
// VERSI MESIN
// =====================================

const MESIN_INVESTOR_BBCS_VERSION =
    "V2.3";


// =====================================
// DATABASE INVESTOR
// SATU-SATUNYA DEKLARASI
// =====================================

let investor = [];

let rekeningInvestor = [];

let riwayatInvestor = [];


// =====================================
// HELPER ANGKA
// =====================================

function angkaInvestorBBCS(nilai) {

    if (
        typeof nilai ===
        "number"
    ) {

        return Number.isFinite(nilai)
            ? nilai
            : 0;

    }


    if (
        nilai === null ||
        nilai === undefined
    ) {

        return 0;

    }


    if (
        typeof angkaNilai ===
        "function"
    ) {

        return Number(
            angkaNilai(nilai)
        ) || 0;

    }


    return Number(
        String(nilai)
            .replace(/\./g, "")
            .replace(/[^\d-]/g, "")
    ) || 0;

}


// =====================================
// HELPER RUPIAH
// =====================================

function rupiahInvestorBBCS(nilai) {

    const angka =
        angkaInvestorBBCS(
            nilai
        );


    if (
        typeof rupiah ===
        "function"
    ) {

        return rupiah(
            angka
        );

    }


    return (
        "Rp " +
        angka.toLocaleString(
            "id-ID"
        )
    );

}


// =====================================
// HELPER TANGGAL
// =====================================

function tanggalInvestorBBCS() {

    if (
        typeof tanggalBBCS ===
        "function"
    ) {

        return tanggalBBCS();

    }


    return new Date()
        .toLocaleDateString(
            "id-ID"
        );

}


// =====================================
// HELPER PERIODE
// FORMAT: YYYY-MM
// =====================================

function periodeInvestorBBCS(
    tanggal
) {

    const tanggalPakai =
        tanggal || new Date();


    const d =
        new Date(
            tanggalPakai
        );


    if (
        Number.isNaN(
            d.getTime()
        )
    ) {

        const sekarang =
            new Date();


        return (
            sekarang.getFullYear() +
            "-" +
            String(
                sekarang.getMonth() + 1
            ).padStart(2, "0")
        );

    }


    return (
        d.getFullYear() +
        "-" +
        String(
            d.getMonth() + 1
        ).padStart(2, "0")
    );

}


// =====================================
// LOAD DATABASE INVESTOR
// =====================================

function ambilDatabaseInvestor() {

    try {

        const dataInvestor =
            localStorage.getItem(
                "investor"
            );


        const dataRekening =
            localStorage.getItem(
                "rekeningInvestor"
            );


        const dataRiwayat =
            localStorage.getItem(
                "riwayatInvestor"
            );


        investor =
            dataInvestor
                ? JSON.parse(
                    dataInvestor
                )
                : [];


        rekeningInvestor =
            dataRekening
                ? JSON.parse(
                    dataRekening
                )
                : [];


        riwayatInvestor =
            dataRiwayat
                ? JSON.parse(
                    dataRiwayat
                )
                : [];


        if (
            !Array.isArray(
                investor
            )
        ) {

            investor = [];

        }


        if (
            !Array.isArray(
                rekeningInvestor
            )
        ) {

            rekeningInvestor = [];

        }


        if (
            !Array.isArray(
                riwayatInvestor
            )
        ) {

            riwayatInvestor = [];

        }


        console.log(
            "Database Investor berhasil dimuat.",
            {
                investor:
                    investor.length,

                rekening:
                    rekeningInvestor.length,

                riwayat:
                    riwayatInvestor.length
            }
        );

    }
    catch(error) {

        console.error(
            "Gagal memuat Database Investor:",
            error
        );


        investor = [];

        rekeningInvestor = [];

        riwayatInvestor = [];

    }

}


// =====================================
// SIMPAN DATABASE INVESTOR
// =====================================

function simpanDatabaseInvestor() {

    try {

        localStorage.setItem(
            "investor",
            JSON.stringify(
                investor
            )
        );


        localStorage.setItem(
            "rekeningInvestor",
            JSON.stringify(
                rekeningInvestor
            )
        );


        localStorage.setItem(
            "riwayatInvestor",
            JSON.stringify(
                riwayatInvestor
            )
        );


        console.log(
            "Database Investor BBCS tersimpan."
        );


        return true;

    }
    catch(error) {

        console.error(
            "Gagal menyimpan Database Investor:",
            error
        );


        return false;

    }

}
// =====================================
// MESIN INVESTOR BBCS V2.3
// BAGIAN 2
// ID, PENCARIAN & REKENING
// =====================================


// =====================================
// NOMOR INVESTOR BARU
// =====================================

function nomorInvestorBaru() {

    let nomor = 1;


    investor.forEach(
        function(item) {

            if (
                !item ||
                !item.id
            ) {

                return;

            }


            const angka =
                parseInt(
                    String(item.id)
                        .replace(
                            /^INV/i,
                            ""
                        ),
                    10
                ) || 0;


            if (
                angka >= nomor
            ) {

                nomor =
                    angka + 1;

            }

        }
    );


    return (
        "INV" +
        String(nomor)
            .padStart(4, "0")
    );

}


// =====================================
// NOMOR REKENING INVESTOR BARU
// =====================================

function nomorRekeningInvestorBaru() {

    let nomor = 1;


    rekeningInvestor.forEach(
        function(item) {

            if (
                !item ||
                !item.id
            ) {

                return;

            }


            const angka =
                parseInt(
                    String(item.id)
                        .replace(
                            /^RINV/i,
                            ""
                        ),
                    10
                ) || 0;


            if (
                angka >= nomor
            ) {

                nomor =
                    angka + 1;

            }

        }
    );


    return (
        "RINV" +
        String(nomor)
            .padStart(4, "0")
    );

}


// =====================================
// NOMOR RIWAYAT INVESTOR BARU
// =====================================

function nomorRiwayatInvestorBaru() {

    let nomor = 1;


    riwayatInvestor.forEach(
        function(item) {

            if (
                !item ||
                !item.id
            ) {

                return;

            }


            const angka =
                parseInt(
                    String(item.id)
                        .replace(
                            /^RINVTR/i,
                            ""
                        ),
                    10
                ) || 0;


            if (
                angka >= nomor
            ) {

                nomor =
                    angka + 1;

            }

        }
    );


    return (
        "RINVTR" +
        String(nomor)
            .padStart(5, "0")
    );

}


// =====================================
// CARI INVESTOR
// =====================================

function cariInvestor(
    idInvestor
) {

    return (
        investor.find(
            function(item) {

                return (
                    item &&
                    String(item.id) ===
                    String(idInvestor)
                );

            }
        ) || null
    );

}


// =====================================
// CARI REKENING INVESTOR
// =====================================

function cariRekeningInvestor(
    idInvestor
) {

    return (
        rekeningInvestor.find(
            function(item) {

                return (
                    item &&
                    String(
                        item.idInvestor
                    ) ===
                    String(idInvestor)
                );

            }
        ) || null
    );

}


// =====================================
// BUAT REKENING INVESTOR
// =====================================

function buatRekeningInvestor(
    dataInvestor
) {

    if (!dataInvestor) {

        return null;

    }


    const rekeningLama =
        cariRekeningInvestor(
            dataInvestor.id
        );


    if (rekeningLama) {

        return rekeningLama;

    }


    const rekening = {

        id:
            nomorRekeningInvestorBaru(),

        idInvestor:
            dataInvestor.id,

        namaInvestor:
            dataInvestor.nama,

        modal:
            0,

        saldoModal:
            0,

        jasaTersedia:
            0,

        totalJasa:
            0,

        saldo:
            0,

        tanggal:
            dataInvestor.tanggal ||
            tanggalInvestorBBCS(),

        tanggalSetorTerakhir:
            null,

        tanggalJasaTerakhir:
            null,

        periodeJasaTerakhir:
            null,

        jasaAktif:
            true,

        statusJasa:
            "Aktif",

        status:
            "Aktif"

    };


    rekeningInvestor.push(
        rekening
    );


    return rekening;

}


// =====================================
// SINKRON NAMA REKENING
// =====================================

function sinkronNamaInvestorRekening() {

    rekeningInvestor.forEach(
        function(rekening) {

            if (!rekening) {

                return;

            }


            const dataInvestor =
                cariInvestor(
                    rekening.idInvestor
                );


            if (!dataInvestor) {

                return;

            }


            rekening.namaInvestor =
                dataInvestor.nama;

        }
    );

}
// =====================================
// MESIN INVESTOR BBCS V2.3
// BAGIAN 3
// VALIDASI & INISIALISASI
// =====================================


// =====================================
// VALIDASI DATABASE INVESTOR
// =====================================

function validasiDatabaseInvestor() {

    // =================================
    // PASTIKAN DATABASE BERUPA ARRAY
    // =================================

    if (
        !Array.isArray(investor)
    ) {

        investor = [];

    }


    if (
        !Array.isArray(
            rekeningInvestor
        )
    ) {

        rekeningInvestor = [];

    }


    if (
        !Array.isArray(
            riwayatInvestor
        )
    ) {

        riwayatInvestor = [];

    }


    // =================================
    // VALIDASI DATA INVESTOR
    // =================================

    investor.forEach(
        function(dataInvestor) {

            if (!dataInvestor) {

                return;

            }


            if (
                !dataInvestor.id
            ) {

                dataInvestor.id =
                    nomorInvestorBaru();

            }


            if (
                !dataInvestor.status
            ) {

                dataInvestor.status =
                    "Aktif";

            }


            if (
                dataInvestor.jasa ===
                undefined ||
                dataInvestor.jasa ===
                null
            ) {

                dataInvestor.jasa =
                    0;

            }


            dataInvestor.jasa =
                Number(
                    dataInvestor.jasa
                ) || 0;

        }
    );


    // =================================
    // VALIDASI REKENING INVESTOR
    // =================================

    rekeningInvestor.forEach(
        function(rekening) {

            if (!rekening) {

                return;

            }


            rekening.modal =
                angkaInvestorBBCS(
                    rekening.modal
                );


            rekening.saldoModal =
                angkaInvestorBBCS(
                    rekening.saldoModal
                );


            rekening.jasaTersedia =
                angkaInvestorBBCS(
                    rekening.jasaTersedia
                );


            rekening.totalJasa =
                angkaInvestorBBCS(
                    rekening.totalJasa
                );


            rekening.saldo =
                angkaInvestorBBCS(
                    rekening.saldo
                );


            if (
                !rekening.status
            ) {

                rekening.status =
                    "Aktif";

            }


            if (
                !rekening.statusJasa
            ) {

                rekening.statusJasa =
                    "Aktif";

            }


            if (
                rekening.jasaAktif ===
                undefined
            ) {

                rekening.jasaAktif =
                    true;

            }


            if (
                rekening.tanggalJasaTerakhir ===
                undefined
            ) {

                rekening.tanggalJasaTerakhir =
                    null;

            }


            if (
                rekening.periodeJasaTerakhir ===
                undefined
            ) {

                rekening.periodeJasaTerakhir =
                    null;

            }

        }
    );


    // =================================
    // SINKRON NAMA
    // =================================

    sinkronNamaInvestorRekening();

}


// =====================================
// PASTIKAN SEMUA INVESTOR
// MEMILIKI REKENING
// =====================================

function pastikanSemuaInvestorPunyaRekening() {

    investor.forEach(
        function(dataInvestor) {

            if (!dataInvestor) {

                return;

            }


            const rekening =
                cariRekeningInvestor(
                    dataInvestor.id
                );


            if (!rekening) {

                buatRekeningInvestor(
                    dataInvestor
                );

            }

        }
    );

}


// =====================================
// INISIALISASI MESIN INVESTOR
// =====================================

function inisialisasiMesinInvestor() {

    // =================================
    // LOAD
    // =================================

    ambilDatabaseInvestor();


    // =================================
    // VALIDASI
    // =================================

    validasiDatabaseInvestor();


    // =================================
    // PASTIKAN REKENING
    // =================================

    pastikanSemuaInvestorPunyaRekening();


    // =================================
    // SINKRON ULANG
    // =================================

    sinkronNamaInvestorRekening();


    // =================================
    // SIMPAN
    // =================================

    simpanDatabaseInvestor();


    // =================================
    // LOG
    // =================================

    console.log(
        "===================================="
    );


    console.log(
        "MESIN INVESTOR BBCS V2.3 SIAP"
    );


    console.log(
        "Investor :",
        investor.length
    );


    console.log(
        "Rekening :",
        rekeningInvestor.length
    );


    console.log(
        "Riwayat :",
        riwayatInvestor.length
    );


    console.log(
        "===================================="
    );

}


// =====================================
// JALANKAN MESIN
// =====================================

inisialisasiMesinInvestor();
// =====================================
// MESIN INVESTOR BBCS V2.3
// BAGIAN 4
// DATA INVESTOR & TAMBAH MODAL
// =====================================


// =====================================
// SIMPAN DATA INVESTOR
// =====================================

function simpanInvestorBBCS(
    nama,
    jasa
) {

    const namaInvestor =
        String(
            nama || ""
        ).trim();


    const jasaInvestor =
        Number(jasa) || 0;


    // =================================
    // VALIDASI NAMA
    // =================================

    if (!namaInvestor) {

        alert(
            "Nama investor wajib diisi."
        );

        return false;

    }


    // =================================
    // VALIDASI JASA
    // =================================

    if (
        jasaInvestor < 0
    ) {

        alert(
            "Jasa investor tidak boleh negatif."
        );

        return false;

    }


    // =================================
    // CEK NAMA GANDA
    // =================================

    const sudahAda =
        investor.some(
            function(item) {

                return (
                    item &&
                    String(
                        item.nama || ""
                    ).trim().toLowerCase() ===
                    namaInvestor.toLowerCase()
                );

            }
        );


    if (sudahAda) {

        alert(
            "Investor dengan nama tersebut sudah terdaftar."
        );

        return false;

    }


    // =================================
    // DATA INVESTOR
    // =================================

    const dataInvestor = {

        id:
            nomorInvestorBaru(),

        nama:
            namaInvestor,

        jasa:
            jasaInvestor,

        tanggal:
            tanggalInvestorBBCS(),

        status:
            "Aktif"

    };


    investor.push(
        dataInvestor
    );


    // =================================
    // BUAT REKENING
    // =================================

    const rekening =
        buatRekeningInvestor(
            dataInvestor
        );


    if (!rekening) {

        investor.pop();

        alert(
            "Gagal membuat rekening investor."
        );

        return false;

    }


    // =================================
    // SIMPAN DATABASE
    // =================================

    const tersimpan =
        simpanDatabaseInvestor();


    if (!tersimpan) {

        investor.pop();

        const indexRekening =
            rekeningInvestor.indexOf(
                rekening
            );

        if (
            indexRekening >= 0
        ) {

            rekeningInvestor.splice(
                indexRekening,
                1
            );

        }

        return false;

    }


    // =================================
    // LOG
    // =================================

    console.log(
        "Investor berhasil ditambahkan.",
        dataInvestor
    );


    alert(
        "Investor berhasil disimpan.\n\n" +
        "ID Investor : " +
        dataInvestor.id +
        "\n" +
        "Nama : " +
        dataInvestor.nama +
        "\n" +
        "Jasa : " +
        dataInvestor.jasa +
        "% / bulan"
    );


    return true;

}


function setorModalInvestor(
    idInvestor,
    jumlah
) {

    const dataInvestor =
        cariInvestor(
            idInvestor
        );

    const rekening =
        cariRekeningInvestor(
            idInvestor
        );


    // =================================
    // VALIDASI DATA
    // =================================

    if (
        !dataInvestor ||
        !rekening
    ) {

        alert(
            "Data investor atau rekening tidak ditemukan."
        );

        return false;

    }


    // =================================
    // CEK STATUS
    // =================================

    if (
        rekening.status !==
        "Aktif"
    ) {

        alert(
            "Rekening investor tidak aktif."
        );

        return false;

    }


    // =================================
    // VALIDASI JUMLAH
    // =================================

    const nominal =
        angkaInvestorBBCS(
            jumlah
        );

    if (
        nominal <= 0
    ) {

        alert(
            "Jumlah modal harus lebih dari Rp 0."
        );

        return false;

    }


    // =================================
    // SALDO SEBELUM
    // =================================

    const saldoSebelum =
        angkaInvestorBBCS(
            rekening.saldo
        );

    const modalSebelum =
        angkaInvestorBBCS(
            rekening.modal
        );

    const saldoModalSebelum =
        angkaInvestorBBCS(
            rekening.saldoModal
        );


    // =================================
    // REFERENSI TRANSAKSI
    // SATU REFERENSI UNTUK SEMUA MODUL
    // =================================

    const referensi =
        "INV-MODAL-" +
        dataInvestor.id +
        "-" +
        Date.now();


    // =================================
    // SIMPAN INDEX RIWAYAT
    // UNTUK ROLLBACK
    // =================================

    const jumlahRiwayatSebelum =
        riwayatInvestor.length;


    // =================================
    // UPDATE REKENING INVESTOR
    // =================================

    rekening.modal =
        modalSebelum +
        nominal;

    rekening.saldoModal =
        saldoModalSebelum +
        nominal;

    rekening.saldo =
        saldoSebelum +
        nominal;

    rekening.tanggalSetorTerakhir =
        tanggalInvestorBBCS();

    rekening.status =
        "Aktif";


    // =================================
    // CATAT RIWAYAT INVESTOR
    // =================================

    const riwayat = {

        id:
            nomorRiwayatInvestorBaru(),

        idInvestor:
            dataInvestor.id,

        namaInvestor:
            dataInvestor.nama,

        jenis:
            "TAMBAH_MODAL",

        kategori:
            "MODAL INVESTOR",

        jumlah:
            nominal,

        saldoSebelum:
            saldoSebelum,

        saldoSesudah:
            rekening.saldo,

        modalSebelum:
            modalSebelum,

        modalSesudah:
            rekening.modal,

        tanggal:
            tanggalInvestorBBCS(),

        periode:
            periodeInvestorBBCS(),

        referensi:
            referensi,

        keterangan:
            "Tambah modal investor"

    };


    riwayatInvestor.push(
        riwayat
    );


    // =================================
    // CATAT KAS INVESTOR
    // =================================

    const hasilKas =
        kasMasukModalInvestorBBCS({

            idInvestor:
                dataInvestor.id,

            namaInvestor:
                dataInvestor.nama,

            jumlah:
                nominal,

            referensi:
                referensi

        });


    // =================================
    // JIKA KAS GAGAL
    // ROLLBACK INVESTOR
    // =================================

    if (
        !hasilKas ||
        !hasilKas.berhasil
    ) {

        rekening.modal =
            modalSebelum;

        rekening.saldoModal =
            saldoModalSebelum;

        rekening.saldo =
            saldoSebelum;

        riwayatInvestor.splice(
            jumlahRiwayatSebelum
        );


        console.error(
            "Setor modal dibatalkan. Kas gagal dicatat.",
            hasilKas
        );

        alert(
            hasilKas &&
            hasilKas.pesan
                ? hasilKas.pesan
                : "Gagal mencatat modal ke Kas."
        );

        return false;

    }


    // =================================
    // SIMPAN DATABASE INVESTOR
    // =================================

    const tersimpan =
        simpanDatabaseInvestor();


    // =================================
    // JIKA DATABASE INVESTOR GAGAL
    // ROLLBACK INVESTOR
    // =================================

    if (!tersimpan) {

        rekening.modal =
            modalSebelum;

        rekening.saldoModal =
            saldoModalSebelum;

        rekening.saldo =
            saldoSebelum;

        riwayatInvestor.splice(
            jumlahRiwayatSebelum
        );


        // ---------------------------------
        // ROLLBACK KAS
        // ---------------------------------

        if (
            hasilKas.data &&
            Array.isArray(kas)
        ) {

            const indexKas =
                kas.indexOf(
                    hasilKas.data
                );

            if (
                indexKas >= 0
            ) {

                kas.splice(
                    indexKas,
                    1
                );

            }

        }


        if (
            typeof simpanDatabaseKasBBCS ===
            "function"
        ) {

            simpanDatabaseKasBBCS();

        }


        console.error(
            "Setor modal dibatalkan. Database Investor gagal disimpan."
        );

        alert(
            "Gagal menyimpan transaksi investor."
        );

        return false;

    }


    // =================================
    // SIMPAN KAS
    // =================================

    if (
        typeof simpanDatabaseKasBBCS ===
        "function"
    ) {

        simpanDatabaseKasBBCS();

    }


    // =================================
    // LOG FINAL
    // =================================

    console.log(
        "===================================="
    );

    console.log(
        "SETOR MODAL INVESTOR BERHASIL"
    );

    console.log(
        "===================================="
    );

    console.log({

        idInvestor:
            dataInvestor.id,

        nama:
            dataInvestor.nama,

        nominal:
            nominal,

        modalSebelum:
            modalSebelum,

        modalSesudah:
            rekening.modal,

        saldoSebelum:
            saldoSebelum,

        saldoSesudah:
            rekening.saldo,

        referensi:
            referensi,

        kas:
            hasilKas.data

    });

    console.log(
        "===================================="
    );


    // =================================
    // SELESAI
    // =================================

    alert(
        "Tambah modal berhasil.\n\n" +

        "Investor : " +
        dataInvestor.nama +

        "\nModal masuk : " +
        rupiahInvestorBBCS(
            nominal
        ) +

        "\nTotal modal : " +
        rupiahInvestorBBCS(
            rekening.modal
        ) +

        "\nSaldo rekening : " +
        rupiahInvestorBBCS(
            rekening.saldo
        )
    );


    return true;

}

// =====================================
// MESIN INVESTOR BBCS V2.3
// BAGIAN 5
// PROSES JASA INVESTOR
// =====================================


// =====================================
// CEK JASA SUDAH DIPROSES
// =====================================

function sudahProsesJasaInvestor(
    idInvestor,
    periode
) {

    return riwayatInvestor.some(
        function(item) {

            if (!item) {

                return false;

            }


            const jenis =
                String(
                    item.jenis || ""
                ).toUpperCase();


            return (
                (
                    jenis ===
                    "PROSES_JASA"
                    ||
                    jenis ===
                    "JASA"
                )
                &&
                String(
                    item.idInvestor
                ) ===
                String(idInvestor)
                &&
                String(
                    item.periode
                ) ===
                String(periode)
            );

        }
    );

}


// =====================================
// PROSES JASA INVESTOR
// =====================================

function prosesJasaInvestorBBCS(
    idInvestor
) {

    const investorData =
        cariInvestor(
            idInvestor
        );


    const rekening =
        cariRekeningInvestor(
            idInvestor
        );


    // =================================
    // VALIDASI DATA
    // =================================

    if (
        !investorData ||
        !rekening
    ) {

        alert(
            "Data investor atau rekening tidak ditemukan."
        );

        return false;

    }


    // =================================
    // CEK STATUS REKENING
    // =================================

    if (
        rekening.status !==
        "Aktif"
    ) {

        alert(
            "Rekening investor tidak aktif."
        );

        return false;

    }


    // =================================
    // CEK STATUS JASA
    // =================================

    if (
        rekening.jasaAktif !==
        true
    ) {

        alert(
            "Jasa investor sedang tidak aktif."
        );

        return false;

    }


    // =================================
    // PERIODE SEKARANG
    // =================================

    const sekarang =
        new Date();


    const periodeSekarang =
        periodeInvestorBBCS(
            sekarang
        );


    // =================================
    // CEK MODAL TERAKHIR DISETOR
    // =================================

    const tanggalSetor =
        rekening.tanggalSetorTerakhir;


    if (tanggalSetor) {

        const periodeSetor =
            periodeInvestorBBCS(
                tanggalSetor
            );


        /*
         * Modal yang baru masuk bulan ini
         * belum mendapatkan jasa.
         *
         * Jasa mulai dihitung bulan berikutnya.
         */

        if (
            periodeSetor ===
            periodeSekarang
        ) {

            alert(
                "Modal baru disetor pada bulan ini.\n\n" +
                "Jasa mulai dihitung pada bulan berikutnya."
            );

            return false;

        }

    }


    // =================================
    // CEK JASA SUDAH DIPROSES
    // =================================

    if (
        sudahProsesJasaInvestor(
            idInvestor,
            periodeSekarang
        )
    ) {

        alert(
            "Jasa investor untuk periode " +
            periodeSekarang +
            " sudah diproses."
        );

        return false;

    }


    // =================================
    // AMBIL MODAL
    // =================================

    const modal =
        angkaInvestorBBCS(
            rekening.modal
        );


    if (
        modal <= 0
    ) {

        alert(
            "Investor belum memiliki modal."
        );

        return false;

    }


    // =================================
    // PERSENTASE JASA
    // =================================

    const jasaPersen =
        Number(
            investorData.jasa
        ) || 0;


    if (
        jasaPersen <= 0
    ) {

        alert(
            "Persentase jasa investor belum diatur."
        );

        return false;

    }


    // =================================
    // HITUNG JASA
    // =================================

    const jasa =
        Math.floor(
            modal *
            jasaPersen /
            100
        );


    if (
        jasa <= 0
    ) {

        alert(
            "Jasa periode ini adalah Rp 0."
        );

        return false;

    }


    // =================================
    // SALDO SEBELUM
    // =================================

    const saldoSebelum =
        angkaInvestorBBCS(
            rekening.saldo
        );


    // =================================
    // JASA TERSEDIA
    // =================================

    rekening.jasaTersedia =
        angkaInvestorBBCS(
            rekening.jasaTersedia
        ) +
        jasa;


    // =================================
    // TOTAL JASA
    // =================================

    rekening.totalJasa =
        angkaInvestorBBCS(
            rekening.totalJasa
        ) +
        jasa;


    // =================================
    // JASA MASUK REKENING
    // =================================

    rekening.saldo =
        saldoSebelum +
        jasa;


    // =================================
    // STATUS JASA
    // =================================

    rekening.statusJasa =
        "Aktif";


    rekening.jasaAktif =
        true;


    // =================================
    // TANGGAL JASA
    // =================================

    rekening.tanggalJasaTerakhir =
        tanggalInvestorBBCS();


    rekening.periodeJasaTerakhir =
        periodeSekarang;


    // =================================
    // CATAT RIWAYAT
    // =================================

    const riwayat = {

        id:
            nomorRiwayatInvestorBaru(),

        idInvestor:
            investorData.id,

        namaInvestor:
            investorData.nama,

        jenis:
            "PROSES_JASA",

        kategori:
            "JASA INVESTOR",

        jumlah:
            jasa,

        modal:
            modal,

        jasaPersen:
            jasaPersen,

        saldoSebelum:
            saldoSebelum,

        saldoSesudah:
            angkaInvestorBBCS(
                rekening.saldo
            ),

        periode:
            periodeSekarang,

        tanggal:
            tanggalInvestorBBCS(),

        keterangan:
            "Jasa investor masuk ke rekening"

    };


    riwayatInvestor.push(
        riwayat
    );


    // =================================
    // SIMPAN DATABASE
    // =================================

    const tersimpan =
        simpanDatabaseInvestor();


    if (!tersimpan) {

        /*
         * ROLLBACK
         */

        rekening.jasaTersedia =
            angkaInvestorBBCS(
                rekening.jasaTersedia
            ) -
            jasa;


        rekening.totalJasa =
            angkaInvestorBBCS(
                rekening.totalJasa
            ) -
            jasa;


        rekening.saldo =
            saldoSebelum;


        rekening.tanggalJasaTerakhir =
            null;


        rekening.periodeJasaTerakhir =
            null;


        riwayatInvestor.pop();


        console.error(
            "Gagal menyimpan proses jasa investor."
        );


        alert(
            "Gagal menyimpan proses jasa investor."
        );


        return false;

    }


    // =================================
    // LOG
    // =================================

    console.log(
        "Jasa investor berhasil diproses.",
        {

            idInvestor:
                investorData.id,

            nama:
                investorData.nama,

            modal:
                modal,

            jasaPersen:
                jasaPersen,

            jasa:
                jasa,

            saldoSebelum:
                saldoSebelum,

            saldoSesudah:
                rekening.saldo,

            periode:
                periodeSekarang

        }
    );


    // =================================
    // SELESAI
    // =================================

    alert(
        "Jasa investor berhasil diproses.\n\n" +
        "Investor : " +
        investorData.nama +
        "\n" +
        "Periode : " +
        periodeSekarang +
        "\n" +
        "Modal : " +
        rupiahInvestorBBCS(
            modal
        ) +
        "\n" +
        "Jasa : " +
        rupiahInvestorBBCS(
            jasa
        ) +
        "\n" +
        "Saldo rekening : " +
        rupiahInvestorBBCS(
            rekening.saldo
        )
    );


    return true;

}
// =====================================
// MESIN INVESTOR BBCS V2.3
// BAGIAN 6
// TARIK JASA INVESTOR
// =====================================


// =====================================
// PROSES TARIK JASA
// =====================================

function tarikJasaInvestorBBCS(
    idInvestor,
    jumlah
) {

    const investorData =
        cariInvestor(
            idInvestor
        );


    const rekening =
        cariRekeningInvestor(
            idInvestor
        );


    // =================================
    // VALIDASI DATA
    // =================================

    if (
        !investorData ||
        !rekening
    ) {

        alert(
            "Data investor atau rekening tidak ditemukan."
        );

        return false;

    }


    // =================================
    // CEK STATUS
    // =================================

    if (
        rekening.status !==
        "Aktif"
    ) {

        alert(
            "Rekening investor tidak aktif."
        );

        return false;

    }


    // =================================
    // NOMINAL PENARIKAN
    // =================================

    const nominal =
        angkaInvestorBBCS(
            jumlah
        );


    if (
        nominal <= 0
    ) {

        alert(
            "Jumlah jasa yang ditarik harus lebih dari Rp 0."
        );

        return false;

    }


    // =================================
    // JASA TERSEDIA
    // =================================

    const jasaTersedia =
        angkaInvestorBBCS(
            rekening.jasaTersedia
        );


    if (
        nominal >
        jasaTersedia
    ) {

        alert(
            "Jasa yang tersedia tidak mencukupi.\n\n" +
            "Jasa tersedia : " +
            rupiahInvestorBBCS(
                jasaTersedia
            )
        );

        return false;

    }


    // =================================
    // SALDO SEBELUM
    // =================================

    const saldoSebelum =
        angkaInvestorBBCS(
            rekening.saldo
        );


    // =================================
    // TARIK JASA
    // =================================

    rekening.jasaTersedia =
        jasaTersedia -
        nominal;


    // =================================
    // KURANGI SALDO REKENING
    // =================================

    rekening.saldo =
        saldoSebelum -
        nominal;


    // =================================
    // CEK SALDO TIDAK NEGATIF
    // =================================

    if (
        rekening.saldo < 0
    ) {

        rekening.saldo =
            saldoSebelum;


        rekening.jasaTersedia =
            jasaTersedia;


        alert(
            "Saldo rekening tidak mencukupi."
        );

        return false;

    }


    // =================================
    // CATAT RIWAYAT
    // =================================

    const riwayat = {

        id:
            nomorRiwayatInvestorBaru(),

        idInvestor:
            investorData.id,

        namaInvestor:
            investorData.nama,

        jenis:
            "TARIK_JASA",

        kategori:
            "PENARIKAN JASA",

        jumlah:
            nominal,

        saldoSebelum:
            saldoSebelum,

        saldoSesudah:
            rekening.saldo,

        jasaSebelum:
            jasaTersedia,

        jasaSesudah:
            rekening.jasaTersedia,

        periode:
            periodeInvestorBBCS(),

        tanggal:
            tanggalInvestorBBCS(),

        keterangan:
            "Penarikan jasa investor"

    };


    riwayatInvestor.push(
        riwayat
    );


    // =================================
    // SIMPAN DATABASE
    // =================================

    const tersimpan =
        simpanDatabaseInvestor();


    if (!tersimpan) {

        // =============================
        // ROLLBACK
        // =============================

        rekening.saldo =
            saldoSebelum;


        rekening.jasaTersedia =
            jasaTersedia;


        riwayatInvestor.pop();


        console.error(
            "Gagal menyimpan penarikan jasa investor."
        );


        alert(
            "Gagal menyimpan penarikan jasa investor."
        );


        return false;

    }


    // =================================
    // LOG
    // =================================

    console.log(
        "Penarikan jasa investor berhasil.",
        {

            idInvestor:
                investorData.id,

            nama:
                investorData.nama,

            jumlah:
                nominal,

            jasaSebelum:
                jasaTersedia,

            jasaSesudah:
                rekening.jasaTersedia,

            saldoSebelum:
                saldoSebelum,

            saldoSesudah:
                rekening.saldo

        }
    );


    // =================================
    // SELESAI
    // =================================

    alert(
        "Jasa investor berhasil ditarik.\n\n" +
        "Investor : " +
        investorData.nama +
        "\n" +
        "Jasa ditarik : " +
        rupiahInvestorBBCS(
            nominal
        ) +
        "\n" +
        "Jasa tersedia : " +
        rupiahInvestorBBCS(
            rekening.jasaTersedia
        ) +
        "\n" +
        "Saldo rekening : " +
        rupiahInvestorBBCS(
            rekening.saldo
        )
    );


    return true;

}
// =====================================
// MESIN INVESTOR BBCS V2.3
// BAGIAN 7
// TARIK MODAL INVESTOR
// =====================================

function tarikModalInvestorBBCS(
    idInvestor,
    jumlah
) {

    const investorData =
        cariInvestor(
            idInvestor
        );

    const rekening =
        cariRekeningInvestor(
            idInvestor
        );


    // =====================================
    // VALIDASI DATA
    // =====================================

    if (
        !investorData ||
        !rekening
    ) {

        alert(
            "Data investor atau rekening tidak ditemukan."
        );

        return false;
    }


    // =====================================
    // CEK STATUS REKENING
    // =====================================

    if (
        rekening.status !==
        "Aktif"
    ) {

        alert(
            "Rekening investor tidak aktif."
        );

        return false;
    }


    // =====================================
    // NOMINAL PENARIKAN
    // =====================================

    const nominal =
        angkaInvestorBBCS(
            jumlah
        );


    if (
        nominal <= 0
    ) {

        alert(
            "Jumlah modal yang ditarik harus lebih dari Rp 0."
        );

        return false;
    }


    // =====================================
    // SALDO DAN MODAL SEBELUM
    // =====================================

    const modalSebelum =
        angkaInvestorBBCS(
            rekening.modal
        );

    const saldoSebelum =
        angkaInvestorBBCS(
            rekening.saldo
        );


    // =====================================
    // VALIDASI MODAL
    // =====================================

    if (
        nominal >
        modalSebelum
    ) {

        alert(
            "Modal investor tidak mencukupi.\n\n" +
            "Modal tersedia : " +
            rupiahInvestorBBCS(
                modalSebelum
            )
        );

        return false;
    }


    // =====================================
    // VALIDASI SALDO
    // =====================================

    if (
        nominal >
        saldoSebelum
    ) {

        alert(
            "Saldo rekening investor tidak mencukupi.\n\n" +
            "Saldo tersedia : " +
            rupiahInvestorBBCS(
                saldoSebelum
            )
        );

        return false;
    }


    // =====================================
    // PERSENTASE ADMINISTRASI
    // =====================================

    const jasaPersen =
        Number(
            investorData.jasa
        ) || 0;


    // =====================================
    // HITUNG BIAYA ADMINISTRASI
    // =====================================

    const biayaAdmin =
        Math.floor(
            nominal *
            jasaPersen /
            100
        );


    // =====================================
    // HITUNG UANG DITERIMA INVESTOR
    // =====================================

    const uangDiterima =
        nominal -
        biayaAdmin;


    if (
        uangDiterima < 0
    ) {

        alert(
            "Nominal penarikan tidak valid."
        );

        return false;
    }


    // =====================================
    // HITUNG SESUDAH
    // =====================================

    const modalSesudah =
        modalSebelum -
        nominal;

    const saldoSesudah =
        saldoSebelum -
        nominal;


    // =====================================
    // REFERENSI PENARIKAN MODAL
    // =====================================

    const referensi =
        "INV-TARIK-MODAL-" +
        investorData.id +
        "-" +
        Date.now();


    // =====================================
    // REFERENSI ADMINISTRASI
    // =====================================

    const referensiAdministrasi =
        "INV-ADMIN-TARIK-MODAL-" +
        investorData.id +
        "-" +
        Date.now();


    // =====================================
    // CEK KONEKTOR KAS KELUAR
    // =====================================

    if (
        typeof kasKeluarModalInvestorBBCS !==
        "function"
    ) {

        alert(
            "Konektor Kas Penarikan Modal Investor belum tersedia."
        );

        return false;
    }


    // =====================================
    // CATAT KAS KELUAR
    // =====================================

    const hasilKas =
        kasKeluarModalInvestorBBCS({

            idInvestor:
                investorData.id,

            namaInvestor:
                investorData.nama,

            jumlah:
                nominal,

            referensi:
                referensi

        });


    // =====================================
    // KAS KELUAR GAGAL
    // =====================================

    if (
        !hasilKas ||
        !hasilKas.berhasil
    ) {

        console.error(
            "Penarikan modal dibatalkan. Kas gagal dicatat.",
            hasilKas
        );

        alert(
            hasilKas &&
            hasilKas.pesan
                ? hasilKas.pesan
                : "Gagal mencatat pengeluaran Kas."
        );

        return false;
    }


    // =====================================
    // CEK KONEKTOR ADMINISTRASI
    // =====================================

    if (
        typeof kasMasukAdministrasiInvestorBBCS !==
        "function"
    ) {

        console.error(
            "Konektor Pendapatan Administrasi Investor belum tersedia."
        );

        alert(
            "Konektor Pendapatan Administrasi Investor belum tersedia."
        );

        return false;
    }


    // =====================================
    // CATAT PENDAPATAN ADMINISTRASI
    // =====================================

    const hasilAdministrasi =
        kasMasukAdministrasiInvestorBBCS({

            idInvestor:
                investorData.id,

            namaInvestor:
                investorData.nama,

            jumlah:
                biayaAdmin,

            referensi:
                referensiAdministrasi

        });


    // =====================================
    // ADMINISTRASI GAGAL
    // =====================================

    if (
        !hasilAdministrasi ||
        !hasilAdministrasi.berhasil
    ) {

        console.error(
            "Pendapatan administrasi gagal dicatat.",
            hasilAdministrasi
        );

        alert(
            hasilAdministrasi &&
            hasilAdministrasi.pesan
                ? hasilAdministrasi.pesan
                : "Gagal mencatat pendapatan administrasi."
        );

        return false;
    }


    // =====================================
    // UPDATE REKENING INVESTOR
    // =====================================

    rekening.modal =
        modalSesudah;

    rekening.saldoModal =
        modalSesudah;

    rekening.saldo =
        saldoSesudah;


    // =====================================
    // STATUS JASA
    // =====================================

    if (
        modalSesudah <= 0
    ) {

        rekening.jasaAktif =
            false;

        rekening.statusJasa =
            "Tidak Aktif";

    }


    // =====================================
    // CATAT RIWAYAT INVESTOR
    // =====================================

    const riwayat = {

        id:
            nomorRiwayatInvestorBaru(),

        idInvestor:
            investorData.id,

        namaInvestor:
            investorData.nama,

        jenis:
            "TARIK_MODAL",

        kategori:
            "PENARIKAN MODAL",

        jumlah:
            nominal,

        biayaAdmin:
            biayaAdmin,

        uangDiterima:
            uangDiterima,

        modalSebelum:
            modalSebelum,

        modalSesudah:
            modalSesudah,

        saldoSebelum:
            saldoSebelum,

        saldoSesudah:
            saldoSesudah,

        referensi:
            referensi,

        referensiAdministrasi:
            referensiAdministrasi,

        periode:
            periodeInvestorBBCS(),

        tanggal:
            tanggalInvestorBBCS(),

        keterangan:
            "Penarikan modal investor"

    };


    riwayatInvestor.push(
        riwayat
    );


    // =====================================
    // SIMPAN DATABASE INVESTOR
    // =====================================

    const tersimpan =
        simpanDatabaseInvestor();


    // =====================================
    // DATABASE GAGAL
    // =====================================

    if (
        !tersimpan
    ) {

        // ---------------------------------
        // ROLLBACK REKENING
        // ---------------------------------

        rekening.modal =
            modalSebelum;

        rekening.saldoModal =
            modalSebelum;

        rekening.saldo =
            saldoSebelum;


        // ---------------------------------
        // ROLLBACK STATUS JASA
        // ---------------------------------

        if (
            modalSebelum > 0
        ) {

            rekening.jasaAktif =
                true;

            rekening.statusJasa =
                "Aktif";

        }


        // ---------------------------------
        // ROLLBACK RIWAYAT
        // ---------------------------------

        riwayatInvestor.pop();


        console.error(
            "Penarikan modal Investor gagal disimpan."
        );

        alert(
            "Penarikan modal gagal disimpan."
        );

        return false;
    }


    // =====================================
    // LOG
    // =====================================

    console.log(
        "===================================="
    );

    console.log(
        "PENARIKAN MODAL INVESTOR BERHASIL"
    );

    console.log(
        "===================================="
    );

    console.log({

        idInvestor:
            investorData.id,

        nama:
            investorData.nama,

        nominal:
            nominal,

        biayaAdmin:
            biayaAdmin,

        uangDiterima:
            uangDiterima,

        modalSebelum:
            modalSebelum,

        modalSesudah:
            modalSesudah,

        saldoSebelum:
            saldoSebelum,

        saldoSesudah:
            saldoSesudah,

        referensi:
            referensi,

        referensiAdministrasi:
            referensiAdministrasi

    });


    // =====================================
    // SELESAI
    // =====================================

    alert(

        "Penarikan modal berhasil.\n\n" +

        "Investor : " +
        investorData.nama +

        "\n" +

        "Modal ditarik : " +
        rupiahInvestorBBCS(
            nominal
        ) +

        "\n" +

        "Biaya administrasi : " +
        rupiahInvestorBBCS(
            biayaAdmin
        ) +

        "\n" +

        "Uang diterima : " +
        rupiahInvestorBBCS(
            uangDiterima
        ) +

        "\n" +

        "Modal tersisa : " +
        rupiahInvestorBBCS(
            modalSesudah
        ) +

        "\n" +

        "Saldo rekening : " +
        rupiahInvestorBBCS(
            saldoSesudah
        )
    );


    return true;
}


// =====================================
// EXPORT GLOBAL
// =====================================

window.tarikModalInvestorBBCS =
    tarikModalInvestorBBCS;
   
   
// =====================================
// MESIN INVESTOR BBCS V2.3
// BAGIAN 8
// SINKRONISASI & PEMBERSIHAN DATABASE
// =====================================


// =====================================
// PASTIKAN ARRAY DATABASE
// =====================================

function pastikanDatabaseInvestorBBCS() {

    if (
        !Array.isArray(investor)
    ) {

        investor = [];

    }


    if (
        !Array.isArray(rekeningInvestor)
    ) {

        rekeningInvestor = [];

    }


    if (
        !Array.isArray(riwayatInvestor)
    ) {

        riwayatInvestor = [];

    }

}


// =====================================
// SINKRONISASI REKENING INVESTOR
// =====================================

function sinkronisasiInvestorBBCS() {

    // =================================
    // PASTIKAN DATABASE SIAP
    // =================================

    pastikanDatabaseInvestorBBCS();


    // =================================
    // VALIDASI DATABASE
    // =================================

    if (
        typeof validasiDatabaseInvestor ===
        "function"
    ) {

        validasiDatabaseInvestor();

    }
    else {

        console.warn(
            "validasiDatabaseInvestor() belum tersedia."
        );

    }


    // =================================
    // PASTIKAN SEMUA INVESTOR
    // MEMILIKI REKENING
    // =================================

    if (
        typeof pastikanSemuaInvestorPunyaRekening ===
        "function"
    ) {

        pastikanSemuaInvestorPunyaRekening();

    }
    else {

        console.warn(
            "pastikanSemuaInvestorPunyaRekening() belum tersedia."
        );

    }


    // =================================
    // SINKRON NAMA
    // =================================

    if (
        typeof sinkronNamaInvestorRekening ===
        "function"
    ) {

        sinkronNamaInvestorRekening();

    }
    else {

        console.warn(
            "sinkronNamaInvestorRekening() belum tersedia."
        );

    }


    // =================================
    // SIMPAN DATABASE
    // =================================

    if (
        typeof simpanDatabaseInvestor ===
        "function"
    ) {

        return simpanDatabaseInvestor();

    }


    console.error(
        "simpanDatabaseInvestor() belum tersedia."
    );


    return false;

}


// =====================================
// AMBIL SEMUA DATA INVESTOR
// =====================================

function semuaInvestorBBCS() {

    pastikanDatabaseInvestorBBCS();

    return investor.slice();

}


// =====================================
// AMBIL SEMUA REKENING INVESTOR
// =====================================

function semuaRekeningInvestorBBCS() {

    pastikanDatabaseInvestorBBCS();

    return rekeningInvestor.slice();

}


// =====================================
// AMBIL SEMUA RIWAYAT INVESTOR
// =====================================

function semuaRiwayatInvestorBBCS() {

    pastikanDatabaseInvestorBBCS();

    return riwayatInvestor.slice();

}


// =====================================
// HITUNG TOTAL MODAL INVESTOR
// =====================================

function totalModalInvestorBBCS() {

    pastikanDatabaseInvestorBBCS();

    return rekeningInvestor.reduce(

        function(total, rekening) {

            if (
                !rekening
            ) {

                return total;

            }


            return (
                total +
                angkaInvestorBBCS(
                    rekening.modal
                )
            );

        },

        0

    );

}


// =====================================
// HITUNG TOTAL SALDO INVESTOR
// =====================================

function totalSaldoInvestorBBCS() {

    pastikanDatabaseInvestorBBCS();

    return rekeningInvestor.reduce(

        function(total, rekening) {

            if (
                !rekening
            ) {

                return total;

            }


            return (
                total +
                angkaInvestorBBCS(
                    rekening.saldo
                )
            );

        },

        0

    );

}


// =====================================
// HITUNG TOTAL JASA INVESTOR
// =====================================

function totalJasaInvestorBBCS() {

    pastikanDatabaseInvestorBBCS();

    return rekeningInvestor.reduce(

        function(total, rekening) {

            if (
                !rekening
            ) {

                return total;

            }


            return (
                total +
                angkaInvestorBBCS(
                    rekening.totalJasa
                )
            );

        },

        0

    );

}


// =====================================
// HITUNG TOTAL JASA TERSEDIA
// =====================================

function totalJasaTersediaInvestorBBCS() {

    pastikanDatabaseInvestorBBCS();

    return rekeningInvestor.reduce(

        function(total, rekening) {

            if (
                !rekening
            ) {

                return total;

            }


            return (
                total +
                angkaInvestorBBCS(
                    rekening.jasaTersedia
                )
            );

        },

        0

    );

}


// =====================================
// STATUS DATABASE INVESTOR
// =====================================

function statusDatabaseInvestorBBCS() {

    pastikanDatabaseInvestorBBCS();

    return {

        investor:
            investor.length,

        rekening:
            rekeningInvestor.length,

        riwayat:
            riwayatInvestor.length,

        totalModal:
            totalModalInvestorBBCS(),

        totalSaldo:
            totalSaldoInvestorBBCS(),

        totalJasa:
            totalJasaInvestorBBCS(),

        jasaTersedia:
            totalJasaTersediaInvestorBBCS()

    };

}


// =====================================
// LOG STATUS DATABASE
// =====================================

function logStatusDatabaseInvestorBBCS() {

    console.log(
        "===================================="
    );

    console.log(
        "STATUS DATABASE INVESTOR BBCS"
    );

    console.log(
        statusDatabaseInvestorBBCS()
    );

    console.log(
        "===================================="
    );

}


// =====================================
// JALANKAN SINKRONISASI
// =====================================

try {

    const hasilSinkronisasi =
        sinkronisasiInvestorBBCS();


    if (
        !hasilSinkronisasi
    ) {

        console.warn(
            "Sinkronisasi Investor BBCS tidak berhasil disimpan."
        );

    }

}
catch(error) {

    console.error(
        "Sinkronisasi Investor BBCS gagal:",
        error
    );

}


// =====================================
// STATUS AKHIR
// =====================================

logStatusDatabaseInvestorBBCS();


console.log(
    "===================================="
);

console.log(
    "MESIN INVESTOR BBCS V2.3 LENGKAP"
);

console.log(
    "===================================="
);

// =====================================
// MESIN INVESTOR BBCS V2.3
// BAGIAN 9
// VALIDASI TRANSAKSI & SINKRONISASI
// =====================================


// =====================================
// VALIDASI REKENING INVESTOR
// =====================================

function validasiRekeningInvestorBBCS(
    idInvestor
) {

    const dataInvestor =
        cariInvestor(
            idInvestor
        );


    const rekening =
        cariRekeningInvestor(
            idInvestor
        );


    if (
        !dataInvestor ||
        !rekening
    ) {

        return false;

    }


    // =================================
    // NORMALISASI NILAI
    // =================================

    rekening.modal =
        angkaInvestorBBCS(
            rekening.modal
        );


    rekening.saldoModal =
        angkaInvestorBBCS(
            rekening.saldoModal
        );


    rekening.jasaTersedia =
        angkaInvestorBBCS(
            rekening.jasaTersedia
        );


    rekening.totalJasa =
        angkaInvestorBBCS(
            rekening.totalJasa
        );


    rekening.saldo =
        angkaInvestorBBCS(
            rekening.saldo
        );


    // =================================
    // CEGAH NILAI NEGATIF
    // =================================

    if (
        rekening.modal < 0
    ) {

        rekening.modal = 0;

    }


    if (
        rekening.saldoModal < 0
    ) {

        rekening.saldoModal = 0;

    }


    if (
        rekening.jasaTersedia < 0
    ) {

        rekening.jasaTersedia = 0;

    }


    if (
        rekening.totalJasa < 0
    ) {

        rekening.totalJasa = 0;

    }


    if (
        rekening.saldo < 0
    ) {

        rekening.saldo = 0;

    }


    // =================================
    // SINKRON SALDO MODAL
    // =================================

    rekening.saldoModal =
        rekening.modal;


    // =================================
    // STATUS JASA
    // =================================

    if (
        rekening.modal <= 0
    ) {

        rekening.jasaAktif =
            false;

        rekening.statusJasa =
            "Tidak Aktif";

    }
    else {

        if (
            rekening.jasaAktif ===
            undefined
        ) {

            rekening.jasaAktif =
                true;

        }


        if (
            rekening.statusJasa ===
            undefined
        ) {

            rekening.statusJasa =
                "Aktif";

        }

    }


    return true;

}


// =====================================
// SINKRON SATU REKENING
// =====================================

function sinkronRekeningInvestorBBCS(
    idInvestor
) {

    const berhasil =
        validasiRekeningInvestorBBCS(
            idInvestor
        );


    if (!berhasil) {

        return false;

    }


    return simpanDatabaseInvestor();

}


// =====================================
// VALIDASI SEMUA REKENING
// =====================================

function validasiSemuaRekeningInvestorBBCS() {

    rekeningInvestor.forEach(
        function(rekening) {

            if (!rekening) {

                return;

            }


            validasiRekeningInvestorBBCS(
                rekening.idInvestor
            );

        }
    );


    sinkronNamaInvestorRekening();


    return simpanDatabaseInvestor();

}


// =====================================
// CEK APAKAH INVESTOR AKTIF
// =====================================

function investorAktifBBCS(
    idInvestor
) {

    const dataInvestor =
        cariInvestor(
            idInvestor
        );


    const rekening =
        cariRekeningInvestor(
            idInvestor
        );


    if (
        !dataInvestor ||
        !rekening
    ) {

        return false;

    }


    return (
        dataInvestor.status ===
        "Aktif"
        &&
        rekening.status ===
        "Aktif"
    );

}


// =====================================
// CEK APAKAH MASIH ADA MODAL
// =====================================

function investorMemilikiModalBBCS(
    idInvestor
) {

    const rekening =
        cariRekeningInvestor(
            idInvestor
        );


    if (!rekening) {

        return false;

    }


    return (
        angkaInvestorBBCS(
            rekening.modal
        ) > 0
    );

}


// =====================================
// CEK JASA TERSEDIA
// =====================================

function jasaInvestorTersediaBBCS(
    idInvestor
) {

    const rekening =
        cariRekeningInvestor(
            idInvestor
        );


    if (!rekening) {

        return 0;

    }


    return angkaInvestorBBCS(
        rekening.jasaTersedia
    );

}


// =====================================
// CEK MODAL TERSEDIA
// =====================================

function modalInvestorTersediaBBCS(
    idInvestor
) {

    const rekening =
        cariRekeningInvestor(
            idInvestor
        );


    if (!rekening) {

        return 0;

    }


    return angkaInvestorBBCS(
        rekening.modal
    );

}


// =====================================
// CEK SALDO REKENING
// =====================================

function saldoInvestorBBCS(
    idInvestor
) {

    const rekening =
        cariRekeningInvestor(
            idInvestor
        );


    if (!rekening) {

        return 0;

    }


    return angkaInvestorBBCS(
        rekening.saldo
    );

}


// =====================================
// SELESAI BAGIAN 9
// =====================================

console.log(
    "Mesin Investor BBCS V2.3 Bagian 9 siap."
);
