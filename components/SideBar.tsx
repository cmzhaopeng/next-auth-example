import { forwardRef } from "react";
import Link from "next/link";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Menu from "./Menu";
import { useDispatch,useSelector } from "react-redux";
import {selectNaviPath} from "../store/naviSlice";

interface Props {
  showNav:boolean;
}

export type Ref=HTMLDivElement;

const SideBar = forwardRef<Ref,Props>(({showNav}, ref) => {
  const router = useRouter();
  //const dispatch=useDispatch();

  return (
    <div ref={ref} className="top-0 z-40 fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-32 h-auto"
            src="/ferox-transparent.png"
            alt="company logo"
          />
        </picture>
      </div>

      <div className="flex flex-col">
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              useSelector(selectNaviPath) == "/"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Home</p>
            </div>
          </div>
        </Link>
       {/*
        <Link href="/address">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              useSelector(selectNaviPath)  == "/address"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Address</p>
            </div>
          </div>
        </Link>
        */}   
        <Menu />
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;