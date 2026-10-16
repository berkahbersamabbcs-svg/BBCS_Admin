// =============================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL SIMPANAN ANGGOTA
// SP + SW + SS DALAM SATU TRANSAKSI
// DATABASE CORE TETAP TIDAK DIUBAH
// =============================================

console.log("Modul Simpanan BBCS Aktif");

// =============================================
// BANTUAN FORMAT DAN NILAI
// =============================================

function nilaiInputSimpanan(id) {
    const elemen = document.getElementById(id);

    if (!elemen) {
        return 0;
    }

    if (typeof angkaNilai === "function") {
        return angkaNilai(elemen.value);
    }

    return Number(
        String(elemen.value || "").replace(/\./g, "")
    ) || 0;
}

function formatRupiahSimpanan(nilai) {
    if (typeof rupiah === "function") {
        return rupiah(nilai);
    }

    return "Rp " + Number(nilai || 0).toLocaleString("id-ID");
}

function idAnggotaDariSimpanan(data) {
    return data
        ? (data.idAnggota || data.anggota || "")
        : "";
}

// =============================================
// PEMERIKSAAN SIMPANAN POKOK
// =============================================

function anggotaSudahBayarSP(idAnggota, rek) {
    // Periksa saldo SP pada rekening anggota.
    if (rek && Number(rek.simpananPokok || 0) > 0) {
        return true;
    }

    if (!Array.isArray(simpanan)) {
        return false;
    }

    // Mendukung catatan lama dan catatan gabungan yang baru.
    return simpanan.some(function (item) {
        if (!item || idAnggotaDariSimpanan(item) != idAnggota) {
            return false;
        }

        // Format gabungan: SP tersimpan pada kolom tersendiri.
        const nilaiSP = Number(
            item.sp ?? item.simpananPokok ?? 0
        );

        if (Number.isFinite(nilaiSP) && nilaiSP > 0) {
            return true;
        }

        // Format lama: SP tersimpan sebagai jenis dan jumlah.
        const jenis = String(item.jenis || "")
            .trim()
            .toLowerCase();

        const jumlah = Number(item.jumlah || 0);

        return Number.isFinite(jumlah) &&
            jumlah > 0 &&
            (
                jenis === "sp" ||
                jenis.includes("simpanan pokok")
            );
    });
}

// =============================================
// PILIHAN ANGGOTA
// =============================================

function tampilPilihanAnggotaSimpanan() {
    const pilih = document.getElementById("pilihAnggotaSimpanan");

    if (!pilih) {
        return;
    }

    pilih.innerHTML = '<option value="">Pilih Anggota</option>';

    if (!Array.isArray(anggota)) {
        return;
    }

    anggota.forEach(function (item) {
        if (!item || !item.id) {
            return;
        }

        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.id + " - " + (item.nama || "-");
        pilih.appendChild(option);
    });

    pilih.onchange = function () {
        persiapkanFormSimpanan();
    };

    persiapkanFormSimpanan();
}

// =============================================
// SIAPKAN FORM SESUAI ANGGOTA
// =============================================

function persiapkanFormSimpanan() {
    const pilih = document.getElementById("pilihAnggotaSimpanan");
    const inputSP = document.getElementById("jumlahSP");
    const inputSW = document.getElementById("jumlahSW");
    const inputSS = document.getElementById("jumlahSS");
    const statusSP = document.getElementById("statusSP");
    const info = document.getElementById("infoSimpanan");

    if (!pilih || !inputSP || !inputSW || !inputSS) {
        return;
    }

    const idAnggota = pilih.value;

    inputSP.disabled = false;
    inputSP.value = "0";
    inputSW.value = "0";
    inputSS.value = "0";

    if (!idAnggota) {
        if (statusSP) {
            statusSP.textContent = "Silakan pilih anggota.";
        }

        if (info) {
            info.textContent = "Silakan pilih anggota.";
        }

        hitungTotalSimpanan();
        return;
    }

    const dataAnggota = anggota.find(function (item) {
        return item && item.id == idAnggota;
    });

    const rek = typeof cariRekening === "function"
        ? cariRekening(idAnggota)
        : null;

    const sudahSP = anggotaSudahBayarSP(idAnggota, rek);

    if (sudahSP) {
        inputSP.value = "0";
        inputSP.disabled = true;

        if (statusSP) {
            statusSP.textContent =
                "✅ SP sudah tercatat. Kolom SP dinonaktifkan.";
        }
    } else {
        inputSP.value = "20.000";

        if (statusSP) {
            statusSP.textContent =
                "SP belum tercatat. Nilai awal Rp20.000.";
        }
    }

    inputSW.value = "5.000";
    inputSS.value = "0";

    if (info) {
        const nama = dataAnggota
            ? (dataAnggota.nama || "-")
            : "-";

        const pokok = rek ? Number(rek.simpananPokok || 0) : 0;
        const wajib = rek ? Number(rek.simpananWajib || 0) : 0;
        const sukarela = rek ? Number(rek.simpananSukarela || 0) : 0;

        info.textContent =
            "Anggota: " + nama +
            " | SP: " + formatRupiahSimpanan(pokok) +
            " | SW: " + formatRupiahSimpanan(wajib) +
            " | SS: " + formatRupiahSimpanan(sukarela) +
            " | Total: " +
            formatRupiahSimpanan(pokok + wajib + sukarela);
    }

    hitungTotalSimpanan();
}

// =============================================
// TOTAL OTOMATIS
// =============================================

function hitungTotalSimpanan() {
    const total = nilaiInputSimpanan("jumlahSP") +
        nilaiInputSimpanan("jumlahSW") +
        nilaiInputSimpanan("jumlahSS");

    const tempat = document.getElementById("totalSimpanan");

    if (tempat) {
        tempat.textContent = formatRupiahSimpanan(total);
    }

    return total;
}

// =============================================
// SIMPAN SIMPANAN GABUNGAN
// =============================================

function simpanSimpanan() {
    const pilih = document.getElementById("pilihAnggotaSimpanan");

    if (!pilih || !pilih.value) {
        alert("Pilih anggota terlebih dahulu.");
        return;
    }

    if (
        !Array.isArray(anggota) ||
        !Array.isArray(rekening) ||
        !Array.isArray(simpanan) ||
        !Array.isArray(transaksi) ||
        !Array.isArray(kas)
    ) {
        alert("Database BBCS belum siap. Tidak ada perubahan yang dilakukan.");
        return;
    }

    if (
        typeof cariRekening !== "function" ||
        typeof nomorTransaksiBaru !== "function" ||
        typeof catatTransaksiKas !== "function" ||
        typeof simpanDatabaseAman !== "function"
    ) {
        alert("Mesin rekening, transaksi, kas, atau penyimpanan belum aktif.");
        return;
    }

    const idAnggota = pilih.value;

    const dataAnggota = anggota.find(function (item) {
        return item && item.id == idAnggota;
    });

    const rek = cariRekening(idAnggota);

    if (!dataAnggota) {
        alert("Data anggota tidak ditemukan.");
        return;
    }

    if (!rek) {
        alert("Rekening anggota tidak ditemukan. Tidak ada perubahan yang dilakukan.");
        return;
    }

    const sp = nilaiInputSimpanan("jumlahSP");
    const sw = nilaiInputSimpanan("jumlahSW");
    const ss = nilaiInputSimpanan("jumlahSS");
    const total = sp + sw + ss;

    if (
        !Number.isSafeInteger(sp) ||
        !Number.isSafeInteger(sw) ||
        !Number.isSafeInteger(ss) ||
        sp < 0 ||
        sw < 0 ||
        ss < 0
    ) {
        alert("Jumlah simpanan harus berupa angka rupiah yang valid.");
        return;
    }

    if (total <= 0) {
        alert("Isi minimal satu jenis simpanan dengan jumlah lebih dari Rp0.");
        return;
    }

    if (sp > 0 && anggotaSudahBayarSP(idAnggota, rek)) {
        alert("Simpanan Pokok anggota ini sudah tercatat. SP tidak dapat ditambahkan lagi.");
        persiapkanFormSimpanan();
        return;
    }

    const namaAnggota = dataAnggota.nama || "-";

    let rincian = "";

    if (sp > 0) {
        rincian += "SP: " + formatRupiahSimpanan(sp) + "\n";
    }

    if (sw > 0) {
        rincian += "SW: " + formatRupiahSimpanan(sw) + "\n";
    }

    if (ss > 0) {
        rincian += "SS: " + formatRupiahSimpanan(ss) + "\n";
    }

    const yakin = confirm(
        "KONFIRMASI SIMPANAN BBCS\n\n" +
        "ID Anggota: " + idAnggota + "\n" +
        "Nama: " + namaAnggota + "\n\n" +
        rincian + "\n" +
        "TOTAL SETORAN: " + formatRupiahSimpanan(total) +
        "\n\nSimpan seluruh setoran dalam satu transaksi?"
    );

    if (!yakin) {
        return;
    }

    // Simpan nilai awal untuk pemulihan jika penyimpanan gagal.
    const saldoAwal = {
        nama: rek.nama,
        sp: rek.simpananPokok,
        sw: rek.simpananWajib,
        ss: rek.simpananSukarela
    };

    const panjangSimpanan = simpanan.length;
    const panjangTransaksi = transaksi.length;
    const panjangKas = kas.length;

    const idTransaksi = nomorTransaksiBaru();
    const referensi = "SP-" + idTransaksi;

    // Tolak referensi yang sudah digunakan.
    // Pemeriksaan ini dilakukan sebelum saldo atau data diubah.
    const referensiSudahAda =
        simpanan.some(item => item && item.referensi === referensi) ||
        transaksi.some(item => item && item.referensi === referensi) ||
        kas.some(item => item && item.referensi === referensi);

    if (referensiSudahAda) {
        alert(
            "Penyimpanan dibatalkan karena referensi transaksi sudah digunakan. " +
            "Silakan periksa data transaksi sebelum mencoba kembali."
        );
        console.error("Referensi simpanan sudah ada:", referensi);
        return;
    }

    const tanggal = new Date().toISOString().substring(0, 10);

    // Siapkan saldo rekening.
    rek.nama = namaAnggota;

    rek.simpananPokok =
        Number(rek.simpananPokok || 0) + sp;

    rek.simpananWajib =
        Number(rek.simpananWajib || 0) + sw;

    rek.simpananSukarela =
        Number(rek.simpananSukarela || 0) + ss;

    // Satu transaksi anggota = satu catatan simpanan gabungan.
    // Rincian SP, SW, dan SS tetap disimpan pada objek yang sama.
    simpanan.push({
        id: idTransaksi,
        idTransaksi: idTransaksi,
        idAnggota: idAnggota,
        anggota: idAnggota,
        namaAnggota: namaAnggota,
        nama: namaAnggota,
        jenis: "Simpanan Gabungan",
        sp: sp,
        sw: sw,
        ss: ss,
        simpananPokok: sp,
        simpananWajib: sw,
        simpananSukarela: ss,
        jumlah: total,
        tanggal: tanggal,
        referensi: referensi
    });

    const keterangan =
        "Simpanan anggota " + namaAnggota +
        " (SP " + formatRupiahSimpanan(sp) +
        ", SW " + formatRupiahSimpanan(sw) +
        ", SS " + formatRupiahSimpanan(ss) + ")";

    let hasil = null;

    try {
        // Satu kali pencatatan pemasukan untuk total seluruh simpanan.
        hasil = catatTransaksiKas(
            "Pemasukan",
            "Simpanan",
            keterangan,
            total,
            idAnggota,
            namaAnggota,
            referensi
        );
    } catch (error) {
        console.error("Kesalahan pencatatan simpanan:", error);
    }

    if (
        !hasil ||
        !hasil.transaksi ||
        !hasil.kas
    ) {
        // Pulihkan perubahan di memori jika pencatatan gagal.
        rek.nama = saldoAwal.nama;
        rek.simpananPokok = saldoAwal.sp;
        rek.simpananWajib = saldoAwal.sw;
        rek.simpananSukarela = saldoAwal.ss;

        simpanan.length = panjangSimpanan;
        transaksi.length = panjangTransaksi;
        kas.length = panjangKas;

        const pemulihanBerhasil = simpanDatabaseAman();

        console.error(
            "Pencatatan simpanan gagal. Pemulihan database:",
            pemulihanBerhasil
        );

        alert(
            "Simpanan belum berhasil dicatat.\n" +
            "Perubahan di memori telah dibatalkan.\n\n" +
            (
                pemulihanBerhasil
                    ? "Data sebelumnya berhasil disimpan kembali."
                    : "PERHATIAN: penyimpanan pemulihan gagal. Jangan ulangi transaksi sebelum database diperiksa."
            )
        );

        return;
    }

    // Transaksi + kas telah menyimpan database melalui satu pintu.
    alert(
        "SIMPANAN BERHASIL DISIMPAN\n\n" +
        "Anggota: " + namaAnggota + "\n" +
        rincian + "\n" +
        "Total: " + formatRupiahSimpanan(total) + "\n\n" +
        "Satu transaksi pemasukan dan satu pencatatan kas telah dibuat."
    );

    // Bersihkan formulir setelah transaksi berhasil.
    pilih.value = "";
    persiapkanFormSimpanan();
}

console.log("Mesin Simpanan BBCS Siap");
