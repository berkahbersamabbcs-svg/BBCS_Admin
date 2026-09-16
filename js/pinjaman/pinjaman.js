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
    // CEK MESIN ADMINISTRASI
    // =====================================

    if(
        typeof window.hitungAdministrasiPinjamanBBCS !==
        "function"
    ){

        alert(
            "Mesin Administrasi Pinjaman belum aktif"
        );

        console.error(
            "hitungAdministrasiPinjamanBBCS() tidak ditemukan"
        );

        return;

    }


    // =====================================
    // HITUNG ADMINISTRASI
    // =====================================

    const hasilAdministrasi =
        window.hitungAdministrasiPinjamanBBCS(
            jumlah
        );


    const tarifAdministrasi =
        hasilAdministrasi.tarifAdministrasi;


    const biayaAdministrasi =
        hasilAdministrasi.biayaAdministrasi;


    const uangDiterima =
        hasilAdministrasi.uangDiterima;


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
    // DATA PINJAMAN
    // =====================================

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

if(
    biayaAdministrasi > 0
){

    const referensiAdministrasi =
        idPinjaman + "-ADMIN";


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

    console.log(
        "Transaksi + Kas Pinjaman berhasil dicatat"
    );


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
    // SIMPAN DATA CETAK
    // =====================================

    localStorage.setItem(
        "dataCetak",
        JSON.stringify(
            dataCetak
        )
    );


    // =====================================
    // SINKRONISASI
    // =====================================

    if(
        typeof sinkronSemuaData ===
        "function"
    ){

        sinkronSemuaData();

    }


    // =====================================
    // SIMPAN DATABASE
    // =====================================

    simpanDatabaseAman();


    // =====================================
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

    let tempat =
        document.getElementById(
            "daftarPinjaman"
        );


    if(!tempat){

        return;

    }


    if(
        !Array.isArray(pinjaman)
        ||
        pinjaman.length === 0
    ){

        tempat.innerHTML =
            "Belum ada pinjaman";

        return;

    }


    let isi = "";


    pinjaman.forEach(function(item){

        if(!item){

            return;

        }


        isi += `

            <div class="info">

                <b>
                    ${item.id || ""}
                </b>

                <br><br>

                ID Anggota :
                ${item.idAnggota ||
                  item.anggota ||
                  ""}

                <br>

                Nama :
                ${item.namaAnggota ||
                  item.nama ||
                  ""}

                <br>

                Tanggal Pinjaman :
                ${item.tanggal || ""}

                <br>

                Jumlah Pokok :
                ${rupiah(
                    item.jumlah || 0
                )}

                <br>

                Tarif Administrasi :
                ${item.tarifAdministrasi || 0}%

                <br>

                Biaya Administrasi :
                ${rupiah(
                    item.biayaAdministrasi || 0
                )}

                <br>

                Uang Diterima Anggota :
                ${rupiah(
                    item.uangDiterima || 0
                )}

                <br>

                Kewajiban Anggota :
                ${rupiah(
                    item.jumlah || 0
                )}

                <br>

                Sisa Pokok :
                ${rupiah(
                    item.sisaPokok || 0
                )}

                <br>

                Jasa Menurun :
                ${item.jasa || 0}%

                <br>

                Denda Tunggakan :
                ${item.denda || 0}%

                <br>

                Bulan Pinjaman :
                ${item.bulanPinjaman || ""}

                <br>

                Periode Pertama :
                ${item.periodePertama || ""}

                <br>

                Jasa Tertunggak :
                ${rupiah(
                    item.jasaTertunggak || 0
                )}

                <br>

                Denda Tertunggak :
                ${rupiah(
                    item.dendaTertunggak || 0
                )}

                <br>

                Bulan Tertunggak :
                ${item.bulanTertunggak || 0}

                <br>

                Wajib Bayar :
                ${
                    item.wajibBayar
                    ? "YA"
                    : "TIDAK"
                }

                <br>

                Status :
                ${item.status || ""}

            </div>

        `;

    });


    tempat.innerHTML =
        isi;

}


// =====================================
// CEK MODUL
// =====================================

console.log(
    "Modul Pinjaman BBCS V3 Siap"
);