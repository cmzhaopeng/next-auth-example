import React from "react";
import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridValueFormatterParams,
  GridSelectionModel,
} from "@mui/x-data-grid";

import Box from "@mui/material/Box";

export type AddressProps = {
  id: number;
  startAddress: string;
  endAddress: string;
  addressType: string;
  addressDescription: string;
  startIntAddress: string;
  endIntAddress: string;
  applicant: string;
  protocol: string;
  approver: string;
  createdAt: string;
  updatedAt: string;
  status: number;
};
function getCount(params: GridValueGetterParams) {
  return params.row.endIntAddress - params.row.startIntAddress + 1;
}

function getFormatDate(params: GridValueGetterParams) {
  if (!params.row.createdAt) {
    return "";
  }
  let date = new Date(params.row.createdAt);
  let formatDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  return formatDate;
}
function getFormatDateUpdated(params: GridValueGetterParams) {
  if (!params.row.updatedAt) {
    return "";
  }
  let date = new Date(params.row.updatedAt);
  let formatDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  return formatDate;
}
const columns: GridColDef[] = [
  {
    field: "status",
    headerName: "Status",
    width: 100,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      switch (params.value) {
        case 0:
          return "commit";
        case 1:
          return "approved";
        case 2:
          return "Written to Firewall";
        case 3:
          return "denied";
      }
    },
  },
  { field: "id", headerName: "ID", width: 70 },
  { field: "startAddress", headerName: "Start Address", width: 100 },
  { field: "endAddress", headerName: "End Address", width: 100 },
  {
    field: "addressCount",
    headerName: "Count",
    valueGetter: getCount,
    width: 20,
  },
  { field: "addressDescription", headerName: "Description", width: 150 },
  {
    field: "protocol",
    headerName: "Protocol",
    width: 100,
    type: "singleSelect",
    valueOptions: ["HTTP(S) ONLY", "ALL"],
  },
  { field: "applicant", headerName: "Applicant", width: 100 },
  { field: "approver", headerName: "Approver", width: 100 },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
    valueGetter: getFormatDate,
  },
];

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { addresses: [] } };
  }

  let name: string = "";
  if (session.user) {
    name = session.user.name as string;
  }

  let addressesPrisma = await prisma.address.findMany({
    where: {
      status: 0,
    },
    select: {
      id: true,
      startAddress: true,
      endAddress: true,
      addressType: true,
      addressDescription: true,
      startIntAddress: true,
      endIntAddress: true,
      applicant: true,
      protocol: true,
      approver: true,
      createdAt: true,
      updatedAt: true,
      status: true,
    },
  });
  //.then((data) =>{ data.createdAt.toISOString();return data;});
  //addresses?.createdAt = addresses?.createdAt.toISOString();

  let addresses: AddressProps[] = [];

  addressesPrisma.map((address) => {
    if (!address.updatedAt) {
      address.updatedAt = new Date(0);
    }

    let date = new Date(address.createdAt);
    let date2 = new Date(address.updatedAt);

    let addressProps: AddressProps = {
      id: address.id,
      startAddress: address.startAddress,
      endAddress: address.endAddress,
      addressType: address.addressType,
      addressDescription: address.addressDescription,
      startIntAddress: address.startIntAddress.toString(),
      endIntAddress: address.endIntAddress.toString(),
      applicant: address.applicant,
      protocol: address.protocol,
      approver: address.approver as string,
      createdAt: date.toString(),
      updatedAt: date2.toString(),
      status: address.status,
    };
    addresses.push(addressProps);

    return address;
  });

  //addresses=safeJsonStringify(addresses)

  //console.log("getServerSideProps");
  console.log(addresses);

  return {
    props: { addresses },
  };
};

type Props = {
  addresses: AddressProps[];
};

const AddressApprove: React.FC<Props> = (props) => {
  const { data: session } = useSession();
  const [rows, setRows] = React.useState(props.addresses);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  const handleApprove = () => {
    //set rows to approved for selected rows
    selectionModel
      .map((selectedId) => rows.find((item) => item.id === selectedId))
      .map((item) => {
        item.status = 1;
      });
    setRows(rows);
 
  };

  

  const handleDeny = () => {
    selectionModel
    .map((selectedId) => rows.find((item) => item.id === selectedId))
    .map((item) => {
      item.status = 3;
    });
  setRows(rows);
  
  };

  const handleCancel = () => {
    selectionModel
    .map((selectedId) => rows.find((item) => item.id === selectedId))
    .map((item) => {
      item.status = 0;
    });
  setRows(rows);
  
  };

  const saveToDatabase = async () => {

    axios({
        method: "post",
        url: "/api/addr/update",
        data: { rows },
      }).then((res)=>{
        console.log(res);
        let rowCommit=rows.filter((row)=>row.status===0);
        setRows(rowCommit);
      }).catch((err)=>{
        console.log(err);
      });


  };

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
          <Box sx={{ width: "100%" }}>
            <Stack direction="row" spacing={2}>
              <Button size="small" onClick={handleApprove}>
                Approve
              </Button>
              <Button size="small" onClick={handleDeny}>
                Deny
              </Button>
              <Button size="small" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="small" onClick={saveToDatabase}>
                Save to Database
              </Button>
            </Stack>

            <Box
              className="flex"
              sx={{
                height: 400,
                width: "100%",
                "& .super-app-theme--repeat": {
                  bgcolor: "#ff943975",
                },
                "& .super-app-theme--isnull": {
                  bgcolor: "#ff943975",
                },
              }}
            >
              <DataGrid
                rows={rows}
                className="flex"
                columns={columns}
                pageSize={5}
                checkboxSelection
                onSelectionModelChange={setSelectionModel}
                {...rows}
              />
            </Box>
          </Box>
      
        </main>
      </div>
    </Layout>
  );
};

export default AddressApprove;
