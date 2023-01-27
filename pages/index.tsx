import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";

import { selectAuthState, setAuthState } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

import LoginBtn from "../components/login-btn";

import prisma from "../lib/prisma";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  return (
    <>
      <Layout>
        <div className="page">
          <h1 className="text-3xl font-bold underline">Public Feed</h1>
        <div>  

          {/*}
       <Link href="/" className="bold" data-active={authState}>
          Feed
        </Link>
        <span> | </span>
        <Link href="/drafts" data-active={authState}>
          My drafts
        </Link>
        <span> | </span>
        <Link href="/create" data-active={authState}>
          New Post
        </Link>
  */}

        </div>


          <main className={styles.main}>
            {props.feed.map((post) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))}
          </main>
        </div>
          {/*}
        <div>

          <div>{authState ? "Logged in" : "Not Logged In"}</div>
          <button
            onClick={() =>
              authState
                ? dispatch(setAuthState(false))
                : dispatch(setAuthState(true))
            }
          >
            {authState ? "Logout" : "LogIn"}
          </button>
        </div>
        */}

      </Layout>
    </>
  );
};

export default Blog;
