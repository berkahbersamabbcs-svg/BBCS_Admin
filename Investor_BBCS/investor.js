// =====================================
// BERKAH BERSAMA CORE SYSTEM
// UI INVESTOR BBCS V2.3
// BAGIAN 1/3
// =====================================

"use strict";

console.log("====================================");
console.log("UI INVESTOR BBCS V2.3 MEMUAT...");
console.log("====================================");
// =====================================
// SIMPAN INVESTOR DARI FORM UI
// =====================================

function simpanInvestorUI() {

    // =================================
    // AMBIL FORM
    // =================================

    const inputNama =
        document.getElementById(
            "namaInvestor"
        );

    const inputJasa =
        document.getElementById(
            "jasaInvestor"
        );


    if (
        !inputNama ||
        !inputJasa
    ) {

        alert(
            "Form data investor tidak ditemukan."
        );

        return;

    }


    // =================================
    // AMBIL NILAI
    // =================================

    const nama =
        inputNama.value.trim();

    const jasa =
        Number(
            inputJasa.value
        ) || 0;


    // =================================
    // VALIDASI
    // =================================

    if (!nama) {

        alert(
            "Nama investor belum diisi."
        );

        inputNama.focus();

        return;

    }


    if (jasa <= 0) {

        alert(
            "Jasa investor harus lebih dari 0%."
        );

        inputJasa.focus();

        return;

    }


    // =================================
    // CEK MESIN
    // =================================

    if (
        typeof simpanInvestorBBCS !==
        "function"
    ) {

        alert(
            "Mesin simpan investor belum tersedia."
        );

        console.error(
            "simpanInvestorBBCS() tidak ditemukan."
        );

        return;

    }


    // =================================
    // SIMPAN KE MESIN INVESTOR
    // =================================

    const berhasil =
        simpanInvestorBBCS(
            nama,
            jasa
        );


    // =================================
    // GAGAL
    // =================================

    if (!berhasil) {

        return;

    }


    // =================================
    // BERSIHKAN FORM
    // =================================

    inputNama.value =
        "";

    inputJasa.value =
        "";


    // =================================
    // SELESAI
    // =================================

    alert(
        "Investor berhasil disimpan."
    );


    console.log(
        "✅ Investor UI berhasil disimpan:",
        {
            nama:
                nama,

            jasa:
                jasa
        }
    );

}


// =====================================
// EXPORT GLOBAL
// =====================================

window.simpanInvestorUI =
    simpanInvestorUI;

// =====================================
// EXPORT GLOBAL
// =====================================

window.simpanInvestorUI =
    simpanInvestorUI;
// =====================================
// HELPER RUPIAH
// =====================================

function rupiahInvestorUI(nilai) {

    if (
        typeof rupiahInvestorBBCS ===
        "function"
    ) {

        return rupiahInvestorBBCS(
            nilai
        );

    }

    const angka =
        Number(nilai) || 0;

    return (
        "Rp " +
        angka.toLocaleString("id-ID")
    );

}


// =====================================
// HELPER ANGKA
// =====================================

function angkaInvestorUI(nilai) {

    if (
        typeof angkaInvestorBBCS ===
        "function"
    ) {

        return angkaInvestorBBCS(
            nilai
        );

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
        String(nilai || "")
            .replace(/\./g, "")
            .replace(/[^\d-]/g, "")
    ) || 0;

}


// =====================================
// DATABASE INVESTOR
// HANYA MEMBACA DATA MESIN
// =====================================

function ambilInvestorUI() {

    if (
        Array.isArray(investor)
    ) {

        return investor;

    }

    try {

        const data =
            localStorage.getItem(
                "investor"
            );

        if (!data) {

            return [];

        }

        const hasil =
            JSON.parse(data);

        return Array.isArray(hasil)
            ? hasil
            : [];

    }
    catch(error) {

        console.error(
            "Gagal membaca database investor:",
            error
        );

        return [];

    }

}


// =====================================
// DATABASE REKENING INVESTOR
// =====================================

function ambilRekeningInvestorUI() {

    if (
        Array.isArray(
            rekeningInvestor
        )
    ) {

        return rekeningInvestor;

    }

    try {

        const data =
            localStorage.getItem(
                "rekeningInvestor"
            );

        if (!data) {

            return [];

        }

        const hasil =
            JSON.parse(data);

        return Array.isArray(hasil)
            ? hasil
            : [];

    }
    catch(error) {

        console.error(
            "Gagal membaca rekening investor:",
            error
        );

        return [];

    }

}


// =====================================
// CARI INVESTOR
// =====================================

function cariInvestorUI(
    idInvestor
) {

    if (
        typeof cariInvestor ===
        "function"
    ) {

        return cariInvestor(
            idInvestor
        );

    }

    return ambilInvestorUI().find(
        function(item) {

            return (
                item &&
                String(item.id) ===
                String(idInvestor)
            );

        }
    ) || null;

}


// =====================================
// CARI REKENING INVESTOR
// =====================================

function cariRekeningInvestorUI(
    idInvestor
) {

    if (
        typeof cariRekeningInvestor ===
        "function"
    ) {

        return cariRekeningInvestor(
            idInvestor
        );

    }

    return ambilRekeningInvestorUI().find(
        function(item) {

            return (
                item &&
                String(
                    item.idInvestor
                ) ===
                String(idInvestor)
            );

        }
    ) || null;

}


// =====================================
// ISI DROPDOWN INVESTOR
// =====================================

function isiInvestorUI(
    selectId
) {

    const select =
        document.getElementById(
            selectId
        );

    if (!select) {

        return;

    }


    const nilaiLama =
        select.value;


    const daftar =
        ambilInvestorUI();


    select.innerHTML = "";


    // =================================
    // PILIHAN AWAL
    // =================================

    const pilihan =
        document.createElement(
            "option"
        );

    pilihan.value = "";

    pilihan.textContent =
        "Pilih Investor";

    select.appendChild(
        pilihan
    );


    // =================================
    // DATA INVESTOR
    // =================================

    daftar.forEach(
        function(item) {

            if (
                !item ||
                !item.id
            ) {

                return;

            }


            const option =
                document.createElement(
                    "option"
                );

            option.value =
                item.id;

            option.textContent =
                item.id +
                " - " +
                (
                    item.nama ||
                    "-"
                );

            select.appendChild(
                option
            );

        }
    );


    // =================================
    // KEMBALIKAN PILIHAN
    // =================================

    if (nilaiLama) {

        select.value =
            nilaiLama;

    }

}


// =====================================
// KOMPATIBILITAS DROPDOWN LAMA
// =====================================

function isiPilihanInvestorUI(
    selectId
) {

    isiInvestorUI(
        selectId
    );

}


// =====================================
// FORMAT JUMLAH
// =====================================

function formatJumlahInvestorUI(
    input
) {

    if (!input) {

        return;

    }


    const angka =
        String(
            input.value || ""
        )
        .replace(/[^\d]/g, "");


    if (!angka) {

        input.value = "";

        return;

    }


    input.value =
        Number(angka)
            .toLocaleString(
                "id-ID"
            );

}


// =====================================
// TOMBOL BERANDA
// =====================================

function berandaInvestorUI() {

    window.location.href =
        "../bbcs.html";

}

// =====================================
// KEMBALI KE HALAMAN INVESTOR
// =====================================

function kembaliInvestorUI() {

    const form =
        document.getElementById(
            "formTransaksiInvestor"
        );

    const pilihan =
        document.getElementById(
            "jenisTransaksiInvestor"
        );

    const dataInvestor =
        document.getElementById(
            "bagianDataInvestor"
        );

    const transaksiInvestor =
        document.getElementById(
            "bagianTransaksiInvestor"
        );


    // =================================
    // TUTUP FORM TRANSAKSI
    // =================================

    if (form) {

        form.innerHTML = "";

        form.style.display =
            "none";

    }


    // =================================
    // KOSONGKAN PILIHAN TRANSAKSI
    // =================================

    if (pilihan) {

        pilihan.value = "";

    }


    // =================================
    // TAMPILKAN KEMBALI DATA INVESTOR
    // =================================

    if (dataInvestor) {

        dataInvestor.style.display =
            "block";

    }


    // =================================
    // TAMPILKAN KEMBALI PILIH TRANSAKSI
    // =================================

    if (transaksiInvestor) {

        transaksiInvestor.style.display =
            "block";

    }

}


// =====================================
// TOMBOL KEMBALI FORM
// SATU FUNGSI SAJA
// =====================================

function tombolKembaliFormUI() {

    return `

        <button
            type="button"
            class="btn-secondary"
            onclick="kembaliInvestorUI()"
        >
            ⬅️ KEMBALI
        </button>

    `;

}


// =====================================
// HEADER FORM
// =====================================

function headerFormInvestorUI(
    judul
) {

    return `

        <h3>
            ${judul}
        </h3>

    `;

}

// =====================================
// PILIH TRANSAKSI INVESTOR
// =====================================

function ubahTransaksiInvestorUI() {

    const pilihan =
        document.getElementById(
            "jenisTransaksiInvestor"
        );

    const form =
        document.getElementById(
            "formTransaksiInvestor"
        );

    const dataInvestor =
        document.getElementById(
            "bagianDataInvestor"
        );


    if (
        !pilihan ||
        !form
    ) {

        return;

    }


    const jenis =
        pilihan.value;


    // =================================
    // BELUM MEMILIH TRANSAKSI
    // =================================

    if (!jenis) {

        form.innerHTML =
            "";

        form.style.display =
            "none";


        if (dataInvestor) {

            dataInvestor.style.display =
                "block";

        }

        return;

    }


    // =================================
    // TRANSAKSI DIPILIH
    // SEMBUNYIKAN DATA INVESTOR
    // =================================

    if (dataInvestor) {

        dataInvestor.style.display =
            "none";

    }


    // =================================
    // SIAPKAN FORM
    // =================================

    form.innerHTML =
        "";

    form.style.display =
        "block";


    // =================================
    // TAMBAH MODAL
    // =================================

    if (
        jenis ===
        "tambahModal"
    ) {

        tampilFormTambahModalUI();

        return;

    }


    // =================================
    // PROSES JASA
    // =================================

    if (
        jenis ===
        "prosesJasa"
    ) {

        tampilFormProsesJasaUI();

        return;

    }


    // =================================
    // TARIK JASA
    // =================================

    if (
        jenis ===
        "tarikJasa"
    ) {

        formTarikJasaInvestorUI();

        return;

    }


    // =================================
    // TARIK MODAL
    // =================================

    if (
        jenis ===
        "tarikModal"
    ) {

        formTarikModalInvestorUI();

        return;

    }

}



// =====================================
// CEK MESIN INVESTOR
// =====================================

function cekMesinInvestorUI() {

    const fungsiWajib = [

        "cariInvestor",

        "cariRekeningInvestor",

        "simpanDatabaseInvestor"

    ];


    const belumAda =
        fungsiWajib.filter(
            function(nama) {

                return (
                    typeof window[nama] !==
                    "function"
                );

            }
        );


    if (
        belumAda.length > 0
    ) {

        console.error(
            "MESIN INVESTOR BELUM LENGKAP:",
            belumAda
        );

        return false;

    }


    return true;

}


// =====================================
// LOAD UI
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "UI Investor BBCS V2.3 Bagian 1 siap."
        );

        cekMesinInvestorUI();

    }
);
// =====================================
// BERKAH BERSAMA CORE SYSTEM
// UI INVESTOR BBCS V2.3
// BAGIAN 2/3
// TAMBAH MODAL & PROSES JASA
// =====================================


// =====================================
// FORM TAMBAH MODAL
// =====================================

function tampilFormTambahModalUI() {

    const form =
        document.getElementById(
            "formTransaksiInvestor"
        );


    if (!form) {

        return;

    }


    form.style.display =
        "block";


    form.innerHTML = `

        ${headerFormInvestorUI(
            "➕ TAMBAH MODAL"
        )}


        <label>
            Pilih Investor
        </label>


        <select
            id="investorTambahModal"
        >

            <option value="">
                Pilih Investor
            </option>

        </select>


        <label>
            Jumlah Modal
        </label>


        <input
            id="jumlahModalInvestor"
            type="text"
            inputmode="numeric"
            placeholder="Contoh: 10.000.000"
            oninput="
                formatJumlahInvestorUI(this)
            "
        >


        <button
            type="button"
            class="btn-primary"
            onclick="prosesTambahModalUI()"
        >
            💰 SETOR MODAL
        </button>


        ${tombolKembaliFormUI()}

    `;


    isiInvestorUI(
        "investorTambahModal"
    );

}


// =====================================
// PROSES TAMBAH MODAL
// =====================================

function prosesTambahModalUI() {

    const select =
        document.getElementById(
            "investorTambahModal"
        );


    const input =
        document.getElementById(
            "jumlahModalInvestor"
        );


    if (
        !select ||
        !input
    ) {

        alert(
            "Form tambah modal tidak tersedia."
        );

        return;

    }


    const idInvestor =
        select.value;


    const jumlah =
        angkaInvestorUI(
            input.value
        );


    // =================================
    // VALIDASI INVESTOR
    // =================================

    if (!idInvestor) {

        alert(
            "Pilih investor terlebih dahulu."
        );

        return;

    }


    // =================================
    // VALIDASI JUMLAH
    // =================================

    if (
        jumlah <= 0
    ) {

        alert(
            "Jumlah modal harus lebih dari Rp 0."
        );

        return;

    }


    // =================================
    // CEK MESIN
    // =================================

    if (
        typeof setorModalInvestor !==
        "function"
    ) {

        alert(
            "Mesin setor modal belum tersedia."
        );

        return;

    }


    // =================================
    // PROSES MESIN
    // =================================

    const berhasil =
        setorModalInvestor(
            idInvestor,
            jumlah
        );


    if (berhasil) {

        kembaliInvestorUI();

    }

}


// =====================================
// FORM PROSES JASA
// =====================================

function tampilFormProsesJasaUI() {

    const form =
        document.getElementById(
            "formTransaksiInvestor"
        );


    if (!form) {

        return;

    }


    form.style.display =
        "block";


    form.innerHTML = `

        ${headerFormInvestorUI(
            "📈 PROSES JASA INVESTOR"
        )}


        <label>
            Pilih Investor
        </label>


        <select
            id="investorJasa"
            onchange="tampilInfoJasaUI()"
        >

            <option value="">
                Pilih Investor
            </option>

        </select>


        <div
            id="infoJasaInvestor"
            class="infoInvestor"
        >
            Pilih investor untuk melihat
            informasi jasa.
        </div>


        <button
            type="button"
            class="btn-primary"
            onclick="prosesJasaInvestorUI()"
        >
            📈 PROSES JASA
        </button>


        ${tombolKembaliFormUI()}

    `;


    isiInvestorUI(
        "investorJasa"
    );

}


// =====================================
// INFORMASI JASA
// =====================================

function tampilInfoJasaUI() {

    const select =
        document.getElementById(
            "investorJasa"
        );


    const tempat =
        document.getElementById(
            "infoJasaInvestor"
        );


    if (
        !select ||
        !tempat
    ) {

        return;

    }


    const idInvestor =
        select.value;


    if (!idInvestor) {

        tempat.innerHTML =
            "Pilih investor untuk melihat informasi jasa.";

        return;

    }


    const dataInvestor =
        cariInvestorUI(
            idInvestor
        );


    const rekening =
        cariRekeningInvestorUI(
            idInvestor
        );


    if (
        !dataInvestor ||
        !rekening
    ) {

        tempat.innerHTML =
            "Data investor atau rekening tidak ditemukan.";

        return;

    }


    const modal =
        angkaInvestorUI(
            rekening.modal
        );


    const saldo =
        angkaInvestorUI(
            rekening.saldo
        );


    const jasaPersen =
        Number(
            dataInvestor.jasa
        ) || 0;


    const jasaPerkiraan =
        Math.floor(
            modal *
            jasaPersen /
            100
        );


    tempat.innerHTML = `

        <b>
            ${dataInvestor.nama || "-"}
        </b>

        <br><br>

        ID Investor :
        ${dataInvestor.id}

        <br>

        Modal :
        <b>
            ${rupiahInvestorUI(modal)}
        </b>

        <br>

        Saldo Rekening :
        <b>
            ${rupiahInvestorUI(saldo)}
        </b>

        <br>

        Jasa :
        <b>
            ${jasaPersen}%
        </b>
        / bulan

        <br>

        Perkiraan Jasa :
        <b>
            ${rupiahInvestorUI(
                jasaPerkiraan
            )}
        </b>

        <br>

        Status :
        <b>
            ${rekening.status || "Aktif"}
        </b>

        <br>

        Status Jasa :
        <b>
            ${rekening.statusJasa || "Aktif"}
        </b>

    `;

}


// =====================================
// PROSES JASA
// =====================================

function prosesJasaInvestorUI() {

    const select =
        document.getElementById(
            "investorJasa"
        );


    if (!select) {

        alert(
            "Form proses jasa tidak tersedia."
        );

        return;

    }


    const idInvestor =
        select.value;


    if (!idInvestor) {

        alert(
            "Pilih investor terlebih dahulu."
        );

        return;

    }


    // =================================
    // CEK MESIN
    // =================================

    if (
        typeof prosesJasaInvestorBBCS !==
        "function"
    ) {

        alert(
            "Mesin proses jasa investor belum tersedia."
        );

        return;

    }


    // =================================
    // PROSES
    // =================================

    const berhasil =
        prosesJasaInvestorBBCS(
            idInvestor
        );


    if (berhasil) {

        kembaliInvestorUI();

    }

}


// =====================================
// SELESAI BAGIAN 2
// =====================================

console.log(
    "UI Investor BBCS V2.3 Bagian 2 siap."
);
// =====================================
// BERKAH BERSAMA CORE SYSTEM
// UI INVESTOR BBCS V2.3
// BAGIAN 3/3
// TARIK JASA & TARIK MODAL
// =====================================

// =====================================
// FORM TARIK JASA
// =====================================

function formTarikJasaInvestorUI() {

    const form =
        document.getElementById(
            "formTransaksiInvestor"
        );

    if (!form) {

        return;

    }


    form.style.display =
        "block";


    form.innerHTML = `

        <h3>
            💸 TARIK JASA INVESTOR
        </h3>


        <label>
            Pilih Investor
        </label>

        <select
            id="investorTarikJasa"
        >

            <option value="">
                Pilih Investor
            </option>

        </select>


        <label>
            Jumlah Jasa
        </label>

        <input
            id="jumlahTarikJasa"
            type="text"
            inputmode="numeric"
            placeholder="Contoh: 500.000"
            autocomplete="off"
        >


        <button
            type="button"
            class="btn-primary"
            onclick="prosesTarikJasaInvestorUI()"
        >
            💸 TARIK JASA
        </button>


        <button
            type="button"
            class="btn-secondary"
            onclick="kembaliInvestorUI()"
        >
            ⬅️ KEMBALI
        </button>

    `;


    isiInvestorUI(
        "investorTarikJasa"
    );

}



// =====================================
// INFORMASI TARIK JASA
// =====================================

function tampilInfoTarikJasaUI() {

    const select =
        document.getElementById(
            "investorTarikJasa"
        );


    const tempat =
        document.getElementById(
            "infoTarikJasaInvestor"
        );


    if (
        !select ||
        !tempat
    ) {

        return;

    }


    const idInvestor =
        select.value;


    if (!idInvestor) {

        tempat.innerHTML =
            "Pilih investor untuk melihat jasa tersedia.";

        return;

    }


    const investorData =
        cariInvestorUI(
            idInvestor
        );


    const rekening =
        cariRekeningInvestorUI(
            idInvestor
        );


    if (
        !investorData ||
        !rekening
    ) {

        tempat.innerHTML =
            "Data investor atau rekening tidak ditemukan.";

        return;

    }


    const tersedia =
        angkaInvestorUI(
            rekening.jasaTersedia
        );


    const saldo =
        angkaInvestorUI(
            rekening.saldo
        );


    tempat.innerHTML = `

        <b>
            ${investorData.nama || "-"}
        </b>

        <br><br>

        Jasa tersedia :
        <b>
            ${rupiahInvestorUI(tersedia)}
        </b>

        <br>

        Saldo rekening :
        <b>
            ${rupiahInvestorUI(saldo)}
        </b>

    `;

}


// =====================================
// PROSES TARIK JASA
// =====================================

function prosesTarikJasaInvestorUI() {

    const select =
        document.getElementById(
            "investorTarikJasa"
        );


    const input =
        document.getElementById(
            "jumlahTarikJasa"
        );


    if (
        !select ||
        !input
    ) {

        alert(
            "Form tarik jasa tidak tersedia."
        );

        return;

    }


    const idInvestor =
        select.value;


    const jumlah =
        angkaInvestorUI(
            input.value
        );


    if (!idInvestor) {

        alert(
            "Pilih investor terlebih dahulu."
        );

        return;

    }


    if (jumlah <= 0) {

        alert(
            "Jumlah jasa harus lebih dari Rp 0."
        );

        return;

    }


    const rekening =
        cariRekeningInvestorUI(
            idInvestor
        );


    if (!rekening) {

        alert(
            "Rekening investor tidak ditemukan."
        );

        return;

    }


    const jasaTersedia =
        angkaInvestorUI(
            rekening.jasaTersedia
        );


    if (
        jumlah >
        jasaTersedia
    ) {

        alert(
            "Jumlah penarikan melebihi jasa yang tersedia."
        );

        return;

    }


    if (
        typeof tarikJasaInvestorBBCS !==
        "function"
    ) {

        alert(
            "Mesin tarik jasa investor belum tersedia."
        );

        return;

    }


    const berhasil =
        tarikJasaInvestorBBCS(
            idInvestor,
            jumlah
        );


    if (berhasil) {

        kembaliInvestorUI();

    }

}


// =====================================
// FORM TARIK MODAL
// =====================================

function formTarikModalInvestorUI() {

    const form =
        document.getElementById(
            "formTransaksiInvestor"
        );

    if (!form) {

        return;

    }


    form.style.display =
        "block";


    form.innerHTML = `

        <h3>
            🏦 TARIK MODAL INVESTOR
        </h3>


        <label>
            Pilih Investor
        </label>

        <select
            id="investorTarikModal"
            onchange="tampilTarikModalInvestorUI()"
        >

            <option value="">
                Pilih Investor
            </option>

        </select>


        <div
            id="infoTarikModalInvestor"
            class="infoInvestor"
        >
            Pilih investor untuk melihat modal.
        </div>


        <label>
            Jumlah Penarikan
        </label>

        <input
            id="jumlahTarikModal"
            type="text"
            inputmode="numeric"
            placeholder="Contoh: 1.000.000"
            autocomplete="off"
            oninput="
                hitungTarikModalInvestorUI()
            "
        >


        <div
            id="rincianTarikModalInvestor"
            class="infoInvestor"
        >
            Masukkan jumlah penarikan.
        </div>


        <button
            type="button"
            class="btn-primary"
            onclick="prosesTarikModalInvestorUI()"
        >
            🏦 TARIK MODAL
        </button>


        <button
            type="button"
            class="btn-secondary"
            onclick="kembaliInvestorUI()"
        >
            ⬅️ KEMBALI
        </button>

    `;


    isiInvestorUI(
        "investorTarikModal"
    );

}


// =====================================
// TAMPIL DATA TARIK MODAL
// =====================================

function tampilTarikModalInvestorUI() {

    const select =
        document.getElementById(
            "investorTarikModal"
        );


    const tempat =
        document.getElementById(
            "infoTarikModalInvestor"
        );


    if (
        !select ||
        !tempat
    ) {

        return;

    }


    const idInvestor =
        select.value;


    if (!idInvestor) {

        tempat.innerHTML =
            "Pilih investor untuk melihat modal.";

        return;

    }


    const dataInvestor =
        cariInvestorUI(
            idInvestor
        );


    const rekening =
        cariRekeningInvestorUI(
            idInvestor
        );


    if (
        !dataInvestor ||
        !rekening
    ) {

        tempat.innerHTML =
            "Data investor atau rekening tidak ditemukan.";

        return;

    }


    tempat.innerHTML = `

        <b>
            ${dataInvestor.nama || "-"}
        </b>

        <br><br>

        Modal tersedia :
        <b>
            ${rupiahInvestorUI(
                rekening.modal
            )}
        </b>

        <br>

        Saldo rekening :
        <b>
            ${rupiahInvestorUI(
                rekening.saldo
            )}
        </b>

        <br>

        Jasa :
        <b>
            ${Number(
                dataInvestor.jasa
            ) || 0}%
        </b>
        / bulan

    `;


    hitungTarikModalInvestorUI();

}


// =====================================
// HITUNG TARIK MODAL
// =====================================

function hitungTarikModalInvestorUI() {

    const select =
        document.getElementById(
            "investorTarikModal"
        );


    const input =
        document.getElementById(
            "jumlahTarikModal"
        );


    const tempat =
        document.getElementById(
            "rincianTarikModalInvestor"
        );


    if (
        !select ||
        !input ||
        !tempat
    ) {

        return;

    }


    const idInvestor =
        select.value;


    if (!idInvestor) {

        tempat.innerHTML =
            "Pilih investor terlebih dahulu.";

        return;

    }


    const dataInvestor =
        cariInvestorUI(
            idInvestor
        );


    const rekening =
        cariRekeningInvestorUI(
            idInvestor
        );


    if (
        !dataInvestor ||
        !rekening
    ) {

        tempat.innerHTML =
            "Data investor atau rekening tidak ditemukan.";

        return;

    }


    const jumlah =
        angkaInvestorUI(
            input.value
        );


    const modal =
        angkaInvestorUI(
            rekening.modal
        );


    const jasaPersen =
        Number(
            dataInvestor.jasa
        ) || 0;


    if (jumlah <= 0) {

        tempat.innerHTML =
            "Masukkan jumlah penarikan.";

        return;

    }


    if (
        jumlah >
        modal
    ) {

        tempat.innerHTML = `

            <b>
                Penarikan tidak dapat diproses.
            </b>

            <br><br>

            Modal tersedia :
            ${rupiahInvestorUI(modal)}

            <br>

            Permintaan :
            ${rupiahInvestorUI(jumlah)}

        `;

        return;

    }


    const biayaAdmin =
        Math.floor(
            jumlah *
            jasaPersen /
            100
        );


    const diterima =
        jumlah -
        biayaAdmin;


    const sisa =
        modal -
        jumlah;


    tempat.innerHTML = `

        <b>
            RINCIAN PENARIKAN MODAL
        </b>

        <br><br>

        Modal tersedia :
        <b>
            ${rupiahInvestorUI(modal)}
        </b>

        <br>

        Modal ditarik :
        <b>
            ${rupiahInvestorUI(jumlah)}
        </b>

        <br>

        Biaya admin
        (${jasaPersen}%) :
        <b>
            ${rupiahInvestorUI(biayaAdmin)}
        </b>

        <br>

        Uang diterima :
        <b>
            ${rupiahInvestorUI(diterima)}
        </b>

        <br>

        Modal tersisa :
        <b>
            ${rupiahInvestorUI(sisa)}
        </b>

    `;

}


// =====================================
// PROSES TARIK MODAL
// =====================================

function prosesTarikModalInvestorUI() {

    const select =
        document.getElementById(
            "investorTarikModal"
        );


    const input =
        document.getElementById(
            "jumlahTarikModal"
        );


    if (
        !select ||
        !input
    ) {

        alert(
            "Form tarik modal tidak tersedia."
        );

        return;

    }


    const idInvestor =
        select.value;


    const jumlah =
        angkaInvestorUI(
            input.value
        );


    if (!idInvestor) {

        alert(
            "Pilih investor terlebih dahulu."
        );

        return;

    }


    if (jumlah <= 0) {

        alert(
            "Jumlah penarikan harus lebih dari Rp 0."
        );

        return;

    }


    const rekening =
        cariRekeningInvestorUI(
            idInvestor
        );


    if (!rekening) {

        alert(
            "Rekening investor tidak ditemukan."
        );

        return;

    }


    const modal =
        angkaInvestorUI(
            rekening.modal
        );


    if (
        jumlah >
        modal
    ) {

        alert(
            "Jumlah penarikan melebihi modal investor."
        );

        return;

    }


    if (
        typeof tarikModalInvestorBBCS !==
        "function"
    ) {

        alert(
            "Mesin tarik modal investor belum tersedia."
        );

        return;

    }


    const berhasil =
        tarikModalInvestorBBCS(
            idInvestor,
            jumlah
        );


    if (berhasil) {

        kembaliInvestorUI();

    }

}


// =====================================
// FORMAT ANGKA GLOBAL
// =====================================

document.addEventListener(
    "input",
    function(event) {

        const id =
            event.target.id;


        if (
            id ===
                "jumlahModalInvestor" ||
            id ===
                "jumlahTarikJasa" ||
            id ===
                "jumlahTarikModal"
        ) {

            if (
                event.target.value !==
                ""
            ) {

                formatJumlahInvestorUI(
                    event.target
                );

            }

        }

    }
);


// =====================================
// LOAD SELESAI
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "===================================="
        );

        console.log(
            "UI INVESTOR BBCS V2.3 SIAP"
        );

        console.log(
        "===================================="
        );

    }
);
