import * as React from 'react';
import { DataGrid, GridColumns, GridRowsProp,GridRowModel} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import Button from "@mui/material/Button";
//import useStae from 'react';

export default function BasicEditingGrid() {
  const [crows,setCrows]=React.useState(rows);
  const [addRows, setAddRows]=React.useState([]);
  const [cid,setCid] = React.useState(6);
  const [updateRows, setUpdateRows] = React.useState([]);
  const handleAddRow = () => {
    const id=cid+1;
    setCid(id);
    const newRow={
      id: id,
      name: "new row",
      age:20,
      dateCreated: randomCreatedDate(),
      lastLogin: randomUpdatedDate(),
    };
    //setCrows((prevRows as GridRowsProp ))=[...prevRows,newRow];
    //crows.push(newRow);
    setCrows([...crows,newRow])
    setAddRows([...addRows,newRow]);
    console.log(addRows);
    //setCrows()
  };

  React.useEffect(()=>{

    console.log(addRows);

  },[addRows]);

  React.useEffect(()=>{
    console.log("updateRows effect");
    console.log(updateRows);

  },[updateRows])

  const handleSaveToDatabase = () =>{

    console.log("handle Save to Database!")
    console.log("addRows:")
    console.log(addRows)
    console.log("updateRows:")
    console.log(updateRows)


  };

  const processRowUpate = (newRow: GridRowModel) => {

   const element = crows.find(row => row.id===newRow.id);
   element.name=newRow.name;
   setCrows(crows);

   const foundAdd = addRows.find(row => row.id===newRow.id);
   if(foundAdd)
   {
      console.log("foundAdd, add element into addRows")
      foundAdd.name=newRow.name;
      setAddRows(addRows);
      return newRows;
   }

   const found = updateRows.find(row => row.id===newRow.id);
   if(found)
   {
     console.log("found, found the element in updateRows");
     found.name=newRow.name;
   } else {
     setUpdateRows([...updateRows,newRow]);
   }
   console.log(newRow);
   console.log("processRowUpdate");
   return newRow;

  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <Button onClick={handleAddRow}>
        Add Row
        </Button>
        <Button onClick={handleSaveToDatabase}>
          Save to Database
          </Button>
      <DataGrid
        rows={crows}
        columns={columns}
        processRowUpdate={processRowUpate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}

const columns: GridColumns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
];

const rows: GridRowsProp = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];
