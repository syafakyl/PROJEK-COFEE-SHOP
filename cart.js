let navbar = document.querySelector('.navbar');
document.querySelector('#menu-bar').onclick=() =>{
    navbar.classList.toggle('active');
}

let search = document.querySelector('.search');
document.querySelector('#search').onclick=() =>{
    search.classList.toggle('active');
}

// Ambil elemen-elemen yang dibutuhkan
const itemCounts = document.getElementsByClassName('item-count');
const minusBtns = document.getElementsByClassName('minus-btn');
const plusBtns = document.getElementsByClassName('plus-btn');
const totalAmount = document.getElementById('total-amount');
const checkoutBtn = document.getElementById('checkout-btn');

// Daftar harga makanan dan minuman sesuai dengan urutan
const itemPrices = [10000, 20000, 25000, 28000, 15000, 18000, 25000, 20000];

// Mendapatkan total belanja dari localStorage (jika ada)
let totalBelanja = localStorage.getItem('totalBelanja');
if (totalBelanja) {
  totalAmount.innerText = totalBelanja;
} else {
  totalBelanja = 0;
}

// Tambahkan event listener untuk setiap tombol minus
for (let i = 0; i < minusBtns.length; i++) {
  minusBtns[i].addEventListener('click', function() {
    updateItemCount(i, -1);
  });
}

// Tambahkan event listener untuk setiap tombol plus
for (let i = 0; i < plusBtns.length; i++) {
  plusBtns[i].addEventListener('click', function() {
    updateItemCount(i, 1);
  });
}

// Fungsi untuk mengupdate jumlah pesanan
function updateItemCount(index, change) {
  let count = parseInt(itemCounts[index].value);
  count += change;

  if (count < 0) {
    count = 0;
  }

  itemCounts[index].value = count;
  updateTotal();
}

// Fungsi untuk mengupdate total belanja
function updateTotal() {
  let total = 0;

  for (let i = 0; i < itemCounts.length; i++) {
    const count = parseInt(itemCounts[i].value);
    const price = itemPrices[i];

    total += count * price;
  }

  totalAmount.innerText = total.toLocaleString();

  localStorage.setItem('totalBelanja', total); // Simpan nilai total belanja ke localStorage
}

// Tambahkan event listener untuk tombol bayar
checkoutBtn.addEventListener('click', function() {
  // UNTUK MENAMBAHKAN ANIMASI LOADING 
  checkoutBtn.disabled = true;
  checkoutBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Mohon Tunggu..';
  
  // Ambil nilai totalBelanja dari halaman cart.html
  let totalBelanja = document.getElementById('total-amount').innerText;
  
   // Simpan nilai totalBelanja ke localStorage
   localStorage.setItem('totalBelanja', totalBelanja);

  // CONTOH PROSES PEMBAYARAB PENUNDAAN 3DETIK / 3000
  setTimeout(function() {
    window.location.href = "payment.html?totalBelanja=" + totalBelanja;
  }, 3000);
});

  var backButton = document.getElementById('back-btn');
  backButton.addEventListener('click', function() {
    window.location.href = "Coffeshop.html";
  });