
// =====================================
// BBCS KAS V3.x - ENTRY
// =====================================

console.log("KAS BBCS V3.x MEMUAT...");
console.log("====================================");

// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL KAS BBCS V3.x
// =====================================

console.log("KAS BBCS V3.x AKTIF");
console.log("====================================");


// =====================================
// KONFIGURASI
// =====================================

const KAS_BBCS_VERSION = "V3.x";


// =====================================
// HELPER ANGKA
// =====================================

function angkaKasBBCS(nilai){

    if(typeof nilai === "number"){
        return Number.isFinite(nilai) ? nilai : 0;
    }

    if(nilai === null || nilai === undefined){
        return 0;
    }

    return Number(
        String(nilai)
            .replace(/\./g, "")
            .replace(/,/g, ".")
            .replace(/[^\d.-]/g, "")
    ) || 0;
}


// =====================================
// FORMAT INPUT JUMLAH
// =====================================

function formatJumlah(input){

    if(!input){
        return;
    }

    let angka =
        String(input.value || "")
            .replace(/\D/g, "");

    if(angka === ""){

        input.value = "";

        return;
    }

    input.value =
        Number(angka)
            .toLocaleString("id-ID");
}


// =====================================
// CARI KAS BERDASARKAN REFERENSI
// =====================================

function cariKasByReferensiBBCS(referensi){

    if(!Array.isArray(kas)){
        return null;
    }

    const ref =
        String(referensi || "").trim();

    if(!ref){
        return null;
    }

    return kas.find(function(k){

        return k &&
            String(k.referensi || "") === ref;

    }) || null;
}


// =====================================
// CEK DUPLIKASI KAS
// =====================================

function sudahAdaKasBBCS(referensi){

    return !!cariKasByReferensiBBCS(referensi);

}


// =====================================
// HITUNG KAS
// =====================================

function hitungKasBBCS(){

    let pemasukan = 0;
    let pengeluaran = 0;

    if(!Array.isArray(kas)){
        return {
            pemasukan: 0,
            pengeluaran: 0,
            saldo: 0
        };
    }

    kas.forEach(function(item){

        if(!item){
            return;
        }

        const jumlah =
            angkaKasBBCS(item.jumlah);

        const jenis =
            String(item.jenis || "")
                .toLowerCase()
                .trim();

        if(jenis === "pemasukan"){

            pemasukan += jumlah;

        }

        else if(jenis === "pengeluaran"){

            pengeluaran += jumlah;

        }

    });

    return {

        pemasukan:
            pemasukan,

        pengeluaran:
            pengeluaran,

        saldo:
            pemasukan - pengeluaran

    };

}


// =====================================
// SIMPAN DATABASE AMAN
// =====================================

function simpanDatabaseKasBBCS(){

    if(typeof simpanDatabaseAman === "function"){

        simpanDatabaseAman();

        return true;
    }

    if(typeof simpanDatabase === "function"){

        simpanDatabase();

        return true;
    }

    console.warn(
        "Fungsi penyimpanan database tidak ditemukan"
    );

    return false;
}


// =====================================
// CATAT KAS BBCS
// =====================================

function catatKasBBCS(data){

    if(!data){
        return {
            berhasil: false,
            pesan: "Data kas kosong"
        };
    }

    if(!Array.isArray(kas)){
        return {
            berhasil: false,
            pesan: "Database kas tidak tersedia"
        };
    }

    const jenis =
        String(data.jenis || "").trim();

    const kategori =
        String(data.kategori || "").trim();

    const jumlah =
        angkaKasBBCS(data.jumlah);

    const referensi =
        String(data.referensi || "").trim();

    if(
        jenis !== "Pemasukan" &&
        jenis !== "Pengeluaran"
    ){

        return {
            berhasil: false,
            pesan: "Jenis kas tidak valid"
        };
    }

    if(jumlah <= 0){

        return {
            berhasil: false,
            pesan: "Jumlah kas harus lebih dari 0"
        };
    }

    if(!referensi){

        return {
            berhasil: false,
            pesan: "Referensi kas wajib diisi"
        };
    }


    // =================================
    // ANTI DUPLIKASI
    // =================================

    if(sudahAdaKasBBCS(referensi)){

        return {
            berhasil: false,
            duplikat: true,
            pesan:
                "Kas dengan referensi tersebut sudah ada"
        };

    }


    const idAnggota =
        String(data.idAnggota || "");

    const namaAnggota =
        String(data.namaAnggota || "");

    const tanggal =
        data.tanggal ||
        new Date().toLocaleDateString("id-ID");


    const dataKas = {

        id:
            typeof nomorKasBaru === "function"
                ? nomorKasBaru()
                : "KS-" + Date.now(),

        idAnggota:
            idAnggota,

        namaAnggota:
            namaAnggota,

        jenis:
            jenis,

        kategori:
            kategori,

        keterangan:
            String(data.keterangan || ""),

        jumlah:
            jumlah,

        referensi:
            referensi,

        tanggal:
            tanggal

    };


    kas.push(dataKas);


    return {

        berhasil: true,

        data: dataKas

    };

}


// =====================================
// FORMAT ANGKA KAS
// =====================================

function formatAngkaKasBBCS(input){

    if(!input){
        return;
    }

    let angka =
        String(input.value || "")
            .replace(/\D/g, "");

    if(angka === ""){

        input.value = "";

        return;

    }

    input.value =
        Number(angka)
            .toLocaleString("id-ID");

}


// =====================================
// SIMPAN KAS DARI FORM
// =====================================

function simpanKas(){

    const elJenis =
        document.getElementById("jenisKas");

    const elKategori =
        document.getElementById("kategoriKas");

    const elKeterangan =
        document.getElementById("keteranganKas");

    const elJumlah =
        document.getElementById("jumlahKas");

    if(
        !elJenis ||
        !elKategori ||
        !elKeterangan ||
        !elJumlah
    ){

        alert(
            "Form Kas tidak lengkap"
        );

        return;

    }


    const jenis =
        elJenis.value;

    const kategori =
        elKategori.value;

    const keterangan =
        elKeterangan.value.trim();

    const jumlah =
        typeof angkaNilai === "function"
            ? angkaNilai(elJumlah.value)
            : angkaKasBBCS(elJumlah.value);


    // =================================
    // ANGGOTA OPSIONAL
    // =================================

    let idAnggota = "";
    let namaAnggota = "";

    const pilihAnggota =
        document.getElementById(
            "pilihAnggotaKas"
        );

    if(pilihAnggota){

        idAnggota =
            pilihAnggota.value || "";

        if(
            idAnggota &&
            typeof cariAnggota === "function"
        ){

            const data =
                cariAnggota(idAnggota);

            if(data){

                namaAnggota =
                    data.nama || "";

            }

        }

    }


    // =================================
    // VALIDASI
    // =================================

    if(jumlah <= 0){

        alert(
            "Jumlah kas belum diisi"
        );

        return;

    }


    // =================================
    // REFERENSI MANUAL
    // =================================

    const referensi =
        "KS-MANUAL-" +
        Date.now();


    // =================================
    // KONFIRMASI
    // =================================

    const yakin =
        confirm(

            "Konfirmasi Kas\n\n" +

            "Jenis : " +
            jenis + "\n" +

            "Kategori : " +
            kategori + "\n" +

            "Keterangan : " +
            keterangan + "\n" +

            "Jumlah : " +

            (
                typeof rupiah === "function"
                    ? rupiah(jumlah)
                    : "Rp " +
                      jumlah.toLocaleString("id-ID")
            )

        );


    if(!yakin){
        return;
    }


    // =================================
    // CATAT KAS
    // =================================

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
                idAnggota,

            namaAnggota:
                namaAnggota,

            referensi:
                referensi

        });


    if(!hasil.berhasil){

        alert(
            hasil.pesan
        );

        return;

    }


    // =================================
    // CATAT TRANSAKSI
    // =================================

    if(typeof tambahTransaksi === "function"){

        tambahTransaksi(

            jenis,

            kategori,

            kategori +
            (
                keterangan
                    ? " - " + keterangan
                    : ""
            ),

            jumlah,

            idAnggota,

            namaAnggota,

            referensi

        );

    }


    // =================================
    // SIMPAN DATABASE
    // =================================

    simpanDatabaseKasBBCS();


    // =================================
    // REFRESH
    // =================================

    tampilKasBBCS();


    // =================================
    // BERSIHKAN FORM
    // =================================

    elKeterangan.value = "";
    elJumlah.value = "";


    alert(
        "Data Kas berhasil disimpan"
    );

}


// =====================================
// TAMPIL RINGKASAN KAS
// =====================================

function tampilKasBBCS(){

    const tempat =
        document.getElementById(
            "dataKas"
        );

    if(!tempat){
        return;
    }


    const data =
        hitungKasBBCS();


    const format =
        typeof rupiah === "function"
            ? rupiah
            : function(n){

                return "Rp " +
                    Number(n || 0)
                        .toLocaleString("id-ID");

            };


    tempat.innerHTML = `

        <div class="info">

            <div>
                Total Pemasukan :
                <b>
                    ${format(data.pemasukan)}
                </b>
            </div>

            <br>

            <div>
                Total Pengeluaran :
                <b>
                    ${format(data.pengeluaran)}
                </b>
            </div>

            <br>

            <div>
                Saldo Kas :
                <b>
                    ${format(data.saldo)}
                </b>
            </div>

        </div>

    `;

}

// =====================================
// DATA KAS UNTUK LAPORAN
// =====================================

function getRingkasanKasBBCS(){

    const data =
        hitungKasBBCS();

    return {

        totalPemasukan:
            data.pemasukan,

        totalPengeluaran:
            data.pengeluaran,

        saldoKas:
            data.saldo

    };

}

// =====================================
// DATA NERACA BBCS
// HANYA MENGHITUNG POSISI KEUANGAN
// TIDAK MENGUBAH DATA KAS
// =====================================

function ambilDataNeracaKasBBCS(){

    // =================================
    // 1. KAS
    // =================================

    const kasData =
        hitungKasBBCS();

    const kasSekarang =
        Number(kasData.saldo) || 0;


    // =================================
    // 2. PIUTANG PINJAMAN
    // Total sisa pokok pinjaman aktif
    // =================================

    let piutang = 0;

    if(Array.isArray(pinjaman)){

        pinjaman.forEach(function(item){

            if(!item){
                return;
            }

            const status =
                String(item.status || "")
                    .trim()
                    .toLowerCase();

            if(status === "lunas"){
                return;
            }

            const sisa =
                Number(item.sisaPokok);

            if(Number.isFinite(sisa)){
                piutang += sisa;
            }

        });

    }


    // =================================
    // 3. DATA INVESTOR
    // BACA LANGSUNG DARI LOCALSTORAGE
    // =================================

    let rekeningInvestorKas = [];

    try{

        const data =
            localStorage.getItem(
                "rekeningInvestor"
            );

        if(data){

            const hasil =
                JSON.parse(data);

            if(Array.isArray(hasil)){
                rekeningInvestorKas = hasil;
            }

        }

    }
    catch(error){

        console.warn(
            "Kas BBCS: gagal membaca rekeningInvestor",
            error
        );

        rekeningInvestorKas = [];

    }


    // =================================
    // 4. MODAL INVESTOR
    // MODAL YANG MASIH MENJADI KEWAJIBAN
    // =================================

    let modalInvestor = 0;

    rekeningInvestorKas.forEach(function(item){

        if(!item){
            return;
        }

        modalInvestor +=
            Number(item.saldoModal) || 0;

    });


    // =================================
    // 5. JASA INVESTOR
    // JASA YANG MASIH MENJADI KEWAJIBAN
    // =================================

    let jasaInvestor = 0;

    rekeningInvestorKas.forEach(function(item){

        if(!item){
            return;
        }

        jasaInvestor +=
            Number(item.jasaTersedia) || 0;

    });


    // =================================
    // 6. TOTAL AKTIVA
    // =================================

    const totalAktiva =
        kasSekarang +
        piutang;


    // =================================
    // 7. EKUITAS BBCS
    //
    // Total Aktiva
    // dikurangi kewajiban kepada investor
    // =================================

    const ekuitas =
        totalAktiva -
        modalInvestor -
        jasaInvestor;


    // =================================
    // 8. TOTAL PASIVA & EKUITAS
    // =================================

    const totalPasiva =
        modalInvestor +
        jasaInvestor +
        ekuitas;


    // =================================
    // 9. HASIL
    // =================================

    return {

        kas:
            kasSekarang,

        piutang:
            piutang,

        totalAktiva:
            totalAktiva,

        modalInvestor:
            modalInvestor,

        jasaInvestor:
            jasaInvestor,

        ekuitas:
            ekuitas,

        totalPasiva:
            totalPasiva,

        totalPemasukan:
            Number(kasData.pemasukan) || 0,

        totalPengeluaran:
            Number(kasData.pengeluaran) || 0,

        saldo:
            kasSekarang

    };

}

// =====================================
// DATA KAS UNTUK NERACA
// =====================================

function getKasNeracaBBCS(){

    const data =
        ambilDataNeracaKasBBCS();


    return Number(
        data.kas
    ) || 0;

}
// =====================================
// SUMBER RESMI LAPORAN GLOBAL
// =====================================

function ambilRingkasanKasBBCS(){

    const data =
        hitungKasBBCS();

    return {

        totalPemasukanKas:
            data.pemasukan,

        totalPengeluaranKas:
            data.pengeluaran,

        saldoKas:
            data.saldo

    };

}


// =====================================
// AUDIT KAS
// =====================================

function auditKasBBCS(){

    const hasil =
        hitungKasBBCS();

    const duplikat = {};

    let jumlahDuplikat = 0;


    if(Array.isArray(kas)){

        kas.forEach(function(k){

            if(!k){
                return;
            }

            const ref =
                String(
                    k.referensi || ""
                );

            if(!ref){
                return;
            }

            if(!duplikat[ref]){

                duplikat[ref] = 1;

            }
            else {

                duplikat[ref]++;
                jumlahDuplikat++;

            }

        });

    }


    const hasilAudit = {

        jumlahKas:
            Array.isArray(kas)
                ? kas.length
                : 0,

        totalPemasukan:
            hasil.pemasukan,

        totalPengeluaran:
            hasil.pengeluaran,

        saldoKas:
            hasil.saldo,

        jumlahDuplikat:
            jumlahDuplikat

    };


    console.log(
        "AUDIT KAS BBCS:",
        hasilAudit
    );


    return hasilAudit;

}


// =====================================
// AUDIT SINKRON KAS BBCS
// =====================================

function auditSinkronKasBBCS(){

    const data =
        hitungKasBBCS();

    const hasil = {

        databaseKas:
            Array.isArray(kas)
                ? kas.length
                : 0,

        pemasukanKas:
            data.pemasukan,

        pengeluaranKas:
            data.pengeluaran,

        saldoKas:
            data.saldo

    };


    console.log(
        "===================================="
    );

    console.log(
        "AUDIT SINKRON KAS BBCS"
    );

    console.log(
        hasil
    );

    console.log(
        "===================================="
    );


    return hasil;

}


// =====================================
// MIGRASI KAS LAMA
// =====================================

function migrasiKasBBCS(){

    if(!Array.isArray(kas)){
        return;
    }


    kas.forEach(function(item){

        if(!item){
            return;
        }


        if(item.idAnggota === undefined){

            item.idAnggota = "";

        }


        if(item.namaAnggota === undefined){

            item.namaAnggota = "";

        }


        if(item.referensi === undefined){

            item.referensi =
                "KS-MIGRASI-" +
                (
                    item.id ||
                    Date.now()
                );

        }


        if(item.jumlah === undefined){

            item.jumlah =
                angkaKasBBCS(
                    item.nominal ||
                    item.total ||
                    0
                );

        }

    });

}


// =====================================
// SINKRON NAMA ANGGOTA
// =====================================

function sinkronNamaKasBBCS(){

    if(
        !Array.isArray(kas) ||
        typeof cariAnggota !== "function"
    ){

        return;

    }


    kas.forEach(function(item){

        if(
            !item ||
            !item.idAnggota
        ){

            return;

        }


        const anggotaData =
            cariAnggota(
                item.idAnggota
            );


        if(!anggotaData){

            return;

        }


        item.namaAnggota =
            anggotaData.nama || "";

    });

}


// =====================================
// PROTEKSI KAS
// =====================================

function proteksiKasBBCS(){

    migrasiKasBBCS();

    sinkronNamaKasBBCS();

    auditKasBBCS();

    simpanDatabaseKasBBCS();


    console.log(
        "Proteksi Kas BBCS V3.x selesai"
    );

}


// =====================================
// ALIAS KOMPATIBILITAS MODUL LAMA
// =====================================

function tampilKas(){

    if(
        typeof tampilKasBBCS === "function"
    ){

        tampilKasBBCS();

    }

}


// =====================================
// AUTO LOAD
// =====================================

migrasiKasBBCS();

sinkronNamaKasBBCS();

tampilKasBBCS();


console.log(
    "Modul Kas BBCS V3.x siap"
);

console.log(
    "===================================="
);
