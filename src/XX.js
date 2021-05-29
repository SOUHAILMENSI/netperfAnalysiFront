import React, { useState } from "react";
import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";
import Appc from "./stat/Appc";
import "bootstrap/dist/css/bootstrap.min.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function XX() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [head, setHead] = useState([]);
  const [value1, setValue1] = useState([]);
  const [head1, setHead1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: c,
    }));
    let obj = {};
    let obj1 = {};
    for (let i = 0; i < list.length; i++) {
      if (list[i]["System"] === "GSM" && list[i]["CELL ID"]) {
        if (obj[list[i]["CELL ID"]]) {
          obj[list[i]["CELL ID"]] =
            (obj[list[i]["CELL ID"]] + parseInt(list[i]["Rx Level"])) / 2;
        } else {
          obj[list[i]["CELL ID"]] = parseInt(list[i]["Rx Level"]);
        }
      }

      if (list[i]["System"] === "GSM" && list[i]["Band"]) {
        if (obj1[list[i]["Band"]]) {
          obj1[list[i]["Band"]]++;
        } else {
          obj1[list[i]["Band"]] = 1;
        }
      }
    }
    var head = [];
    var value = [];
    Object.keys(obj).forEach((x) => {
      head.push(x);
      value.push(obj[x]);
    });
    var head1 = [];
    var value1 = [];
    Object.keys(obj1).forEach((x) => {
      head1.push(x);
      value1.push(obj1[x]);
    });
    console.log(value1, head1);
    setHead1(head1);
    setValue1(value1);
    setHead(head);
    setValue(value);
    setLoading(true);
    setData(list);
    setColumns(columns);
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="position-relative m-5">
            <div class="input-group mb-3">
              <div class="custom-file">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  id="inputGroupFile"
                />
                <label class="custom-file-label" for="inputGroupFile">
                  Upload measurement file here
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col">
              <Tabs
                id="controlled-tab-example"
                selectedIndex={tabIndex}
                onSelect={(k) => setTabIndex(k)}
              >
                <Tab eventKey="gsm" title="GSM">
                  {loading ? (
                    <Appc head={head} value={value} />
                  ) : (
                    <div>There are no records to display</div>
                  )}
                </Tab>
                <Tab eventKey="umts" title="UMTS">
                  <DataTable
                    pagination
                    highlightOnHover
                    columns={columns}
                    data={data}
                  />
                </Tab>
                <Tab eventKey="lte" title="LTE">
                  {loading ? (
                    <>
                      <Appc head={head} value={value} label={"GSM BAND"} bar={true}/>
                      <Appc head={head1} value={value1} label={"GSM BAND"} pie={true}/>
                    </>
                  ) : (
                    <div>There are no records to display</div>
                  )}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default XX;
