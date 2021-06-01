import React, { useState } from "react";
import * as XLSX from "xlsx";
import Appc from "../stat/Appc";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";

function QoeChartApp() {
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  let [browsingchartDisplay, setBrowsingChartDisplay] = useState([]);
  let [youtubechartDisplay, setYoutubeChartDisplay] = useState([]);
  let [speedchartDisplay, setSpeedChartDisplay] = useState([]);

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

    let obj = {};
    let obj1 = {};
    let obj2 = {};
    let obj3 = {};
    let obj4 = {};
    let obj5 = {};
    let obj6 = {};
    let objyoutube1 = {};
    let objyoutube2 = {};
    let objyoutube3 = {};
    let objyoutube4 = {};
    let array1 = [];
    let array2 = [];
    let objcounter = {};

    for (let i = 0; i < list.length; i++) {
      // Browsing calculation

      if (list[i]["Service"] === "HTTP browsing") {
        if (obj2[list[i]["Service"]]) {
          obj2[list[i]["Service"]]++;
        } else {
          obj2[list[i]["Service"]] = 1;
        }
      }

      if (list[i]["Service"] === "HTTP browsing") {
        if (obj3[list[i]["Service"]]) {
          obj3[list[i]["Service"]] =
            obj3[list[i]["Service"]] + parseInt(list[i]["Page load time"]);
        } else {
          obj3[list[i]["Service"]] = parseInt(list[i]["Page load time"]);
        }
      }

      if (list[i]["Service"] === "HTTP browsing" && list[i]["Host"]) {
        if (obj4[list[i]["Host"]]) {
          obj4[list[i]["Host"]]++;
        } else {
          obj4[list[i]["Host"]] = 1;
        }
      }

      if (list[i]["Service"] === "HTTP browsing" && list[i]["Host"]) {
        if (obj5[list[i]["Host"]]) {
          objcounter[list[i]["Host"]]++;

          obj5[list[i]["Host"]] =
            obj5[list[i]["Host"]] + parseInt(list[i]["Page load time"]);
        } else {
          obj5[list[i]["Host"]] = parseInt(list[i]["Page load time"]);
          objcounter[list[i]["Host"]] =1;
        }
      }

      // Youtube calculation

      if (list[i]["Service"] === "Streaming") {
        if (objyoutube1[list[i]["Service"]]) {
          objyoutube1[list[i]["Service"]]++;
        } else {
          objyoutube1[list[i]["Service"]] = 1;
        }
      }

      if (list[i]["Service"] === "Streaming") {
        if (objyoutube2[list[i]["Service"]]) {
          objyoutube2[list[i]["Service"]] =
            objyoutube2[list[i]["Service"]] +
            parseInt(list[i]["Time to 1st picture"]);
        } else {
          objyoutube2[list[i]["Service"]] = parseInt(
            list[i]["Time to 1st picture"]
          );
        }
      }

      if (list[i]["Service"] === "Streaming") {
        if (objyoutube3[list[i]["Service"]]) {
          objyoutube3[list[i]["Service"]] =
            objyoutube3[list[i]["Service"]] +
            parseInt(list[i]["Video load delay"]);
        } else {
          objyoutube3[list[i]["Service"]] = parseInt(
            list[i]["Video load delay"]
          );
        }
      }

      if (list[i]["Service"] === "Streaming") {
        if (objyoutube4[list[i]["Service"]]) {
          objyoutube4[list[i]["Service"]] =
            objyoutube4[list[i]["Service"]] +
            parseInt(list[i]["Video start delay"]);
        } else {
          objyoutube4[list[i]["Service"]] = parseInt(
            list[i]["Video start delay"]
          );
        }
      }

      //App throughput calculation

      if (list[i]["Service"] === "HTTP transfert") {
        if (obj[list[i]["Service"]]) {
          obj[list[i]["Service"]]++;
        } else {
          obj[list[i]["Service"]] = 1;
        }
      }

      if (list[i]["Service"] === "HTTP transfert") {
        if (obj1[list[i]["Service"]]) {
          obj1[list[i]["Service"]] =
            obj1[list[i]["Service"]] +
            parseInt(list[i]["Avg throughput"]);
        } else {
          obj1[list[i]["Service"]] = parseInt(list[i]["Avg throughput"]);
        }
      }

      if (list[i]["Service"] === "HTTP transfert" && list[i]["Status"]) {
        if (obj6[list[i]["Status"]]) {
          obj6[list[i]["Status"]]++;
        } else {
          obj6[list[i]["Status"]] = 1;
        }
      }

      if (
        list[i]["Service"] === "HTTP transfert" &&
        list[i]["Time"] &&
        list[i]["Avg throughput"]
      ) {
        array1.push(list[i]["Time"]);
        array2.push(parseInt(list[i]["Avg throughput"]));
      }
    }

    //*************************************************Browsing************************************** */
    var head2 = [];
    var value2 = [];
    Object.keys(obj2).forEach((x) => {
      head2.push(x);
      value2.push(obj2[x]);
    });
    setBrowsingChartDisplay((prev) =>
      prev.concat({
        head: head2,
        value: value2,
        bar: true,
        label: "Count of Test",
        loading: true,
      })
    );

    setBrowsingChartDisplay((prev) =>
      prev.concat({
        head: ["HTTP browsing"],
        value: [obj3["HTTP browsing"] / obj2[["HTTP browsing"]]],
        bar: true,
        label: "Page load time Overall [Avg]",
        loading: true,
      })
    );

    var head4 = [];
    var value4 = [];
    Object.keys(obj4).forEach((x) => {
      head4.push(x);
      value4.push(obj4[x]);
    });

    setBrowsingChartDisplay((prev) =>
      prev.concat({
        head: head4,
        value: value4,
        pie: true,
        label: "Count of Test/ Host",
        loading: true,
      })
    );

    var head5 = [];
    var value5 = [];
    Object.keys(obj5).forEach((x) => {
      head5.push(x);
      value5.push(obj5[x] / objcounter[x]);
    });

    setBrowsingChartDisplay((prev) =>
      prev.concat({
        head: head5,
        value: value5,
        bar: true,
        label: "Page load Time [Avg]",
        loading: true,
      })
    );

    //*************************************************Youtube************************************** */

    var headyoutube1 = [];
    var valueyoutube1 = [];
    Object.keys(objyoutube1).forEach((x) => {
      headyoutube1.push(x);
      valueyoutube1.push(objyoutube1[x]);
    });

    setYoutubeChartDisplay((prev) =>
      prev.concat({
        head: headyoutube1,
        value: valueyoutube1,
        bar: true,
        label: "Count of Test",
        loading: true,
      })
    );

    setYoutubeChartDisplay((prev) =>
      prev.concat({
        head: ["Streaming"],
        value: [objyoutube2[["Streaming"]]/objyoutube1[["Streaming"]]],
        bar: true,
        label: "Time to 1st pict [Avg]",
        loading: true,
      })
    );

    setYoutubeChartDisplay((prev) =>
      prev.concat({
        head: ["Streaming"],
        value: [objyoutube3[["Streaming"]]/objyoutube1[["Streaming"]]],
        bar: true,
        label: "Video load delay [Avg]",
        loading: true,
      })
    );

    setYoutubeChartDisplay((prev) =>
      prev.concat({
        head: ["Streaming"],
        value: [objyoutube4[["Streaming"]]/objyoutube1[["Streaming"]]],
        bar: true,
        label: "Video Start delay [Avg]",
        loading: true,
      })
    );
    /*****************************************Speed********************************** */

    var head = [];
    var value = [];
    Object.keys(obj).forEach((x) => {
      head.push(x);
      value.push(obj[x]);
    });

    setSpeedChartDisplay((prev) =>
      prev.concat({
        head: head,
        value: value,
        bar: true,
        label: "Count of Test",
        loading: true,
      })
    );

    var head1 = [];
    var value1 = [];
    Object.keys(obj1).forEach((x) => {
      head1.push(x);
      value1.push(obj1[x]);
    });

    setSpeedChartDisplay((prev) =>
      prev.concat({
        head: ["HTTP transfert"],
        value: [obj1[["HTTP transfert"]]/obj[["HTTP transfert"]]],
        bar: true,
        label: "Application Throughput [Avg]",
        loading: true,
      })
    );

    var head8 = [];
    var value8 = [];
    Object.keys(obj6).forEach((x) => {
      head8.push(x);
      value8.push(obj6[x]);
    });

    setSpeedChartDisplay((prev) =>
      prev.concat({
        head: head8,
        value: value8,
        pie: true,
        label: "Application Throughput Status",
        loading: true,
      })
    );

    setSpeedChartDisplay((prev) =>
      prev.concat({
        head: array1,
        value: array2,
        line: true,
        label: "Application throughput",
        loading: true,
      })
    );

    setLoading(true);
  };

  // handle file upload
  const handleFileUpload = (e) => {
    setLoading(false);
    setBrowsingChartDisplay([]);
    setYoutubeChartDisplay([]);
    setSpeedChartDisplay([]);
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

  const displayBrowsing = () => {
    var x = [];
    for (var i = 0; i < browsingchartDisplay.length; i = i + 2) {
      x.push(
        <div className="row mt-4">
          <div className="col-sm-6 ">
            <Card>
              <Card.Body>
                <Card.Text>
                  {loading && browsingchartDisplay[i]["loading"] ? (
                    <Appc
                      head={browsingchartDisplay[i]["head"]}
                      value={browsingchartDisplay[i]["value"]}
                      bar={browsingchartDisplay[i]["bar"]}
                      pie={browsingchartDisplay[i]["pie"]}
                      line={browsingchartDisplay[i]["line"]}
                      label={browsingchartDisplay[i]["label"]}
                    />
                  ) : (
                    <div>There are no records to display</div>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className=" col-sm-6">
            <Card>
              <Card.Body>
                <Card.Text>
                  {loading &&
                  browsingchartDisplay[i + 1] &&
                  browsingchartDisplay[i + 1]["loading"] ? (
                    <Appc
                      head={browsingchartDisplay[i + 1]["head"]}
                      value={browsingchartDisplay[i + 1]["value"]}
                      bar={browsingchartDisplay[i + 1]["bar"]}
                      pie={browsingchartDisplay[i + 1]["pie"]}
                      line={browsingchartDisplay[i + 1]["line"]}
                      label={browsingchartDisplay[i + 1]["label"]}
                    />
                  ) : (
                    <div>There are no records to display</div>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      );
    }
    return x;
  };

  const displayYoutube = () => {
    var x = [];
    for (var i = 0; i < youtubechartDisplay.length; i = i + 2) {
      x.push(
        <div className="row mt-4">
          <div className="col-sm-6 ">
            <Card>
              <Card.Body>
                <Card.Text>
                  {loading && youtubechartDisplay[i]["loading"] ? (
                    <Appc
                      head={youtubechartDisplay[i]["head"]}
                      value={youtubechartDisplay[i]["value"]}
                      bar={youtubechartDisplay[i]["bar"]}
                      pie={youtubechartDisplay[i]["pie"]}
                      line={youtubechartDisplay[i]["line"]}
                      label={youtubechartDisplay[i]["label"]}
                    />
                  ) : (
                    <div>There are no records to display</div>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className=" col-sm-6">
            <Card>
              <Card.Body>
                <Card.Text>
                  {loading &&
                  youtubechartDisplay[i + 1] &&
                  youtubechartDisplay[i + 1]["loading"] ? (
                    <Appc
                      head={youtubechartDisplay[i + 1]["head"]}
                      value={youtubechartDisplay[i + 1]["value"]}
                      bar={youtubechartDisplay[i + 1]["bar"]}
                      pie={youtubechartDisplay[i + 1]["pie"]}
                      line={youtubechartDisplay[i + 1]["line"]}
                      label={youtubechartDisplay[i + 1]["label"]}
                    />
                  ) : (
                    <div>There are no records to display</div>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      );
    }
    return x;
  };

  const displaySpeed = () => {
    var x = [];
    for (var i = 0; i < speedchartDisplay.length; i = i + 2) {
      x.push(
        <div className="row mt-4">
          <div className="col-sm-6 ">
            <Card>
              <Card.Body>
                <Card.Text>
                  {loading && speedchartDisplay[i]["loading"] ? (
                    <Appc
                      head={speedchartDisplay[i]["head"]}
                      value={speedchartDisplay[i]["value"]}
                      bar={speedchartDisplay[i]["bar"]}
                      pie={speedchartDisplay[i]["pie"]}
                      line={speedchartDisplay[i]["line"]}
                      label={speedchartDisplay[i]["label"]}
                    />
                  ) : (
                    <div>There are no records to display</div>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className=" col-sm-6">
            <Card>
              <Card.Body>
                <Card.Text>
                  {loading &&
                  speedchartDisplay[i + 1] &&
                  speedchartDisplay[i + 1]["loading"] ? (
                    <Appc
                      head={speedchartDisplay[i + 1]["head"]}
                      value={speedchartDisplay[i + 1]["value"]}
                      bar={speedchartDisplay[i + 1]["bar"]}
                      pie={speedchartDisplay[i + 1]["pie"]}
                      line={speedchartDisplay[i + 1]["line"]}
                      label={speedchartDisplay[i + 1]["label"]}
                    />
                  ) : (
                    <div>There are no records to display</div>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      );
    }
    return x;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="position-relative m-5">
            <div className="input-group mb-3">
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    accept=".csv"
                    onChange={handleFileUpload}
                    id="inputGroupFile"
                  />
                  <label className="custom-file-label" for="inputGroupFile">
                    Upload measurement file here
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Tabs
                id="controlled-tab-example"
                selectedIndex={tabIndex}
                onSelect={(k) => setTabIndex(k)}
              >
                <Tab eventKey="browsing" title="Browsing">
                  {displayBrowsing()}
                </Tab>
                <Tab eventKey="youtube" title="Youtube">
                  {displayYoutube()}
                </Tab>
                <Tab eventKey="throughput" title="Application Throughput">
                  {displaySpeed()}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QoeChartApp;
