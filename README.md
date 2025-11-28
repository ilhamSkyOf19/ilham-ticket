# Cinema Ticketing Website

Website ini adalah platform penjualan tiket bioskop yang memungkinkan pengguna untuk membeli tiket film, mengelola saldo wallet, dan melakukan transaksi pembayaran secara online. Terdapat dua jenis pengguna: **Admin** dan **Customer**, masing-masing dengan fitur dan akses berbeda.

---

## Teknologi yang Digunakan

- **Front-end**: React + TypeScript, dibangun dengan Vite  
- **Back-end**: Express.js  
- **Database**: MySQL  
- **ORM**: Prisma  
- **API Calls**: Axios  
- **File Upload**: Multer  
- **Payment Gateway**: Midtrans  

---

## Fitur

### Login Admin dan Customer

#### Admin
- Dashboard untuk melihat data ringkas film, transaksi, dan statistik
- CRUD (Create, Read, Update, Delete) data Film
- CRUD data Theater
- CRUD data Genre
- CRUD data Bonus (misal popcorn, minuman, merchandise)

#### Customer
- Halaman Home menampilkan daftar film yang tersedia
- Melihat history transaksi tiket
- Melihat saldo wallet dan riwayat transaksi wallet (top-up atau pengurangan)
- Top-up wallet melalui Midtrans
- Halaman pengaturan profil
- Halaman detail film
- Booking tiket bioskop:
  - Memilih theater
  - Memilih jadwal waktu
  - Memilih kursi
  - Melakukan pembayaran
- Halaman detail transaksi tiket

---

## Struktur Data

Secara ringkas, data utama yang dikelola meliputi:

1. **User**
   - Informasi pengguna: nama, email, password, avatar
   - Role: admin atau customer
   - Riwayat transaksi wallet dan tiket
   - Review film

2. **Film**
   - Judul, deskripsi, thumbnail, harga tiket, rating, ketersediaan kursi
   - Genre film
   - Daftar theater tempat film ditayangkan
   - Bonus terkait film (misal snack atau merchandise)
   - Review dari customer

3. **Theater**
   - Nama theater, kota, gambar theater
   - Film yang ditayangkan di theater
   - Riwayat transaksi tiket di theater

4. **Genre**
   - Nama genre film (misal Action, Drama, Komedi)
   - Film yang termasuk genre tersebut

5. **Bonus**
   - Nama bonus, ukuran, gambar
   - Film yang memiliki bonus tersebut

6. **Wallet & Transaksi Wallet**
   - Saldo wallet setiap pengguna
   - Riwayat transaksi wallet (top-up atau pengurangan)
   - Status transaksi: success, pending, failed

7. **Transaksi Tiket**
   - Data tiket yang dibeli customer
   - Film, theater, waktu, kursi, total harga
   - Status transaksi dan tipe (top-up / pembayaran tiket)
   
8. **Booking**
   - Informasi kursi yang dibooking dan jam tayang
   - Pastikan tidak ada double booking

---

## Instalasi

1. Clone repository
```bash
git clone <repository-url>
cd <project-folder>
