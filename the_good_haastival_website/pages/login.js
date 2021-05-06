import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar.js";
import React, { Component } from "react";


class LoginPage extends Component {

  onSubmit = async (event) => {
    event.preventDefault()

    console.log("submit")
    console.log(event)
    console.log(event.target.usrname.value)
    console.log(event.target.passwd.value)
  }

  render() {
    return (
      <div>
        <Head>
          <title>Login</title>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to The *SlightlyMediocre* Haastival website!
          </h1>
          <form onSubmit={this.onSubmit}>
            <label>Username:</label>
            <input type="text" id="usrname" name="usrname" required />
            <br />
            <label>Password: </label>
            <input type="password" id="passwd" name="passwd" required />
            <br />
            <button type="submit">Register</button>
          </form>
          <div className={styles.grid}></div>
          <Navbar />
        </main>
      </div>
    );
  }
}

export default LoginPage;
