import React from "react";
import Layout from "../../components/Layout"; 
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Post, { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import { convertLength } from "@mui/material/styles/cssUtils";
export type AddressProps = {
    id: number;
    startAddress: string;
    endAddress: string;
    addressType: string; 
    addressDescription: string;
    applicant: string;
    protocol: string;
    approver: string;
    createdAt: string;
   // updatedAt: Date;
    status: number;
  }

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { addresses: [] } };
  }

  const addresses = await prisma.address.findFirst({
    where: {
      applicant: session.user.name ,
    },
    select:{
        id: true,
        startAddress: true,
        endAddress: true,
        addressType: true,
        addressDescription: true,
        applicant: true,
        protocol: true,
        approver: true,
        createdAt: true,
        status: true,
    }
  }).then((data) =>{ data.createdAt.toString();return data;});

  console.log("getServerSideProps");
  console.log(addresses)

  return {
    props: { addresses },
  };
};

type Props = {
  addresses: AddressProps[];
};

const AddressStatus: React.FC<Props> = ( props ) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.addresses.map((address) => (
            <div key={address.id}>
                {address.startAddress}
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: var(--geist-background);
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
  );
};

export default AddressStatus;
