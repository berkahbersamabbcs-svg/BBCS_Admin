// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL REKENING BBCS
// V18 - REKENING + PINJAMAN + RIWAYAT
// =====================================

console.log(
    "Modul Rekening BBCS Aktif"
);


// =====================================
// PILIH ANGGOTA
// =====================================

function tampilPilihanRekening(){

    const pilih =
        document.getElementById(
            "pilihRekening"
        );

    if(!pilih){
        return;
    }


    if(
        typeof sinkronSemuaData ===
        "function"
    ){

        sinkronSemuaData();

    }


    pilih.innerHTML =
        `<option value="">
            Pilih Anggota
        </option>`;


    if(!Array.isArray(anggota)){

        console.warn(
            "Database anggota tidak tersedia"
        );

        return;

    }


    anggota.forEach(function(item){

        if(!item || !item.id){
            return;
        }


        const option =
            document.createElement("option");


        option.value =
            item.id;


        option.textContent =
            item.id +
            " - " +
            (
                item.nama ||
                item.namaAnggota ||
                "-"
            );


        pilih.appendChild(option);

    });

}


// =====================================
// AMBIL DATA PINJAMAN ANGGOTA
// =====================================

function ambilPinjamanRekening(idAnggota){

    if(
        !Array.isArray(pinjaman)
    ){

        return [];

    }


    return pinjaman.filter(
        function(item){

            return item &&
                   item.idAnggota == idAnggota;

        }
    );

}


// =====================================
// TOTAL PINJAMAN AKTIF
// =====================================

function hitungPinjamanAktifRekening(
    daftarPinjaman
){

    return daftarPinjaman
        .filter(function(item){

            return String(
                item.status || ""
            ).toLowerCase() === "aktif";

        })
        .reduce(function(total, item){

            return total +
                Number(
                    item.jumlah || 0
                );

        }, 0);

}


// =====================================
// TOTAL SISA POKOK
// =====================================

function hitungSisaPokokRekening(
    daftarPinjaman
){

    return daftarPinjaman
        .reduce(function(total, item){

            return total +
                Number(
                    item.sisaPokok || 0
                );

        }, 0);

}



// =====================================
// ATUR TAMPILAN REKENING
// =====================================

function aturTampilanRekening(pilih){

    const adaAnggota =
        !!(pilih && pilih.value);

    const detail =
        document.getElementById(
            "dataRekening"
        );

    const riwayat =
        document.getElementById(
            "blokRiwayatRekening"
        );

    const aksiQR =
        document.getElementById(
            "aksiQRRekening"
        );

    const qr =
        document.getElementById(
            "qrAktivasiRekening"
        );

    if(detail){
        detail.style.display =
            adaAnggota ? "" : "none";
    }

    if(riwayat){
        riwayat.style.display =
            adaAnggota ? "" : "none";
    }

    if(aksiQR){
        aksiQR.style.display =
            adaAnggota ? "" : "none";
    }

    if(!adaAnggota && qr){
        qr.style.display = "none";
    }

}

// =====================================
// DETAIL REKENING
// =====================================

function tampilRekening(){

    const pilih =
        document.getElementById(
            "pilihRekening"
        );


    const tempat =
        document.getElementById(
            "dataRekening"
        );


    if(!pilih || !tempat){
        return;
    }


    const id =
        pilih.value;

    aturTampilanRekening(pilih);


    if(!id){

        tempat.innerHTML = `

        <div class="info">

            Silakan pilih anggota

        </div>

        `;

        const riwayat =
            document.getElementById(
                "riwayatRekening"
            );

        if(riwayat){

            riwayat.innerHTML = `

            <div class="info">

                Belum ada transaksi

            </div>

            `;

        }

        return;

    }


    // =================================
    // CARI REKENING
    // =================================

    const data =
        Array.isArray(rekening)
            ? rekening.find(
                function(item){

                    return item &&
                           item.id == id;

                }
            )
            : null;


    if(!data){

        tempat.innerHTML = `

        <div class="info">

            Rekening anggota
            tidak ditemukan

        </div>

        `;

        return;

    }


    // =================================
    // SIMPANAN
    // =================================

    const simpananPokok =
        Number(
            data.simpananPokok || 0
        );


    const simpananWajib =
        Number(
            data.simpananWajib || 0
        );


    const simpananSukarela =
        Number(
            data.simpananSukarela || 0
        );


    const totalSimpanan =
        simpananPokok +
        simpananWajib +
        simpananSukarela;


    // =================================
    // PINJAMAN
    // =================================

    const daftarPinjaman =
        ambilPinjamanRekening(id);


    const pinjamanAktif =
        hitungPinjamanAktifRekening(
            daftarPinjaman
        );


    const sisaPokok =
        hitungSisaPokokRekening(
            daftarPinjaman
        );


    console.log(
        "REKENING - ID ANGGOTA:",
        id
    );


    console.log(
        "PINJAMAN ANGGOTA:",
        daftarPinjaman
    );


    console.log(
        "PINJAMAN AKTIF:",
        pinjamanAktif
    );


    console.log(
        "SISA POKOK:",
        sisaPokok
    );


    // =================================
    // TAMPIL REKENING
    // =================================

    tempat.innerHTML = `

    <div class="rekening-card">

        <div class="rekening-header">

            <h3>
                💳 ${data.id}
            </h3>

            <p>
                ${
                    data.nama ||
                    data.namaAnggota ||
                    "-"
                }
            </p>

        </div>


        <div class="rekening-ringkasan">

            <div class="rekening-item">

                <span>
                    Simpanan Pokok
                </span>

                <strong>
                    ${rupiah(simpananPokok)}
                </strong>

            </div>


            <div class="rekening-item">

                <span>
                    Simpanan Wajib
                </span>

                <strong>
                    ${rupiah(simpananWajib)}
                </strong>

            </div>


            <div class="rekening-item">

                <span>
                    Simpanan Sukarela
                </span>

                <strong>
                    ${rupiah(simpananSukarela)}
                </strong>

            </div>


            <div class="rekening-item">

                <span>
                    Pinjaman Aktif
                </span>

                <strong>
                    ${rupiah(pinjamanAktif)}
                </strong>

            </div>

        </div>


        <div class="rekening-total">

            <span>
                Total Simpanan
            </span>

            <br>

            <strong>
                ${rupiah(totalSimpanan)}
            </strong>

        </div>


        <div
            class="rekening-item"
            style="margin-top:10px;"
        >

            <span>
                Sisa Pokok Pinjaman
            </span>

            <strong>
                ${rupiah(sisaPokok)}
            </strong>

        </div>


        <div class="rekening-aksi">

            <button
                type="button"
                class="btn-edit"
                onclick="aktifkanEditRekening()"
            >

                ✏️ EDIT REKENING

            </button>


            <button
                type="button"
                class="btn-cetak"
                onclick="cetakBukuRekening()"
            >

                🖨️ CETAK REKENING

            </button>

        </div>

    </div>

    `;


    tampilRiwayatRekening();

}


// =====================================
// RIWAYAT TRANSAKSI ANGGOTA
// =====================================

function tampilRiwayatRekening(){

    const pilih =
        document.getElementById(
            "pilihRekening"
        );


    const tempat =
        document.getElementById(
            "riwayatRekening"
        );


    if(!pilih || !tempat){
        return;
    }


    const id =
        pilih.value;


    if(!id){

        tempat.innerHTML = `

        <div class="info">

            Belum ada transaksi

        </div>

        `;

        return;

    }


    if(!Array.isArray(transaksi)){

        tempat.innerHTML = `

        <div class="info">

            Database transaksi
            tidak tersedia

        </div>

        `;

        return;

    }


    // =================================
    // FILTER ID ANGGOTA
    // =================================

    const data =
        transaksi.filter(
            function(item){

                return item &&
                       item.idAnggota == id;

            }
        );


    if(data.length === 0){

        tempat.innerHTML = `

        <div class="info">

            Belum ada transaksi
            untuk anggota ini

        </div>

        `;

        return;

    }


    let isi = "";


    data
        .slice()
        .reverse()
        .forEach(function(item){

            if(!item){
                return;
            }


            const jenis =
                String(
                    item.jenis || ""
                );


            const warna =
                jenis === "Pengeluaran"
                    ? "#dc2626"
                    : "#166534";


            isi += `

            <div
                class="riwayat-card"
            >

                <div class="tanggal">

                    📅
                    ${item.tanggal || "-"}

                </div>


                <div class="jenis">

                    ${
                        item.jenis ||
                        "-"
                    }

                </div>


                <div class="keterangan">

                    ${
                        item.keterangan ||
                        item.kategori ||
                        "-"
                    }

                </div>


                <div
                    class="jumlah"
                    style="color:${warna};"
                >

                    ${rupiah(
                        Number(
                            item.jumlah || 0
                        )
                    )}

                </div>


                ${
                    item.referensi
                        ? `
                        <div class="referensi">

                            Ref:
                            ${item.referensi}

                        </div>
                        `
                        : ""
                }

            </div>

            `;

        });


    tempat.innerHTML =
        isi;

}


// =====================================
// QR AKTIVASI REKENING
// =====================================

function buatQRAktivasiRekening(){

    const pilih =
        document.getElementById("pilihRekening");

    if(!pilih || !pilih.value){
        alert("Pilih rekening anggota terlebih dahulu.");
        return;
    }

    const id =
        String(pilih.value).trim();

    const dataRekening =
        Array.isArray(rekening)
            ? rekening.find(function(item){
                return item &&
                       String(item.id).trim() === id;
            })
            : null;

    if(!dataRekening){
        alert("Data rekening anggota tidak ditemukan.");
        return;
    }

    const dataAnggota =
        Array.isArray(anggota)
            ? anggota.find(function(item){
                return item &&
                       String(item.id).trim() === id;
            })
            : null;

    const nama =
        dataRekening.nama ||
        dataRekening.namaAnggota ||
        (dataAnggota && (
            dataAnggota.nama ||
            dataAnggota.namaAnggota
        )) ||
        "";

    if(!nama){
        alert("Nama anggota tidak ditemukan.");
        return;
    }

    const daftarPinjaman =
        ambilPinjamanRekening(id);

    const pinjamanAktif =
        hitungPinjamanAktifRekening(
            daftarPinjaman
        );

    const sisaPokok =
        hitungSisaPokokRekening(
            daftarPinjaman
        );

    const riwayat =
        Array.isArray(transaksi)
            ? transaksi
                .filter(function(item){
                    return item &&
                           String(item.idAnggota).trim() === id;
                })
                .map(function(item){
                    return {
                        idAnggota:
                            item.idAnggota,

                        tanggal:
                            item.tanggal || "",

                        jenis:
                            item.jenis || "",

                        keterangan:
                            item.keterangan ||
                            item.kategori ||
                            "",

                        jumlah:
                            Number(item.jumlah || 0),

                        referensi:
                            item.referensi || ""
                    };
                })
            : [];

    /*
     * QR REKENING BBCS
     *
     * QR ini dapat digunakan berulang kali.
     * Scan pertama = aktivasi.
     * Scan berikutnya = pembaruan data.
     *
     * BBCS tetap menjadi sumber data utama.
     */

    const payload = {

        type:
            "REKENING_BBCS",

        mode:
            "UPDATE",

        versi:
            "2.0",

        idAnggota:
            id,

        nama:
            String(nama).trim(),

        noRekening:
            dataRekening.noRekening ||
            dataRekening.nomorRekening ||
            id,

        simpananPokok:
            Number(
                dataRekening.simpananPokok || 0
            ),

        simpananWajib:
            Number(
                dataRekening.simpananWajib || 0
            ),

        simpananSukarela:
            Number(
                dataRekening.simpananSukarela || 0
            ),

        pinjamanAktif:
            pinjamanAktif,

        sisaPokok:
            sisaPokok,

        riwayat:
            riwayat,

        dibuat:
            new Date().toISOString()

    };

    const teksQR =
        JSON.stringify(payload);

    const tempat =
        document.getElementById(
            "qrAktivasiCanvas"
        );

    const panel =
        document.getElementById(
            "qrAktivasiRekening"
        );

    const info =
        document.getElementById(
            "qrAktivasiInfo"
        );

    if(!tempat || !panel){

        alert(
            "Area QR Rekening tidak ditemukan."
        );

        return;
    }

    tempat.innerHTML = "";

    if(
        typeof QRCode === "undefined" ||
        !QRCode.toCanvas
    ){

        alert(
            "Generator QR belum tersedia."
        );

        console.error(
            "QRCode library tidak ditemukan."
        );

        return;
    }

    const canvas =
        document.createElement("canvas");

    tempat.appendChild(canvas);

    QRCode.toCanvas(
        canvas,
        teksQR,
        {
            errorCorrectionLevel:
                "M",

            width:
                280,

            margin:
                2
        },
        function(error){

            if(error){

                console.error(
                    "QR Rekening:",
                    error
                );

                tempat.innerHTML = "";

                alert(
                    "QR Rekening gagal dibuat."
                );

                return;
            }

            panel.style.display =
                "block";

            if(info){

                info.textContent =
                    "👤 " +
                    nama +
                    " | ID: " +
                    id +
                    " | 🔄 DATA TERBARU";
            }

            panel.scrollIntoView({
                behavior:
                    "smooth",

                block:
                    "center"
            });

            console.log(
                "QR REKENING BBCS:",
                payload
            );
        }
    );
}


function tutupQRAktivasiRekening(){

    const panel =
        document.getElementById(
            "qrAktivasiRekening"
        );

    const tempat =
        document.getElementById(
            "qrAktivasiCanvas"
        );

    const info =
        document.getElementById(
            "qrAktivasiInfo"
        );

    if(panel){
        panel.style.display = "none";
    }

    if(tempat){
        tempat.innerHTML = "";
    }

    if(info){
        info.textContent = "";
    }
}


// =====================================
// EDIT REKENING
// =====================================

function aktifkanEditRekening(){

    console.log("=== EDIT REKENING ===");

    const pilih =
        document.getElementById("pilihRekening");

    const form =
        document.getElementById("formEditRekening");


    if(!pilih){

        console.error(
            "pilihRekening tidak ditemukan"
        );

        return;
    }


    if(!form){

        console.error(
            "formEditRekening tidak ditemukan"
        );

        return;
    }


    const id =
        pilih.value;


    if(!id){

        alert(
            "Pilih anggota terlebih dahulu"
        );

        return;
    }


    // =================================
    // PASTIKAN DATABASE TERSEDIA
    // =================================

    if(!Array.isArray(rekening)){

        alert(
            "Database rekening tidak tersedia"
        );

        console.error(
            "rekening bukan array:",
            rekening
        );

        return;
    }


    // =================================
    // CARI REKENING
    // =================================

    const data =
        rekening.find(function(item){

            return item &&
                String(item.id) ===
                String(id);

        });


    if(!data){

        alert(
            "Rekening anggota tidak ditemukan"
        );

        return;
    }


    // =================================
    // NAMA AWAL
    // =================================

    const namaAwal =
        data.nama ||
        data.namaAnggota ||
        "";


    // =================================
    // TAMPILKAN FORM
    // =================================

    form.innerHTML = `

        <div class="form-koreksi">

            <h3>
                ✏️ EDIT REKENING ANGGOTA
            </h3>


            <p>
                ID Anggota:
                <strong>
                    ${data.id}
                </strong>
            </p>


            <label>
                Nama Anggota
            </label>

            <input
                id="editNamaAnggota"
                type="text"
                value="${namaAwal}"
                autocomplete="off"
            >


            <label>
                Simpanan Pokok
            </label>

            <input
                id="editPokok"
                type="number"
                min="0"
                inputmode="numeric"
                value="${
                    Number(
                        data.simpananPokok || 0
                    )
                }"
            >


            <label>
                Simpanan Wajib
            </label>

            <input
                id="editWajib"
                type="number"
                min="0"
                inputmode="numeric"
                value="${
                    Number(
                        data.simpananWajib || 0
                    )
                }"
            >


            <label>
                Simpanan Sukarela
            </label>

            <input
                id="editSukarela"
                type="number"
                min="0"
                inputmode="numeric"
                value="${
                    Number(
                        data.simpananSukarela || 0
                    )
                }"
            >


            <div style="margin-top:12px;">

                <button
                    class="btn-simpan"
                    type="button"
                    onclick="simpanKoreksiRekening()"
                >
                    💾 SIMPAN PERUBAHAN
                </button>


                <button
                    class="btn-batal"
                    type="button"
                    onclick="batalEditRekening()"
                >
                    ✖ BATAL
                </button>

            </div>

        </div>

    `;


    // =================================
    // PAKSA FORM TERLIHAT
    // =================================

    form.style.display = "block";
    form.style.visibility = "visible";
    form.style.opacity = "1";


    // =================================
    // SCROLL KE FORM
    // =================================

    setTimeout(function(){

        form.scrollIntoView({
            behavior:"smooth",
            block:"start"
        });

    }, 100);

}

// =====================================
// SIMPAN EDIT REKENING
// =====================================

function simpanKoreksiRekening(){

    console.log(
        "=== SIMPAN EDIT REKENING ==="
    );


    const pilih =
        document.getElementById(
            "pilihRekening"
        );


    if(!pilih || !pilih.value){

        alert(
            "Pilih anggota terlebih dahulu"
        );

        return;
    }


    const id =
        pilih.value;


    const data =
        Array.isArray(rekening)
            ? rekening.find(function(item){

                return item &&
                    String(item.id) ===
                    String(id);

            })
            : null;


    if(!data){

        alert(
            "Rekening anggota tidak ditemukan"
        );

        return;
    }


    // =================================
    // AMBIL FORM
    // =================================

    const inputNama =
        document.getElementById(
            "editNamaAnggota"
        );


    const inputPokok =
        document.getElementById(
            "editPokok"
        );


    const inputWajib =
        document.getElementById(
            "editWajib"
        );


    const inputSukarela =
        document.getElementById(
            "editSukarela"
        );


    if(
        !inputNama ||
        !inputPokok ||
        !inputWajib ||
        !inputSukarela
    ){

        alert(
            "Form edit belum lengkap"
        );

        return;
    }


    const nama =
        inputNama.value.trim();


    const pokok =
        Number(inputPokok.value);


    const wajib =
        Number(inputWajib.value);


    const sukarela =
        Number(inputSukarela.value);


    // =================================
    // VALIDASI
    // =================================

    if(!nama){

        alert(
            "Nama anggota tidak boleh kosong"
        );

        inputNama.focus();

        return;
    }


    if(
        !Number.isFinite(pokok) ||
        !Number.isFinite(wajib) ||
        !Number.isFinite(sukarela)
    ){

        alert(
            "Nilai simpanan tidak valid"
        );

        return;
    }


    if(
        pokok < 0 ||
        wajib < 0 ||
        sukarela < 0
    ){

        alert(
            "Nilai simpanan tidak boleh negatif"
        );

        return;
    }


    // =================================
    // UPDATE REKENING
    // =================================

    data.nama =
        nama;

    data.namaAnggota =
        nama;

    data.simpananPokok =
        pokok;

    data.simpananWajib =
        wajib;

    data.simpananSukarela =
        sukarela;


    // =================================
    // UPDATE DATA ANGGOTA
    // =================================

    if(Array.isArray(anggota)){

        const dataAnggota =
            anggota.find(function(item){

                return item &&
                    String(item.id) ===
                    String(id);

            });


        if(dataAnggota){

            dataAnggota.nama =
                nama;

            dataAnggota.namaAnggota =
                nama;

        }

    }


    console.log(
        "REKENING SETELAH EDIT:",
        data
    );


    // =================================
    // SIMPAN DATABASE
    // =================================

    if(
        typeof simpanDatabaseAman ===
        "function"
    ){

        simpanDatabaseAman();

    }
    else if(
        typeof simpanDatabase ===
        "function"
    ){

        simpanDatabase();

    }
    else{

        console.error(
            "Fungsi simpan database tidak ditemukan"
        );

        alert(
            "Mesin database tidak ditemukan"
        );

        return;
    }


    alert(
        "Data rekening berhasil diperbarui"
    );


    // =================================
    // REFRESH PILIHAN ANGGOTA
    // =================================

    tampilPilihanRekening();


    // Kembalikan pilihan ke anggota tadi
    pilih.value = id;


    // Tampilkan ulang rekening
    tampilRekening();


    // Tutup form
    batalEditRekening();

}

// =====================================
// BATAL EDIT
// =====================================

function batalEditRekening(){

    const form =
        document.getElementById(
            "formEditRekening"
        );


    if(form){

        form.innerHTML = "";

    }

}


// =====================================
// CETAK BUKU REKENING
// =====================================

function cetakBukuRekening(){

    console.log(
        "=== TOMBOL CETAK REKENING DIKLIK ==="
    );


    const pilih =
        document.getElementById(
            "pilihRekening"
        );


    if(!pilih){

        console.error(
            "pilihRekening tidak ditemukan"
        );

        alert(
            "Pilihan anggota tidak ditemukan"
        );

        return;

    }


    const id =
        pilih.value;


    if(!id){

        alert(
            "Pilih anggota terlebih dahulu"
        );

        return;

    }


    console.log(
        "ID anggota:",
        id
    );


    localStorage.setItem(
        "cetakRekening",
        id
    );


    console.log(
        "cetakRekening:",
        localStorage.getItem(
            "cetakRekening"
        )
    );


    window.location.assign(
        "./cetak.html"
    );

}


// =====================================
// AUTO LOAD PILIHAN ANGGOTA
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        tampilPilihanRekening();

        const pilih =
            document.getElementById(
                "pilihRekening"
            );

        aturTampilanRekening(pilih);

    }
);
