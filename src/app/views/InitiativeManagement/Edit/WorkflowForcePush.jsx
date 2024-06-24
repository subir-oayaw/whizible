import React from "react";

const WorkflowForcePush = () => {
  return (
    <div className="row pt-3">
      <div className="col-sm-12">
        <label className="tital22 form-label">4. Force push</label>
        <div className="col-sm-12">
          <span>Approvers for the stage "CFO Approval"</span>
        </div>
      </div>

      <div className="py-3">
        <div className="row">
          <div className="details-main-sec">
            <div className="d-sec1 px-4">
              <table className="table details-table1 mb-0 w-50">
                <tbody>
                  <tr>
                    <td>Approver :</td>
                    <td className="tital22">Admin</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-sec2 px-4">
              <table className="table details-table2 mb-0 w-50">
                <tbody>
                  <tr>
                    <td>Status :</td>
                    <td className="tital22">Not Approved</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <span className="tital11 pt-2">
            You can force push 'Metro Pune Small' to next approval stage as 'Admin' has not approved
            the initiative.
            <a
              id="approvenextstage"
              href="javascript:;"
              data-bs-toggle="modal"
              data-bs-target="#IniForce_pushModal"
            >
              Click here
            </a>
            to move initiative to next stage.
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkflowForcePush;
