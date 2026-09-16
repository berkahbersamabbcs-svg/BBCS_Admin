// =====================================
// BERKAH BERSAMA CORE SYSTEM
// MODUL LAPORAN SIMPANAN
// =====================================

console.log("Laporan Simpanan BBCS mulai");


// =====================================
// FORMAT AMAN
// =====================================

function nilaiLaporanSimpanan(nilai){

    return Number(nilai) || 0;

}


// =====================================
// PILIHAN ANGGOTA
// =====================================

function tampilPilihanLaporanSimpanan(){

    let pilih =
        document.getElementById(
            "pilihLaporanSimpanan"
        );


    if(!pilih){

        console.warn(
            "Elemen pilihLaporanSimpanan tidak ditemukan"
        );

        return;

    }


    pilih.innerHTML = `

        <option value="">
            Pilih Anggota
        </option>

    `;


    if(
        !Array.isArray(anggota) ||
        anggota.length === 0
    ){

        return;

    }


    anggota.forEach(function(a){

        pilih.innerHTML += `

            <option value="${a.id}">
                ${a.id} - ${a.nama || "-"}
            </option>

        `;

    });

}


// =====================================
// LAPORAN SIMPANAN ANGGOTA
// =====================================

function tampilLaporanSimpanan(){

    console.log(
        "Laporan Simpanan BBCS diproses"
    );


    let pilih =
        document.getElementById(
            "pilihLaporanSimpanan"
        );


    let tempat =
        document.getElementById(
            "laporanSimpanan"
        );


    if(!tempat){

        console.warn(
            "Elemen laporanSimpanan tidak ditemukan"
        );

        return;

    }


    let id =
        pilih
        ? pilih.value
        : "";


    if(!id){

        tempat.innerHTML = `

            <div class="info">

                Pilih anggota terlebih dahulu.

            </div>

        `;

        return;

    }


    // =================================
    // CARI REKENING
    // =================================

    let rek = null;


    if(
        typeof cariRekening ===
        "function"
    ){

        rek =
            cariRekening(id);

    }


    if(!rek){

        tempat.innerHTML = `

            <div class="info">

                Rekening anggota tidak ditemukan.

            </div>

        `;

        return;

    }


    // =================================
    // DATA SIMPANAN
    // =================================

    let pokok =
        nilaiLaporanSimpanan(
            rek.simpananPokok
        );


    let wajib =
        nilaiLaporanSimpanan(
            rek.simpananWajib
        );


    let sukarela =
        nilaiLaporanSimpanan(
            rek.simpananSukarela
        );


    let total =
        pokok +
        wajib +
        sukarela;


    // =================================
    // NAMA ANGGOTA
    // =================================

    let nama =
        rek.nama || "-";


    if(
        Array.isArray(anggota)
    ){

        let dataAnggota =
            anggota.find(function(a){

                return a.id == id;

            });


        if(dataAnggota){

            nama =
                dataAnggota.nama ||
                nama;

        }

    }


    // =================================
    // RIWAYAT SIMPANAN
    // =================================

    let riwayat = "";


    if(
        Array.isArray(simpanan)
    ){

        let data =
            simpanan.filter(function(s){

                return (
                    s.idAnggota == id ||
                    s.anggota == id ||
                    s.nomorAnggota == id
                );

            });


        data.reverse();


        if(data.length === 0){

            riwayat = `

                <tr>

                    <td colspan="5">
                        Belum ada riwayat simpanan.
                    </td>

                </tr>

            `;

        } else {

            data.forEach(function(s){

                riwayat += `

                    <tr>

                        <td>
                            ${s.tanggal || "-"}
                        </td>

                        <td>
                            ${s.jenis || "-"}
                        </td>

                        <td>
                            ${s.keterangan || "-"}
                        </td>

                        <td>
                            ${rupiah(
                                nilaiLaporanSimpanan(
                                    s.jumlah
                                )
                            )}
                        </td>

                        <td>
                            ${s.id || "-"}
                        </td>

                    </tr>

                `;

            });

        }

    } else {

        riwayat = `

            <tr>

                <td colspan="5">
                    Belum ada data riwayat simpanan.
                </td>

            </tr>

        `;

    }


    // =================================
    // TAMPIL LAPORAN
    // =================================

    tempat.innerHTML = `

        <div class="info">

            <h3>
                LAPORAN SIMPANAN
            </h3>

            <b>
                ${id}
            </b>

            <br>

            Nama :
            ${nama}

            <br><br>

            Simpanan Pokok :
            ${rupiah(pokok)}

            <br>

            Simpanan Wajib :
            ${rupiah(wajib)}

            <br>

            Simpanan Sukarela :
            ${rupiah(sukarela)}

            <br><br>

            <b>
                Total Simpanan :
                ${rupiah(total)}
            </b>

        </div>


        <br>


        <h3>
            RIWAYAT SIMPANAN
        </h3>


        <div style="overflow-x:auto;">

            <table>

                <thead>

                    <tr>

                        <th>
                            Tanggal
                        </th>

                        <th>
                            Jenis
                        </th>

                        <th>
                            Keterangan
                        </th>

                        <th>
                            Jumlah
                        </th>

                        <th>
                            ID
                        </th>

                    </tr>

                </thead>

                <tbody>

                    ${riwayat}

                </tbody>

            </table>

        </div>

    `;


    console.log(
        "Laporan Simpanan BBCS selesai"
    );

}


// =====================================
// SELESAI
// =====================================

console.log(
    "Laporan Simpanan BBCS siap"
);