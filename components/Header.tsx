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

  const handleGetUser = async () => {
        const res = await fetch("api/user/clcyfctkm0004utv4xbv39dpw");
        const data = await res.json();
        console.log("api/user/clcyfctkm0004utv4xbv39dpw")
        console.log(data.email);
        const res2 = await fetch("api/user/privilege/mtest1");
        const data2 = await res2.json();
        console.log("api/user/privilege/mtest1")
        console.log(data2.email);
  }


  const handleGetgodata = async (para:string) => {
    //const res = await fetch("api/go", {
    const res = await fetch("http://localhost:8080/home", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGluZ0AxMzkuY29tIiwidXNlciI6dHJ1ZSwiZXhwIjoxNjczODc2MDgyLCJpYXQiOjE2NzM2MTY4ODIsImlzcyI6IkJpa2FzaCJ9.Zx0PHYnvUNJwuOzU4oAFtBqONwgEs5p-bY3oICnUXKw",
      },
    });

    const data2 = await res.json();

    console.log(data2);
    setGouser(data2.Gouser)
    return data2;
  };

  
  useEffect(() => {
    handleGetgodata("test-para");
    handleGetUser();
  }, []);

  /*
   const [mydata, setMydata] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/home", {
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGluZ0AxMzkuY29tIiwidXNlciI6dHJ1ZSwiZXhwIjoxNjczODc2MDgyLCJpYXQiOjE2NzM2MTY4ODIsImlzcyI6IkJpa2FzaCJ9.Zx0PHYnvUNJwuOzU4oAFtBqONwgEs5p-bY3oICnUXKw",
      },
      mode: 'no-cors',
      credentials: 'include',
    })
    .then(res => console.log(res))
    .catch(error => console.log(error));
  }, []);

  */

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
        <Link href="/api/auth/signin" data-active={isActive("/signup")}>
          Log in
        </Link>
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
        <Menu menu={menu}/>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
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
