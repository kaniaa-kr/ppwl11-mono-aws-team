# PPWL 11/Monorepo - Aws Teams

[![PPWL 2026 Tim 3 - 11](https://img.shields.io/badge/PPWL_2026_Tim3-11-blue?style=for-the-badge&logo=github)](https://github.com/kaniaa-kr/ppwl11-mono-aws-team)
[![Date](https://img.shields.io/badge/Date-16%20April%202026-blue?style=flat-square&logo=calendar-check)](https://github.com/kaniaa-kr/ppwl11-mono-aws-team)

## Class A / Team 3

| Nama | NIM | Job |
| --- | --- | --- |
| KANIA KIRANI | H1101240055 | Admin (IAM, VPC, Parameter Store) |
| EVAN MULYA OKTAROHMAT | H1101240066 | Budget & Cost Explorer |
| MUHAMMAD RAFLI ASSIDIQ | H1101240012 | RDS PostgreSQL Database |
| KHARIZMA RIZKIAH | H1101240050 | Lambda Backend (Elysia) |
| TESA FIRNA ANANTA | H1101240057 | S3 + CloudFront Frontend |
| TESA FIRNA ANANTA | H1101240057 | Integrasi & Dokumentasi |

[Canva - Arsitektur Diagram AWS](https://canva.link/g0zabuw7eqgly52)

## Report Bug

### ❌ Cost Explorer — Access Denied (Fase 2)

**Pesan Error:**
> *"You are not authorized to perform this operation."*
> The AWS Cost Management console uses AWS Identity and Access Management (IAM) policies for better security and flexibility. Some of your actions are currently restricted by these policies.

**Lokasi Bug:**
`Billing and Cost Management → Cost Explorer → New cost and usage report`

**Alur Sebelum Bug Didapatkan:**
1. Login ke AWS Console menggunakan akun IAM User `budget-evan` (member dari group `grp-budget`).
2. Navigasi ke menu **Billing and Cost Management**.
3. Klik **Cost Explorer** di sidebar kiri.
4. Halaman terbuka namun langsung menampilkan popup *Access Denied* dan semua data (Total cost, Average monthly cost, Service count) kosong menampilkan tanda `–`.

**Screenshot:**
![Cost Explorer Access Denied](./screenshots/cost-explorer-access-denied.png)

**Solusi yang Sudah Dicoba:**
- Memastikan IAM User sudah terdaftar di group `grp-budget`.
- Belum dapat menyelesaikan sendiri karena akses Cost Explorer harus diaktifkan oleh **Root Account / Admin** melalui: *Billing and Cost Management → Billing Preferences → IAM user and role access to Billing information → Enable*. Serta memastikan inline policy `additionalInlinePolicy_grpBudget` yang mencakup action `ce:DescribeReport`, `ce:GetDimensionValues`, `ce:GetSavingsPlansPurchaseRecommendation`, dan `ce:GetSavingsPlansCoverage` sudah ter-attach ke group.

**Status:** ⏳ Menunggu Admin untuk mengaktifkan akses IAM ke Cost Explorer.

---

### ❌ CloudFront — Web Distribution Quota Limit (Fase 5)

**Pesan Error:**
> *"Limit increase request — Service: Amazon CloudFront, Region: US East (Northern Virginia), Limit name: Web distributions per AWS account, New limit value: 560"*

**Lokasi Bug:**
`CloudFront → Create distribution` — saat mencoba membuat distribution baru untuk setup HTTPS pada Fase 5.

**Alur Sebelum Bug Didapatkan:**
1. Login ke AWS Console menggunakan akun IAM User yang memiliki akses CloudFront.
2. Navigasi ke **CloudFront → Create distribution**.
3. Proses pembuatan distribution gagal karena akun telah mencapai batas kuota maksimum **Web distributions per AWS account**.
4. Melakukan request peningkatan kuota melalui **AWS Service Quotas** dengan nilai baru: **560 web distributions**.
5. Mendapat email konfirmasi otomatis dari AWS Support pada **Thu Apr 23 2026, 19:31:32 GMT+0700** bahwa request sedang dalam proses review.

**Screenshot:**
![CloudFront Quota Limit](./screenshots/cloudfront-quota-limit.png)

**Solusi yang Sudah Dicoba:**
- Mengajukan **Service Quota increase request** ke AWS Support untuk CloudFront Web distributions di region US East (Northern Virginia).
- Request sudah diterima dan sedang dalam review. AWS menyatakan proses dapat memakan waktu hingga **1–2 minggu**.
- Fase 5 (CloudFront HTTPS setup) **belum dapat diselesaikan** sementara menunggu approval dari AWS.

**Status:** ⏳ Menunggu konfirmasi approval dari AWS Support.