import React from "react";
import Layout from "../../components/Layout"; 
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { convertLength } from "@mui/material/styles/cssUtils";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

import Box from "@mui/material/Box";



export type AddressProps = {
    id: number;
    startAddress: string;
    endAddress: string;
    addressType: string; 
    addressDescription: string;
    startIntAddress:number;
    endIntAddress:number;
    applicant: string;
    protocol: string;
    approver: string;
    createdAt: Date;
    updatedAt: Date;
    status: number;
  }
  function getCount(params: GridValueGetterParams) {
    return params.row.endIntAddress-params.row.startIntAddress+1;
  };
  
  function getFormatDate(params:GridValueGetterParams) {
    if(!params.row.createdAt){
      return '';
    }
    let date= new Date(params.row.createdAt);
    let formatDate = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
    return formatDate;
  }
  function getFormatDateUpdated(params:GridValueGetterParams) {
    if(!params.row.updatedAt) {
      return '';
    }
    let date= new Date(params.row.updatedAt);
    let formatDate = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
    return formatDate;
  }
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "startAddress", headerName: "Start Address", width: 100 },
  { field: "endAddress", headerName: "End Address", width: 100 },
  { field: "addressCount", headerName: "Count", 
    valueGetter:getCount,width: 20 },
  { field: "addressDescription", headerName: "Description", width: 150},
  { field: "protocol", headerName: "Protocol", width: 100 ,
    type:"singleSelect", 
    valueOptions:["HTTP(S) ONLY","ALL"] },
    {field:"applicant",headerName:"Applicant",width:100},
    {field:"approver",headerName:"Approver",width:100},
    {field:"createdAt",headerName:"Created At",width:150,
    valueGetter:getFormatDate,
     },
    {field:"updatedAt",headerName:"updated At",width:150,
    valueGetter:getFormatDateUpdated,
  },
    {field:"status",headerName:"Status",width:150,
    valueFormatter:(params:GridValueFormatterParams<number>)=>{
      switch(params.value) {
         case 0:
          return 'commit';
         case 1:
          return 'approved';
         case 2:
          return 'Written to Firewall';
      }
      },
    },
];

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { addresses: [] } };
  }

  let addresses = await prisma.address.findMany({
    where: {
      applicant: session.user.name ,
    },
    select:{
        id: true,
        startAddress: true,
        endAddress: true,
        addressType: true,
        addressDescription: true,
        startIntAddress:true,
        endIntAddress:true,
        applicant: true,
        protocol: true,
        approver: true,
        createdAt: true,
        status: true,
    }
  });
  //.then((data) =>{ data.createdAt.toISOString();return data;});
  //addresses?.createdAt = addresses?.createdAt.toISOString();

  
  addresses.map(address => {
    address.createdAt = Date(Math.floor(address.createdAt/1000));
    address.updateAt = Date(Math.floor(address.updateAt/1000));
    address.startIntAddress=address.startIntAddress.toString();
    address.endIntAddress=address.endIntAddress.toString();
    return address
  });

  //addresses=safeJsonStringify(addresses)
  
  //console.log("getServerSideProps");
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
  const [rows,setRows] = React.useState(props.addresses);
  

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
            <main>  
        <Box className="flex" sx={{height: 400, width: '100%',
         '& .super-app-theme--repeat': {
          bgcolor: '#ff943975',
        },
         '& .super-app-theme--isnull': {
          bgcolor: '#ff943975',
        }
      
      
      }}>
        <DataGrid
          className="flex"
          rows={rows}
          columns={columns}
          pageSize={5}
        
          />

      </Box>
        </main>
      </div>

    </Layout>
  );
};

export default AddressStatus;
