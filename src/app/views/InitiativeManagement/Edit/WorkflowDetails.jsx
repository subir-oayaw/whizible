import React from "react";
import { Table } from "react-bootstrap";

const WorkflowDetails = () => {
  return (
    <div className="details-div py-3">
      <div className="row">
        <div className="details-main-sec">
          <div className="d-sec1 px-4">
            <Table striped bordered hover className="details-table1 mb-0 w-50">
              <tbody>
                <tr>
                  <td>Initiative title :</td>
                  <td className="tital22">Metro Small</td>
                </tr>
                <tr>
                  <td>Initiated on :</td>
                  <td className="tital22">07 Aug 2022</td>
                </tr>
                <tr>
                  <td>Business group :</td>
                  <td className="tital22">Construction</td>
                </tr>
                <tr>
                  <td>Delivery unit :</td>
                  <td className="tital22">Kothrud</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="d-sec2 px-4">
            <Table striped bordered hover className="details-table2 mb-0 w-50">
              <tbody>
                <tr>
                  <td>Initiative code :</td>
                  <td className="tital22">CR-034</td>
                </tr>
                <tr>
                  <td>Initiative category :</td>
                  <td className="tital22">Application_01</td>
                </tr>
                <tr>
                  <td>Organization unit :</td>
                  <td className="tital22">Pune</td>
                </tr>
                <tr>
                  <td>Delivery team :</td>
                  <td className="tital22">Alpha</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetails;
