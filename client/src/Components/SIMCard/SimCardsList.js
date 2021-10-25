import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLabel,
  CForm,
  CSelect,
  CRow,
  CCol,
  CFormGroup,
  CInput,
  CDataTable,
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
const simCardDetail = {
  simNumber: "",
  branch: "none",
  problemStatus: "fine",
};
function SimCardsList() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [showModal, setShowModal] = useState(false);
  const [allSIMCards] = state.SIMCardAPI.simCards;
  const [simCardsToDisplay, setSIMCardsToDisplay] = useState([]);
  const [simCard, setSimCard] = useState(simCardDetail);
  const [callback, setCallback] = state.SIMCardAPI.callback;
  const [allBranchs] = state.branchAPI.branchs;
  const [onEdit, setOnEdit] = useState(false);
  const [newArivals, setNewArivals] = useState([]);

  useEffect(() => {
    if (user.userRole !== "super-admin" && user.userRole !== "main-store") {
      setSIMCardsToDisplay(
        allSIMCards.filter(
          (filteredSIMCard) => filteredSIMCard.branch == user.branch
        )
      );
      setNewArivals(
        allSIMCards.filter(
          (filteredSIMCard) =>
            filteredSIMCard.branch == user.branch &&
            filteredSIMCard.availableIn === "main-store"
        )
      );
    } else {
      setSIMCardsToDisplay(allSIMCards);
    }
  }, [user, allSIMCards]);

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
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setSimCard({ ...simCard, [name]: value });
  };
  const onSubmitRegisterSIMCard = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(`/sim_card/edit/${simCard._id}`, {
          ...simCard,
        });
        setCallback(!callback);
        sweetAlert("success", res.data.msg);
      } else {
        const res = await axios.post("/sim_card/register", { ...simCard });
        setCallback(!callback);
        sweetAlert("success", res.data.msg);
      }
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };
  const deleteSIMCard = (_id) => {
    try {
      Swal.fire({
        title: "Delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3C4B64",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(`/sim_card/delete/${_id}`);
          Swal.fire("Deleted!", res.data.msg, "success");
          setCallback(!callback);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };
  const simCardTablefields = [
    "simNumber",
    "status",
    "problemStatus",
    "availableIn",
    {
      key: "Actions",
      label: "Actions",
      sorter: false,
      filter: false,
    },
  ];
  return (
    <CCard className=" shadow-sm">
      <CCardHeader className="d-flex justify-content-between">
        <CLabel>SIM cards list</CLabel>
        {user.userRole === "main-store" && (
          <CButton
            size="sm"
            color="dark"
            onClick={() => {
              setSimCard(simCardDetail);
              setOnEdit(false);
              setShowModal(!showModal);
            }}
          >
            <CIcon name="cil-plus" /> Add SIM card
          </CButton>
        )}
      </CCardHeader>
      <CCardBody>
        <CDataTable
          size="sm"
          items={simCardsToDisplay}
          fields={simCardTablefields}
          tableFilter
          columnFilter
          itemsPerPageSelect
          itemsPerPage={10}
          hover
          cleaner
          sorter
          pagination
          scopedSlots={{
            Actions: (simCard) => (
              <td className="d-flex justify-content-between">
                {(user.userRole === "main-store" ||
                  user.userRole === "technician") && (
                  <CLink
                    className="text-success"
                    onClick={() => {
                      setSimCard({ ...simCard });
                      setOnEdit(true);
                      setShowModal(!showModal);
                    }}
                  >
                    <CTooltip
                      content={`Edit the  - ${simCard.simNumber}- SIM detail.`}
                    >
                      <CIcon name="cil-pencil" />
                    </CTooltip>
                  </CLink>
                )}
                {user.userRole === "main-store" &&
                  simCard.availableIn === "main-store" && (
                    <CLink
                      className="text-danger"
                      onClick={() => deleteSIMCard(simCard._id)}
                    >
                      <CTooltip
                        content={`Delete - ${simCard.simNumber}- SIM card.`}
                      >
                        <CIcon name="cil-trash" />
                      </CTooltip>
                    </CLink>
                  )}
                <CLink
                  className="text-info"
                  to={`/machine/indetail/${simCard._id}`}
                >
                  <CTooltip
                    content={`See detail of  - ${simCard.simNumber}- SIM card.`}
                  >
                    <CIcon name="cil-align-center" />
                  </CTooltip>
                </CLink>
              </td>
            ),
          }}
        />
      </CCardBody>

      {/* register sim CARD modal */}
      <CModal
        size="lg"
        show={showModal}
        onClose={() => setShowModal(!showModal)}
      >
        <CModalHeader closeButton>
          <CModalTitle className="text-muted">Add new SIM card</CModalTitle>
        </CModalHeader>
        <CForm onSubmit={onSubmitRegisterSIMCard}>
          <CModalBody>
            <CRow>
              {user.userRole === "main-store" && (
                <CCol xs="12" md="4">
                  <CFormGroup>
                    SIM Number ({simCard.simNumber})
                    <CInput
                      id="simNumber"
                      name="simNumber"
                      placeholder="Enter SIM card number."
                      required
                      minLength="10"
                      maxLength="10"
                      value={simCard.simNumber}
                      onChange={onChangeInput}
                    />
                  </CFormGroup>
                </CCol>
              )}
              <CCol xs="12" md="4">
                <CFormGroup>
                  SIM card problem status
                  <CSelect
                    aria-label="Select SIM problem status"
                    id="problemStatus"
                    name="problemStatus"
                    onChange={onChangeInput}
                    value={simCard.problemStatus}
                    required
                  >
                    <option value="fine">Fine</option>
                    <option value="defective">Devective</option>
                  </CSelect>
                </CFormGroup>
              </CCol>
              {user.userRole === "main-store" && (
                <CCol xs="12" md="4">
                  <CFormGroup>
                    SIM card branch
                    <CSelect
                      aria-label="select branch"
                      id="branch"
                      name="branch"
                      onChange={onChangeInput}
                      value={simCard.branch}
                      required
                    >
                      <option value="none">Select branch...</option>
                      {allBranchs.map((branch) => (
                        <option value={branch._id} key={branch._id}>
                          {branch.branchName}
                        </option>
                      ))}
                    </CSelect>
                  </CFormGroup>
                </CCol>
              )}
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" size="sm" color="dark">
              <CIcon name="cil-save" /> Save SIM
            </CButton>
            <CButton
              size="sm"
              color="danger"
              onClick={() => setShowModal(!showModal)}
            >
              <CIcon name="cil-x" /> Close
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </CCard>
  );
}

export default SimCardsList;
