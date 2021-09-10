import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { GlobalState } from "../../GlobalState";
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

const EmployeeList = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [token] = state.token;
  const [allUsers] = state.UsersAPI.users;
  const [employees, setEmployees] = useState(allUsers);

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

  const deleteEmloyee = async (_id, fName, mName) => {
    // e.preventDefault();
    try {
      Swal.fire({
        title: "Are you sure",
        text:
          "You want to delelte " +
          fName +
          " " +
          mName +
          "'s detail permanently?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1E263C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(`/user/delete/${_id}`, {
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

  // const filterEmployeeBranch = async (_id) => {
  //     branchs.filter((branch) => branch._id == _id)
  //       .map((filteredBranch) => <li>{filteredBranch.branchName}</li>);
  // }

  //  to={{ pathname: `/cards/${id}`, state: id }} // sending data to another page
  //             className={`card-wrapper restore-${id}`}

  const employeeTableFields = [
    "fName",
    "mName",
    "lName",
    "gender",
    "email",
    "phoneNumber",
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
    <>
      <CCard className=" shadow-sm">
        {user.userRole === "super-admin" && (
          <CCardHeader className="d-flex justify-content-between">
            <CLabel>List of employees</CLabel>
            <CButton
              to="/Employee/register"
              size="sm"
              variant="outline"
              color="dark"
            >
              <CIcon name="cil-plus" /> Add Employee
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
                    className="text-primary"
                    to={`/user/profile/${employee._id}`}
                  >
                    <CTooltip
                      content={`See detail of - ${employee.fName} ${employee.mName}- employee.`}
                    >
                      <CIcon name="cil-fullscreen" />
                    </CTooltip>
                  </CLink>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default EmployeeList;
