import Head from "next/head";
import Link from "next/link";
import React, { Component } from "react";
import styles from "../styles/Home.module.css";

class Page extends Component {
  state = { largeCounter: 0, smallCounter: 0, allTickets: 0};

  mealCount = (e) => {
    console.log(e);
    if (e.target.id.includes("Large")) {
      this.setState(({ largeCounter }) => ({
        largeCounter: e.target.id.includes("inc")
          ? largeCounter + 1
          : Math.max(largeCounter - 1, 0),
      }));
      this.setState(({allTickets})=> ({allTickets : e.target.id.includes("inc") ? allTickets +1 :  Math.max(allTickets -1, 0)}))
    } else {
      this.setState(({ smallCounter }) => ({
        smallCounter: e.target.id.includes("inc")
          ? smallCounter + 1
          : Math.max(smallCounter - 1, 0),
      }));
      this.setState(({allTickets})=> ({allTickets : e.target.id.includes("inc") ? allTickets +1 :  Math.max(allTickets -1, 0)}))
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
          <h1 className={styles.title}>Tickets: []</h1>
          <div>
          <button id="subLarge" onClick={this.mealCount}>
            -
          </button>
          <p id="largeMeal">{this.state.largeCounter}</p>
          <button id="incLarge" onClick={this.mealCount}>
            +
          </button>
          </div >
          <div>
          <button id="subSmall" onClick={this.mealCount}>
            -
          </button>
          <p id="smallMeal">{this.state.smallCounter}</p>
          <button id="incSmall" onClick={this.mealCount}>
            +
          </button>
          </div>
          <div>
            <p>Total amount: {this.state.allTickets}</p>
          <button id="confirm">Confirm</button>
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
/* var stripe_load = () => {
  if (process.browser) {
      var aScript = document.createElement('script');
      aScript.type = 'text/javascript';
      aScript.src = " https://js.stripe.com/v3/";

      document.head.appendChild(aScript);
      aScript.onload = () => {

      };
  }
}; */
