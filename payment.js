// INI UNTUK MENU NAVBAR AGAR TERLIHAT SAAT LAYAR USER KECIL
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-bar').onclick=() =>{
    navbar.classList.toggle('active');
}

let search = document.querySelector('.search');
document.querySelector('#search').onclick=() =>{
    search.classList.toggle('active');
}
// MENU NAVBAR KELAR

function processPayment(event) {
  event.preventDefault(); // Mencegah form submit

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var address = document.getElementById('address').value;
  var paymentMethod = document.getElementById('paymentMethod').value;
  var total = parseFloat(document.getElementById('total').value);

  // Validasi sederhana
  if (name.trim() === '' || email.trim() === '' || address.trim() === '' || paymentMethod === '' || isNaN(total)) {
    displayPaymentResult('Harap isi semua field dengan benar.');
  } else {
    // Simulasi proses pembayaran (misalnya dengan penundaan 2 detik)
    displayPaymentResult('Sedang memproses pembayaran...');
    setTimeout(function() {
      if (paymentMethod === 'cash') {
        displayPaymentResult('Pembayaran berhasil dengan metode: Cash. Pesanan akan segera diantar.<br>Nama: ' + name + '<br>Email: ' + email + '<br>No Telepon: ' + address + '<br>Total Belanja: Rp ' + total.toFixed(3));
      } else {
        generateQRCode(paymentMethod);
        displayPaymentResult('Pembayaran berhasil dengan metode: ' + paymentMethod.toUpperCase() + '. Pesanan akan segera diantar.<br>Nama: ' + name + '<br>Email: ' + email + '<br>No Telepon: ' + address + '<br>Total Belanja: Rp ' + total.toFixed(3));
      }
      document.getElementById('paymentForm').reset();
      toggleQRCode();
    }, 2000);
  }
}

// UNTUK MENAMPILKAN NILAI TOTAL BELANJA DARI HALAMAN CART
document.addEventListener("DOMContentLoaded", function() {
  // Ambil nilai totalBelanja dari localStorage
  let totalBelanja = localStorage.getItem('totalBelanja');

  // Cari elemen dengan ID "total" dan set nilai input-nya dengan totalBelanja
  let totalInput = document.getElementById('total');
  totalInput.value = totalBelanja;
});

function displayPaymentResult(message) {
  var paymentResult = document.getElementById('paymentResult');
  paymentResult.innerHTML = message;
  paymentResult.style.color = "black"; // kode untuk mengubah warna tulisan menjadi hitam
}

function toggleQRCode() {
  var paymentMethod = document.getElementById('paymentMethod').value;
  var qrCodeContainer = document.getElementById('qrCodeContainer');

  if (paymentMethod === 'gopay' || paymentMethod === 'dana') {
    qrCodeContainer.classList.remove('hidden');
    generateQRCode(paymentMethod);
  } else {
    qrCodeContainer.classList.add('hidden');
  }
}
function logout() {
  window.location.href = 'index.html';
}
function kembali() {
  window.location.href = 'cart.html';
}

function generateQRCode(paymentMethod) {
  var qrCodeElement = document.getElementById('qrCode');

  var qrCodeImagePath = '';

  if (paymentMethod === 'gopay') {
    qrCodeImagePath = 'images/payment1.png';
  } else if (paymentMethod === 'dana') {
    qrCodeImagePath = 'images/payment2.png';
  }

  qrCodeElement.src = qrCodeImagePath;
}
