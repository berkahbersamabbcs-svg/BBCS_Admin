// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL UI ANGSURAN
// FILE : Mesin/angsuran.js
// VERSI : BBCS V18 TERINTEGRASI
// =====================================

console.log(
    "UI Angsuran BBCS mulai"
);


// =====================================
// ELEMENT HTML
// =====================================

const pilihAnggota =
    document.getElementById("pilihAnggota");

const pilihPinjaman =
    document.getElementById("pilihPinjaman");

const inputPokok =
    document.getElementById("inputPokok");

const detailPinjaman =
    document.getElementById("detailPinjaman");

const jasaWajib =
    document.getElementById("jasaWajib");

const dendaTunggakan =
    document.getElementById("dendaTunggakan");

const jasaBerjalan =
    document.getElementById("jasaBerjalan");

const pokokBayar =
    document.getElementById("pokokBayar");

const totalKewajiban =
    document.getElementById("totalKewajiban");

const btnBayar =
    document.getElementById("btnBayar");


// =====================================
// FORMAT RUPIAH
// =====================================

function uiRupiah(nilai){

    return "Rp " +
        (
            Number(nilai) || 0
        ).toLocaleString("id-ID");

}


// =====================================
// CARI PINJAMAN TERPILIH
// =====================================

function uiCariPinjaman(){

    if(!pilihPinjaman){

        console.warn(
            "SELECT pilihPinjaman tidak ditemukan"
        );

        return null;

    }


    const idPinjaman =
        String(
            pilihPinjaman.value || ""
        ).trim();


    if(!idPinjaman){

        return null;

    }


    if(
        !Array.isArray(pinjaman)
    ){

        console.error(
            "Database pinjaman tidak valid"
        );

        return null;

    }


    const hasil =
        pinjaman.find(
            function(item){

                return (
                    item &&
                    String(item.id) ===
                    idPinjaman
                );

            }
        );


    if(!hasil){

        console.warn(
            "PINJAMAN TIDAK DITEMUKAN:",
            idPinjaman
        );

        return null;

    }


    console.log(
        "UI CARI PINJAMAN:",
        hasil
    );


    return hasil;

}


// =====================================
// TAMPIL DETAIL PINJAMAN
// =====================================

function tampilPinjaman(){

    const data =
        uiCariPinjaman();


    if(!detailPinjaman){

        return;

    }


    if(!data){

        detailPinjaman.innerHTML =
            "Pilih pinjaman terlebih dahulu";

        return;

    }


    detailPinjaman.innerHTML =
        "Pinjaman : " +
        data.id +
        "<br>" +
        "Anggota : " +
        (
            data.namaAnggota ||
            data.nama ||
            "-"
        ) +
        "<br>" +
        "Jumlah Pinjaman : " +
        uiRupiah(
            data.jumlah ||
            data.jumlahPinjaman ||
            0
        ) +
        "<br>" +
        "Sisa Pokok : " +
        uiRupiah(
            data.sisaPokok
        ) +
        "<br>" +
        "Status : " +
        (
            data.status ||
            "-"
        );

}


// =====================================
// LOAD ANGGOTA
// =====================================

function loadAnggota(){

    if(!pilihAnggota){

        console.error(
            "SELECT pilihAnggota tidak ditemukan"
        );

        return;

    }


    pilihAnggota.innerHTML = "";


    const awal =
        document.createElement("option");

    awal.value = "";

    awal.textContent =
        "Pilih Anggota";

    pilihAnggota.appendChild(
        awal
    );


    if(
        !Array.isArray(anggota)
    ){

        return;

    }


    anggota.forEach(
        function(item){

            if(!item){

                return;

            }


            const option =
                document.createElement("option");


            option.value =
                item.id || "";


            option.textContent =
                (
                    item.id || ""
                ) +
                " - " +
                (
                    item.nama || ""
                );


            pilihAnggota.appendChild(
                option
            );

        }
    );

}


// =====================================
// LOAD PINJAMAN ANGGOTA
// =====================================

function loadPinjaman(){

    if(!pilihPinjaman){

        return;

    }


    pilihPinjaman.innerHTML = "";


    const optionAwal =
        document.createElement("option");


    optionAwal.value = "";


    optionAwal.textContent =
        "Pilih Pinjaman";


    pilihPinjaman.appendChild(
        optionAwal
    );


    const idAnggota =
        String(
            pilihAnggota?.value || ""
        ).trim();


    console.log(
        "LOAD PINJAMAN - ID ANGGOTA:",
        idAnggota
    );


    if(
        !idAnggota ||
        !Array.isArray(pinjaman)
    ){

        console.log(
            "Tidak ada anggota atau database pinjaman"
        );

        return;

    }


    const daftar =
        pinjaman.filter(
            function(item){

                if(!item){

                    return false;

                }


                const idPemilik =
                    String(
                        item.idAnggota ||
                        item.anggota ||
                        ""
                    ).trim();


                const status =
                    String(
                        item.status || ""
                    ).trim()
                    .toLowerCase();


                console.log(
                    "CEK PINJAMAN:",
                    item.id,
                    "PEMILIK:",
                    idPemilik,
                    "STATUS:",
                    status
                );


                return (
                    idPemilik === idAnggota &&
                    status !== "lunas"
                );

            }
        );


    console.log(
        "PINJAMAN DITEMUKAN:",
        daftar
    );


    daftar.forEach(
        function(item){

            const option =
                document.createElement("option");


            option.value =
                item.id;


            option.textContent =
                item.id +
                " - " +
                (
                    item.namaAnggota ||
                    item.nama ||
                    ""
                ) +
                " - Sisa " +
                uiRupiah(
                    item.sisaPokok
                );


            pilihPinjaman.appendChild(
                option
            );

        }
    );

}


// =====================================
// AMBIL POKOK
// =====================================

function ambilPokok(){

    if(!inputPokok){

        return 0;

    }


    const nilai =
        String(
            inputPokok.value || ""
        )
        .replace(
            /[^0-9]/g,
            ""
        );


    return Number(nilai) || 0;

}


// =====================================
// RESET KEWAJIBAN
// =====================================

function resetKewajiban(){

    if(jasaWajib){

        jasaWajib.textContent =
            "Jasa Wajib : Rp 0";

    }


    if(dendaTunggakan){

        dendaTunggakan.textContent =
            "Denda Tunggakan : Rp 0";

    }


    if(jasaBerjalan){

        jasaBerjalan.textContent =
            "Jasa Berjalan : Rp 0";

    }


    if(pokokBayar){

        pokokBayar.textContent =
            "Pokok : Rp 0";

    }


    if(totalKewajiban){

        totalKewajiban.innerHTML =
            "<b>Total Kewajiban : Rp 0</b>";

    }

}

// =====================================
// TENTUKAN BULAN PEMBAYARAN UI
// =====================================
//
// Jika bulan sekarang masih sebelum
// periode pertama pinjaman, gunakan
// periode pertama.
//
// Contoh:
// Pinjaman      : 2026-08
// Periode pertama: 2026-09
// Bulan sekarang : 2026-08
//
// Hasil:
// bulanPembayaran = 2026-09
// =====================================

function uiTentukanBulanPembayaran(
    dataPinjaman
){
console.log(
    "CEK periodeBulanSekarang:",
    typeof periodeBulanSekarang
);
    if(!dataPinjaman){

        return "";

    }


// ---------------------------------
// BULAN SEKARANG
// ---------------------------------

const bulanSekarang =
    periodeBulanSekarang();


    const periodePertama =
        typeof periodeCariPertama ===
        "function"

        ?

        periodeCariPertama(
            dataPinjaman
        )

        :

        "";


    // ---------------------------------
    // JIKA BELUM MASUK PERIODE
    // ---------------------------------

    if(
        periodeValid(periodePertama) &&
        bulanSekarang < periodePertama
    ){

        console.log(
            "UI BULAN PEMBAYARAN:",
            periodePertama
        );

        return periodePertama;

    }


    // ---------------------------------
    // SUDAH MASUK PERIODE
    // ---------------------------------

    console.log(
        "UI BULAN PEMBAYARAN:",
        bulanSekarang
    );

    return bulanSekarang;

}
// =====================================
// HITUNG OTOMATIS
// =====================================

function hitungOtomatis(){

    const data =
        uiCariPinjaman();


    if(!data){

        resetKewajiban();

        tampilPinjaman();

        return;

    }


    if(
        typeof hitungKewajiban !==
        "function"
    ){

        console.error(
            "hitungKewajiban() tidak ditemukan"
        );

        resetKewajiban();

        return;

    }

    const bulan =
    uiTentukanBulanPembayaran(
        data
    );
    
    const pokok =
        ambilPokok();


    const hasil =
        hitungKewajiban(
            data,
            bulan,
            pokok
        );


    console.log(
        "HASIL KEWAJIBAN UI:",
        hasil
    );


    if(!hasil){

        resetKewajiban();

        return;

    }


    const jasa =
        Number(
            hasil.jasaWajib
        ) || 0;


    const denda =
        Number(
            hasil.dendaTunggakan
        ) || 0;


    const berjalan =
        Number(
            hasil.jasaBerjalan
        ) || 0;


    const pokokHasil =
        Number(
            hasil.pokokDibayar
        ) || 0;


    const total =
        Number(
            hasil.total
        ) || 0;


    if(jasaWajib){

        jasaWajib.textContent =
            "Jasa Wajib : " +
            uiRupiah(jasa);

    }


    if(dendaTunggakan){

        dendaTunggakan.textContent =
            "Denda Tunggakan : " +
            uiRupiah(denda);

    }


    if(jasaBerjalan){

        jasaBerjalan.textContent =
            "Jasa Berjalan : " +
            uiRupiah(berjalan);

    }


    if(pokokBayar){

        pokokBayar.textContent =
            "Pokok : " +
            uiRupiah(pokokHasil);

    }


    if(totalKewajiban){

        totalKewajiban.innerHTML =
            "<b>Total Kewajiban : " +
            uiRupiah(total) +
            "</b>";

    }


    tampilPinjaman();

}


// =====================================
// FORMAT INPUT POKOK
// =====================================

if(inputPokok){

    inputPokok.addEventListener(
        "input",
        function(){

            const nilai =
                String(
                    inputPokok.value || ""
                )
                .replace(
                    /[^0-9]/g,
                    ""
                );


            if(nilai){

                inputPokok.value =
                    Number(nilai)
                        .toLocaleString(
                            "id-ID"
                        );

            }
            else{

                inputPokok.value = "";

            }


            hitungOtomatis();

        }
    );

}


// =====================================
// PILIH ANGGOTA
// =====================================

if(pilihAnggota){

    pilihAnggota.addEventListener(
        "change",
        function(){

            loadPinjaman();


            if(inputPokok){

                inputPokok.value = "";

            }


            resetKewajiban();


            tampilPinjaman();

        }
    );

}


// =====================================
// PILIH PINJAMAN
// =====================================

if(pilihPinjaman){

    pilihPinjaman.addEventListener(
        "change",
        function(){

            tampilPinjaman();

            hitungOtomatis();

        }
    );

}


// =====================================
// BAYAR ANGSURAN
// =====================================

if(btnBayar){

    btnBayar.addEventListener(
        "click",
        function(){

            const data =
                uiCariPinjaman();


            if(!data){

                alert(
                    "Pilih pinjaman terlebih dahulu."
                );

                return;

            }
    const pokok =
        ambilPokok();


    if(
        pokok >
        Number(data.sisaPokok || 0)
    ){
        
    alert(
        "Pokok pembayaran melebihi sisa pokok."
    );

    return;

}


            const bulan =
    uiTentukanBulanPembayaran(
        data
    );
    
            // ---------------------------------
            // CEK KONEKTOR
            // ---------------------------------

            if(
                typeof konektorPembayaran !==
                "function"
            ){

                alert(
                    "Konektor pembayaran belum aktif."
                );

                console.error(
                    "konektorPembayaran() tidak ditemukan"
                );

                return;

            }


            // ---------------------------------
            // HITUNG DULU
            // ---------------------------------

            const kewajiban =
                hitungKewajiban(
                    data,
                    bulan,
                    pokok
                );


            if(!kewajiban){

                alert(
                    "Kewajiban pembayaran tidak tersedia."
                );

                return;

            }

if(
    Number(kewajiban.total || 0) <= 0
){

    alert(
        "Tidak ada kewajiban yang dapat dibayar."
    );

    return;

}

            const konfirmasi =
                confirm(
                    "PEMBAYARAN ANGSURAN\n\n" +

                    "Pinjaman : " +
                    data.id +
                    "\n" +

                    "Periode : " +
                    bulan +
                    "\n" +

                    "Pokok : " +
                    uiRupiah(
                        kewajiban.pokokDibayar
                    ) +
                    "\n" +

                    "Jasa Wajib : " +
                    uiRupiah(
                        kewajiban.jasaWajib
                    ) +
                    "\n" +

                    "Denda : " +
                    uiRupiah(
                        kewajiban.dendaTunggakan
                    ) +
                    "\n" +

                    "Jasa Berjalan : " +
                    uiRupiah(
                        kewajiban.jasaBerjalan
                    ) +
                    "\n\n" +

                    "TOTAL : " +
                    uiRupiah(
                        kewajiban.total
                    ) +
                    "\n\n" +

                    "Lanjutkan pembayaran?"
                );


            if(!konfirmasi){

                return;

            }


            // ---------------------------------
            // EKSEKUSI
            // ---------------------------------

            const hasil =
                konektorPembayaran(
                    data.id,
                    bulan,
                    pokok
                );


            console.log(
                "HASIL KONEKTOR UI:",
                hasil
            );


            if(
                hasil &&
                hasil.berhasil
            ){

                alert(
                    "Pembayaran berhasil.\n\n" +

                    "Total : " +
                    uiRupiah(
                        hasil.totalBayar
                    ) +
                    "\n" +

                    "Sisa Pokok : " +
                    uiRupiah(
                        hasil.saldoAkhir
                    )
                );


                // ---------------------------------
                // REFRESH DATA
                // ---------------------------------

                loadPinjaman();


                // pilih kembali pinjaman
                if(
                    pilihPinjaman &&
                    [...pilihPinjaman.options]
                        .some(
                            function(option){

                                return (
                                    option.value ===
                                    data.id
                                );

                            }
                        )
                ){

                    pilihPinjaman.value =
                        data.id;

                }


                if(inputPokok){

                    inputPokok.value = "";

                }


                tampilPinjaman();

                hitungOtomatis();

            }
            else{

                alert(
                    (
                        hasil &&
                        hasil.pesan
                    ) ||
                    "Pembayaran gagal."
                );

            }

        }
    );

}


// =====================================
// MULAI UI
// =====================================

loadAnggota();

loadPinjaman();

resetKewajiban();

console.log(
    "UI Angsuran BBCS siap"
);