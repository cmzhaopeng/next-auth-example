import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Menu from "./Menu";
import axios from "axios";

const menu = [

  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]


const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;
  const { data: session, status } = useSession();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [gouser, setGouser] = React.useState(null);


  const handleGetgodata = async (para:string) => {
    //const res = await fetch("api/go", {
    const res = await fetch("api/go", {
    });

    const data2 = await res.json();

    console.log(data2);
    setGouser(data2.Gouser)
    return data2;
  };
  
  useEffect(() => {
    handleGetgodata("test-para");
  }, []);


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
    right = (
      <div className="right">
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }


  if (session) {
    left = (
      <div className="left">
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
    );
  }

  return (
    <nav>
      {left}
      {right}
    </nav>
  );
};

export default Header;
