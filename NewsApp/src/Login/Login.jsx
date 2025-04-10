import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import NavBar from "../Home/NavBar";
function Login() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  const [image, setImage] = useState("");
  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }
  function handleChange(e) {
    let inputData = e.target.value;
    let inputName = e.target.name;
    setLoginData((prev) => {
      return {
        ...prev,
        [inputName]: inputData,
      };
    });
  }
  async function handlesubmit(e) {
    e.preventDefault();
    if (signUp) {
      const data = new FormData();
      data.append("name", loginData.name);
      data.append("email", loginData.email);
      data.append("password", loginData.password);
      data.append("gender", loginData.gender);
      data.append("image", image);
      try {
        let responce = await fetch("http://127.0.0.1:3000/api/user", {
          method: "post",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: data,
        });
        responce = await responce.json();
        if (responce.state) {
          toast.success(responce.message);
          setSignUp(!signUp);
          navigate('/login')
          //navigate
        } else {
          toast.error(responce.message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try{
        const data={
          email:loginData.email,
          password:loginData.password
        }
        let responce=await fetch("http://127.0.0.1:3000/api/auth/login",{
          method:"post",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(data)
        })
        responce=await responce.json()
        console.log(responce)
        if (responce.state) {
          toast.success(responce.message);
          localStorage.setItem('userToken',responce.token)
          const userInfo={
            name:responce.findUser.name,
            email:responce.findUser.email,
            role:responce.findUser.role
          }
          localStorage.setItem('userInfo',JSON.stringify(userInfo))
          if(responce.findUser.role==='admin'){
            navigate('/admin/dashboard')
          }else{
            navigate('/')
          }
          //navigate
        } else {
          toast.error(responce.message);
        }

      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div>
      <NavBar />
      <div className="body">
        <div className="login-box">
          <div className="login-header">
            <header>{signUp ? "Register" : "Login"}</header>
          </div>
          <div
            className="input-box"
            style={{ display: signUp ? "inline" : "none" }}
          >
            <input
              type="text"
              placeholder="enter-name"
              name="name"
              required
              onChange={handleChange}
              className="input-field"
              autoComplete="off"
            ></input>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
              required
              className="input-field"
              autoComplete="off"
            ></input>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="password"
              name="password"
              onChange={handleChange}
              required
              className="input-field"
              autoComplete="off"
            ></input>
          </div>
          <div
            className="input-box"
            style={{ display: signUp ? "inline" : "none" }}
          >
            <input
              type="text"
              placeholder="confirm-password"
              name="password"
              required
              onChange={handleChange}
              className="input-field"
              autoComplete="off"
            ></input>
          </div>
          <div
            className="input-box"
            style={{ display: signUp ? "inline" : "none" }}
          >
            <input
              type="text"
              placeholder="male /female"
              name="gender"
              required
              onChange={handleChange}
              className="input-field"
              autoComplete="off"
            ></input>
          </div>
          <div
            className="input-box"
            style={{ display: signUp ? "inline" : "none" }}
          >
            <input
              type="file"
              placeholder="enter-image"
              name="image"
              onChange={handleImageChange}
              className="input-field"
              autoComplete="off"
            ></input>
          </div>
          <div className="forgot">
            <section>
              <input type="checkbox" id="check"></input>
              <label htmlFor="check">Remember me</label>
            </section>
          </div>
          <div className="input-submit">
            <button
              className="submit-btn"
              id="submit"
              onClick={handlesubmit}
            ></button>
            <label htmlFor="submit">{signUp ? "Register" : "Login"}</label>
          </div>
          <div
            className="sign-up-link"
            style={{ display: signUp ? "none" : "inline" }}
          >
            <p>
              Don't have account?
              <button
                className="a"
                onClick={() => {
                  setSignUp(!signUp);
                }}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
