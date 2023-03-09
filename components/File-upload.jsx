import { useState } from "react";

import { readFile, read, utils, writeFileXLSX } from "xlsx";


export default function PrivatePage(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [xlsxData, setXlsxData] = useState(null);


   // import xlsx file data, ref: https://docs.sheetjs.com/docs/solutions/input
  const readXLSX = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      const data = await i.arrayBuffer();
      var workbook = read(data);

      var sheet_name_list = workbook.SheetNames;
      var xlData = utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      console.log(xlData);
      setXlsxData(xlData);
    }
  };
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/file", {
      method: "POST",
      body
    });
  };

  return (
    <div>

      <div>
       
        <h4>Select XLSX File</h4>
        <input type="file" name="myXlsx" onChange={readXLSX} />
      </div>
      <div>
        <img src={createObjectURL} />
        <h4>Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </div>

    </div>
  );
}