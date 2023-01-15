import React from "react";
import Link from "next/link";
//define const menu object
const menu = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Menu() {
  return (
    <div>
      {menu.map((item) => (
       <Link href={item.path} key={item.name}>
          <button>{item.name}</button>
        </Link>
      ))}
    </div>
  );
}
