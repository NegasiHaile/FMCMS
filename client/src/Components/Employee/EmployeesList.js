import React, { useState, useEffect, useContext, Suspense } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { GlobalState } from "../../GlobalState";

// import Loader from "../Utils/Commons/Loader";
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CLabel,
  CDataTable,
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getConfig } from "../../config";

const EmployeeList = () => {
  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [user] = state.UserAPI.User;
  const [token] = state.token;
  const [allUsers] = state.UsersAPI.users;
  const [employees, setEmployees] = useState([]);

  const [branchs] = state.branchAPI.branchs;
  const [callback, setCallback] = state.UsersAPI.callback;

  useEffect(() => {
    if (user.userRole === "branch-admin") {
      setEmployees(
        allUsers.filter(
          (filteredEmployee) => filteredEmployee.branch == user.branch
        )
      );
    } else {
      setEmployees(allUsers);
    }
  }, [user, allUsers]);

  const sweetAlert = (type, text) => {
    Swal.fire({
      position: "center",
      background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
      icon: type,
      text: text,
      confirmButtonColor: "#3C4B64",
      showConfirmButton: true,
      // timer: 1500,
    });
  };
  const deleteEmloyee = async (_id, fName, mName) => {
    // e.preventDefault();
    try {
      Swal.fire({
        title: "Delete this?",
        text:
          "WARNING:- Every data related to " +
          fName +
          " " +
          mName +
          "' will be lost!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1E263C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(`${apiUrl}/user/delete/${_id}`, {
            headers: { Authorization: token },
          });
          Swal.fire("Deleted!", res.data.msg, "success");
          setCallback(!callback);
        }
      });
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const switchUserAccount = async (text, fName, mName, status, _id) => {
    try {
      Swal.fire({
        text:
          "Are you sure you want to " +
          text +
          " " +
          fName +
          " " +
          mName +
          "'s account?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3C4B64",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, " + text + " it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (status === "ON") {
            const res = await axios.put(`${apiUrl}/user/block_account/${_id}`);
            sweetAlert("success", res.data.msg);
          } else if (status === "OFF") {
            const res = await axios.put(
              `${apiUrl}/user/activate_account/${_id}`
            );
            sweetAlert("success", res.data.msg);
          } else {
            sweetAlert("error", "Nothing to change");
          }
          setCallback(!callback);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const employeeTableFields = [
    "fName",
    "mName",
    "gender",
    "phoneNumber",
    "email",
    "branch",
    "userRole",
    "status",
    {
      key: "Actions",
      label: "Actions",
      // _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      }
    >
      <CCard className=" shadow-sm">
        {user.userRole === "super-admin" && (
          <CCardHeader className="d-flex justify-content-between">
            <CLabel className="text-uppercase">
              List of employees: <b>{employees.length}</b>
            </CLabel>
            <CButton
              to="/Employee/register"
              size="sm"
              variant="outline"
              color="dark"
            >
              <CIcon name="cil-plus" /> Add User
            </CButton>
          </CCardHeader>
        )}
        <CCardBody>
          <CDataTable
            size="sm"
            items={employees.filter(
              (user) =>
                user.userRole !== "super-admin" && user.userRole !== "client"
            )}
            fields={employeeTableFields}
            tableFilter
            columnFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            footer
            cleaner
            sorter
            pagination
            scopedSlots={{
              status: (employee) => (
                <td className="justify-content-between">
                  <CButton
                    size="sm"
                    variant="ghost"
                    color={employee.status === "ON" ? "danger" : "primary"}
                    disabled={
                      user.userRole === "super-admin" ||
                      user.userRole === "branch-admin"
                        ? false
                        : true
                    }
                    onClick={() => {
                      if (employee.status === "ON") {
                        switchUserAccount(
                          "disable",
                          employee.fName,
                          employee.mName,
                          employee.status,
                          employee._id
                        );
                      } else {
                        switchUserAccount(
                          "activate",
                          employee.fName,
                          employee.mName,
                          employee.status,
                          employee._id
                        );
                      }
                    }}
                  >
                    {" "}
                    {employee.status}{" "}
                  </CButton>
                </td>
              ),
              branch: (employee) => (
                <td>
                  {branchs
                    .filter((brnc) => brnc._id === employee.branch)
                    .map((filteredBranch) => filteredBranch.branchName)}
                </td>
              ),
              Actions: (employee) => (
                <td className="d-flex justify-content-between">
                  {user.userRole === "super-admin" && (
                    <>
                      <CLink
                        className="text-success"
                        to={{
                          pathname: `/Employee/Edit/${employee._id}`,
                          state: employee,
                        }}
                      >
                        <CTooltip
                          content={`Edit the  - ${employee.fName} ${employee.mName}- employee detail.`}
                        >
                          <CIcon name="cil-pencil" />
                        </CTooltip>
                      </CLink>

                      <span className="text-muted">|</span>

                      <CLink
                        className="text-danger"
                        onClick={() =>
                          deleteEmloyee(
                            employee._id,
                            employee.fName,
                            employee.mName
                          )
                        }
                      >
                        <CTooltip
                          content={`Delete - ${employee.fName} ${employee.mName}- employee.`}
                        >
                          <CIcon name="cil-trash" />
                        </CTooltip>
                      </CLink>

                      <span className="text-muted">|</span>
                    </>
                  )}

                  <CLink
                    className="text-info"
                    to={`/user/profile/${employee._id}`}
                  >
                    <CTooltip
                      content={`See detail of - ${employee.fName} ${employee.mName}- employee.`}
                    >
                      <CIcon name="cil-arrow-right" />
                    </CTooltip>
                  </CLink>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>
    </Suspense>
  );
};

export default EmployeeList;
