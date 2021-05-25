import Link from "next/link";
import { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar" id="myNavbar">
        <Link href={"/qr"}>QR</Link>
        {/* <Link href={"/refunds"}>Refunds</Link> */}
        <Link href={"/pictures"}>Pics</Link>
        <a
          onClick={() => {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.cookie =
              "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            window.location.href = "/login";
          }}
        >
          Logout
        </a>
      </div>
    );
  }
}

export default Navbar;
