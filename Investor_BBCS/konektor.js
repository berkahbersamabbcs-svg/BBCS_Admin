// =====================================
// BBCS - KONEKTOR INVESTOR KE KAS
// =====================================

window.catatKasInvestorBBCS =
function catatKasInvestorBBCS(data) {

    if (!data) {

        return {
            berhasil: false,
            pesan: "Data Kas Investor kosong"
        };

    }


    const idInvestor =
        String(
            data.idInvestor || ""
        ).trim();


    const namaInvestor =
        String(
            data.namaInvestor || ""
        ).trim();


    const jenis =
        String(
            data.jenis || ""
        ).trim();


    const kategori =
        String(
            data.kategori || ""
        ).trim();


    const jumlah =
        angkaKasBBCS(
            data.jumlah
        );


    const referensi =
        String(
            data.referensi || ""
        ).trim();


    const keterangan =
        String(
            data.keterangan || ""
        ).trim();


    // =================================
    // VALIDASI
    // =================================

    if (!idInvestor) {

        return {
            berhasil: false,
            pesan: "ID investor wajib diisi"
        };

    }


    if (!referensi) {

        return {
            berhasil: false,
            pesan: "Referensi Kas Investor wajib diisi"
        };

    }


    if (
        jenis !== "Pemasukan" &&
        jenis !== "Pengeluaran"
    ) {

        return {
            berhasil: false,
            pesan: "Jenis Kas Investor tidak valid"
        };

    }


    if (jumlah <= 0) {

        return {
            berhasil: false,
            pesan: "Jumlah Kas Investor harus lebih dari 0"
        };

    }


    // =================================
    // CEK DUPLIKASI
    // =================================

    if (
        typeof sudahAdaKasBBCS ===
        "function"
    ) {

        if (
            sudahAdaKasBBCS(
                referensi
            )
        ) {

            return {
                berhasil: false,
                duplikat: true,
                pesan:
                    "Kas Investor dengan referensi tersebut sudah ada"
            };

        }

    }


    // =================================
    // CATAT KE MESIN KAS
    // =================================

    if (
        typeof catatKasBBCS !==
        "function"
    ) {

        return {
            berhasil: false,
            pesan:
                "Mesin Kas BBCS belum tersedia"
        };

    }


    const hasil =
        catatKasBBCS({

            jenis:
                jenis,

            kategori:
                kategori,

            keterangan:
                keterangan,

            jumlah:
                jumlah,

            idAnggota:
                "",

            namaAnggota:
                "",

            referensi:
                referensi

        });


    if (
        !hasil ||
        !hasil.berhasil
    ) {

        return {

            berhasil: false,

            pesan:
                hasil &&
                hasil.pesan
                    ? hasil.pesan
                    : "Gagal mencatat Kas Investor"

        };

    }


    // =================================
    // SIMPAN DATABASE KAS
    // =================================

    if (
        typeof simpanDatabaseKasBBCS ===
        "function"
    ) {

        const tersimpan =
            simpanDatabaseKasBBCS();


        if (!tersimpan) {

            const index =
                kas.indexOf(
                    hasil.data
                );


            if (index >= 0) {

                kas.splice(
                    index,
                    1
                );

            }


            return {

                berhasil: false,

                pesan:
                    "Gagal menyimpan Kas Investor"

            };

        }

    }


    // =================================
    // LOG
    // =================================

    console.log(
        "Kas Investor berhasil dicatat.",
        {

            idInvestor:
                idInvestor,

            namaInvestor:
                namaInvestor,

            jenis:
                jenis,

            kategori:
                kategori,

            jumlah:
                jumlah,

            referensi:
                referensi

        }
    );


    return {

        berhasil:
            true,

        data:
            hasil.data

    };

};

// =====================================
// SETOR MODAL INVESTOR → KAS
// =====================================

function kasMasukModalInvestorBBCS(
    data
) {

    if (!data) {

        return {
            berhasil: false,
            pesan: "Data setor modal kosong"
        };

    }


    const idInvestor =
        String(
            data.idInvestor || ""
        ).trim();


    const namaInvestor =
        String(
            data.namaInvestor || ""
        ).trim();


    const jumlah =
        angkaKasBBCS(
            data.jumlah
        );


    const referensi =
        String(
            data.referensi || ""
        ).trim();


    if (!idInvestor) {

        return {
            berhasil: false,
            pesan: "ID investor wajib diisi"
        };

    }


    if (jumlah <= 0) {

        return {
            berhasil: false,
            pesan: "Jumlah modal harus lebih dari 0"
        };

    }


    if (!referensi) {

        return {
            berhasil: false,
            pesan: "Referensi setor modal wajib diisi"
        };

    }


    // =================================
    // CATAT KAS MASUK
    // =================================

    const hasil =
        catatKasInvestorBBCS({

            idInvestor:
                idInvestor,

            namaInvestor:
                namaInvestor,

            jenis:
                "Pemasukan",

            kategori:
                "Modal Investor",

            jumlah:
                jumlah,

            referensi:
                referensi,

            keterangan:
                "Setoran modal investor - " +
                namaInvestor

        });


    if (
        !hasil ||
        !hasil.berhasil
    ) {

        return {

            berhasil: false,

            pesan:
                hasil &&
                hasil.pesan
                    ? hasil.pesan
                    : "Gagal mencatat modal investor ke Kas"

        };

    }


    // =================================
    // CATAT TRANSAKSI CORE
    // =================================

    if (
        typeof tambahTransaksi ===
        "function"
    ) {

        tambahTransaksi(

            "Pemasukan",

            "Modal Investor",

            "Setoran modal investor - " +
            namaInvestor,

            jumlah,

            "",

            "",

            referensi

        );

    }


    console.log(
        "Modal investor masuk ke Kas.",
        {
            idInvestor:
                idInvestor,

            namaInvestor:
                namaInvestor,

            jumlah:
                jumlah,

            referensi:
                referensi
        }
    );


    return {

        berhasil:
            true,

        kas:
            hasil.data

    };

}
function kasKeluarJasaInvestorBBCS(data) {

    if (!data) {
        return {
            berhasil: false,
            pesan: "Data penarikan jasa kosong"
        };
    }

    const idInvestor =
        String(data.idInvestor || "").trim();

    const namaInvestor =
        String(data.namaInvestor || "").trim();

    const jumlah =
        angkaKasBBCS(data.jumlah);

    const referensi =
        String(data.referensi || "").trim();

    if (!idInvestor) {
        return {
            berhasil: false,
            pesan: "ID investor wajib diisi"
        };
    }

    if (jumlah <= 0) {
        return {
            berhasil: false,
            pesan: "Jumlah jasa harus lebih dari 0"
        };
    }

    if (!referensi) {
        return {
            berhasil: false,
            pesan: "Referensi penarikan jasa wajib diisi"
        };
    }

    const hasil =
        catatKasInvestorBBCS({

            idInvestor:
                idInvestor,

            namaInvestor:
                namaInvestor,

            jenis:
                "Pengeluaran",

            kategori:
                "Jasa Investor",

            jumlah:
                jumlah,

            referensi:
                referensi,

            keterangan:
                "Pembayaran jasa investor - " +
                namaInvestor

        });


    if (
        !hasil ||
        !hasil.berhasil
    ) {

        return {
            berhasil: false,
            pesan:
                hasil && hasil.pesan
                    ? hasil.pesan
                    : "Gagal mencatat pembayaran jasa ke Kas"
        };

    }


    // =================================
    // TRANSAKSI CORE
    // =================================

    if (
        typeof tambahTransaksi ===
        "function"
    ) {

        tambahTransaksi(

            "Pengeluaran",

            "Jasa Investor",

            "Pembayaran jasa investor - " +
            namaInvestor,

            jumlah,

            "",

            "",

            referensi

        );

    }


    console.log(
        "Kas keluar jasa investor berhasil.",
        {
            idInvestor:
                idInvestor,

            namaInvestor:
                namaInvestor,

            jumlah:
                jumlah,

            referensi:
                referensi
        }
    );


    return {

        berhasil:
            true,

        kas:
            hasil.data

    };

}

function kasKeluarModalInvestorBBCS(data) {

    if (!data) {
        return {
            berhasil: false,
            pesan: "Data penarikan modal kosong"
        };
    }

    const idInvestor =
        String(data.idInvestor || "").trim();

    const namaInvestor =
        String(data.namaInvestor || "").trim();

    const jumlah =
        angkaKasBBCS(data.jumlah);

    const referensi =
        String(data.referensi || "").trim();

    if (!idInvestor) {
        return {
            berhasil: false,
            pesan: "ID investor wajib diisi"
        };
    }

    if (jumlah <= 0) {
        return {
            berhasil: false,
            pesan: "Jumlah modal harus lebih dari 0"
        };
    }

    if (!referensi) {
        return {
            berhasil: false,
            pesan: "Referensi penarikan modal wajib diisi"
        };
    }


    const hasil =
        catatKasInvestorBBCS({

            idInvestor:
                idInvestor,

            namaInvestor:
                namaInvestor,

            jenis:
                "Pengeluaran",

            kategori:
                "Penarikan Modal Investor",

            jumlah:
                jumlah,

            referensi:
                referensi,

            keterangan:
                "Penarikan modal investor - " +
                namaInvestor

        });


    if (
        !hasil ||
        !hasil.berhasil
    ) {

        return {

            berhasil:
                false,

            pesan:
                hasil && hasil.pesan
                    ? hasil.pesan
                    : "Gagal mencatat penarikan modal ke Kas"

        };

    }


    // =================================
    // TRANSAKSI CORE
    // =================================

    if (
        typeof tambahTransaksi ===
        "function"
    ) {

        tambahTransaksi(

            "Pengeluaran",

            "Penarikan Modal Investor",

            "Penarikan modal investor - " +
            namaInvestor,

            jumlah,

            "",
            "",
            referensi

        );

    }


    console.log(
        "Kas keluar modal investor berhasil.",
        {
            idInvestor:
                idInvestor,

            namaInvestor:
                namaInvestor,

            jumlah:
                jumlah,

            referensi:
                referensi
        }
    );


    return {

        berhasil:
            true,

        kas:
            hasil.data

    };

}
function kasMasukAdministrasiInvestorBBCS(data) {

    if (!data) {
        return {
            berhasil: false,
            pesan: "Data pendapatan administrasi kosong"
        };
    }

    const idInvestor =
        String(data.idInvestor || "").trim();

    const namaInvestor =
        String(data.namaInvestor || "").trim();

    const jumlah =
        angkaKasBBCS(data.jumlah);

    const referensi =
        String(data.referensi || "").trim();

    if (!idInvestor) {
        return {
            berhasil: false,
            pesan: "ID investor wajib diisi"
        };
    }

    if (jumlah <= 0) {
        return {
            berhasil: false,
            pesan: "Pendapatan administrasi harus lebih dari 0"
        };
    }

    if (!referensi) {
        return {
            berhasil: false,
            pesan: "Referensi administrasi wajib diisi"
        };
    }

    const hasil =
        catatKasInvestorBBCS({

            idInvestor:
                idInvestor,

            namaInvestor:
                namaInvestor,

            jenis:
                "Pemasukan",

            kategori:
                "Pendapatan Administrasi",

            jumlah:
                jumlah,

            referensi:
                referensi,

            keterangan:
                "Pendapatan administrasi penarikan modal - " +
                namaInvestor

        });

    if (
        !hasil ||
        !hasil.berhasil
    ) {

        return {
            berhasil: false,
            pesan:
                hasil && hasil.pesan
                    ? hasil.pesan
                    : "Gagal mencatat pendapatan administrasi"
        };

    }

    if (
        typeof tambahTransaksi ===
        "function"
    ) {

        tambahTransaksi(

            "Pemasukan",

            "Pendapatan Administrasi",

            "Pendapatan administrasi penarikan modal - " +
            namaInvestor,

            jumlah,

            "",
            "",
            referensi

        );

    }

    console.log(
        "Pendapatan administrasi investor berhasil dicatat.",
        {
            idInvestor:
                idInvestor,

            namaInvestor:
                namaInvestor,

            jumlah:
                jumlah,

            referensi:
                referensi
        }
    );

    return {

        berhasil:
            true,

        kas:
            hasil.data

    };

}


// =====================================
// EXPORT GLOBAL
// =====================================

window.kasMasukAdministrasiInvestorBBCS =
    kasMasukAdministrasiInvestorBBCS;
    

// =====================================
// STATUS KONEKTOR
// =====================================

console.log(
    "===================================="
);

console.log(
    "KONEKTOR INVESTOR -> KAS AKTIF"
);

console.log(
    "catatKasInvestorBBCS :",
    typeof window.catatKasInvestorBBCS
);

console.log(
    "===================================="
);