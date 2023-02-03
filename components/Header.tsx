import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Menu from "./Menu";
import axios from "axios";
import { selectAuthState, setAuthState } from "../store/authSlice";
import { selectNaviPath } from "../store/naviSlice";
import { useDispatch, useSelector } from "react-redux";
import {Constants} from "../pages/util";

import { MenuProps } from "./Menu"




const Header: React.FC = () => {
  const router = useRouter();
  const [menu, setMenu] = useState([] as MenuProps);
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session, status } = useSession();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [gouser, setGouser] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
  const naviPath = useSelector(selectNaviPath);

  const handleGetUserPrivilege = async () => {
    try {
      const res = await fetch("/api/user/privilege/address");
      const data = await res.json();
      console.log("api/user/privilege/address");
      console.log(data);
      setMenu(data);
      setIsLoading(false);
    } catch (error) {
      //setError(error);
      setIsLoading(false);
    }
  };

  const handleGetgodata = async (para: string) => {
    //const res = await fetch("api/go", {
    //const res = await fetch("api/go", {});

    //const data2 = await res.json();

    //console.log(data2);
    //setGouser(data2.Gouser);
    //return data2;
  };

  useEffect(() => {
    //handleGetgodata("test-para");
    handleGetUserPrivilege();
  }, [session]);

  let left = (
    <div className="left">
      <Link href="/" className="bold" data-active={isActive("/")}>
        Feed
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link href="/" className="bold" data-active={isActive("/")}>
          Feed
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }
  if (!session) {
    right = <div className="right"></div>;
  }

  if (session) {
    left = (
      <div>
        {naviPath == "/" && (
          <div>
            <Link href="/" className="bold" data-active={isActive("/")}>
              Feed
            </Link>
            <span> | </span>
            <Link href="/drafts" data-active={isActive("/drafts")}>
              My drafts
            </Link>
            <span> | </span>
            <Link href="/create">
              <button>New post</button>
            </Link>
          </div>
        )}
        {naviPath=="/address" && (
          <div>
            <Link href="/address" className="bold" data-active={isActive("/address")}>
              {Constants.ADDRESS}
            </Link>
            <span> | </span>
            <Link href="/address/status" className="bold" data-active={isActive("/address/status")}>
              {Constants.ADDRESS_STATUS}
            </Link>
            <span> | </span>
            { menu.map((item) => (
              <>
                                      <Link key={item.name} href={item.privilegeContent} className="bold" data-active={isActive(item.privilegeContent)}>
              {item.name}
                </Link>
                 </>
          ))}

      </div>
    )}
      </div>);

  return (
    <nav>
      {left}
      {right}
    </nav>
  );
};
}
export default Header;
