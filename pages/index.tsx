import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"

import LoginBtn from '../components/login-btn'

import  prisma from '../lib/prisma'

const inter = Inter({ subsets: ['latin'] })

export const getStaticProps: GetStaticProps = async () => {
  const feed =  await prisma.post.findMany({
    where: {published:true},
    include:{
      author: {
        select: { name: true},
      },
    },
    
    
  });
  return { 
    props: { feed }, 
    revalidate: 10, 
  };
};

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <>
      <Layout>
        <div className="page">
<h1>Public Feed</h1>

      <main className={styles.main}>
        <div className={styles.description}>
          <LoginBtn />
        </div>
         {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
      </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }
        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
        .post + .post {
          margin-top: 2rem;
        }
      `}</style>

      </Layout>
    </>
  )
}

export default Blog