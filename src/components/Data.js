import React, { useState } from "react";
import "./Data.css"
import * as PushAPI from "@pushprotocol/restapi";
import { useSigner, useAccount } from "wagmi";
import axios from "axios";
function Data() {
      const { data: signer, isError, isLoading } = useSigner();
      const { address } = useAccount();
  const [addr, setAddr] = useState("");
  const [hash, setHash] = useState("");
  const [event, setEvent] = useState("");
   async function Subscribe() {
     await PushAPI.channels.subscribe({
       signer: signer,
       channelAddress:
         "eip155:80001:0x9147BDf9aaca01B5f2680633e254a9776ecB10e5", // channel address in CAIP
       userAddress: `eip155:80001:${address}`, // user address in CAIP
       onSuccess: () => {
         console.log("opt in success");
       },
       onError: () => {
         console.error("opt in error");
       },
       env: "staging",
     });
     const baseURL = `https://expensive-tiara-colt.cyclic.app/user/add-user-details`;
     const data = JSON.stringify({
       walletAddress: address,
       name: "demoname",
     });
     const config = {
       method: "post",
       url: baseURL,
       headers: {
         "Content-Type": "application/json",
       },
       data: data,
     };
     let response = await axios(config);
     console.log(response);
   }
 function submitHandler(event) {
   event.preventDefault();

   const contestData = {
     address: addr,
     hash: hash,
     event: event,
   };
 }
  return (
    <div className="wrapper flex_box">
      <h1 className="heads">Enter contract details</h1>
      <form onSubmit={submitHandler}>
        <div className="input">
          <input
            type="text"
            className="input"
            value={addr}
            placeholder="Enter contract address"
            onChange={(e) => {
              setAddr(e.target.value);
            }}
          />
          <input
            type="text"
            className="input"
            value={hash}
            placeholder="Enter event hash"
            onChange={(e) => {
              setHash(e.target.value);
            }}
          />{" "}
          <input
            type="text"
            className="input"
            value={event}
            placeholder="Enter event ABI"
            onChange={(e) => {
              setEvent(e.target.value);
            }}
          />
        </div>
      </form>
      <button className="btns" onClick={Subscribe}>
        Subscribe
      </button>
      {/* <div class="cover"></div> */}
    </div>
  );
}

export default Data;
