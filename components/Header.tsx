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
      <style jsx>{`
        .bold {
          font-weight: bold;
        }
        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }
        .left a[data-active="true"] {
          color: gray;
        }
        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link href="/" className="bold" data-active={isActive("/")}>
          Feed
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
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
    const isAdmin =
      session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    left = (
      <div className="left">
        <Link href="/" className="bold" data-active={isActive("/")}>
          Feed
        </Link>
        <span> | </span>
        <Link href="/drafts" data-active={isActive("/drafts")}>
          My drafts
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email}-{gouser}
        </p>
        <Link href="/create">
          <button>New post</button>
        </Link>
        {isAdmin && (
          <Link href="/admin">
            <button>Admin</button>
          </Link>
        )}
        {/*
        <Menu />
        */}


        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
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

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
