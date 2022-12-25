import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import logo from "./image/logo.png";
import "./Navbar.css";
import { useSigner, useAccount } from "wagmi";

function Navbar() {
  return (
    <div>
      <header>
        <h3>
          <span style={{ color: "yellow", fontSize: "30px" }}> Track </span>{" "}
          Events
          <b style={{ fontSize: "33px", padding: "30px 15px", top: "60px" }}>
            📩
          </b>
        </h3>

        <ConnectButton />
      </header>
    </div>
  );
}

export default Navbar;
