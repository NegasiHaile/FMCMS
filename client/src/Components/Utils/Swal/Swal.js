import Swal from "sweetalert2";
function SweetAlert() {
  return Swal.fire({
    position: "center",
    background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
    icon: "success",
    text: "props.text",
    confirmButtonColor: "#1E263C",
    showConfirmButton: false,
    // timer: 1500,
  });
}

export default SweetAlert;
