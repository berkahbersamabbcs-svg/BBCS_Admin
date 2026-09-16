// =====================================
// BERKAH BERSAMA CORE SYSTEM
// DASHBOARD
// =====================================


function tampilDashboard(){


let tempat =
document.getElementById("dashboardInfo");


if(!tempat){

return;

}



let totalPinjaman = 0;

let saldoKas = 0;


kas.forEach(function(item){


if(item.jenis=="Pemasukan"){

saldoKas += Number(item.jumlah);

}


if(item.jenis=="Pengeluaran"){

saldoKas -= Number(item.jumlah);

}


});



  // =====================================
// TOTAL PINJAMAN AKTIF
// =====================================

pinjaman.forEach(function(item){

if(item.status=="Aktif"){

totalPinjaman += Number(item.sisaPokok);

}

});



// =====================================
// TOTAL SIMPANAN
// =====================================

let totalSimpanan = 0;


rekening.forEach(function(item){

totalSimpanan +=

Number(item.simpananPokok) +

Number(item.simpananWajib) +

Number(item.simpananSukarela);

});
  


tempat.innerHTML = `

<div class="card">

<h3>
Jumlah Anggota
</h3>

<h2>
${anggota.length}
</h2>

</div>



<div class="card">

<h3>
Jumlah Rekening
</h3>

<h2>
${rekening.length}
</h2>

</div>



<div class="card">

<h3>
Pinjaman Aktif
</h3>

<h2>
${rupiah(totalPinjaman)}
</h2>

</div>



<div class="card">

<h3>
Saldo Kas
</h3>

<h2>
${rupiah(saldoKas)}
</h2>

</div>


<div class="card">

<h3>
Total Simpanan
</h3>

<h2>
${rupiah(totalSimpanan)}
</h2>

</div>

`;
  



}



tampilDashboard();



console.log(
"Dashboard BBCS siap"
);