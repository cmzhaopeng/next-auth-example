// pages/admin.tsx

import React from "react";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import { UserProps } from "./api/user";
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
import { randomInt, randomUUID } from "crypto";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 270 },
  { field: "name", headerName: "Name", width: 130, editable: true },
  { field: "email", headerName: "Email", width: 130, editable: true },
  { field: "image", headerName: "Image", width: 130, editable: true },
];


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
  const [deleteRows, setDeleteRows] = React.useState([] as UserProps[]);

  const processRowUpdate =  (newRow: GridRowModel) => {
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

    setRows([...rows]);

    //if the row is in the addRows, update it in the addRows
    //return to avoid producing update operation to the database
    //it need not to be insert into the editRows
    const foundAdd = addRows.find((row) => row.id === newRow.id);
    if (foundAdd) {
      foundAdd.name = newRow.name;
      foundAdd.email = newRow.email;
      foundAdd.image = newRow.image;

      setAddRows([...addRows]);
      return newRow;
    } 

    //if the row is in the editRows, update it in the editRows
      const found = editRows.find((row) => row.id === newRow.id);
      if (found) {
        found.name = newRow.name;
        found.email = newRow.email;
        found.image = newRow.image;
        setEditRows([...editRows]);
      } else {
        setEditRows([...editRows, newRow as UserProps]);
      }
      return newRow;
  };

  const handleAddRow = () => {
    const uid = cuid();
    const newRow = {
      id: uid,
      name: "User"+uid.slice(-5),
      email: uid.slice(-5)+"@139.com",
      image: "NewImage",
    };
    setRows([...rows, newRow]);
    setAddRows([...addRows, newRow]);
  };

  const handleDeleteRow = () => {
    //delete the selected rows
    const newRows = rows.filter((row) => !selectedRowData.includes(row));
    setRows(newRows);

    //if the selected rows are in the addRows, remove them from addRows
    const len = addRows.length
    const newAddRows = addRows.filter((row) => !selectedRowData.includes(row));
    setAddRows(newAddRows);
    //if the selected rows are not in the addRows and have been detected, return because it need not to be insert into the deleteRows
    //it reduces the operation of the database
    if (len !== newAddRows.length) return;
    //else remove from the editRows and add to the deleteRows, reduce the operation of the database
    const newEditRows = editRows.filter((row) => !selectedRowData.includes(row));
    setEditRows(newEditRows);
    setDeleteRows([...deleteRows, ...selectedRowData]); 

  };

  React.useEffect(() => {
    console.log("useEffect:addRows")
    console.log(addRows);
  }, [addRows]);

  React.useEffect(() => {
    console.log("useEffect:editRows")
    console.log(editRows);
  }, [editRows]);

  React.useEffect(() => {
    console.log("useEffect:deleteRows")
    console.log(deleteRows);
  }, [deleteRows]);

  const handleReloadRows = async () => {

    try{
       const users = await fetch("api/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        });
        const data = await users.json();
        console.log("Get from database:")
        console.log(data);

        setRows(data);
        setAddRows([]);
        setEditRows([]);
        setDeleteRows([]);
    }catch(err){
      console.log(err);
    }
  };


  const handleSaveToDatabase = async () => {
    try {
      
      if(addRows.length > 0){
        const users= addRows
        const body = { users };
        await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        setAddRows([]);
      }

      if(editRows.length > 0){
        const users = editRows
        const body = { users };
        await fetch("/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        setEditRows([]);
      }

      if(deleteRows.length > 0){
        const users = deleteRows
        const body = { users };
        await fetch("/api/user", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        setDeleteRows([]);
      }
      console.log("Edit rows:");
      console.log(editRows);
      console.log("Add rows:");
      console.log(addRows);
      console.log("Delete rows:");
      console.log(deleteRows);
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
              <Button size="small" onClick={handleDeleteRow}>
                Delete a Row
                </Button>
              <Button size="small" onClick={handleSaveToDatabase}>
                Save to Database
              </Button>
              <Button size="small" onClick={handleReloadRows}>
                Reload Rows
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
                  //submitData();
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
