// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL LAPORAN ANGSURAN
// E-BOOK / PAGINATION
// =====================================

console.log("Laporan Angsuran BBCS mulai");


// =====================================
// STATE E-BOOK
// =====================================

let halamanAngsuran = 1;
let dataPerHalamanAngsuran = 20;
let dataLaporanAngsuran = [];


// =====================================
// FORMAT ANGKA
// =====================================

function nilaiLaporanAngsuran(nilai) {
    return Number(nilai) || 0;
}


// =====================================
// AMBIL NILAI JASA
//
// Prioritas:
// 1. totalJasa
// 2. jasa lama
// 3. jasaBerjalan + jasaWajib
//
// Kompatibel dengan:
// jasa
// jasaBerjalan
// jasaWajib
// jasaTertunggak
// totalJasa
// =====================================

function ambilJasaLaporanAngsuran(a) {

    if (!a || typeof a !== "object") {
        return 0;
    }

    // Jika sudah tersimpan total jasa
    if (
        a.totalJasa !== undefined &&
        a.totalJasa !== null
    ) {
        return nilaiLaporanAngsuran(a.totalJasa);
    }

    // Data lama yang langsung menyimpan jasa
    if (
        a.jasa !== undefined &&
        a.jasa !== null
    ) {
        return nilaiLaporanAngsuran(a.jasa);
    }

    const jasaBerjalan =
        nilaiLaporanAngsuran(a.jasaBerjalan);

    let jasaWajib =
        nilaiLaporanAngsuran(a.jasaWajib);

    // Kompatibilitas data lama
    if (
        jasaWajib === 0 &&
        a.jasaWajib === undefined
    ) {
        jasaWajib =
            nilaiLaporanAngsuran(a.jasaTertunggak);
    }

    return jasaBerjalan + jasaWajib;
}


// =====================================
// BUAT KONTROL E-BOOK
// =====================================

function siapkanKontrolEbookAngsuran() {

    const tabel =
        document.querySelector(
            "#panelAngsuran .tabelLaporan"
        );

    if (!tabel) {
        console.warn(
            "Tabel laporan angsuran tidak ditemukan"
        );
        return;
    }

    let kontrol =
        document.getElementById(
            "kontrolEbookAngsuran"
        );

    // Jangan membuat kontrol dua kali
    if (kontrol) {
        return;
    }

    kontrol =
        document.createElement("div");

    kontrol.id =
        "kontrolEbookAngsuran";

    kontrol.innerHTML = `
        <div class="ebook-header">

            <div>
                <strong>📖 BUKU RIWAYAT ANGSURAN</strong>

                <small>
                    Riwayat pembayaran dibagi menjadi beberapa halaman
                </small>
            </div>

        </div>

        <div class="ebook-kontrol">

            <button
                type="button"
                id="btnAngsuranPertama"
                onclick="keHalamanPertamaAngsuran()"
            >
                ⏮
            </button>

            <button
                type="button"
                id="btnAngsuranSebelumnya"
                onclick="halamanSebelumnyaAngsuran()"
            >
                ◀ Sebelumnya
            </button>

            <div
                id="nomorHalamanAngsuran"
                class="ebook-halaman"
            >
                Halaman 1 / 1
            </div>

            <button
                type="button"
                id="btnAngsuranBerikutnya"
                onclick="halamanBerikutnyaAngsuran()"
            >
                Berikutnya ▶
            </button>

            <button
                type="button"
                id="btnAngsuranTerakhir"
                onclick="keHalamanTerakhirAngsuran()"
            >
                ⏭
            </button>

        </div>

        <div class="ebook-info">

            <span id="infoDataAngsuran">
                Data 0 - 0 dari 0
            </span>

            <select
                id="pilihDataPerHalamanAngsuran"
                onchange="ubahDataPerHalamanAngsuran(this.value)"
            >

                <option value="10">
                    10 data / halaman
                </option>

                <option value="20" selected>
                    20 data / halaman
                </option>

                <option value="50">
                    50 data / halaman
                </option>

                <option value="100">
                    100 data / halaman
                </option>

            </select>

        </div>
    `;

    tabel.parentNode.insertBefore(
        kontrol,
        tabel
    );
}


// =====================================
// JUMLAH HALAMAN
// =====================================

function jumlahHalamanAngsuran() {

    if (
        dataLaporanAngsuran.length === 0
    ) {
        return 1;
    }

    return Math.ceil(
        dataLaporanAngsuran.length /
        dataPerHalamanAngsuran
    );
}


// =====================================
// TAMPIL HALAMAN ANGSURAN
// =====================================

function tampilHalamanAngsuran() {

    const tempat =
        document.getElementById(
            "isiLaporanAngsuran"
        );

    if (!tempat) {
        return;
    }

    const totalHalaman =
        jumlahHalamanAngsuran();

    // Pastikan halaman valid
    if (halamanAngsuran < 1) {
        halamanAngsuran = 1;
    }

    if (
        halamanAngsuran >
        totalHalaman
    ) {
        halamanAngsuran =
            totalHalaman;
    }

    const mulai =
        (halamanAngsuran - 1) *
        dataPerHalamanAngsuran;

    const selesai =
        mulai +
        dataPerHalamanAngsuran;

    const dataHalaman =
        dataLaporanAngsuran.slice(
            mulai,
            selesai
        );

    let isi = "";

    // =================================
    // DATA KOSONG
    // =================================

    if (dataHalaman.length === 0) {

        isi = `
            <tr>
                <td
                    colspan="10"
                    style="text-align:center;"
                >
                    Belum ada riwayat angsuran.
                </td>
            </tr>
        `;

    }

    // =================================
    // DATA TERSEDIA
    // =================================

    else {

        dataHalaman.forEach(
            function(a, index) {

                const nomor =
                    mulai + index + 1;

                const pokok =
                    nilaiLaporanAngsuran(
                        a.pokok
                    );

                const jasa =
                    ambilJasaLaporanAngsuran(
                        a
                    );

                const denda =
                    nilaiLaporanAngsuran(
                        a.denda
                    );

                const total =
                    nilaiLaporanAngsuran(
                        a.total
                    );

                const tanggal =
                    a.tanggal || "-";

                const idPinjaman =
                    a.idPinjaman || "-";

                const idAnggota =
                    a.idAnggota || "-";

                const nama =
                    a.namaAnggota ||
                    a.nama ||
                    "-";

                const periode =
                    a.periode ||
                    a.bulanPembayaran ||
                    "-";

                isi += `
                    <tr>

                        <td>
                            ${nomor}
                        </td>

                        <td>
                            ${tanggal}
                        </td>

                        <td>
                            ${idPinjaman}
                        </td>

                        <td>
                            ${idAnggota}
                        </td>

                        <td>
                            ${nama}
                        </td>

                        <td>
                            ${periode}
                        </td>

                        <td>
                            ${rupiah(pokok)}
                        </td>

                        <td>
                            ${rupiah(jasa)}
                        </td>

                        <td>
                            ${rupiah(denda)}
                        </td>

                        <td>
                            ${rupiah(total)}
                        </td>

                    </tr>
                `;
            }
        );
    }

    tempat.innerHTML = isi;

    perbaruiKontrolEbookAngsuran(
        mulai,
        dataHalaman.length,
        totalHalaman
    );
}


// =====================================
// UPDATE KONTROL E-BOOK
// =====================================

function perbaruiKontrolEbookAngsuran(
    mulai,
    jumlahData,
    totalHalaman
) {

    const nomor =
        document.getElementById(
            "nomorHalamanAngsuran"
        );

    if (nomor) {

        nomor.innerHTML = `
            Halaman
            <strong>
                ${halamanAngsuran}
            </strong>
            /
            ${totalHalaman}
        `;

    }

    const akhir =
        dataLaporanAngsuran.length === 0
            ? 0
            : mulai + jumlahData;

    const awal =
        dataLaporanAngsuran.length === 0
            ? 0
            : mulai + 1;

    const info =
        document.getElementById(
            "infoDataAngsuran"
        );

    if (info) {

        info.innerText =
            `Data ${awal} - ${akhir} dari ${dataLaporanAngsuran.length}`;

    }

    const sebelumnya =
        document.getElementById(
            "btnAngsuranSebelumnya"
        );

    const berikutnya =
        document.getElementById(
            "btnAngsuranBerikutnya"
        );

    const pertama =
        document.getElementById(
            "btnAngsuranPertama"
        );

    const terakhir =
        document.getElementById(
            "btnAngsuranTerakhir"
        );

    if (sebelumnya) {
        sebelumnya.disabled =
            halamanAngsuran <= 1;
    }

    if (pertama) {
        pertama.disabled =
            halamanAngsuran <= 1;
    }

    if (berikutnya) {
        berikutnya.disabled =
            halamanAngsuran >= totalHalaman;
    }

    if (terakhir) {
        terakhir.disabled =
            halamanAngsuran >= totalHalaman;
    }
}


// =====================================
// HALAMAN BERIKUTNYA
// =====================================

function halamanBerikutnyaAngsuran() {

    const total =
        jumlahHalamanAngsuran();

    if (
        halamanAngsuran <
        total
    ) {

        halamanAngsuran++;

        tampilHalamanAngsuran();

        scrollKeEbookAngsuran();
    }
}


// =====================================
// HALAMAN SEBELUMNYA
// =====================================

function halamanSebelumnyaAngsuran() {

    if (
        halamanAngsuran > 1
    ) {

        halamanAngsuran--;

        tampilHalamanAngsuran();

        scrollKeEbookAngsuran();
    }
}


// =====================================
// HALAMAN PERTAMA
// =====================================

function keHalamanPertamaAngsuran() {

    halamanAngsuran = 1;

    tampilHalamanAngsuran();

    scrollKeEbookAngsuran();
}


// =====================================
// HALAMAN TERAKHIR
// =====================================

function keHalamanTerakhirAngsuran() {

    halamanAngsuran =
        jumlahHalamanAngsuran();

    tampilHalamanAngsuran();

    scrollKeEbookAngsuran();
}


// =====================================
// JUMLAH DATA PER HALAMAN
// =====================================

function ubahDataPerHalamanAngsuran(
    nilai
) {

    let angka =
        Number(nilai);

    if (
        !angka ||
        angka < 1
    ) {
        angka = 20;
    }

    dataPerHalamanAngsuran =
        angka;

    halamanAngsuran = 1;

    tampilHalamanAngsuran();
}


// =====================================
// SCROLL KE E-BOOK
// =====================================

function scrollKeEbookAngsuran() {

    const kontrol =
        document.getElementById(
            "kontrolEbookAngsuran"
        );

    if (!kontrol) {
        return;
    }

    kontrol.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// =====================================
// RINGKASAN ANGSURAN
// =====================================

function tampilRingkasanAngsuran(
    jumlah,
    pokok,
    jasa,
    denda,
    total
) {

    let el =
        document.getElementById(
            "laporanJumlahAngsuran"
        );

    if (el) {
        el.innerText = jumlah;
    }

    el =
        document.getElementById(
            "laporanAngsuranPokok"
        );

    if (el) {
        el.innerText =
            rupiah(pokok);
    }

    el =
        document.getElementById(
            "laporanAngsuranJasa"
        );

    if (el) {
        el.innerText =
            rupiah(jasa);
    }

    el =
        document.getElementById(
            "laporanAngsuranDenda"
        );

    if (el) {
        el.innerText =
            rupiah(denda);
    }

    el =
        document.getElementById(
            "laporanAngsuranTotal"
        );

    if (el) {
        el.innerText =
            rupiah(total);
    }
}


// =====================================
// LAPORAN ANGSURAN
// =====================================

function tampilLaporanAngsuran() {

    console.log(
        "Laporan Angsuran BBCS diproses"
    );

    const tempat =
        document.getElementById(
            "isiLaporanAngsuran"
        );

    if (!tempat) {

        console.warn(
            "Elemen isiLaporanAngsuran tidak ditemukan"
        );

        return;
    }

    // =================================
    // SIAPKAN E-BOOK
    // =================================

    siapkanKontrolEbookAngsuran();

    // =================================
    // CEK DATABASE
    // =================================

    if (
        !Array.isArray(
            riwayatAngsuran
        ) ||
        riwayatAngsuran.length === 0
    ) {

        dataLaporanAngsuran = [];

        halamanAngsuran = 1;

        tampilRingkasanAngsuran(
            0,
            0,
            0,
            0,
            0
        );

        tampilHalamanAngsuran();

        console.log(
            "Belum ada riwayat angsuran"
        );

        return;
    }

    // =================================
    // TOTAL
    // =================================

    let totalPokok = 0;
    let totalJasa = 0;
    let totalDenda = 0;
    let totalAngsuran = 0;
    let jumlahPembayaran = 0;

    // =================================
    // HITUNG TOTAL
    // =================================

    riwayatAngsuran.forEach(
        function(a) {

            totalPokok +=
                nilaiLaporanAngsuran(
                    a.pokok
                );

            totalJasa +=
                ambilJasaLaporanAngsuran(
                    a
                );

            totalDenda +=
                nilaiLaporanAngsuran(
                    a.denda
                );

            totalAngsuran +=
                nilaiLaporanAngsuran(
                    a.total
                );

            jumlahPembayaran++;
        }
    );

    // =================================
    // TAMPILKAN RINGKASAN
    // =================================

    tampilRingkasanAngsuran(
        jumlahPembayaran,
        totalPokok,
        totalJasa,
        totalDenda,
        totalAngsuran
    );

    // =================================
    // SALIN DATA
    // TERBARU DI ATAS
    // =================================

    dataLaporanAngsuran =
        [...riwayatAngsuran].reverse();

    // =================================
    // MULAI DARI HALAMAN 1
    // =================================

    halamanAngsuran = 1;

    tampilHalamanAngsuran();

    console.log(
        "Laporan Angsuran BBCS selesai"
    );
}


// =====================================
// SELESAI
// =====================================

console.log(
    "Laporan Angsuran BBCS siap"
);
