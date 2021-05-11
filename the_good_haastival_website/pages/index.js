import Head from 'next/head';
import Navbar from '../components/navbar.js';
import * as checkToken from "../lib/checkToken";
import styles from '../styles/Home.module.css';

const isBrowser = typeof window != "undefined";

checkValid();

async function checkValid() {
  if (isBrowser && !(await checkToken.checkIfTokenIsValid())) {
    window.location.href = "/login";
  }
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Page Title</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to The *SlightlyMediocre* Haastival website!
        </h1>
        <div className={styles.grid}>
        </div>
        <Navbar/>
      </main>
    </div>
  );
}
