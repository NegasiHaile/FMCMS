const router = require("express").Router();
const userCntrl = require("../controllers/userCntrl");
const auth = require("../middleware/auth");
const path = require("path");
const upload = require("../middleware/imageUpload");

// router.post("/register", upload.single("file"), userCntrl.register);

router.post("/register", userCntrl.register);

router.get("/detail/:id", auth, userCntrl.getuserDetail);

// fetcch users based on their type Employee, clients and supper-admins separetly.
// router.get("/list_inType/:role", userCntrl.getUsers);
router.get("/list_inType", userCntrl.getUsers);

// take an action on users based on thier type

router.delete("/delete/:id", auth, userCntrl.deleteUser);

router.put("/edit/:id", auth, userCntrl.editUser);

router.get("/profile", auth, userCntrl.getLogedInUser);

router.post("/login", userCntrl.login);

router.get("/logout", userCntrl.logout);

router.get("/refresh_token", userCntrl.refreshToken);

router.post("/change_password/:id", auth, userCntrl.changePassword);

router.put("/forgot_Password", userCntrl.forgotPassword);

router.post("/block_account/:id", auth, userCntrl.blockAccount);

router.post("/activate_account/:id", auth, userCntrl.activateAccount);

module.exports = router;
