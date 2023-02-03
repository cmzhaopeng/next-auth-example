import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { selectNaviPath } from "../store/naviSlice";

export type MenuProps = {
  name: string;
  privilegeContent: string;
  description: string;
}[];

export default function Menu() {
  const router = useRouter();
  const [menu, setMenu] = useState([] as MenuProps);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const naviPath=useSelector(selectNaviPath);


  const handleGetUserPrivilege = async () => {
    try {
      const res = await fetch("api/user/privilege/menu");
      const data = await res.json();
      console.log("api/user/privilege/menu");
      console.log(data);
      setMenu(data);
      setIsLoading(false);
    } catch (error) {
      //setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetUserPrivilege();
  }, [session]);

  if (isLoading) return <p></p>;
  if (error) return <p></p>;

  let admin=null;

  if(!session){

    return (
      <>
       <span></span> 
      </>
    )
  }



  if (session) {
    //handleGetUserPrivilege();
    const isAdmin =
      session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (isAdmin) {
        admin = (<Link href="/admin">
        <div
          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            router.pathname == "/admin"
              ? "bg-orange-100 text-orange-500"
              : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
          }`}
        >
          <div className="mr-2">
            <UserIcon className="h-5 w-5" />
          </div>
          <div>
            <p>Account</p>
          </div>
        </div>
      </Link>
        )

  }
}


  return (
    <>

      {/* admin */} 
      {menu.map(
        (item) => (
          <div key={item.name}>
            <Link href={item.privilegeContent} key={item.name}>
              <div
                className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                  naviPath == item.privilegeContent
                    ? "bg-orange-100 text-orange-500"
                    : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
                }`}
              >
                <div className="mr-2">
                  <svg className="h-5 w-5 fill-current"  viewBox="0 0 24 24">
                    <path d={item.description} />
                    </svg>

                </div>
                <div>                
                  <p>{item.name}</p>
                </div>
              </div>
            </Link>
          </div>
        ),
        {
          /*
      {menu.map((item) => (
        <Link href={item.privilegeContent} key={item.name}>
          <button>{item.name}</button>
        </Link>
      ))}
  */
        }
      )}
    </>
  );
}
