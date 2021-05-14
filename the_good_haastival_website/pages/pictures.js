import Head from "next/head";
import React from "react";
import Images from "../components/imageGrid.js";
import Navbar from "../components/navbar.js";
import { checkIfTokenIsValid, checkIfTokenIsAdmin } from "../lib/checkToken";
import styles from "../styles/Home.module.css";
const isBrowser = typeof window != "undefined";

checkValid()

async function checkValid() {
  console.log("in checkValid in pics");
  if (isBrowser && !(await checkIfTokenIsValid())) {
    console.log("not valid in pics");
    window.location.href = "/login";
  } else if (isBrowser && !(await checkIfTokenIsAdmin())) {
    console.log("not admin in pics");
    if (window.location.href.includes("pictures")) {
      window.location.href = "/";
    }
  }
  console.log("valid in pics");
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Haastival App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Images</h1>
        <Images />
        <div className={styles.grid}></div>
        <Navbar />
      </main>
    </div>
  );
}
