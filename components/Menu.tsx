import React from 'react'
import { useState, useEffect } from 'react'
import Link from "next/link";

export type MenuProps = {
  name: string;
  path: string;
}[];


export default function Menu() {

  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGetUserPrivilege = async () => {
    try {
      const res = await fetch("api/user/privilege/menu");
      const data = await res.json();
      console.log("api/user/privilege/menu")
      console.log(data);
      setMenu(data)
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }

  }

  useEffect(() => {
    handleGetUserPrivilege();
  }, []);

  if(isLoading)
    return <p>Loading...</p>
  if(error)
    return <p>Error: {error.message}</p>

  return (
    <>
      {menu.map((item) => (
        <Link href={item.privilegeContent} key={item.name}>
          <button>{item.name}</button>
        </Link>
      ))}
      <style jsx> {`
      button{
        border:none;
      }
      `}
      </style>
    </>

  );
}
