import Link from "next/link"
import { Component } from "react"

class Navbar extends Component{
    render(){
        return(
            <div class="navbar" id="myNavbar">
            <Link href={'/qr'}>QR</Link>
            <Link href={'/coupons'}>Coupons</Link>
            <Link href={'/refunds'}>Refunds</Link>
            <Link href={'/pictures'}>Pics</Link>
            <Link href={'/pictures'}>Logout</Link>
          </div>
        )
    }
}

export default Navbar