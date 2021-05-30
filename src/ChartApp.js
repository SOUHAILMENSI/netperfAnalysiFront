import React, { useState } from "react";
import * as XLSX from "xlsx";
import Appc from "./stat/Appc";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";

function ChartApp() {
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  let [ltechartDisplay, setLteChartDisplay] = useState([]);
  let [umtschartDisplay, setUmtsChartDisplay] = useState([]);
  let [gsmchartDisplay, setGsmChartDisplay] = useState([]);

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
    let obj7 = {};
    let obj8 = {};
    let objUmts1 = {};
    let objUmts2 = {};
    let objUmts3 = {};
    let objUmts4 = {};
    let objUmts5 = {};
    let objUmts6 = {};
    let array1 = [];
    let array2 = [];
    
    for (let i = 0; i < list.length; i++) {
      // LTE calculation

      if (list[i]["System"] === "LTE" && list[i]["CELL ID"]) {
        if (obj2[list[i]["CELL ID"]]) {
          obj2[list[i]["CELL ID"]] =
            Math.floor(obj2[list[i]["CELL ID"]] + parseInt(list[i]["RSRP"])) /
            2;
        } else {
          obj2[list[i]["CELL ID"]] = Math.floor(parseInt(list[i]["RSRP"]));
        }
      }

      if (list[i]["System"] === "LTE" && list[i]["CELL ID"]) {
        if (obj3[list[i]["CELL ID"]]) {
          obj3[list[i]["CELL ID"]] =
            Math.floor(obj3[list[i]["CELL ID"]] + parseInt(list[i]["RSRQ"])) /
            2;
        } else {
          obj3[list[i]["CELL ID"]] = Math.floor(parseInt(list[i]["RSRQ"]));
        }
      }

      if (list[i]["System"] === "LTE" && list[i]["CELL ID"]) {
        if (obj4[list[i]["CELL ID"]]) {
          obj4[list[i]["CELL ID"]] =
            Math.floor(obj4[list[i]["CELL ID"]] + parseInt(list[i]["SINR"])) /
            2;
        } else {
          obj4[list[i]["CELL ID"]] = Math.floor(parseInt(list[i]["SINR"]));
        }
      }

      if (list[i]["System"] === "LTE" && list[i]["Band"]) {
        if (obj5[list[i]["Band"]]) {
          obj5[list[i]["Band"]]++;
        } else {
          obj5[list[i]["Band"]] = 1;
        }
      }

      if (list[i]["System"] === "LTE" && list[i]["frequency"]) {
        if (obj6[list[i]["frequency"]]) {
          obj6[list[i]["frequency"]]++;
        } else {
          obj6[list[i]["frequency"]] = 1;
        }
      }

      if (list[i]["System"] === "LTE" && list[i]["Modulation"]) {
        if (obj7[list[i]["Modulation"]]) {
          obj7[list[i]["Modulation"]]++;
        } else {
          obj7[list[i]["Modulation"]] = 1;
        }
      }

      // UMTS calculation

      if (list[i]["System"] === "UMTS" && list[i]["CELL ID"]) {
        if (objUmts1[list[i]["CELL ID"]]) {
          objUmts1[list[i]["CELL ID"]] =
            Math.floor(
              objUmts1[list[i]["CELL ID"]] + parseInt(list[i]["RSCP"])
            ) / 2;
        } else {
          objUmts1[list[i]["CELL ID"]] = Math.floor(parseInt(list[i]["RSCP"]));
        }
      }

      if (list[i]["System"] === "UMTS" && list[i]["CELL ID"]) {
        if (objUmts2[list[i]["CELL ID"]]) {
          objUmts2[list[i]["CELL ID"]] =
            Math.floor(
              objUmts2[list[i]["CELL ID"]] + parseInt(list[i]["EcN0"])
            ) / 2;
        } else {
          objUmts2[list[i]["CELL ID"]] = Math.floor(parseInt(list[i]["EcN0"]));
        }
      }

      if (list[i]["System"] === "UMTS" && list[i]["CELL ID"]) {
        if (objUmts3[list[i]["CELL ID"]]) {
          objUmts3[list[i]["CELL ID"]] =
            Math.floor(
              objUmts3[list[i]["CELL ID"]] + parseInt(list[i]["RSSI"])
            ) / 2;
        } else {
          objUmts3[list[i]["CELL ID"]] = Math.floor(parseInt(list[i]["RSSI"]));
        }
      }

      if (list[i]["System"] === "UMTS" && list[i]["Band"]) {
        if (objUmts4[list[i]["Band"]]) {
          objUmts4[list[i]["Band"]]++;
        } else {
          objUmts4[list[i]["Band"]] = 1;
        }
      }

      if (list[i]["System"] === "UMTS" && list[i]["frequency"]) {
        if (objUmts5[list[i]["frequency"]]) {
          objUmts5[list[i]["frequency"]]++;
        } else {
          objUmts5[list[i]["frequency"]] = 1;
        }
      }

      if (list[i]["System"] === "UMTS" && list[i]["CELL ID"]) {
        if (objUmts6[list[i]["CELL ID"]]) {
          objUmts6[list[i]["CELL ID"]]++;
        } else {
          objUmts6[list[i]["CELL ID"]] = 1;
        }
      }

      //GSM calculation

      if (list[i]["System"] === "GSM" && list[i]["CELL ID"]) {
        if (obj[list[i]["CELL ID"]]) {
          obj[list[i]["CELL ID"]] =
            Math.floor(
              obj[list[i]["CELL ID"]] + parseInt(list[i]["Rx Level"])
            ) / 2;
        } else {
          obj[list[i]["CELL ID"]] = Math.floor(parseInt(list[i]["Rx Level"]));
        }
      }

      if (list[i]["System"] === "GSM" && list[i]["Band"]) {
        if (obj1[list[i]["Band"]]) {
          obj1[list[i]["Band"]]++;
        } else {
          obj1[list[i]["Band"]] = 1;
        }
      }

      if (
        list[i]["System"] === "GSM" &&
        list[i]["Time"] &&
        list[i]["Rx Level"]
      ) {
        array1.push(list[i]["Time"]);
        array2.push(parseInt(list[i]["Rx Level"]));
      }

      if (list[i]["System"] === "GSM" && list[i]["CELL ID"]) {
        if (obj8[list[i]["CELL ID"]]) {
          obj8[list[i]["CELL ID"]]++;
        } else {
          obj8[list[i]["CELL ID"]] = 1;
        }
      }
    }
    //*************************************************LTE************************************** */
    var head2 = [];
    var value2 = [];
    Object.keys(obj2).forEach((x) => {
      head2.push(x);
      value2.push(obj2[x]);
    });
    setLteChartDisplay((prev) =>
      prev.concat({
        head: head2,
        value: value2,
        bar: true,
        label: "RSRP",
        loading: true,
      })
    );

    var head3 = [];
    var value3 = [];
    Object.keys(obj3).forEach((x) => {
      head3.push(x);
      value3.push(obj3[x]);
    });
    setLteChartDisplay((prev) =>
      prev.concat({
        head: head3,
        value: value3,
        bar: true,
        label: "RSRQ",
        loading: true,
      })
    );

    var head4 = [];
    var value4 = [];
    Object.keys(obj4).forEach((x) => {
      head4.push(x);
      value4.push(obj4[x]);
    });

    setLteChartDisplay((prev) =>
      prev.concat({
        head: head4,
        value: value4,
        bar: true,
        label: "SINR",
        loading: true,
      })
    );

    var head5 = [];
    var value5 = [];
    Object.keys(obj5).forEach((x) => {
      head5.push(x);
      value5.push(obj5[x]);
    });

    setLteChartDisplay((prev) =>
      prev.concat({
        head: head5,
        value: value5,
        pie: true,
        label: "LTE band",
        loading: true,
      })
    );

    var head6 = [];
    var value6 = [];
    Object.keys(obj6).forEach((x) => {
      head6.push(x);
      value6.push(obj6[x]);
    });
    setLteChartDisplay((prev) =>
      prev.concat({
        head: head6,
        value: value6,
        pie: true,
        label: "LTE Frequencies",
        loading: true,
      })
    );

    var head7 = [];
    var value7 = [];
    Object.keys(obj7).forEach((x) => {
      head7.push(x);
      value7.push(obj7[x]);
    });

    setLteChartDisplay((prev) =>
      prev.concat({
        head: head7,
        value: value7,
        pie: true,
        label: "LTE Modulation",
        loading: true,
      })
    );

    //*************************************************UMTS************************************** */

    var headUmts1 = [];
    var valueUmts1 = [];
    Object.keys(objUmts1).forEach((x) => {
      headUmts1.push(x);
      valueUmts1.push(objUmts1[x]);
    });

    setUmtsChartDisplay((prev) =>
      prev.concat({
        head: headUmts1,
        value: valueUmts1,
        bar: true,
        label: "RSCP",
        loading: true,
      })
    );

    var headUmts2 = [];
    var valueUmts2 = [];
    Object.keys(objUmts2).forEach((x) => {
      headUmts2.push(x);
      valueUmts2.push(objUmts2[x]);
    });

    setUmtsChartDisplay((prev) =>
      prev.concat({
        head: headUmts2,
        value: valueUmts2,
        bar: true,
        label: "Ec/I0",
        loading: true,
      })
    );

    var headUmts3 = [];
    var valueUmts3 = [];
    Object.keys(objUmts3).forEach((x) => {
      headUmts3.push(x);
      valueUmts3.push(objUmts3[x]);
    });

    setUmtsChartDisplay((prev) =>
      prev.concat({
        head: headUmts3,
        value: valueUmts3,
        bar: true,
        label: "RSSI",
        loading: true,
      })
    );

    var headUmts4 = [];
    var valueUmts4 = [];
    Object.keys(objUmts4).forEach((x) => {
      headUmts4.push(x);
      valueUmts4.push(objUmts4[x]);
    });

    setUmtsChartDisplay((prev) =>
      prev.concat({
        head: headUmts4,
        value: valueUmts4,
        pie: true,
        label: "UMTS band",
        loading: true,
      })
    );

    var headUmts5 = [];
    var valueUmts5 = [];
    Object.keys(objUmts5).forEach((x) => {
      headUmts5.push(x);
      valueUmts5.push(objUmts5[x]);
    });

    setUmtsChartDisplay((prev) =>
      prev.concat({
        head: headUmts5,
        value: valueUmts5,
        pie: true,
        label: "UMTS Frequencies",
        loading: true,
      })
    );

    var headUmts6 = [];
    var valueUmts6 = [];
    Object.keys(objUmts6).forEach((x) => {
      headUmts6.push(x);
      valueUmts6.push(objUmts6[x]);
    });

    setUmtsChartDisplay((prev) =>
      prev.concat({
        head: headUmts6,
        value: valueUmts6,
        bar: true,
        label: "UMTS Cell count",
        loading: true,
      })
    );
    /*****************************************GSM********************************** */

    var head = [];
    var value = [];
    Object.keys(obj).forEach((x) => {
      head.push(x);
      value.push(obj[x]);
    });

    setGsmChartDisplay((prev) =>
      prev.concat({
        head: head,
        value: value,
        bar: true,
        label: "Rx level",
        loading: true,
      })
    );

    var head1 = [];
    var value1 = [];
    Object.keys(obj1).forEach((x) => {
      head1.push(x);
      value1.push(obj1[x]);
    });

    setGsmChartDisplay((prev) =>
      prev.concat({
        head: head1,
        value: value1,
        pie: true,
        label: "GSM band",
        loading: true,
      })
    );

    setGsmChartDisplay((prev) =>
      prev.concat({
        head: array1,
        value: array2,
        line: true,
        label: "Rxlevel trending",
        loading: true,
      })
    );

    var head8 = [];
    var value8 = [];
    Object.keys(obj8).forEach((x) => {
      head8.push(x);
      value8.push(obj8[x]);
    });

    setGsmChartDisplay((prev) =>
      prev.concat({
        head: head8,
        value: value8,
        bar: true,
        label: "GSM Cell count",
        loading: true,
      })
    );

    setLoading(true);
  };

  // handle file upload
  const handleFileUpload = (e) => {
    setLoading(false);
    setLteChartDisplay([]);
    setUmtsChartDisplay([]);
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

  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };
  const displayLTE = () => {
    var x = [];
    for (var i = 0; i < ltechartDisplay.length; i = i + 2) {
      x.push(
        <div className="row mt-4">
          <div className="col-sm-6 ">
            <Card>
              <Card.Body>
                <Card.Text>
                  {loading && ltechartDisplay[i]["loading"] ? (
                    <Appc
                      head={ltechartDisplay[i]["head"]}
                      value={ltechartDisplay[i]["value"]}
                      bar={ltechartDisplay[i]["bar"]}
                      pie={ltechartDisplay[i]["pie"]}
                      line={ltechartDisplay[i]["line"]}
                      label={ltechartDisplay[i]["label"]}
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
                  ltechartDisplay[i + 1] &&
                  ltechartDisplay[i + 1]["loading"] ? (
                    <Appc
                      head={ltechartDisplay[i + 1]["head"]}
                      value={ltechartDisplay[i + 1]["value"]}
                      bar={ltechartDisplay[i + 1]["bar"]}
                      pie={ltechartDisplay[i + 1]["pie"]}
                      line={ltechartDisplay[i + 1]["line"]}
                      label={ltechartDisplay[i + 1]["label"]}
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

  const displayUMTS = () => {
    var x = [];
    for (var i = 0; i < umtschartDisplay.length; i = i + 2) {
      x.push(
        <div className="row mt-4">
          <div className="col-sm-6 ">
            <Card>
              <Card.Body>
                <Card.Text>
                  {loading && umtschartDisplay[i]["loading"] ? (
                    <Appc
                      head={umtschartDisplay[i]["head"]}
                      value={umtschartDisplay[i]["value"]}
                      bar={umtschartDisplay[i]["bar"]}
                      pie={umtschartDisplay[i]["pie"]}
                      line={umtschartDisplay[i]["line"]}
                      label={umtschartDisplay[i]["label"]}
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
                  umtschartDisplay[i + 1] &&
                  umtschartDisplay[i + 1]["loading"] ? (
                    <Appc
                      head={umtschartDisplay[i + 1]["head"]}
                      value={umtschartDisplay[i + 1]["value"]}
                      bar={umtschartDisplay[i + 1]["bar"]}
                      pie={umtschartDisplay[i + 1]["pie"]}
                      line={umtschartDisplay[i + 1]["line"]}
                      label={umtschartDisplay[i + 1]["label"]}
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

  const displayGSM = () => {
    var x = [];
    for (var i = 0; i < gsmchartDisplay.length; i = i + 2) {
      x.push(
        <div className="row mt-4">
          <div className="col-sm-6 ">
            <Card>
              <Card.Body>
                <Card.Text>
                  {loading && gsmchartDisplay[i]["loading"] ? (
                    <Appc
                      head={gsmchartDisplay[i]["head"]}
                      value={gsmchartDisplay[i]["value"]}
                      bar={gsmchartDisplay[i]["bar"]}
                      pie={gsmchartDisplay[i]["pie"]}
                      line={gsmchartDisplay[i]["line"]}
                      label={gsmchartDisplay[i]["label"]}
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
                  gsmchartDisplay[i + 1] &&
                  gsmchartDisplay[i + 1]["loading"] ? (
                    <Appc
                      head={gsmchartDisplay[i + 1]["head"]}
                      value={gsmchartDisplay[i + 1]["value"]}
                      bar={gsmchartDisplay[i + 1]["bar"]}
                      pie={gsmchartDisplay[i + 1]["pie"]}
                      line={gsmchartDisplay[i + 1]["line"]}
                      label={gsmchartDisplay[i + 1]["label"]}
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
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={showModal}
                  >
                    Export to PDF
                  </button>
                </div>
              </div>

              <Modal
                show={isOpen}
                onHide={hideModal}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header
                  closeButton
                  style={{ backgroundColor: "#007bff", color: "#fff" }}
                >
                  Export to PDF
                </Modal.Header>
                <Modal.Body>
                  Select the report template from the list below and click OK to
                  create the report.
                  <>
                    <Form.Check
                      label="LTE"
                      aria-label="option 1"
                      disabled={!loading}
                    />
                    <Form.Check
                      label="UMTS"
                      aria-label="option 1"
                      disabled={!loading}
                    />
                    <Form.Check
                      label="GSM"
                      aria-label="option 1"
                      disabled={!loading}
                    />
                  </>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="primary">OK</Button>
                </Modal.Footer>
              </Modal>
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
                <Tab eventKey="lte" title="LTE">
                  {displayLTE()}
                </Tab>
                <Tab eventKey="umts" title="UMTS">
                  {displayUMTS()}
                </Tab>
                <Tab eventKey="gsm" title="GSM">
                  {displayGSM()}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartApp;
