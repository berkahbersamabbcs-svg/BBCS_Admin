// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL DATA ANGGOTA
// VERSI TERINTEGRASI DATABASE BBCS V3.0
// =====================================

console.log(
"Modul Anggota Aktif"
);


// =====================================
// INDEX EDIT
// =====================================

let indexEditAnggota = -1;


// =====================================
// TAMBAH / EDIT ANGGOTA
// =====================================

function tambahAnggota(){

    let nama =
    document.getElementById("namaAnggota")
    .value
    .trim();


    let tanggal =
    document.getElementById("tanggalMasuk")
    .value ||
    new Date()
    .toISOString()
    .substring(0,10);


    let hp =
    document.getElementById("noHp")
    .value
    .trim();


    // =================================
    // CEK NAMA
    // =================================

    if(nama == ""){

        alert(
        "Nama anggota belum diisi"
        );

        return;
    }


    // =================================
    // MODE EDIT
    // =================================

    if(indexEditAnggota >= 0){

        let data =
        anggota[indexEditAnggota];


        data.nama =
        nama;

        data.tanggalMasuk =
        tanggal;

        data.hp =
        hp;


        // Simpan database
        simpanDatabaseAman();


        // Sinkron data
        if(typeof sinkronSemuaData === "function"){
            sinkronSemuaData();
        }


        tampilAnggota();

        kosongkanFormAnggota();


        indexEditAnggota = -1;


        alert(
        "Data anggota berhasil diperbarui"
        );

        return;
    }


    // =================================
    // CEK DATA GANDA
    // =================================

    let cek =
    anggota.find(function(item){

        return item.nama
        .toLowerCase()
        ==
        nama
        .toLowerCase();

    });


    if(cek){

        alert(
        "Nama anggota sudah terdaftar"
        );

        return;
    }


    // =================================
    // BUAT ID ANGGOTA
    // =================================

    let id =
    nomorAnggotaBaru();


    // =================================
    // KONFIRMASI
    // =================================

    let yakin =
    confirm(

    "Konfirmasi Data Anggota\n\n" +

    "Nama : " + nama + "\n" +

    "Tanggal Masuk : " + tanggal + "\n" +

    "HP : " + hp

    );


    if(!yakin){

        return;
    }


    // =================================
    // SIMPAN ANGGOTA BARU
    // =================================

    anggota.push({

        id: id,

        nama: nama,

        tanggalMasuk: tanggal,

        hp: hp,

        status: "Aktif"

    });


    // =================================
    // BUAT REKENING OTOMATIS
    // =================================

    rekening.push({

        id: id,

        nama: nama,

        simpananPokok: 0,

        simpananWajib: 0,

        simpananSukarela: 0,

        pinjamanAktif: 0,

        sisaPokok: 0

    });


    // =================================
    // SIMPAN KE DATABASE
    // =================================

    simpanDatabaseAman();


    // =================================
    // TAMPILKAN DATA
    // =================================

    tampilAnggota();

    kosongkanFormAnggota();


    alert(
    "Anggota berhasil disimpan"
    );

}


// =====================================
// PENCARIAN ANGGOTA
// =====================================

let kataPencarianAnggota = "";

function filterAnggota(){

    let input =
    document.getElementById("cariAnggota");

    if(input){
        kataPencarianAnggota =
        input.value
        .trim()
        .toLowerCase();
    }

    tampilAnggota();
}


// =====================================
// TAMPIL DATA ANGGOTA
// =====================================

function tampilAnggota(){

    let tempat =
    document.getElementById("daftarAnggota");

    if(!tempat){
        return;
    }

    if(anggota.length == 0){

        tempat.innerHTML =
        "Belum ada data anggota";

        return;
    }

    let isi = "";

    anggota.forEach(function(item,index){

        let cari =
        kataPencarianAnggota;

        if(
            cari &&
            !String(item.id || "").toLowerCase().includes(cari) &&
            !String(item.nama || "").toLowerCase().includes(cari) &&
            !String(item.hp || "").toLowerCase().includes(cari)
        ){
            return;
        }

        let status =
        item.status === "Aktif"
        ? "🟢 AKTIF"
        : "🔴 NONAKTIF";

        isi += `

        <div class="info kartuAnggota"
             data-index="${index}"
             onclick="bukaKartuAnggota(${index})">

            <div class="anggotaRingkas">

                <div class="anggotaHeader">

                    <div>
                        <b class="idAnggota">
                        ${item.id}
                        </b>
                    </div>

                    <span class="badgeStatus">
                    ${status}
                    </span>

                </div>

                <div class="namaAnggotaKartu">
                    👤 ${item.nama}
                </div>

                <div class="petunjukKartu">
                    Tekan untuk melihat detail
                </div>

            </div>


            <div class="anggotaDetail">

                <div class="detailBaris">
                    <span>👤 Nama</span>
                    <b>${item.nama}</b>
                </div>

                <div class="detailBaris">
                    <span>📅 Tanggal Masuk</span>
                    <b>${formatTanggalAnggota(item.tanggalMasuk)}</b>
                </div>

                <div class="detailBaris">
                    <span>📱 Nomor HP</span>
                    <b>${item.hp || "-"}</b>
                </div>

                <div class="detailBaris">
                    <span>📌 Status</span>
                    <b>${status}</b>
                </div>

                <div class="aksiAnggota">

                    <button
                        type="button"
                        onclick="event.stopPropagation(); editAnggota(${index})">
                        ✏️ EDIT
                    </button>

                    <button
                        type="button"
                        onclick="event.stopPropagation(); ubahStatusAnggota(${index})">
                        🔄 STATUS
                    </button>

                </div>

            </div>

        </div>

        `;

    });

    tempat.innerHTML = isi;
}


// =====================================
// FORMAT TANGGAL ANGGOTA
// =====================================

function formatTanggalAnggota(tanggal){

    if(!tanggal){
        return "-";
    }

    let bagian = tanggal.split("-");

    if(bagian.length !== 3){
        return tanggal;
    }

    let bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    return (
        bagian[2] +
        " " +
        bulan[Number(bagian[1])-1] +
        " " +
        bagian[0]
    );
}


// =====================================
// BUKA / TUTUP KARTU ANGGOTA
// =====================================

let kartuAnggotaTerbuka = -1;

function bukaKartuAnggota(index){

    let kartu =
    document.querySelector(
        '.kartuAnggota[data-index="' + index + '"]'
    );

    if(!kartu){
        return;
    }

    if(kartuAnggotaTerbuka === index){

        kartuAnggotaTerbuka = -1;

        kartu.classList.remove("terbuka");

        return;
    }

    document.querySelectorAll(".kartuAnggota")
    .forEach(function(item){
        item.classList.remove("terbuka");
    });

    kartuAnggotaTerbuka = index;

    kartu.classList.add("terbuka");

    editAnggota(index);
}

// =====================================
// UBAH STATUS ANGGOTA
// =====================================

function ubahStatusAnggota(index){

    let data = anggota[index];

    if(!data){
        alert("Data anggota tidak ditemukan");
        return;
    }

    let statusBaru =
        data.status === "Aktif"
        ? "Nonaktif"
        : "Aktif";

    let yakin = confirm(
        "Ubah status anggota?\n\n" +
        "ID : " + data.id + "\n" +
        "Nama : " + data.nama + "\n" +
        "Status : " + data.status + " → " + statusBaru
    );

    if(!yakin){
        return;
    }

    data.status = statusBaru;

    simpanDatabaseAman();

    if(typeof sinkronSemuaData === "function"){
        sinkronSemuaData();
    }

    tampilAnggota();

    alert(
        "Status anggota berhasil diubah menjadi " + statusBaru
    );

}


// =====================================
// EDIT ANGGOTA
// =====================================

function editAnggota(index){

    if(!anggota[index]){
        alert("Data anggota tidak ditemukan");
        return;
    }

    indexEditAnggota = index;

    document.getElementById("namaAnggota").value =
        anggota[index].nama;

    document.getElementById("tanggalMasuk").value =
        anggota[index].tanggalMasuk || "";

    document.getElementById("noHp").value =
        anggota[index].hp || "";

    // Ubah tampilan menjadi MODE EDIT
    let judul = document.querySelector(
        "h3"
    );

    if(judul){
        judul.innerHTML = "✏️ Edit Anggota";
    }

    let tombol = document.getElementById(
        "btnSimpanAnggota"
    );

    if(tombol){
        tombol.innerHTML = "💾 Simpan Perubahan";
    }

    // Buat tombol batal jika belum ada
    let tombolBatal = document.getElementById(
        "btnBatalEditAnggota"
    );

    if(!tombolBatal){

        tombolBatal =
        document.createElement("button");

        tombolBatal.id =
        "btnBatalEditAnggota";

        tombolBatal.type =
        "button";

        tombolBatal.innerHTML =
        "✖️ Batal Edit";

        tombolBatal.onclick =
        batalEditAnggota;

        tombol.parentNode.appendChild(
            tombolBatal
        );
    }

    tombolBatal.style.display =
        "block";

    document.getElementById(
        "namaAnggota"
    ).focus();
}


// =====================================
// BATAL EDIT ANGGOTA
// =====================================

function batalEditAnggota(){

    indexEditAnggota = -1;

    kartuAnggotaTerbuka = -1;

    document.querySelectorAll(".kartuAnggota")
    .forEach(function(kartu){
        kartu.classList.remove("terbuka");
    });

    kosongkanFormAnggota();

    let judul = document.querySelector(
        "h3"
    );

    if(judul){
        judul.innerHTML =
        "👥 Tambah Anggota";
    }

    let tombol = document.getElementById(
        "btnSimpanAnggota"
    );

    if(tombol){
        tombol.innerHTML =
        "💾 Simpan Anggota";
    }

    let tombolBatal =
        document.getElementById(
            "btnBatalEditAnggota"
        );

    if(tombolBatal){
        tombolBatal.style.display =
        "none";
    }
}


// KOSONGKAN FORM
// =====================================

function kosongkanFormAnggota(){

    document.getElementById(
    "namaAnggota"
    )
    .value = "";


    document.getElementById(
    "tanggalMasuk"
    )
    .value = "";


    document.getElementById(
    "noHp"
    )
    .value = "";

}


// =====================================
// =====================================
// SIMPAN PERUBAHAN ANGGOTA
// =====================================

function simpanPerubahanAnggota(){

    if(indexEditAnggota < 0 ||
       !anggota[indexEditAnggota]){

        return;
    }

    let nama =
        document.getElementById(
            "namaAnggota"
        ).value.trim();

    let tanggal =
        document.getElementById(
            "tanggalMasuk"
        ).value;

    let hp =
        document.getElementById(
            "noHp"
        ).value.trim();

    if(!nama){

        alert("Nama anggota wajib diisi");

        document.getElementById(
            "namaAnggota"
        ).focus();

        return;
    }

    anggota[indexEditAnggota].nama =
        nama;

    anggota[indexEditAnggota].tanggalMasuk =
        tanggal;

    anggota[indexEditAnggota].hp =
        hp;

    simpanDatabaseAman();

    if(typeof sinkronSemuaData === "function"){
        sinkronSemuaData();
    }

    tampilAnggota();

    alert(
        "Data anggota berhasil diperbarui"
    );

    batalEditAnggota();
}

 
// EVENT TOMBOL SIMPAN
// =====================================

document.addEventListener(
"DOMContentLoaded",
function(){

    let tombol =
    document.getElementById(
    "btnSimpanAnggota"
    );


    if(tombol){

        tombol.addEventListener(
        "click",
        function(){

            if(indexEditAnggota >= 0){

                simpanPerubahanAnggota();

            }else{

                tambahAnggota();

            }

        }
        );

        console.log(
        "Tombol Simpan Anggota Aktif"
        );

    }else{

        console.error(
        "Tombol btnSimpanAnggota tidak ditemukan"
        );

    }


    // Pencarian anggota
    let inputCari =
    document.getElementById("cariAnggota");

    if(inputCari){

        inputCari.addEventListener(
            "input",
            filterAnggota
        );

    }

    // Tampilkan data saat halaman dibuka
    tampilAnggota();

});