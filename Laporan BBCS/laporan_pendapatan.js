// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MESIN LAPORAN PENDAPATAN BBCS
// VERSI PEMBARUAN
// =====================================
//
// SUMBER PENDAPATAN:
//
// 1. Admin Pinjaman
// 2. Admin Investor
// 3. Jasa
// 4. Denda
// 5. Pendapatan Transaksi Umum
//
// LABA NETTO
// = Pendapatan Bruto - Pengeluaran
//
// BUKAN PENDAPATAN:
// - Pencairan Pinjaman
// - Simpanan
// - Modal Investor
// - Penarikan Modal
// - Pokok Angsuran
// =====================================

console.log(
    "Mesin Laporan Pendapatan BBCS mulai"
);


// =====================================
// KONSTANTA
// =====================================

const LP_SUMBER_TRANSAKSI_UMUM =
    "TRANSAKSI_UMUM";

const LP_PENDAPATAN =
    "PENDAPATAN";

const LP_PENGURANG_LABA =
    "PENGURANG_LABA";


// =====================================
// ANGKA AMAN
// =====================================

function angkaLaporanPendapatan(nilai) {

    let angka =
        Number(nilai || 0);

    if (!Number.isFinite(angka)) {
        return 0;
    }

    return angka;
}


// =====================================
// AMBIL DATABASE AMAN
// =====================================

function ambilDataLaporanPendapatan(
    nama
) {

    try {

        if (
            typeof window[nama] !==
            "undefined" &&
            Array.isArray(window[nama])
        ) {

            return window[nama];

        }

    } catch (error) {

        console.warn(
            "Gagal membaca global:",
            nama,
            error
        );

    }


    try {

        const data =
            localStorage.getItem(nama);

        if (!data) {
            return [];
        }

        const hasil =
            JSON.parse(data);

        return Array.isArray(hasil)
            ? hasil
            : [];

    } catch (error) {

        console.warn(
            "Gagal membaca database:",
            nama,
            error
        );

        return [];

    }

}


// =====================================
// ADMIN PINJAMAN
// =====================================
//
// Identitas resmi:
//
// jenis       = Pemasukan
// kategori    = Pendapatan Administrasi
// referensi   = PJxxxxx-ADMIN
//
// Kompatibilitas juga menerima
// referensi yang mengandung ADMIN.
// =====================================

function hitungAdminPinjamanBBCS() {

    const data =
        ambilDataLaporanPendapatan(
            "transaksi"
        );

    let total = 0;


    data.forEach(function(item) {

        if (!item) {
            return;
        }


        const jenis =
            String(
                item.jenis || ""
            ).trim();


        const kategori =
            String(
                item.kategori || ""
            ).trim();


        const referensi =
            String(
                item.referensi || ""
            ).trim()
            .toUpperCase();


        // Identitas utama
        if (

            jenis === "Pemasukan"

            &&

            kategori ===
                "Pendapatan Administrasi"

            &&

            referensi.endsWith(
                "-ADMIN"
            )

        ) {

            total +=
                angkaLaporanPendapatan(
                    item.jumlah
                );

            return;

        }


        // Kompatibilitas data lama
        if (

            jenis === "Pemasukan"

            &&

            kategori ===
                "Pendapatan Administrasi"

            &&

            referensi.startsWith(
                "PJ"
            )

            &&

            referensi.includes(
                "ADMIN"
            )

        ) {

            total +=
                angkaLaporanPendapatan(
                    item.jumlah
                );

        }

    });


    return total;
}

// =====================================
// ADMIN INVESTOR
// =====================================
//
// SUMBER:
// KAS BBCS
//
// Kategori:
// Pendapatan Administrasi
//
// Referensi:
// INV-ADMIN-TARIK-MODAL-...
// =====================================

function hitungAdminInvestorBBCS() {

    const data =
        Array.isArray(kas)
            ? kas
            : [];


    let total = 0;


    data.forEach(function(item) {

        if (!item) {

            return;

        }


        const jenis =
            String(
                item.jenis || ""
            )
            .trim()
            .toUpperCase();


        const kategori =
            String(
                item.kategori || ""
            )
            .trim()
            .toUpperCase();


        const referensi =
            String(
                item.referensi || ""
            )
            .trim()
            .toUpperCase();


        // =================================
        // REFERENSI RESMI INVESTOR
        // =================================

        if (
            referensi.indexOf(
                "INV-ADMIN-TARIK-MODAL-"
            ) === 0
        ) {

            const jumlah =
                angkaLaporanPendapatan(
                    item.jumlah
                );


            if (
                jumlah > 0
            ) {

                total +=
                    jumlah;

            }


            return;

        }


        // =================================
        // KOMPATIBILITAS
        // =================================

        if (

            jenis ===
                "PEMASUKAN"

            &&

            kategori.includes(
                "PENDAPATAN ADMINISTRASI"
            )

            &&

            referensi.indexOf(
                "INV-"
            ) === 0

        ) {

            const jumlah =
                angkaLaporanPendapatan(
                    item.jumlah
                );


            if (
                jumlah > 0
            ) {

                total +=
                    jumlah;

            }

        }

    });


    console.log(
        "TOTAL ADMIN INVESTOR:",
        total
    );


    return total;

}

// =====================================
// AMBIL JASA DARI RIWAYAT ANGSURAN
// =====================================
//
// Prioritas:
//
// 1. totalJasa
// 2. jasa
// 3. jasaBerjalan + jasaWajib
// 4. jasaTertunggak
//
// Pokok tidak dihitung sebagai pendapatan.
// =====================================

function ambilJasaPendapatanBBCS(
    item
) {

    if (
        !item ||
        typeof item !== "object"
    ) {

        return 0;

    }


    if (
        item.totalJasa !==
            undefined &&
        item.totalJasa !==
            null
    ) {

        return angkaLaporanPendapatan(
            item.totalJasa
        );

    }


    if (
        item.jasa !==
            undefined &&
        item.jasa !==
            null
    ) {

        return angkaLaporanPendapatan(
            item.jasa
        );

    }


    const jasaBerjalan =
        angkaLaporanPendapatan(
            item.jasaBerjalan
        );


    let jasaWajib =
        angkaLaporanPendapatan(
            item.jasaWajib
        );


    if (
        jasaWajib === 0 &&
        item.jasaWajib ===
            undefined
    ) {

        jasaWajib =
            angkaLaporanPendapatan(
                item.jasaTertunggak
            );

    }


    return (
        jasaBerjalan +
        jasaWajib
    );
}


// =====================================
// JASA
// =====================================
//
// Mengambil dari riwayatAngsuran.
//
// Catatan:
// Pokok angsuran TIDAK dihitung.
// =====================================

function hitungJasaBBCS() {

    const data =
        ambilDataLaporanPendapatan(
            "riwayatAngsuran"
        );

    let total = 0;


    data.forEach(function(item) {

        total +=
            ambilJasaPendapatanBBCS(
                item
            );

    });


    return total;
}


// =====================================
// DENDA
// =====================================

function hitungDendaBBCS() {

    const data =
        ambilDataLaporanPendapatan(
            "riwayatAngsuran"
        );

    let total = 0;


    data.forEach(function(item) {

        if (!item) {
            return;
        }


        total +=
            angkaLaporanPendapatan(
                item.denda
            );

    });


    return total;
}


// =====================================
// TRANSAKSI UMUM
// =====================================
//
// Pemasukan:
// → Pendapatan
//
// Pengeluaran:
// → Pengurang Laba
//
// Hanya membaca:
// sumber = TRANSAKSI_UMUM
// =====================================

function hitungTransaksiUmumPendapatanBBCS() {

    const hasil = {

        pendapatan: 0,

        pengeluaran: 0

    };


    const data =
        ambilDataLaporanPendapatan(
            "transaksi"
        );


    data.forEach(function(item) {

        if (!item) {
            return;
        }


        if (
            item.sumber !==
            LP_SUMBER_TRANSAKSI_UMUM
        ) {

            return;

        }


        const jumlah =
            angkaLaporanPendapatan(
                item.jumlah
            );


        // =============================
        // PENDAPATAN
        // =============================

        if (

            item.klasifikasi ===
                LP_PENDAPATAN

            ||

            item.tipeLaporan ===
                LP_PENDAPATAN

        ) {

            hasil.pendapatan +=
                jumlah;

            return;

        }


        // =============================
        // PENGURANG LABA
        // =============================

        if (

            item.klasifikasi ===
                LP_PENGURANG_LABA

            ||

            item.tipeLaporan ===
                LP_PENGURANG_LABA

        ) {

            hasil.pengeluaran +=
                jumlah;

        }

    });


    return hasil;
}


// =====================================
// MESIN UTAMA
// =====================================

function hitungLaporanPendapatanBBCS() {

    const adminPinjaman =
        hitungAdminPinjamanBBCS();


    const adminInvestor =
        hitungAdminInvestorBBCS();


    const jasa =
        hitungJasaBBCS();


    const denda =
        hitungDendaBBCS();


    const transaksiUmum =
        hitungTransaksiUmumPendapatanBBCS();


    const pendapatanTransaksiUmum =
        transaksiUmum.pendapatan;


    const pengeluaranTransaksiUmum =
        transaksiUmum.pengeluaran;


    // =================================
    // JASA INVESTOR
    // =================================
    // Jasa Investor adalah beban BBCS.
    // Tidak masuk Pendapatan Bruto.
    // =================================

    const jasaInvestor =
        typeof ambilJasaInvestor === "function"
            ? ambilJasaInvestor()
            : 0;


    // =================================
    // TOTAL PENGELUARAN
    // =================================

    const totalPengeluaran =
        pengeluaranTransaksiUmum +
        jasaInvestor;


    // =================================
    // PENDAPATAN BRUTO
    // =================================

    const pendapatanBruto =

        adminPinjaman +

        adminInvestor +

        jasa +

        denda +

        pendapatanTransaksiUmum;


    // =================================
    // LABA NETTO
    // =================================

    const labaNetto =

        pendapatanBruto -

        totalPengeluaran;


    return {

        adminPinjaman:
            adminPinjaman,

        adminInvestor:
            adminInvestor,

        jasa:
            jasa,

        denda:
            denda,

        pendapatanTransaksiUmum:
            pendapatanTransaksiUmum,

        pendapatanBruto:
            pendapatanBruto,

        pengeluaranTransaksiUmum:
            pengeluaranTransaksiUmum,

        jasaInvestor:
            jasaInvestor,

        totalPengeluaran:
            totalPengeluaran,

        labaNetto:
            labaNetto

    };
}
// =====================================
// TAMPIL LAPORAN PENDAPATAN BBCS
// =====================================

function tampilLaporanPendapatanBBCS(){

    console.log(
        "Laporan Pendapatan BBCS diproses"
    );


    // =================================
    // HITUNG DATA
    // =================================

    const hasil =
        hitungLaporanPendapatanBBCS();


    // =================================
    // FUNGSI TAMPIL
    // =================================

    function tampilkan(id, nilai){

        const el =
            document.getElementById(id);


        if(!el){

            console.warn(
                "Elemen laporan pendapatan tidak ditemukan:",
                id
            );

            return;

        }


        el.innerText =
            rupiah(
                Number(nilai) || 0
            );

    }


    // =================================
    // ADMIN PINJAMAN
    // =================================

    tampilkan(
        "laporanPendapatanAdminPinjaman",
        hasil.adminPinjaman
    );


    // =================================
    // ADMIN INVESTOR
    // =================================

    tampilkan(
        "laporanPendapatanAdminInvestor",
        hasil.adminInvestor
    );


    // =================================
    // JASA
    // =================================

    tampilkan(
        "laporanPendapatanJasa",
        hasil.jasa
    );


    // =================================
    // DENDA
    // =================================

    tampilkan(
        "laporanPendapatanDenda",
        hasil.denda
    );


    // =================================
    // TRANSAKSI UMUM
    // =================================

    tampilkan(
        "laporanPendapatanUmum",
        hasil.pendapatanTransaksiUmum
    );


    // =================================
    // PENDAPATAN BRUTO
    // =================================

    tampilkan(
        "laporanPendapatanBruto",
        hasil.pendapatanBruto
    );


    // =================================
    // PENGELUARAN TRANSAKSI UMUM
    // =================================

    tampilkan(
        "laporanPendapatanPengeluaranUmum",
        hasil.pengeluaranTransaksiUmum
    );


    // =================================
    // JASA INVESTOR
    // =================================

    tampilkan(
        "laporanPendapatanJasaInvestor",
        hasil.jasaInvestor
    );


    // =================================
    // TOTAL PENGELUARAN
    // =================================

    tampilkan(
        "laporanPendapatanPengeluaran",
        hasil.totalPengeluaran
    );


    // =================================
    // LABA NETTO
    // =================================

    tampilkan(
        "laporanPendapatanLabaNetto",
        hasil.labaNetto
    );


    // =================================
    // AUDIT
    // =================================

    console.log(
        "Laporan Pendapatan BBCS selesai"
    );

    console.log(
        hasil
    );


    return hasil;

}


// =====================================
// FORMAT RUPIAH AMAN
// =====================================

function formatRupiahPendapatanBBCS(
    nilai
) {

    const angka =
        angkaLaporanPendapatan(
            nilai
        );


    if (
        typeof rupiah ===
        "function"
    ) {

        return rupiah(angka);

    }


    return (
        "Rp " +
        angka.toLocaleString(
            "id-ID"
        )
    );

}


// =====================================
// ISI ELEMEN LAPORAN
// =====================================
//
// Mendukung beberapa kemungkinan ID
// agar tidak merusak laporan yang sudah ada.
// =====================================

function isiElemenPendapatanBBCS(
    daftarId,
    nilai
) {

    for (
        let i = 0;
        i < daftarId.length;
        i++
    ) {

        const el =
            document.getElementById(
                daftarId[i]
            );


        if (el) {

            el.innerText =
                formatRupiahPendapatanBBCS(
                    nilai
                );

            return true;

        }

    }


    console.warn(
        "Elemen laporan pendapatan tidak ditemukan:",
        daftarId[0]
    );


    return false;
}


// =====================================
// TAMPIL LAPORAN PENDAPATAN
// =====================================

function tampilLaporanPendapatanBBCS() {

    console.log(
        "Laporan Pendapatan BBCS diproses"
    );


    const hasil =
        hitungLaporanPendapatanBBCS();


    // =================================
    // ADMIN PINJAMAN
    // =================================

    isiElemenPendapatanBBCS(

        [
            "laporanAdminPinjaman",
            "laporanPendapatanAdminPinjaman"
        ],

        hasil.adminPinjaman

    );


    // =================================
    // ADMIN INVESTOR
    // =================================

    isiElemenPendapatanBBCS(

        [
            "laporanAdminInvestor",
            "laporanPendapatanAdminInvestor"
        ],

        hasil.adminInvestor

    );


    // =================================
    // JASA
    // =================================

    isiElemenPendapatanBBCS(

        [
            "laporanJasa",
            "laporanPendapatanJasa"
        ],

        hasil.jasa

    );


    // =================================
    // DENDA
    // =================================

    isiElemenPendapatanBBCS(

        [
            "laporanDenda",
            "laporanPendapatanDenda"
        ],

        hasil.denda

    );


    // =================================
    // TRANSAKSI UMUM
    // =================================

    isiElemenPendapatanBBCS(

        [
            "laporanPendapatanTransaksiUmum",
            "laporanTransaksiUmum",
            "laporanPendapatanUmum"
        ],

        hasil.pendapatanTransaksiUmum

    );


    // =================================
    // PENDAPATAN BRUTO
    // =================================

    isiElemenPendapatanBBCS(

        [
            "laporanPendapatanBruto",
            "laporanBruto"
        ],

        hasil.pendapatanBruto

    );


// =================================
// PENGELUARAN TRANSAKSI UMUM
// =================================

isiElemenPendapatanBBCS(

    [
        "laporanPendapatanPengeluaranUmum"
    ],

    hasil.pengeluaranTransaksiUmum

);

// =================================
// JASA INVESTOR
// =================================

isiElemenPendapatanBBCS(

    [
        "laporanPendapatanJasaInvestor"
    ],

    hasil.jasaInvestor

);

// =================================
// TOTAL PENGELUARAN
// =================================

isiElemenPendapatanBBCS(

    [
        "laporanPendapatanPengeluaran"
    ],

    hasil.totalPengeluaran

);

// =================================
// LABA NETTO
// =================================

isiElemenPendapatanBBCS(

    [
        "laporanPendapatanLabaNetto"
    ],

    hasil.labaNetto

);

    // =================================
    // LOG
    // =================================

    console.log(
        "Laporan Pendapatan BBCS selesai"
    );


    console.log(
        hasil
    );


    return hasil;
}


// =====================================
// AUDIT
// =====================================

function auditLaporanPendapatanBBCS() {

    const hasil =
        hitungLaporanPendapatanBBCS();


    console.log(
        "====================================="
    );

    console.log(
        "📈 AUDIT LAPORAN PENDAPATAN BBCS"
    );

    console.log(
        "====================================="
    );


    console.log(
        "Admin Pinjaman      :",
        hasil.adminPinjaman
    );


    console.log(
        "Admin Investor      :",
        hasil.adminInvestor
    );


    console.log(
        "Jasa                :",
        hasil.jasa
    );


    console.log(
        "Denda               :",
        hasil.denda
    );


    console.log(
        "Pendapatan Umum     :",
        hasil.pendapatanTransaksiUmum
    );


    console.log(
        "Pendapatan Bruto    :",
        hasil.pendapatanBruto
    );


    console.log(
        "Pengeluaran         :",
        hasil.totalPengeluaran
    );


    console.log(
        "Laba Netto          :",
        hasil.labaNetto
    );


    console.log(
        "====================================="
    );


    return hasil;
}


// =====================================
// EXPORT GLOBAL
// =====================================

window.hitungAdminPinjamanBBCS =
    hitungAdminPinjamanBBCS;


window.hitungAdminInvestorBBCS =
    hitungAdminInvestorBBCS;


window.hitungJasaBBCS =
    hitungJasaBBCS;


window.hitungDendaBBCS =
    hitungDendaBBCS;


window.hitungTransaksiUmumPendapatanBBCS =
    hitungTransaksiUmumPendapatanBBCS;


window.hitungLaporanPendapatanBBCS =
    hitungLaporanPendapatanBBCS;


window.tampilLaporanPendapatanBBCS =
    tampilLaporanPendapatanBBCS;


window.auditLaporanPendapatanBBCS =
    auditLaporanPendapatanBBCS;


console.log(
    "✅ Mesin Laporan Pendapatan BBCS siap."
);
// =====================================
// EXPORT GLOBAL
// =====================================

window.tampilLaporanPendapatanBBCS =
    tampilLaporanPendapatanBBCS;

console.log(
    "✅ Tampilan Laporan Pendapatan BBCS siap."
); 