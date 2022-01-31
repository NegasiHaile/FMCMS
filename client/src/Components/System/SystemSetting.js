import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CForm,
  CButton,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

function SystemSetting() {
  const [senderEmail, setSenderEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [senderEmails, setSenderEmails] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [onEditPrimary, setOnEditPrimary] = useState(false);

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

  const fetchSenderEmails = async () => {
    try {
      const res = await axios.get("/system/fetch_sender_email");
      setSenderEmails(res.data);
      console.log(res.data);
      console.log(senderEmails.length);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  useEffect(() => {
    fetchSenderEmails();
  }, []);

  const onSubmitAddEmail = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        fetchSenderEmails();
        setSenderEmail("");
        setEmailPassword("");
        setOnEditPrimary(false);
        setOnEdit(false);
        sweetAlert("success", "Mailer successfully edited!");
      } else {
        const res = await axios.post("/system/add_sender_email", {
          senderEmail: senderEmail,
          emailPassword: emailPassword,
        });
        fetchSenderEmails();
        setSenderEmail("");
        setEmailPassword("");
        setOnEditPrimary(false);
        setOnEdit(false);
        sweetAlert("success", res.data.msg);
      }
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const makePrimaryEmailSender = async (id) => {
    setOnEditPrimary(false);
    setOnEdit(false);
    setSenderEmail("");
    setEmailPassword("");
    Swal.fire({
      text: "Are you sure you want to make this email as a primary email of this FMCMS jupiter trading?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3C4B64",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make it!",
      confirmButtonSize: "small",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.put(
            `/system/make_primary_sender_email/${id}`
          );
          fetchSenderEmails();
          sweetAlert("success", res.data.msg);
        } catch (error) {
          sweetAlert("error", error.response.data.msg);
        }
      }
    });
  };

  const removeSenderEmail = (id) => {
    setOnEditPrimary(false);
    setOnEdit(false);
    setSenderEmail("");
    setEmailPassword("");
    Swal.fire({
      text: "Are you sure you want to remove this email?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3C4B64",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`/system/delete_sender_email/${id}`);
          fetchSenderEmails();
          sweetAlert("success", res.data.msg);
        } catch (error) {
          sweetAlert("error", error.response.data.msg);
        }
      }
    });
  };

  return (
    <CCardGroup columns className="cols-2">
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <h6>Sender email {senderEmails.length}</h6>
        </CCardHeader>
        <CCardBody>
          <div className=" table-responsive">
            <table className="table table-sm borderless">
              <tbody>
                {senderEmails.length > 0 ? (
                  senderEmails.map((email, index) => (
                    <tr key={index}>
                      <td>{email.email}</td>

                      <td>
                        <span
                          className={`text-${
                            email.emailVerified ? "info" : "danger"
                          }`}
                        >
                          {email.emailVerified ? "Verified" : "Unverified"}
                        </span>
                      </td>
                      <td className="text-success">
                        {email.primary ? (
                          "Primary"
                        ) : (
                          <CButton
                            size="sm"
                            color="primary"
                            variant="ghost"
                            onClick={() => makePrimaryEmailSender(email._id)}
                          >
                            Make Primary
                          </CButton>
                        )}
                      </td>
                      <td className="d-flex justify-content-between">
                        {email.primary ? (
                          "Mailer"
                        ) : (
                          <CLink
                            className="text-danger"
                            onClick={() => removeSenderEmail(email._id)}
                          >
                            <CTooltip content={`Remove this sender email.`}>
                              <CIcon name="cil-trash" />
                            </CTooltip>
                          </CLink>
                        )}
                        <CLink
                          className="text-success"
                          onClick={() => {
                            setOnEdit(true);
                            setSenderEmail(email.email);
                            setEmailPassword(email.password);
                            setOnEditPrimary(email.primary);
                          }}
                        >
                          <CTooltip content={`Edit this sender email.`}>
                            <CIcon name="cil-pencil" />
                          </CTooltip>
                        </CLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className="d-flex justify-content-center">
                    <div class="lds-ripple">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                )}
              </tbody>
            </table>
            <CForm onSubmit={onSubmitAddEmail}>
              <CInputGroup className="mb-4">
                <CInput
                  name="senderEmail"
                  type="email"
                  placeholder="Enter sender email!"
                  required
                  value={senderEmail}
                  disabled={onEditPrimary}
                  onChange={(e) => setSenderEmail(e.target.value)}
                />
                <CInputGroupAppend>
                  <CInput
                    className="r-b-none"
                    name="emailPassword"
                    type="password"
                    placeholder="Email password!"
                    required
                    value={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.value)}
                  />
                </CInputGroupAppend>
                <CInputGroupAppend>
                  <CButton
                    className="jptr-btn"
                    size="sm"
                    role="button"
                    type="submit"
                  >
                    <CIcon name={`cil-${onEdit ? "save" : "plus"}`} />{" "}
                    {onEdit ? "Save" : "Add"}
                  </CButton>
                </CInputGroupAppend>
              </CInputGroup>
            </CForm>
          </div>
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
}

export default SystemSetting;
