import Head from 'next/head'
import styles from '../styles/Home.module.css'
import QRReader from "../components/QRReader.tsx"
import Navbar from '../components/navbar.js'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Haastival App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <QRReader />
        <h1 className={styles.title}
        style={{"text-align": "center"}}>
        SCAN THE CODE
        </h1>
        <div className={styles.grid}>
        </div>
        <Navbar/>
      </main>
    </div>
  )
}