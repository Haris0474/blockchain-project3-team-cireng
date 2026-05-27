# Simple Voting Smart Contract (Project 2)

## Deskripsi Proyek
Project ini merupakan implementasi smart contract voting sederhana berbasis blockchain Ethereum menggunakan Solidity dan Hardhat. Sistem voting ini memungkinkan owner untuk menambahkan kandidat dan pengguna dapat memberikan suara satu kali menggunakan wallet mereka.

Smart contract ini dijalankan pada local blockchain Hardhat dan dapat dihubungkan dengan MetaMask untuk simulasi transaksi blockchain secara langsung.

---



| Nama | NRP | Job Desc |
|---|---|---|
| Michael Laurence Djie | 5006231001 | Deployment, MetaMask Integration |
| Muhammad Harisul Haq | 5006231028 | Smart Contract Developer & Testing |
| Evand Khan | 5006231003 | Documentation & Coverage Analysis |

---

## Fitur Smart Contract

### Fitur Utama
- Owner dapat menambahkan kandidat voting
- User hanya dapat vote satu kali
- Menampilkan jumlah kandidat
- Menampilkan hasil voting kandidat
- Event logging untuk tracking transaksi voting
- Validasi kandidat voting
- Voting deadline menggunakan block.timestamp

### Fitur Bonus
- Voting deadline otomatis
- Owner dibuat private
- Event tracking blockchain
- Integrasi MetaMask

---

## Spesifikasi Smart Contract

| Komponen | Implementasi |
|---|---|
| State Variables | owner, deadline, candidates |
| Mapping | hasVoted |
| Modifier | onlyOwner |
| Events | CandidateAdded, Voted |
| Functions | addCandidate, vote, getCandidate, candidateCount, getOwner |

---

# Cara Menjalankan Project

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Compile Smart Contract

```bash
npx hardhat compile
```

---

## 3. Menjalankan Unit Test

```bash
npx hardhat test
```

---

## 4. Menjalankan Local Blockchain

```bash
npx hardhat node
```

---

## 5. Deploy Smart Contract

```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

# Hasil Pengujian

## 1. Compile Smart Contract

![Compile](image/Gambar7.png)

*Gambar 1. Compile smart contract berhasil.*

---

## 2. Unit Testing

Seluruh fitur smart contract telah berhasil diuji menggunakan Hardhat testing framework. Pengujian mencakup validasi owner, penambahan kandidat, voting, event emit, validasi double voting, serta validasi kandidat tidak valid.

### Test Case:
1. Should set correct owner
2. Should add candidate
3. Should allow voting
4. Should prevent double voting
5. Should reject invalid candidate
6. Should emit CandidateAdded event
7. Should emit Voted event
8. Should return candidate count
9. Should reject non-owner adding candidate

![Testing](image/Gambar8.png)

*Gambar 2. Hasil unit testing Hardhat (9 passing).*

---

## 3. Local Blockchain Hardhat

Local blockchain berhasil dijalankan menggunakan Hardhat Network dan menghasilkan beberapa akun testing Ethereum lengkap dengan private key dan saldo ETH testing.

![Hardhat Node](image/Gambar10.png)

*Gambar 3. Hardhat local blockchain berjalan.*

---

## 4. Deployment Smart Contract

Smart contract berhasil di-deploy ke jaringan localhost Hardhat menggunakan deploy script Hardhat.

```bash
npx hardhat run scripts/deploy.js --network localhost
```

![Deploy](image/Gambar11.png)

*Gambar 4. Smart contract berhasil di-deploy ke localhost.*

---

## 5. MetaMask Connection

MetaMask berhasil dihubungkan ke jaringan Hardhat Local Network menggunakan RPC localhost dan Chain ID 31337.

### Konfigurasi Network:
| Field | Value |
|---|---|
| Network Name | Hardhat Local |
| RPC URL | http://127.0.0.1:8545 |
| Chain ID | 31337 |
| Currency Symbol | ETH |

![MetaMask](image/Gambar12.png)

*Gambar 5. MetaMask berhasil terhubung ke Hardhat Local Network.*
## 6. Test Coverage & Branch Coverage

Pengujian smart contract juga dilakukan menggunakan `solidity-coverage` untuk mengukur tingkat cakupan pengujian terhadap seluruh kode program smart contract.

Pengujian ini memastikan bahwa:
- seluruh function berhasil diuji,
- seluruh statement Solidity berhasil dieksekusi,
- seluruh line code berhasil tercakup,
- serta sebagian besar branch condition (`require` dan validasi kondisi) telah diuji dengan baik.

Hasil coverage menunjukkan:
- **Statements Coverage:** 100%
- **Branch Coverage:** 90%
- **Functions Coverage:** 100%
- **Lines Coverage:** 100%

Nilai branch coverage berhasil mencapai **90%**, yang menunjukkan bahwa hampir seluruh percabangan logika dan validasi kondisi pada smart contract telah berhasil diuji secara menyeluruh.

![Coverage Result](image/Gambar13.png)

*Gambar 6. Hasil solidity coverage dengan branch coverage sebesar 90%.*

---
---
## 7. Deployment & Interaksi Menggunakan Remix IDE

Selain menggunakan Hardhat Local Network, smart contract juga berhasil diuji menggunakan Remix IDE untuk memastikan kontrak dapat diinteraksikan langsung melalui antarmuka blockchain berbasis web.

Pada tahap ini dilakukan beberapa proses:
- Compile smart contract menggunakan Solidity Compiler pada Remix IDE
- Deploy contract menggunakan Remix VM
- Menambahkan kandidat voting
- Melakukan voting
- Mengecek perubahan state smart contract secara langsung

### a. Compile Smart Contract di Remix IDE

Smart contract berhasil di-compile menggunakan compiler Solidity versi 0.8.20 tanpa error.

### b. Deployment Smart Contract di Remix IDE

Contract berhasil di-deploy menggunakan Remix VM Environment dan menghasilkan alamat contract baru.

### c. Menambahkan Kandidat Voting

Owner berhasil menambahkan kandidat voting menggunakan fungsi `addCandidate`.

![Add Candidate](image/Gambar1.png)

*Gambar 7. Penambahan kandidat voting berhasil dilakukan.*

---

### d. Melakukan Voting

User berhasil melakukan voting terhadap kandidat yang tersedia menggunakan fungsi `vote`.

![Voting Transaction](image/Gambar3.png)

*Gambar 8. Transaksi voting berhasil dilakukan.*

---

### e. Verifikasi Perubahan State Smart Contract

Setelah voting dilakukan, hasil vote berhasil berubah dan dapat diverifikasi menggunakan fungsi `getCandidate`.

![State Verification](image/Gambar5.png)

*Gambar 9. Verifikasi perubahan state smart contract setelah voting.*

### f. Validasi Double Voting

Smart contract berhasil memblokir user yang mencoba melakukan voting lebih dari satu kali. Sistem menampilkan error `Already voted` sesuai validasi pada mapping `hasVoted`.

Hal ini membuktikan bahwa mekanisme keamanan one vote per wallet berjalan dengan baik dan mampu mencegah terjadinya double voting pada sistem pemilihan.

![Double Voting Validation](image/Gambar6.png)

*Gambar 10. Validasi gagal voting kedua karena user sudah pernah melakukan vote sebelumnya.*

# Contract Address

```text
Contract deployed to:
0x5fbdb2315678afecb367f032d93f642f64180aa3
```

---

# Teknologi yang Digunakan

- Solidity
- Hardhat
- Ethers.js
- MetaMask
- Node.js
- GitHub

---

# Struktur Project

```text
Voting-Project2/
│
├── contracts/
│   └── SimpleVoting.sol
│
├── scripts/
│   └── deploy.js
│
├── test/
│   └── SimpleVoting.js
│
├── image/
│   ├── image1.png
│   ├── image2.png
│   ├── image3.png
│   ├── image4.png
│   └── image5.png
│
├── hardhat.config.js
├── package.json
└── README.md
```

---

# Kesimpulan

Project smart contract voting sederhana ini berhasil diimplementasikan menggunakan Solidity dan Hardhat dengan fitur utama voting satu kali per wallet, deployment local blockchain, unit testing, dan integrasi MetaMask. Dokumentasi sistem, hasil pengujian, serta analisis coverage turut disusun guna memberikan pemahaman yang lebih jelas terkait alur implementasi dan validasi smart contract yang telah dibuat. 
