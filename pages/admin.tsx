// pages/admin.tsx

import React from "react";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRowModel,
  GridRowId,
  GridCellModes,
  GridCellModesModel,
  GridEventListener,
} from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import cuid from "cuid";
import Alert, { AlertProps } from "@mui/material/Alert";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 270 },
  { field: "name", headerName: "Name", width: 130, editable: true },
  { field: "email", headerName: "Email", width: 130, editable: true },
  { field: "image", headerName: "Image", width: 130, editable: true },
];

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

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  if (!isAdmin) {
    res.statusCode = 403;
    return { props: { users: [] } };
  }
  const users = await prisma.user.findMany({});
  return {
    props: { users },
  };
};

type Props = {
  users: UserProps[];
};

const Admin: React.FC<Props> = (props) => {
  const { data: session } = useSession();
  const [selectedRowData, setSelectedRowData] = React.useState(
    [] as UserProps[]
  );
  const [rows, setRows] = React.useState(props.users);
  const [editRows, setEditRows] = React.useState([] as UserProps[]);
  const [addRows, setAddRows] = React.useState([] as UserProps[]);

  const processRowUpdate = React.useCallback(async (newRow: GridRowModel) => {
    // Make the HTTP request to save in the backend
    /* const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      return response;*/

    // Update the rows in the grid
    const fr = rows.find((row) => row.id === newRow.id);
    if (fr) {
      fr.name = newRow.name;
      fr.email = newRow.email;
      fr.image = newRow.image;
    }


    const foundAdd = addRows.find((row) => row.id === newRow.id);
    if (foundAdd) {
      foundAdd.name = newRow.name;
      foundAdd.email = newRow.email;
      foundAdd.image = newRow.image;
    } else {
      const found = editRows.find((row) => row.id === newRow.id);
      if (found) {
        found.name = newRow.name;
        found.email = newRow.email;
        found.image = newRow.image;
      } else {
        editRows.push(newRow as UserProps);
      }
      setEditRows(editRows);
    }
    return newRow;
  }, []);

  const handleAddRow =  () => {
    const uid = cuid();
    const newRow = {
      id: uid,
      name: "New User",
      email: "New Email",
      image: "New Image",
    };
    setRows((prevRows) => [...prevRows, newRow]);
    setAddRows((prevAddRows) => [...prevAddRows, newRow]);
    // addRows.push(newRow);
    // setAddRows(addRows);
  };

  const handleSaveToDatabase = async () => {
    console.log(editRows);
    console.log(addRows);

    try {
      console.log(addRows);
    } catch (error) {
      console.error(error);
    }
  };

  const submitData = async () => {
    try {
      /*  const body = { title, content };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
      */
      //  await console.log(selectedRowData);
    } catch (error) {
      console.error(error);
    }
  };

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
          {/*  
          {props.users.map((user) => (
            <div key={user.id} className="user">
              <h2>{user.name}</h2>
              <h2>{user.email}</h2>
            </div>
          ))}
          */}

          <Box sx={{ width: "100%" }}>
            <Stack direction="row" spacing={2}>
              <Button size="small" onClick={handleAddRow}>
                Add a Row
              </Button>
              <Button size="small" onClick={handleSaveToDatabase}>
                Save to Database
              </Button>
            </Stack>
            <Box sx={{ height: 400, mt: 1 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                onSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRowData1 = rows.filter((row) =>
                    selectedIDs.has(row.id.toString())
                  );
                  setSelectedRowData(selectedRowData1);
                  //console.log(selectedRowData);
                  submitData();
                }}
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Box>
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
