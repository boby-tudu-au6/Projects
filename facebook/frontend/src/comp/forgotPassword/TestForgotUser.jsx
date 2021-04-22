import React from "react";
import "./Forgot.css";
import { useState } from "react";
import ForgetOtpUser from "./ForgetOtpUser";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Step3ResetUser from "./Step3ResetUser";
import { LoadingOutlined } from "@ant-design/icons";
import {baseurl} from '../../redux/action/action'


const spinIcon  = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const API = `${baseurl}/register/resetpass`
toast.configure();
function ForgotPassword({modelOpen}) {
  let [focusemail, setFocusEmail] = useState("email");
  let [focusNumber, setFocusNumber] = useState("text");
  let [display2, setDisplay2] = useState("");
  let [display1, setDisplay1] = useState("");
  // let [modelIsOpen, setModelIsOpen] = useState(false);
  let [mobile, setMobile] = useState("");
  let [email, setEmail] = useState("");
  let [step1, setStep1] = useState(true);
  let [step2, setStep2] = useState(false);
  let [step3, setStep3] = useState(false);
  const [spin, setSpin] = useState(false);
   

  const handleSpin = (e) => {
   e.preventDefault();
   setSpin(true);
   handleSubmit()
   
 
 };

  async function handleSubmit() {

    var phone = parseInt(mobile);

    let URL = "";
    if (display2 === "") {
      localStorage.removeItem("phone");
      localStorage.setItem("email", email);
      URL = `${API}?type=email&email=${email}`;
    } else {
      localStorage.removeItem("email");
      localStorage.setItem("phone", phone);
      URL = `${API}?type=mobile&mobile=${phone}`;
    }
    try {
      let Mobile = await Axios({
        method: "post",
        url: `${URL}`,
     
      });
      notify(Mobile.data.message);
      notify1(Mobile.data.err);
      setStep2(true)
      setStep1(false)
      setStep3(false)
    } catch (err) {
      notify1(" server error");
    }
  }
  const notify = (m) => {
    toast.success(m, {
      draggable: true,
      position: toast.POSITION.TOP_CENTER,
      style: { textTransform: "uppercase" },
    });
  };
  const notify1 = (m) => {
    toast.error(m, { position: toast.POSITION.TOP_CENTER });
  };

  function handleChange(e) {
    let { value } = e.target;
    setMobile(value);
  }
  function handleEmail(e) {
    let { value } = e.target;
    setEmail(value);
  }

  return (
    <>
      <div id="rowF"  style={{ display: step1 ? "block" : "none" }}>
        <h1>Reset Password</h1>
        <div>
          <h5>Please Enter Your Email or Mobile to Request a Password Reset</h5>
        </div>

        <hr className="ml-5" />
        <div>
          <label style={{ display: display2 }} htmlFor="input">
            Email address
          </label>
          <input
            placeholder="Enter Your Registered email"
            value={email}
            name="email"
            onChange={handleEmail}
            type={focusemail}
            onFocus={() => {
              setFocusNumber("hidden") 
              setDisplay1("none")
            }}
          />
          <h5 style={{ display: display1 || display2 }}>Or</h5>

          <label style={{ display: display1 }} htmlFor="input">
            Mobile
          </label>
          <input
            placeholder="Enter Your Registered Mobile"
            name="mobile"
            onChange={handleChange}
            value={mobile}
            type={focusNumber}
            onFocus={() => {
              setFocusEmail("hidden")
             setDisplay2("none")
            }}
          />
        </div>
        <button onClick={handleSpin} style={{ marginBottom: "3rem",marginLeft:"3.3rem" }}>
        {spin === true ? spinIcon :  "RESET PASSWORD"}
        </button>

        {/* <button onClick={()=>{setModelIsOpen(true)}}>Next</button> */}
        {/* <Modal
          className="Modal"
          isOpen={modelIsOpen}
          onRequestClose={() => {
            setModelIsOpen(false);
          }}
        >
          <button
           style={{ marginLeft: "630px", marginTop: "-1rem", zIndex: "2" }}
            onClick={() => {
              setModelIsOpen(false);
            }}
          >
            <CloseIcon />{" "}
          </button>
          <ForgetOtpUser />
        </Modal> */}
      </div>
      <ToastContainer />
      <div style={{ display: step2 ? "block" : "none" }}>
        <ForgetOtpUser step3={setStep3} step1={setStep1} step2={setStep2} />
      </div>
      <div style={{display:step3 ? "block" : "none"}}><Step3ResetUser modelOpen={modelOpen}/></div>
    </>
  );
}

export default ForgotPassword;
