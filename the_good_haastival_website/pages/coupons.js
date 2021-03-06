import {
  FirebaseDatabaseNode,
  FirebaseDatabaseProvider,
  FirebaseDatabaseTransaction,
} from "@react-firebase/database";
import firebase from "firebase/app";
import "firebase/database";
import Head from "next/head";
import React, { Component } from "react";
import Navbar from "../components/navbar.js";
import { checkIfTokenIsValid } from "../lib/checkToken";
import styles from "../styles/Home.module.css";
const isBrowser = typeof window != "undefined";

checkValid();

async function checkValid() {
  if (isBrowser && !(await checkIfTokenIsValid())) {
    window.location.href = "/login";
  }
}
if (isBrowser) {
  var id = new URLSearchParams(window.location.search).get("id");
}

class Page extends Component {
  state = {
    largeTicketsToBuy: 0,
    smallTicketsToBuy: 0,
    totalTicketsToBuy: 0,
  };
  mealCount = (e) => {
    if (e.target.id.includes("Large")) {
      let newCount = e.target.id.includes("inc")
        ? this.state.largeTicketsToBuy + 1
        : Math.max(this.state.largeTicketsToBuy - 1, 0);
      this.setState(({ largeTicketsToBuy }) => ({
        largeTicketsToBuy: newCount,
      }));
      this.setState(({ allTickets }) => ({
        totalTicketsToBuy: newCount * 2 + this.state.smallTicketsToBuy,
      }));
    } else {
      let newCount = e.target.id.includes("inc")
        ? this.state.smallTicketsToBuy + 1
        : Math.max(this.state.smallTicketsToBuy - 1, 0);
      this.setState(({ smallTicketsToBuy }) => ({
        smallTicketsToBuy: newCount,
      }));
      this.setState(({ allTickets }) => ({
        totalTicketsToBuy: this.state.largeTicketsToBuy * 2 + newCount,
      }));
    }
  };
  //counter: e.name.inludes ? counter + 1 : counter-1
  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Haastival App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <table className={styles.table}>
            <tbody>
              <FirebaseDatabaseProvider
                firebase={firebase}
                {...{
                  apiKey: process.env.APIKEY,
                  authDomain: process.env.AUTHDOMAIN,
                  databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
                  projectId: process.env.PROJECTID,
                  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
                  messagingSenderId: process.env.MESSAGINGSENDERID,
                  appId: process.env.APPID,
                }}
              >
                <FirebaseDatabaseNode
                  path={"coupons/" + id}
                  //limitToFirst={this.state.limit}
                  orderByKey
                  // orderByValue={"created_on"}
                >
                  {(d) => {
                    return (
                      <React.Fragment>
                        <tr>
                          <td className={styles.td} colSpan="4">
                            Tickets: {d.value}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  }}
                </FirebaseDatabaseNode>
              </FirebaseDatabaseProvider>
              <tr>
                <td className={styles.td}>Large</td>
                <td className={styles.td}>
                  <button
                    className={styles.button}
                    id="subLarge"
                    onClick={this.mealCount}
                  >
                    -
                  </button>
                </td>
                <td className={styles.td} id="largeMeal">
                  {this.state.largeTicketsToBuy}
                </td>
                <td className={styles.td}>
                  <button
                    className={styles.button}
                    id="incLarge"
                    onClick={this.mealCount}
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.td}>Small</td>
                <td className={styles.td}>
                  <button
                    className={styles.button}
                    id="subSmall"
                    onClick={this.mealCount}
                  >
                    -
                  </button>
                </td>
                <td className={styles.td} id="smallMeal">
                  {this.state.smallTicketsToBuy}
                </td>
                <td className={styles.td}>
                  <button
                    className={styles.button}
                    id="incSmall"
                    onClick={this.mealCount}
                  >
                    +
                  </button>
                </td>
              </tr>
              <tr>
                <td className={styles.td} colSpan="4">
                  Total amount: {this.state.totalTicketsToBuy}
                </td>
              </tr>
              <FirebaseDatabaseProvider
                firebase={firebase}
                {...{
                  apiKey: process.env.APIKEY,
                  authDomain: process.env.AUTHDOMAIN,
                  databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
                  projectId: process.env.PROJECTID,
                  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
                  messagingSenderId: process.env.MESSAGINGSENDERID,
                  appId: process.env.APPID,
                }}
              >
                <FirebaseDatabaseTransaction path={"coupons/" + id}>
                  {({ runTransaction }) => {
                    return (
                      <tr>
                        <td className={styles.td} colSpan="4">
                          <button
                            id="confirm"
                            className={styles.button}
                            onClick={() => {
                              let successFlag = false;
                              runTransaction({
                                reducer: (val) => {
                                  if (val === null) {
                                    return 0;
                                  } else {
                                    if (val >= this.state.totalTicketsToBuy) {
                                      firebase.app(); // if already initialized, use that one
                                      console.log(firebase);
                                      var username =
                                        document.cookie.match(
                                          /username=([^;\s]+)/
                                        )[1];
                                      firebase
                                        .database()
                                        .ref("purchases")
                                        .child(username)
                                        .set(
                                          firebase.database.ServerValue.increment(
                                            this.state.totalTicketsToBuy
                                          )
                                        );
                                      successFlag = true;
                                      return val - this.state.totalTicketsToBuy;
                                    } else {
                                      alert("Not enough tickets!");
                                      return val;
                                    }
                                  }
                                },
                              });
                              window.location.href = "/qr?succ=" + successFlag;
                            }}
                          >
                            Confirm
                          </button>
                        </td>
                      </tr>
                    );
                  }}
                </FirebaseDatabaseTransaction>
              </FirebaseDatabaseProvider>
            </tbody>
          </table>
          <div className={styles.grid}></div>
          <Navbar />
        </main>
      </div>
    );
  }
}
export default Page;
