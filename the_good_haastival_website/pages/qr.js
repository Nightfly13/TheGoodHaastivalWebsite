import Head from "next/head";
import Navbar from "../components/navbar.js";
import QRReader from "../components/QRReader.tsx";
import * as checkToken from "../lib/checkToken";
import styles from "../styles/Home.module.css";
const isBrowser = typeof window != "undefined";

checkValid();

async function checkValid() {
  if (isBrowser && !(await checkToken.checkIfTokenIsValid())) {
    window.location.href = "/login";
  }
}

if (isBrowser) {
  var success = new URLSearchParams(window.location.search).get("succ");
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Haastival App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <QRReader />
        <h1 className={styles.title} style={{ "text-align": "center" }}>
          SCAN THE CODE
        </h1>
        <p id="success">{success}</p>
        <div className={styles.grid}></div>
        <Navbar />
      </main>
    </div>
  );
}
