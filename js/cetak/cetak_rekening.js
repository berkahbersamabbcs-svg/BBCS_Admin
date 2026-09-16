// =====================================
// BERKAH BERSAMA CORE SYSTEM
// CETAK BUKU REKENING BBCS
// V18 - VERSI FINAL
// =====================================

console.log(
"Cetak Rekening BBCS Aktif"
);

// =====================================
// TAMPIL BUKU REKENING
// =====================================

function tampilCetakRekening(){

console.log(
    "=== TAMPIL CETAK REKENING BBCS ==="
);


let tempat =
    document.getElementById(
        "hasilCetak"
    );


if(!tempat){

    console.warn(
        "hasilCetak tidak ditemukan"
    );

    return;

}


// =================================
// AMBIL ID ANGGOTA
// =================================

let id =
    localStorage.getItem(
        "cetakRekening"
    );


if(!id){

    tempat.innerHTML = `
        <div class="info">
            Data anggota untuk cetak
            rekening belum dipilih.
        </div>
    `;

    console.warn(
        "localStorage cetakRekening belum tersedia"
    );

    return;

}


// =================================
// CEK DATABASE
// =================================

if(
    typeof rekening ===
    "undefined"
){

    tempat.innerHTML = `
        <div class="info">
            Database rekening tidak tersedia.
        </div>
    `;

    console.error(
        "Database rekening tidak tersedia"
    );

    return;

}


// =================================
// CARI REKENING
// =================================

let data =
    rekening.find(function(item){

        return item &&
               item.id == id;

    });


if(!data){

    tempat.innerHTML = `
        <div class="info">
            Data rekening tidak ditemukan
            untuk anggota ${id}.
        </div>
    `;

    console.warn(
        "Data rekening tidak ditemukan:",
        id
    );

    return;

}


// =================================
// HITUNG TOTAL SIMPANAN
// =================================

let pokok =
    Number(
        data.simpananPokok
    ) || 0;


let wajib =
    Number(
        data.simpananWajib
    ) || 0;


let sukarela =
    Number(
        data.simpananSukarela
    ) || 0;


let total =
    pokok +
    wajib +
    sukarela;


// =================================
// TAMPIL DATA
// =================================

tempat.innerHTML = `

    <div class="cetak-header">

        <h2>
            BUKU REKENING BBCS
        </h2>

        <p>
            BERKAH BERSAMA
        </p>

    </div>


    <div class="data-anggota">

        <b>ID Anggota</b>

        <br>

        ${data.id}

        <br><br>

        <b>Nama Anggota</b>

        <br>

        ${data.nama || "-"}

    </div>


    <table class="tabel-simpanan">

        <tr>
            <td>
                Simpanan Pokok
            </td>

            <td>
                ${rupiah(pokok)}
            </td>
        </tr>


        <tr>
            <td>
                Simpanan Wajib
            </td>

            <td>
                ${rupiah(wajib)}
            </td>
        </tr>


        <tr>
            <td>
                Simpanan Sukarela
            </td>

            <td>
                ${rupiah(sukarela)}
            </td>
        </tr>

    </table>


    <div class="total">

        Total Simpanan

        <br>

        ${rupiah(total)}

    </div>


    <div class="data-anggota">

        <b>Pinjaman Aktif</b>

        <br>

        ${rupiah(
            data.pinjamanAktif
        )}

        <br><br>

        <b>Sisa Pokok</b>

        <br>

        ${rupiah(
            data.sisaPokok
        )}

    </div>

`;


console.log(
    "Buku rekening berhasil ditampilkan:",
    data.id
);

}

// =====================================
// CETAK / SIMPAN PDF
// =====================================

function cetakSekarang(){

console.log(
    "=== CETAK BUKU REKENING BBCS ==="
);


// Pastikan data sudah ditampilkan

if(
    typeof tampilCetakRekening ===
    "function"
){

    tampilCetakRekening();

}


// =================================
// CETAK BROWSER
// =================================

setTimeout(function(){

    window.print();

},100);

}