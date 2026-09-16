// =====================================
// BBCS ADMIN DASHBOARD V3.1
// =====================================

console.log(
"Admin Dashboard BBCS Aktif"
);


function tampilAdmin(){

let tempat =
document.getElementById(
"adminInfo"
);


if(!tempat){
return;
}


let nama =
localStorage.getItem(
"namaAdmin"
)
||
"";


let waktu =
localStorage.getItem(
"waktuLogin"
)
||
"";


tempat.innerHTML = `

<div class="info">

<h3>
ADMIN AKTIF
</h3>

<p>
Nama :
<b>${nama}</b>
</p>


<p>
Login :
<b>${waktu}</b>
</p>


<p>
Status :
<b>ONLINE</b>
</p>

</div>

`;

}


tampilAdmin();