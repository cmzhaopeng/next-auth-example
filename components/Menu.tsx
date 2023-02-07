import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { selectNaviPath } from "../store/naviSlice";
import { Constants } from "../pages/util";

export type MenuProps = {
  name: string;
  privilegeType:string;
  privilegeContent: string;
  description: string;
  sort_no:number
}[];

//define the type of the session, which contain the type of user object and jwtToken
export type SessionProp = {
  privileges: MenuProps;
  jwtToken:string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  }
 
}

export default function Menu() {
  const router = useRouter();
  const [menu, setMenu] = useState([] as MenuProps);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const naviPath=useSelector(selectNaviPath);


  const handleGetUserPrivilege = async () => {
    try {
      //const res = await fetch("api/user/privilege/menu");
      //const data = await res.json();
      //console.log("api/user/privilege/menu");
      const privileges=(session as unknown as SessionProp).privileges;
      //filter the menu items in privileges
      const data=privileges.filter((item)=>item.privilegeType=="menu");
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

  let address=null;

  if(!session){

    return (
      <>
       <span></span> 
      </>
    )
  }



  if (session) {
    //handleGetUserPrivilege();

        address = (<Link href="/address">
        <div
          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            router.pathname == "/address"
              ? "bg-orange-100 text-orange-500"
              : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
          }`}
        >
          <div className="mr-2">
          <svg className="h-5 w-5 fill-current"  viewBox="0 0 24 24">
                    <path d="M6.776,4.72h1.549v6.827H6.776V4.72z M11.751,4.669c-0.942,0-1.61,0.061-2.087,0.143v6.735h1.53 		V9.106c0.143,0.02,0.324,0.031,0.527,0.031c0.911,0,1.691-0.224,2.218-0.721c0.405-0.386,0.628-0.952,0.628-1.621 		c0-0.668-0.295-1.234-0.729-1.579C13.382,4.851,12.702,4.669,11.751,4.669z M11.709,7.95c-0.222,0-0.385-0.01-0.516-0.041V5.895 		c0.111-0.03,0.324-0.061,0.639-0.061c0.769,0,1.205,0.375,1.205,1.002C13.037,7.535,12.53,7.95,11.709,7.95z M10.117,0 		C5.523,0,1.8,3.723,1.8,8.316s8.317,11.918,8.317,11.918s8.317-7.324,8.317-11.917S14.711,0,10.117,0z M10.138,13.373 		c-3.05,0-5.522-2.473-5.522-5.524c0-3.05,2.473-5.522,5.522-5.522c3.051,0,5.522,2.473,5.522,5.522 		C15.66,10.899,13.188,13.373,10.138,13.373z" />
                    </svg>

          </div>
          <div>
            <p>{Constants.ADDRESS_MENU}</p>
          </div>
        </div>
      </Link>
        )

  }



  return (
    <>

      { address} 
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
