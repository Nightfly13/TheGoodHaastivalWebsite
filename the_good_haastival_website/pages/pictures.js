import Head from "next/head";
import React from "react";
import Images from "../components/imageGrid.js";
import Navbar from "../components/navbar.js";
import { checkIfTokenIsValid, checkIfTokenIsAdmin } from "../lib/checkToken";
import styles from "../styles/Home.module.css";
const isBrowser = typeof window != "undefined";

checkValid();

async function checkValid() {
  if (isBrowser && !(await checkIfTokenIsValid())) {
    window.location.href = "/login";
  } else if (isBrowser && !(await checkIfTokenIsAdmin())) {
    if (window.location.href.includes("pictures")) {
      window.location.href = "/";
    }
  }
}

class Pictures extends React.Component {

  componentDidMount() {
    checkValid()
  }

  render() {
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
}

export default Pictures;
