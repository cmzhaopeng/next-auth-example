import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { selectAuthState, setAuthState } from "../../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
const addressList: string[] = [
  "8.8.8.8",
  "192.168.1.0/24",
  "114.114.114.144-114.114.114.116",
  "235.235.235.5-7",
];

import { selectNaviPath, setNaviPath } from "../../store/naviSlice";
import { NaviPath } from "./../../store/naviSlice";

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
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  dispatch(setNaviPath("/address"));
  console.log("naviPath:");
  console.log(useSelector(selectNaviPath));

  //add a form handle function, when submit the form, call the handleAddressList function
  const handleAddressList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //const target = e.target as typeof e.target & {
    //  addressList: { value: string };
    // };
    const addressList = input; //target.addressList.value;
    //convert the addressList to array, one line one item
    var addressListArray = addressList.split("\n");
    //call the convertAddressList function to convert the addressListArray to addressTable
    convertAddressList(addressListArray);
  };

  const handleInsertToDatabase = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "/api/addr/insert",
      data: { addressTable },
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
        ipStr = ipStr + "Error ip format" + item;
      }
    });
    console.log(addr);
    setInfo(ipStr);
    axios({
      method: "post",
      url: "/api/addr",
      data: { addr },
    })
      .then((res) => {
        console.log(res);
        console.log("res.data");
        console.log(res.data);
        setAddressTable(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="flex border-b border-gray-200 space-x-3 ">
        <img src="/ip.png" alt="ip" className="h-11 w-11 " />

        <div className="w-full divide-y divide-gray-200">
          <div className="">
            <textarea
              className="w-full border-none focus:ring-0 text-lg placeholder-gray-300 tracking-wide min-h-[50px] text-gray-700 focus:outline-none "
              name="addressList"
              id="addressList"
              rows={4}
              placeholder={addressFormat}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-between pt-2.5">
            <button
              className="bg-orange-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:bg-orange-300"
              onClick={handleAddressList}
            >
              {" "}
              Verify IP Address{" "}
            </button>
            <button
              className="bg-orange-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:bg-orange-300"
              onClick={handleInsertToDatabase}
            >
              insert to database
            </button>
          </div>
          {/*
          <p>{addressList}</p>
           */}
        </div>
        { info!=="" &&
        <div className="bg-orange-300 rounded w-124 text-gray font-bold shadow-md hover:bg-orange-300"  >
           <div className="pt-1 text-left space-y-4">
          <p className="p-8" 
          onClick={() => setInfo("")}>{info}</p>
        </div>
        </div>
         } 
      </div>
    </>
  );
}
