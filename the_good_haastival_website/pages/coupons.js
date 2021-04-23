import Head from "next/head";
import Link from "next/link";
import React, { Component } from "react";
import styles from "../styles/Home.module.css";
import firebase from "firebase/app";
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseTransaction
} from "@react-firebase/database";
import { firebaseConfig } from "../config";

const s = (a) => JSON.stringify(a, null, 2);

class Page extends Component {
  state = {
    largeTicketsToBuy: 0,
    smallTicketsToBuy: 0,
    totalTicketsToBuy: 0,
    customerCurrentTickets: 0,
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
  buyTickets = (e) => {
    if (this.state.totalTicketsToBuy <= this.state.customerCurrentTickets) {
      this.setState(({ customerCurrentTickets }) => ({
        customerCurrentTickets: (customerCurrentTickets -= this.state.totalTicketsToBuy),
      }));
    } else {
      alert("Not enough tickets!");
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
          <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
            <FirebaseDatabaseNode
              path="coupons/F2795523-7062-4146-A963-AF1FD89AFBB7"
              //limitToFirst={this.state.limit}
              orderByKey
              // orderByValue={"created_on"}
            >
              {(d) => {
                this.state.customerCurrentTickets = d.value;
                return (
                  <React.Fragment>
                    <h1 className={styles.title}>Tickets: {d.value}</h1>
                  </React.Fragment>
                );
              }}
            </FirebaseDatabaseNode>
          </FirebaseDatabaseProvider>
          <div>
            <button id="subLarge" onClick={this.mealCount}>
              -
            </button>
            <p id="largeMeal">{this.state.largeTicketsToBuy}</p>
            <button id="incLarge" onClick={this.mealCount}>
              +
            </button>
          </div>
          <div>
            <button id="subSmall" onClick={this.mealCount}>
              -
            </button>
            <p id="smallMeal">{this.state.smallTicketsToBuy}</p>
            <button id="incSmall" onClick={this.mealCount}>
              +
            </button>
          </div>
          <div>
          <FirebaseDatabaseTransaction path={"coupons/F2795523-7062-4146-A963-AF1FD89AFBB7"}>
        {({ runTransaction }) => {
          return (
            <div>
              <button
                onClick={() => {
                  runTransaction({
                    reducer: val => {
                      if (val === null) {
                        return 1;
                      } else {
                        return val + 1;
                      }
                    }
                  }).then(() => {
                    console.log("Ran transaction");
                  });
                }}
              >
                Click me to run transaction
              </button>
            </div>
          );
        }}
      </FirebaseDatabaseTransaction>
            <p>Total amount: {this.state.totalTicketsToBuy}</p>
            <button id="confirm" onClick={this.buyTickets}>
              Confirm
            </button>
          </div>
          <div className={styles.grid}></div>
          <div class="navbar" id="myNavbar">
            <Link href={"/qr"}>QR</Link>
            <Link href={"/coupons"}>Coupons</Link>
            <Link href={"/refunds"}>Refunds</Link>
            <Link href={"/pictures"}>Pics</Link>
          </div>
        </main>
      </div>
    );
  }
}
export default Page;
