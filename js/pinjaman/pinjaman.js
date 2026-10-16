// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL PINJAMAN BBCS
// PINJAMAN + ADMINISTRASI + JASA + DENDA
// =====================================

console.log(
    "Modul Pinjaman BBCS V3 Aktif"
);


// =====================================
// PILIH ANGGOTA
// =====================================

function tampilPilihanAnggota(){

    let pilih =
        document.getElementById(
            "pilihAnggota"
        );

    if(!pilih){

        return;

    }

    pilih.innerHTML = `
        <option value="">
            Pilih Anggota
        </option>
    `;

    if(
        !Array.isArray(anggota)
    ){

        return;

    }

    anggota.forEach(function(item){

        if(
            !item ||
            !item.id
        ){

            return;

        }

        pilih.innerHTML += `

            <option value="${item.id}">

                ${item.id} - ${item.nama}

            </option>

        `;

    });

}


// =====================================
// BULAN BERIKUTNYA
// =====================================

function bulanBerikutnya(periode){

    if(!periode){

        return "";

    }

    let tanggal =
        new Date(
            periode + "-01T00:00:00"
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
// SIMPAN PINJAMAN
// =====================================

function simpanPinjaman(){

    let pilih =
        document.getElementById(
            "pilihAnggota"
        );

    if(!pilih){

        return;

    }

    let idAnggota =
        pilih.value;

    if(!idAnggota){

        alert(
            "Pilih anggota terlebih dahulu"
        );

        return;

    }


    // =================================
    // CEK PINJAMAN AKTIF
    // =================================

    let cek =
        pinjaman.find(function(item){

            return (

                (
                    item.idAnggota == idAnggota
                    ||
                    item.anggota == idAnggota
                )

                &&

                item.status == "Aktif"

            );

        });

    if(cek){

        alert(
            "Anggota masih memiliki pinjaman aktif"
        );

        return;

    }


    // =================================
    // JUMLAH PINJAMAN
    // =================================

    let jumlah =
        angkaNilai(
            document.getElementById(
                "jumlahPinjaman"
            ).value
        );


    // =================================
    // JASA MENURUN
    // =================================

    let jasa =
        Number(
            document.getElementById(
                "jasaPinjaman"
            ).value
        );


    // =================================
    // DENDA TUNGGAKAN
    // =================================

    let denda =
        Number(
            document.getElementById(
                "dendaPinjaman"
            ).value
        );


    // =================================
    // VALIDASI ANGKA
    // =================================

    if(!Number.isFinite(jasa)){

        jasa = 0;

    }

    if(!Number.isFinite(denda)){

        denda = 0;

    }


    // =================================
    // DATA ANGGOTA
    // =================================

    let dataAnggota =
        anggota.find(function(item){

            return (
                item &&
                item.id == idAnggota
            );

        });


    if(
        !dataAnggota ||
        jumlah <= 0
    ){

        alert(
            "Data pinjaman belum lengkap"
        );

        return;

    }


    if(jasa <= 0){

        alert(
            "Jasa pinjaman belum diisi"
        );

        return;

    }


    if(denda < 0){

        alert(
            "Denda tidak boleh kurang dari 0%"
        );

        return;

    }


    // =====================================
    // CEK DAN HITUNG ADMINISTRASI
    // =====================================

if (
    typeof window.hitungAdministrasiDenganTarifBBCS !== "function"
) {
    alert("Mesin perhitungan administrasi pinjaman belum aktif.");
    console.error(
        "hitungAdministrasiDenganTarifBBCS() tidak ditemukan"
    );
    return;
}

const elemenTarifAdministrasi =
    document.getElementById("tarifAdministrasiPinjaman");

const tarifInputAdministrasi =
    elemenTarifAdministrasi
        ? Number(elemenTarifAdministrasi.value)
        : NaN;

if (
    !Number.isFinite(tarifInputAdministrasi) ||
    tarifInputAdministrasi < 0
) {
    alert("Tarif administrasi harus berupa angka 0 atau lebih.");
    return;
}

const hasilAdministrasi =
    window.hitungAdministrasiDenganTarifBBCS(
        jumlah,
        tarifInputAdministrasi
    );

if (
    !hasilAdministrasi ||
    !Number.isFinite(Number(hasilAdministrasi.pokok)) ||
    !Number.isFinite(Number(hasilAdministrasi.tarifAdministrasi)) ||
    !Number.isFinite(Number(hasilAdministrasi.biayaAdministrasi)) ||
    !Number.isFinite(Number(hasilAdministrasi.uangDiterima)) ||
    Number(hasilAdministrasi.pokok) !== Number(jumlah) ||
    Number(hasilAdministrasi.biayaAdministrasi) < 0 ||
    Number(hasilAdministrasi.uangDiterima) < 0 ||
    Number(hasilAdministrasi.biayaAdministrasi) +
        Number(hasilAdministrasi.uangDiterima) !== Number(jumlah)
) {
    alert("Hasil perhitungan administrasi tidak valid. Pinjaman dibatalkan.");
    console.error(
        "Hasil administrasi pinjaman tidak valid:",
        hasilAdministrasi
    );
    return;
}

const tarifAdministrasi =
    Number(hasilAdministrasi.tarifAdministrasi);

const biayaAdministrasi =
    Number(hasilAdministrasi.biayaAdministrasi);

const uangDiterima =
    Number(hasilAdministrasi.uangDiterima);


    // =====================================
    // TANGGAL PINJAMAN REAL
    // =====================================

    let sekarang =
        new Date();

    let tanggal =
        sekarang
            .toISOString()
            .substring(0,10);


    // =====================================
    // BULAN PINJAMAN
    // =====================================

    let bulanPinjaman =
        tanggal.substring(0,7);


    // =====================================
    // PERIODE PERTAMA
    // =====================================

    let periodePertama =
        bulanBerikutnya(
            bulanPinjaman
        );


    // =====================================
    // KONFIRMASI
    // =====================================

    let yakin =
        confirm(

            "KONFIRMASI PINJAMAN\n\n" +

            "ID Anggota : " +
            idAnggota +

            "\nNama : " +
            dataAnggota.nama +

            "\nTanggal : " +
            tanggal +

            "\nPokok Pinjaman : " +
            rupiah(jumlah) +

            "\nTarif Administrasi : " +
            tarifAdministrasi +
            "%" +

            "\nBiaya Administrasi : " +
            rupiah(biayaAdministrasi) +

            "\nUang Diterima Anggota : " +
            rupiah(uangDiterima) +

            "\nKewajiban Anggota : " +
            rupiah(jumlah) +

            "\nJasa : " +
            jasa +
            "%" +

            "\nDenda : " +
            denda +
            "%" +

            "\nBulan Pinjaman : " +
            bulanPinjaman +

            "\nPeriode Pertama : " +
            periodePertama +

            "\n\nData sudah benar?"

        );


    if(!yakin){

        return;

    }


    // =====================================
    // NOMOR PINJAMAN
    // =====================================

    let idPinjaman =
        nomorPinjamanBaru();

    // =====================================
    // CEGAH ID DAN REFERENSI PINJAMAN GANDA
    // =====================================

    if (
        !Array.isArray(pinjaman) ||
        !Array.isArray(transaksi) ||
        !Array.isArray(kas)
    ) {
        alert(
            "Data pinjaman, transaksi, atau kas belum siap. " +
            "Proses dibatalkan."
        );
        console.error(
            "Validasi referensi pinjaman gagal: array tidak tersedia."
        );
        return;
    }

    const referensiPencairanBBCS = idPinjaman;
    const referensiAdministrasiBBCS = idPinjaman + "-ADMIN";

    const idPinjamanSudahAdaBBCS = pinjaman.some(function(item) {
        return item && item.id === idPinjaman;
    });

    const referensiPencairanSudahAdaBBCS =
        transaksi.some(function(item) {
            return item &&
                item.referensi === referensiPencairanBBCS;
        }) ||
        kas.some(function(item) {
            return item &&
                item.referensi === referensiPencairanBBCS;
        });

    const referensiAdministrasiSudahAdaBBCS =
        Number(biayaAdministrasi) > 0 &&
        (
            transaksi.some(function(item) {
                return item &&
                    item.referensi === referensiAdministrasiBBCS;
            }) ||
            kas.some(function(item) {
                return item &&
                    item.referensi === referensiAdministrasiBBCS;
            })
        );

    if (
        idPinjamanSudahAdaBBCS ||
        referensiPencairanSudahAdaBBCS ||
        referensiAdministrasiSudahAdaBBCS
    ) {
        console.error(
            "Pinjaman dibatalkan karena ID atau referensi sudah digunakan.",
            {
                idPinjaman: idPinjaman,
                idPinjamanSudahAda: idPinjamanSudahAdaBBCS,
                referensiPencairanSudahAda:
                    referensiPencairanSudahAdaBBCS,
                referensiAdministrasiSudahAda:
                    referensiAdministrasiSudahAdaBBCS
            }
        );

        alert(
            "Pinjaman dibatalkan untuk mencegah transaksi ganda.\n\n" +
            "ID/referensi: " + idPinjaman + "\n" +
            "Jangan hapus catatan lama atau ulangi pencairan. " +
            "Periksa data pinjaman, transaksi, dan kas terlebih dahulu."
        );
        return;
    }


    // =====================================
    // DATA PINJAMAN
    // =====================================

if(
        typeof catatTransaksiKas !==
        "function"
    ){

        alert(
            "Mesin Transaksi + Kas belum aktif"
        );

        console.error(
            "catatTransaksiKas() tidak ditemukan"
        );

        return;

    }




    let dataPinjaman = {

        id:
            idPinjaman,

        idAnggota:
            idAnggota,

        anggota:
            idAnggota,

        nama:
            dataAnggota.nama,

        namaAnggota:
            dataAnggota.nama,

        tanggal:
            tanggal,

        bulanPinjaman:
            bulanPinjaman,

        periodePertama:
            periodePertama,

        jumlah:
            jumlah,


        // =================================
        // ADMINISTRASI PINJAMAN
        // =================================

        tarifAdministrasi:
            tarifAdministrasi,

        biayaAdministrasi:
            biayaAdministrasi,

        uangDiterima:
            uangDiterima,


        // =================================
        // JASA
        // =================================

        jasa:
            jasa,


        // =================================
        // DENDA
        // =================================

        denda:
            denda,


        // =================================
        // SISA POKOK
        // =================================

        sisaPokok:
            jumlah,


        // =================================
        // TUNGGAKAN
        // =================================

        jasaTertunggak:
            0,

        dendaTertunggak:
            0,

        bulanTertunggak:
            0,

        wajibBayar:
            false,

        periodeTertunggak:
            [],

        status:
            "Aktif"

    };


    // =====================================
    // SNAPSHOT SEBELUM MUTASI PINJAMAN
    // =====================================

    if (
        !Array.isArray(pinjaman) ||
        !Array.isArray(rekening) ||
        !Array.isArray(transaksi) ||
        !Array.isArray(kas) ||
        typeof simpanDatabaseAman !== "function"
    ) {
        alert("Mesin penyimpanan BBCS belum siap. Pinjaman dibatalkan.");
        return;
    }

    let snapshotSimpanPinjamanBBCS;

    try {
        snapshotSimpanPinjamanBBCS = {
            anggota: JSON.parse(JSON.stringify(anggota)),
            rekening: JSON.parse(JSON.stringify(rekening)),
            simpanan: JSON.parse(JSON.stringify(simpanan)),
            transaksi: JSON.parse(JSON.stringify(transaksi)),
            pinjaman: JSON.parse(JSON.stringify(pinjaman)),
            riwayatAngsuran: JSON.parse(JSON.stringify(riwayatAngsuran)),
            kas: JSON.parse(JSON.stringify(kas)),
            dataCetakSebelumnya: localStorage.getItem("dataCetak")
        };
    } catch (error) {
        console.error("Snapshot pinjaman gagal:", error);
        alert("Data awal tidak dapat diamankan. Pinjaman dibatalkan.");
        return;
    }

    // =====================================
    // SIMPAN DATA PINJAMAN
    // =====================================

    pinjaman.push(
        dataPinjaman
    );


    // =====================================
    // UPDATE REKENING
    // =====================================

    let rek =
        cariRekening(
            idAnggota
        );

    if(rek){

        rek.nama =
            dataAnggota.nama;

        rek.pinjamanAktif =
            Number(
                rek.pinjamanAktif || 0
            )
            +
            jumlah;

        rek.sisaPokok =
            Number(
                rek.sisaPokok || 0
            )
            +
            jumlah;

    }
        // =====================================
    // CEK MESIN TRANSAKSI + KAS
    // =====================================

        // =====================================
    // KAS KELUAR
    // =====================================
    //
    // Kas keluar tetap sebesar POKOK.
    //
    // Contoh:
    // Pokok          Rp100.000
    // Administrasi     Rp1.000
    // Uang diterima   Rp99.000
    //
    // Kewajiban anggota tetap Rp100.000.
    //
    // =====================================

    const hasilKasPencairanBBCS =
        catatTransaksiKas(

        "Pengeluaran",

        "Pinjaman",

        "Pencairan Pinjaman " +
        idPinjaman +
        " - " +
        dataAnggota.nama,

        jumlah,

        idAnggota,

        dataAnggota.nama,

        idPinjaman

    );


// =================================
// 2. KAS MASUK PENDAPATAN ADMIN
// =================================
//
// Referensi dibuat berbeda dari
// pencairan pinjaman agar tidak dianggap
// transaksi ganda.
//
// Pencairan:
// PJ00004
//
// Administrasi:
// PJ00004-ADMIN
//
// =================================

let hasilKasAdministrasiBBCS = true;

if(
    biayaAdministrasi > 0
){

    const referensiAdministrasi =
        idPinjaman + "-ADMIN";


    hasilKasAdministrasiBBCS =
        catatTransaksiKas(

        "Pemasukan",

        "Pendapatan Administrasi",

        "Pendapatan Administrasi Pinjaman " +
        idPinjaman +
        " - " +
        dataAnggota.nama,

        biayaAdministrasi,

        idAnggota,

        dataAnggota.nama,

        referensiAdministrasi

    );

}

    // =====================================

    // =====================================
    // VALIDASI DETAIL HASIL TRANSAKSI KAS
    // =====================================

    function validasiHasilKasPinjamanBBCS(
        hasil,
        jenisDiharapkan,
        kategoriDiharapkan,
        jumlahDiharapkan,
        referensiDiharapkan
    ) {
        if (
            !hasil ||
            !hasil.transaksi ||
            !hasil.kas ||
            !Array.isArray(transaksi) ||
            !Array.isArray(kas)
        ) {
            return false;
        }

        const dataTransaksiBBCS = hasil.transaksi;
        const dataKasBBCS = hasil.kas;
        const nominalDiharapkan = Number(jumlahDiharapkan);

        if (
            !Number.isFinite(nominalDiharapkan) ||
            nominalDiharapkan <= 0 ||
            typeof referensiDiharapkan !== "string" ||
            referensiDiharapkan.length === 0
        ) {
            return false;
        }

        function dataSesuaiBBCS(item) {
            return Boolean(
                item &&
                item.referensi === referensiDiharapkan &&
                item.jenis === jenisDiharapkan &&
                item.kategori === kategoriDiharapkan &&
                Number.isFinite(Number(item.jumlah)) &&
                Number(item.jumlah) === nominalDiharapkan &&
                item.id
            );
        }

        if (
            !dataSesuaiBBCS(dataTransaksiBBCS) ||
            !dataSesuaiBBCS(dataKasBBCS)
        ) {
            return false;
        }

        const transaksiDenganReferensiBBCS =
            transaksi.filter(function(item) {
                return item &&
                    item.referensi === referensiDiharapkan;
            });

        const kasDenganReferensiBBCS =
            kas.filter(function(item) {
                return item &&
                    item.referensi === referensiDiharapkan;
            });

        if (
            transaksiDenganReferensiBBCS.length !== 1 ||
            kasDenganReferensiBBCS.length !== 1
        ) {
            return false;
        }

        const transaksiTersimpanBBCS =
            transaksiDenganReferensiBBCS[0];

        const kasTersimpanBBCS =
            kasDenganReferensiBBCS[0];

        if (
            transaksiTersimpanBBCS.id !== dataTransaksiBBCS.id ||
            kasTersimpanBBCS.id !== dataKasBBCS.id
        ) {
            return false;
        }

        return true;
    }

    // VALIDASI HASIL KEDUA TRANSAKSI KAS
    // =====================================

    const pencairanKasValidBBCS =
        validasiHasilKasPinjamanBBCS(
            hasilKasPencairanBBCS,
            "Pengeluaran",
            "Pinjaman",
            jumlah,
            idPinjaman
        );

    const administrasiKasValidBBCS =
        biayaAdministrasi <= 0 ||
        validasiHasilKasPinjamanBBCS(
            hasilKasAdministrasiBBCS,
            "Pemasukan",
            "Pendapatan Administrasi",
            biayaAdministrasi,
            idPinjaman + "-ADMIN"
        );

    if (
        !pencairanKasValidBBCS ||
        !administrasiKasValidBBCS
    ) {
        pulihkanPinjamanSetelahGagalBBCS(
            "Pencatatan kas pinjaman gagal."
        );
        return;
    }


    // =====================================
    // DATA CETAK
    // =====================================

    let dataCetak = {

        referensi:
            idPinjaman,

        tanggal:
            tanggal,

        anggota:
            idAnggota,

        idAnggota:
            idAnggota,

        nama:
            dataAnggota.nama,

        namaAnggota:
            dataAnggota.nama,

        jenis:
            "PINJAMAN",

        kategori:
            "Pencairan Pinjaman",

        jumlah:
            jumlah,

        tarifAdministrasi:
            tarifAdministrasi,

        biayaAdministrasi:
            biayaAdministrasi,

        uangDiterima:
            uangDiterima,

        denda:
            denda,

        sisaPokok:
            jumlah,

        bulanPinjaman:
            bulanPinjaman,

        periodePertama:
            periodePertama,

        status:
            "AKTIF"

    };


    // =====================================
    // PEMULIHAN JIKA SIMPAN / SINKRON GAGAL
    // =====================================

    function pulihkanPinjamanSetelahGagalBBCS(alasan) {
        console.error("Proses pinjaman dibatalkan:", alasan);

        let arrayPulihBBCS = false;
        let cetakPulihBBCS = false;
        let databasePulihBBCS = false;
        let verifikasiStorageBBCS = false;

        const daftarArrayPulihBBCS = [
            ["anggota", anggota, snapshotSimpanPinjamanBBCS.anggota],
            ["rekening", rekening, snapshotSimpanPinjamanBBCS.rekening],
            ["simpanan", simpanan, snapshotSimpanPinjamanBBCS.simpanan],
            ["transaksi", transaksi, snapshotSimpanPinjamanBBCS.transaksi],
            ["pinjaman", pinjaman, snapshotSimpanPinjamanBBCS.pinjaman],
            [
                "riwayatAngsuran",
                riwayatAngsuran,
                snapshotSimpanPinjamanBBCS.riwayatAngsuran
            ],
            ["kas", kas, snapshotSimpanPinjamanBBCS.kas]
        ];

        try {
            for (const data of daftarArrayPulihBBCS) {
                const target = data[1];
                const sumber = data[2];

                if (!Array.isArray(target) || !Array.isArray(sumber)) {
                    throw new Error(
                        "Array tidak valid: " + data[0]
                    );
                }

                const salinan = JSON.parse(JSON.stringify(sumber));

                target.length = 0;
                for (const item of salinan) {
                    target.push(item);
                }

                if (JSON.stringify(target) !== JSON.stringify(sumber)) {
                    throw new Error(
                        "Verifikasi array gagal: " + data[0]
                    );
                }
            }

            arrayPulihBBCS = true;
        } catch (error) {
            console.error("Pemulihan array gagal:", error);
        }

        try {
            const cetakLamaBBCS =
                snapshotSimpanPinjamanBBCS.dataCetakSebelumnya;

            if (cetakLamaBBCS === null) {
                localStorage.removeItem("dataCetak");
            } else {
                localStorage.setItem("dataCetak", cetakLamaBBCS);
            }

            cetakPulihBBCS =
                localStorage.getItem("dataCetak") === cetakLamaBBCS;
        } catch (error) {
            console.error("Pemulihan dataCetak gagal:", error);
        }

        try {
            databasePulihBBCS = simpanDatabaseAman() === true;
        } catch (error) {
            console.error("Penyimpanan pemulihan gagal:", error);
        }

        try {
            const daftarKunciStorageBBCS = [
                ["anggota", "anggota"],
                ["rekening", "rekening"],
                ["simpanan", "simpanan"],
                ["transaksi", "transaksi"],
                ["pinjaman", "pinjaman"],
                ["angsuran", "riwayatAngsuran"],
                ["kas", "kas"]
            ];

            let semuaArrayStorageValidBBCS = true;

            for (const pasangan of daftarKunciStorageBBCS) {
                const kunci = pasangan[0];
                const namaSnapshot = pasangan[1];
                const mentah = localStorage.getItem(kunci);

                if (mentah === null) {
                    semuaArrayStorageValidBBCS = false;
                    console.error("Kunci storage tidak ditemukan:", kunci);
                    continue;
                }

                let tersimpan;

                try {
                    tersimpan = JSON.parse(mentah);
                } catch (error) {
                    semuaArrayStorageValidBBCS = false;
                    console.error("JSON storage tidak valid:", kunci);
                    continue;
                }

                const snapshot =
                    snapshotSimpanPinjamanBBCS[namaSnapshot];

                if (
                    !Array.isArray(tersimpan) ||
                    !Array.isArray(snapshot) ||
                    JSON.stringify(tersimpan) !== JSON.stringify(snapshot)
                ) {
                    semuaArrayStorageValidBBCS = false;
                    console.error("Isi storage tidak cocok:", kunci);
                }
            }

            const cetakTersimpanBBCS =
                localStorage.getItem("dataCetak");

            const cetakSesuaiBBCS =
                cetakTersimpanBBCS ===
                snapshotSimpanPinjamanBBCS.dataCetakSebelumnya;

            if (!cetakSesuaiBBCS) {
                console.error("Isi dataCetak tidak cocok dengan snapshot.");
            }

            verifikasiStorageBBCS =
                semuaArrayStorageValidBBCS && cetakSesuaiBBCS;
        } catch (error) {
            console.error("Pembacaan ulang storage gagal:", error);
        }

        if (
            arrayPulihBBCS &&
            cetakPulihBBCS &&
            databasePulihBBCS &&
            verifikasiStorageBBCS
        ) {
            alert(
                alasan +
                String.fromCharCode(10, 10) +
                "Pemulihan terverifikasi melalui pembacaan ulang " +
                "tujuh array dan dataCetak." +
                String.fromCharCode(10, 10) +
                "Periksa laporan sebelum melakukan transaksi berikutnya."
            );
        } else {
            console.error("PEMULIHAN BELUM TERVERIFIKASI:", {
                arrayPulihBBCS,
                cetakPulihBBCS,
                databasePulihBBCS,
                verifikasiStorageBBCS
            });

            alert(
                alasan +
                String.fromCharCode(10, 10) +
                "PEMULIHAN BELUM TERVERIFIKASI." +
                String.fromCharCode(10, 10) +
                "JANGAN ulangi pencairan atau transaksi." +
                String.fromCharCode(10, 10) +
                "Periksa anggota, rekening, simpanan, transaksi, " +
                "pinjaman, angsuran, kas, dan dataCetak."
            );
        }
    }


    // SIMPAN DATA CETAK
    // =====================================

    try {
        localStorage.setItem(
            "dataCetak",
            JSON.stringify(dataCetak)
        );
    } catch (error) {
        console.error(
            "Penyimpanan dataCetak gagal:",
            error
        );

        pulihkanPinjamanSetelahGagalBBCS(
            "Penyimpanan data cetak gagal."
        );

        return;
    }


    // =====================================
    // SINKRONISASI DAN VALIDASI HASIL
    // =====================================

    let hasilSinkronisasiPinjamanBBCS = null;

    try {
        if (
            typeof sinkronSemuaData !== "function"
        ) {
            throw new Error(
                "Fungsi sinkronSemuaData tidak tersedia."
            );
        }

        hasilSinkronisasiPinjamanBBCS =
            sinkronSemuaData();
    } catch (error) {
        console.error(
            "Sinkronisasi pinjaman gagal:",
            error
        );
    }

    if (hasilSinkronisasiPinjamanBBCS !== true) {
        pulihkanPinjamanSetelahGagalBBCS(
            "Sinkronisasi data pinjaman gagal."
        );

        return;
    }


    // =====================================
    // SIMPAN DATABASE DAN PERIKSA HASIL
    // =====================================

    let simpanAkhirPinjamanBBCS = false;

    try {
        simpanAkhirPinjamanBBCS =
            simpanDatabaseAman() === true;
    } catch (error) {
        console.error(
            "Penyimpanan akhir pinjaman melempar kesalahan:",
            error
        );

        simpanAkhirPinjamanBBCS = false;
    }

    if (simpanAkhirPinjamanBBCS !== true) {
        console.error(
            "Penyimpanan akhir pinjaman gagal. " +
            "Memulai upaya pemulihan snapshot."
        );

        pulihkanPinjamanSetelahGagalBBCS(
            "Penyimpanan akhir database pinjaman gagal."
        );

        return;
    }


    // =====================================
    console.log(
        "Transaksi + Kas Pinjaman berhasil dicatat dan " +
        "penyimpanan akhir berhasil dikonfirmasi."
    );

    // TAMPIL DATA PINJAMAN
    // =====================================

    tampilPinjaman();


    // =====================================
    // RESET FORM JUMLAH
    // =====================================

    let jumlahField =
        document.getElementById(
            "jumlahPinjaman"
        );

    if(jumlahField){

        jumlahField.value = "";

    }


    // =====================================
    // RESET FORM JASA
    // =====================================

    let jasaField =
        document.getElementById(
            "jasaPinjaman"
        );

    if(jasaField){

        jasaField.value = "";

    }


    // =====================================
    // RESET FORM DENDA
    // =====================================

    let dendaField =
        document.getElementById(
            "dendaPinjaman"
        );

    if(dendaField){

        dendaField.value = "";

    }


    // =====================================
    // RESET PILIH ANGGOTA
    // =====================================

    if(pilih){

        pilih.selectedIndex = 0;

    }


    // =====================================
    // PESAN BERHASIL
    // =====================================

    alert(

        "Pinjaman berhasil disimpan\n\n" +

        "Pokok : " +
        rupiah(jumlah) +

        "\nAdministrasi : " +
        rupiah(biayaAdministrasi) +

        "\nUang diterima : " +
        rupiah(uangDiterima) +

        "\nKewajiban : " +
        rupiah(jumlah)

    );


    // =====================================
    // CETAK BUKTI
    // =====================================

    let cetak =
        confirm(
            "Cetak bukti pinjaman sekarang?"
        );


    if(cetak){

        window.location.href =
            "cetak.html";

    }

}


// =====================================
// TAMPIL DATA PINJAMAN
// =====================================
//
// Fungsi ini hanya menampilkan data
// pinjaman yang tersimpan.
//
// BUKAN riwayat transaksi.
//
// =====================================

function tampilPinjaman(){

    const tempat = document.getElementById("daftarPinjaman");

    if (!tempat) {
        return;
    }

    tempat.replaceChildren();

    if (!Array.isArray(pinjaman) || pinjaman.length === 0) {
        tempat.textContent = "Belum ada pinjaman";
        return;
    }

    function tambahBaris(kartu, label, nilai) {
        const baris = document.createElement("div");
        const teks = document.createElement("span");

        teks.textContent = label + " : ";
        baris.appendChild(teks);

        const isi = document.createElement("span");
        isi.textContent = String(
            nilai === null || nilai === undefined ? "" : nilai
        );

        baris.appendChild(isi);
        kartu.appendChild(baris);
    }

    function formatRupiahAman(nilai) {
        return rupiah(nilai || 0);
    }

    pinjaman.forEach(function(item) {
        if (!item) {
            return;
        }

        const kartu = document.createElement("div");
        kartu.className = "info";

        const judul = document.createElement("b");
        judul.textContent = String(item.id || "");
        kartu.appendChild(judul);

        kartu.appendChild(document.createElement("br"));
        kartu.appendChild(document.createElement("br"));

        tambahBaris(kartu, "ID Anggota",
            item.idAnggota || item.anggota || "");

        tambahBaris(kartu, "Nama",
            item.namaAnggota || item.nama || "");

        tambahBaris(kartu, "Tanggal Pinjaman",
            item.tanggal || "");

        tambahBaris(kartu, "Jumlah Pokok",
            formatRupiahAman(item.jumlah));

        tambahBaris(kartu, "Tarif Administrasi",
            String(item.tarifAdministrasi || 0) + "%");

        tambahBaris(kartu, "Biaya Administrasi",
            formatRupiahAman(item.biayaAdministrasi));

        tambahBaris(kartu, "Uang Diterima Anggota",
            formatRupiahAman(item.uangDiterima));

        tambahBaris(kartu, "Kewajiban Anggota",
            formatRupiahAman(item.jumlah));

        tambahBaris(kartu, "Sisa Pokok",
            formatRupiahAman(item.sisaPokok));

        tambahBaris(kartu, "Jasa Menurun",
            String(item.jasa || 0) + "%");

        tambahBaris(kartu, "Denda Tunggakan",
            String(item.denda || 0) + "%");

        tambahBaris(kartu, "Bulan Pinjaman",
            item.bulanPinjaman || "");

        tambahBaris(kartu, "Periode Pertama",
            item.periodePertama || "");

        tambahBaris(kartu, "Jasa Tertunggak",
            formatRupiahAman(item.jasaTertunggak));

        tambahBaris(kartu, "Denda Tertunggak",
            formatRupiahAman(item.dendaTertunggak));

        tambahBaris(kartu, "Bulan Tertunggak",
            item.bulanTertunggak || 0);

        tambahBaris(kartu, "Wajib Bayar",
            item.wajibBayar ? "YA" : "TIDAK");

        tambahBaris(kartu, "Status",
            item.status || "");

        tempat.appendChild(kartu);
        tempat.appendChild(document.createElement("hr"));
    });
}


// CEK MODUL
// =====================================

console.log(
    "Modul Pinjaman BBCS V3 Siap"
);