import React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const addressList: string[] = [
  "8.8.8.8",
  "192.168.1.0/24",
  "114.114.114.144-114.114.114.116",
  "235.235.235.5-7",
];

const addressFormat =
  "8.8.8.8\n192.168.1.0/24\n114.114.114.144-114.114.114.116\n235.235.235.5-7";

export type AddressProps = {
  id: number;
  startAddress: string;
  endAddress: string;
  description: string;
  startIntAddress: number;
  endIntAddress: number;
  applicant: string;
  protocol: string;
  isRepeat: boolean;
}[];

export default function Address() {
  const [addressTable, setAddressTable] = useState<AddressProps>([]);
  const [info, setInfo] = useState<string>("");

  //add a form handle function, when submit the form, call the handleAddressList function
  const handleAddressList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      addressList: { value: string };
    };
    const addressList = target.addressList.value;
    //convert the addressList to array, one line one item
    var addressListArray = addressList.split("\n");
    //call the convertAddressList function to convert the addressListArray to addressTable
    convertAddressList(addressListArray);
  };

  const handleInsertToDatabase = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    /*
    try {
      const body = { addressTable };

        const res = await fetch("/api/addr/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    */
    /*
      const parseRes = await res.json();
      setAddressTable(parseRes);
      console.log("parseRes");
      console.log(parseRes);
      */
    /*
    } catch (error) {
      console.error(error);
    }

  */

    axios({
      method: "post",
      url: "/api/addr/insert",
      data: {addressTable},
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const convertAddressList = async (addressList: string[]) => {
    var ip = require("ip");
    var ipStr = "";
    var addr = [] as AddressProps;
    addressList.map((item) => {
      //replace item's space to empty
      item = item.replace(/\s+/g, "");
      //replace item's char, '~' with '-'
      item = item.replace(/~/g, "-");
      //replace item's char, '～' with '-'
      item = item.replace(/～/g, "-");
      //replace item's char, ':' with '-'
      item = item.replace(/:/g, "-");

      //accord to item string format, split it to startAddress and endAddress
      var startAddress = "";
      var endAddress = "";
      var mask = "";
      if (item.indexOf("-") > 0) {
        startAddress = item.split("-")[0];
        endAddress = item.split("-")[1];
        //if the endAddress have only have one int, add the last int of startAddress to it
        if (endAddress.split(".").length < 3) {
          // get the startAddress 0 to 2 int, add the endAddress to it
          endAddress =
            startAddress.split(".")[0] +
            "." +
            startAddress.split(".")[1] +
            "." +
            startAddress.split(".")[2] +
            "." +
            endAddress;
        }
        // if the item's format is ip/mask, split it to startAddress and endAddress
      } else if (item.indexOf("/") > 0) {
        startAddress = item.split("/")[0];
        mask = item.split("/")[1];
        // if mask's format is like 255.255.255.0, convert it to 24
        if (mask.indexOf(".") > 0) {
          startAddress = ip.subnet(startAddress, mask).firstAddress;
          endAddress = ip.subnet(startAddress, mask).lastAddress;
        } else {
          startAddress = ip.cidrSubnet(item).firstAddress;
          endAddress = ip.cidrSubnet(item).lastAddress;
        }
      } else {
        startAddress = item;
        endAddress = item;
      }

      if (ip.isV4Format(startAddress) && ip.isV4Format(endAddress)) {
        addr.push({
          id: addr.length,
          startAddress: startAddress,
          endAddress: endAddress,
          description: "",
          startIntAddress: ip.toLong(startAddress),
          endIntAddress: ip.toLong(endAddress),
          applicant: "",
          protocol: "HTTP(S) ONLY",
          isRepeat: true,
        });
      } else {
        //add the ip format error to ipStr to show
        ipStr = ipStr + "error ip format" + item;
      }
    });
    console.log(addr);
    setInfo(ipStr);
  /*
    try {
      const body = { addr };
      const res = await fetch("/api/addr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await res.json();
      setAddressTable(parseRes);
      console.log("parseRes");
      console.log(parseRes);
    } catch (error) {
      console.error(error);
    }
    */
//    var dataTable = [] as AddressProps;
    axios({
      method: "post",
      url: "/api/addr",
      data: {addr},
    })
      .then((res) => {
        console.log(res);
        console.log("res.data"); 
        console.log(res.data);
        setAddressTable(res.data);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );





  };

  useEffect(() => {}, []);

  return (
    <Layout>
      {/* add a form with a textarea to input the ip address list and a submit button */}
      <form onSubmit={handleAddressList}>
        <textarea
          name="addressList"
          id="addressList"
          cols={30}
          rows={10}
          placeholder={addressFormat}
        ></textarea>
        <button type="submit">submit</button>
        <button onClick={handleInsertToDatabase}>insert to database</button>
      </form>

      <p>{addressList}</p>
      <div>
        <label onClick={() => setInfo("")}>{info}</label>
      </div>
    </Layout>
  );
}
