// pages/admin.tsx

import React from "react";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";

type UserProps = {
    id: string;
    name: string;
    email: string;
    image: string;
  };

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { users: [] } };
  }

  const isAdmin= session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
  if (!isAdmin) {
    res.statusCode = 403;
    return { props: { users: [] } };
  }
  const users = await prisma.user.findMany({
  });
  return {
    props: { users },
  };
};

type Props = {
  users: UserProps[];
};

const Admin: React.FC<Props> = ( props ) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>Admin</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="page">
        <h1>Admin</h1>
        <main>
          {props.users.map((user) => (
            <div key={user.id} className="user">
              <h2>{user.name}</h2>
              <h2>{user.email}</h2>
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .page {
          max-width: 800px;
          margin: 0 auto;
        }
        .user {
          margin-bottom: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Admin;