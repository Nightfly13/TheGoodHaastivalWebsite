import Head from "next/head";
import React, { Component } from "react";
import styles from "../styles/Home.module.css";
import Navbar from '../components/navbar.js'

class Page extends Component {
  state = { largeCounter: 0, smallCounter: 0, allTickets: 0, customerTickets: 20};
  mealCount = (e) => {
    if (e.target.id.includes("Large")) {
      let newCount = e.target.id.includes("inc") ? this.state.largeCounter + 1 : Math.max(this.state.largeCounter - 1, 0)
      this.setState(({ largeCounter }) => ({
        largeCounter: newCount
      }));
      this.setState(({ allTickets }) => ({
        allTickets: newCount*2+this.state.smallCounter
      }));
    } else {
      let newCount = e.target.id.includes("inc") ? this.state.smallCounter + 1 : Math.max(this.state.smallCounter - 1, 0)
      this.setState(({ smallCounter }) => ({
        smallCounter: newCount
      }));
      this.setState(({ allTickets }) => ({
        allTickets: this.state.largeCounter*2+newCount
      }));
    }
  };
  ticketCounter = (e) => {
    if (this.state.allTickets <= this.state.customerTickets) {
      this.setState(({ customerTickets }) => ({
        customerTickets: customerTickets-=this.state.allTickets
      }));
    } else {
      alert("Not enough tickets!")
    }
  }
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
            <tr>
              <td className={styles.td} colspan="4">Tickets: {this.state.customerTickets}</td>
            </tr>
            <tr>
              <td className={styles.td}>Large</td>
              <td className={styles.td}><button className={styles.button} id="subLarge" onClick={this.mealCount}>-</button></td>
              <td className={styles.td} id="largeMeal">{this.state.largeCounter}</td>
              <td className={styles.td}><button className={styles.button} id="incLarge" onClick={this.mealCount}>+</button></td>
            </tr>
            <tr>
              <td className={styles.td}>Small</td>
              <td className={styles.td}><button className={styles.button} id="subSmall" onClick={this.mealCount}>-</button></td>
              <td className={styles.td} id="smallMeal">{this.state.smallCounter}</td>
              <td className={styles.td}><button className={styles.button} id="incSmall" onClick={this.mealCount}>+</button></td>
            </tr>
            <tr>
              <td className={styles.td} colspan="4">Total amount: {this.state.allTickets}</td>
            </tr>
            <tr>
                <td className={styles.td} colspan="4"><button className={styles.button} id="confirm" onClick={this.ticketCounter}>Confirm</button></td>
            </tr>
          </table>
          <div className={styles.grid}></div>
          <Navbar/>
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
