import Head from "next/head";
import Navbar from "../components/navbar.js";
import * as checkToken from "../lib/checkToken";
import styles from "../styles/Home.module.css";

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
          Welcome to the Haastival Companion app!
        </h1>
        <h2 style={{color: "green"}}>Your have logged in successfully!</h2>
        <h2>Pages</h2>
        <h3>QR</h3>
        <p>The QR page enables you to scan codes of festival attendees and indicate how many tickets they have used to buy your delicious food. And obviuosly, we are keeping track of that for you!</p>
        <h3 style={{marginBottom: "0"}}>Pics</h3>
        <p style={{color: "red", fontSize: "10px", marginTop: "0"}}>Admin only, which basically means that if you are not Maria, you can't view them, sorry.</p>
        <p>Pictures page contains images from festival atendees, which can be view, deleted or downloaded and used on Insta hopefully.</p>
        <div className={styles.grid}></div>
        <Navbar />
      </main>
    </div>
  );
}
