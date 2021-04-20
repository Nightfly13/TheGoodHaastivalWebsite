import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import QRReader from "../components/QRReader.tsx";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Haastival App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <QRReader />
        <h1 className={styles.title}>
        SCAN THE CODE YES WORKS NOW ~~~~~~(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
        </h1>
        <div className={styles.grid}>
        </div>
        <div class="navbar" id="myNavbar">
          <Link href={'/qr'}>QR</Link>
          <Link href={'/coupons'}>Coupons</Link>
          <Link href={'/refunds'}>Refunds</Link>
          <Link href={'/pictures'}>Pics</Link>
        </div>
      </main>
    </div>
  )
}