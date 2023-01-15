import React from 'react'
import Link from "next/link";

export type MenuProps = {
    name: string;
    path: string;
    }[];


export default function Menu({menu}:{menu: MenuProps}) {
  
    return (
    <>
      {menu.map((item) => (
        <Link href={item.path} key={item.name}>
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
