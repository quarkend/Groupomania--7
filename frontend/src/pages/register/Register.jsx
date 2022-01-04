import axios from "axios";
import { useRef } from "react";


import { useHistory,Link } from 'react-router-dom';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/signup", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
        window.location.reload();
      }
    }
  };
    
  return (
    <div className="login-container">
            <div className="cardlogin">
                <div className="container">
   
       

          <form  onSubmit={handleClick}>
          <h1>Register</h1>
              <label htmlFor="Username">
                  Username
            <input
              placeholder="Username"
              autoComplete="off"
              required
              ref={username}
              className="loginInput"
            />
            </label>
            <label htmlFor="email">
                            Email Address
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
              autoComplete="off"
            />
            </label>
            <label htmlFor="password">
                            Password
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
               </label>
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginRegisterButton" type="submit">
              Sign Up
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/login" ) }}>Login</button>
          </form>
       
          </div>
        </div>
      </div>
  
  );
}

// import React from 'react'
// import { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { Redirect, Link } from 'react-router-dom';
// import "./register.css"
// // function Registration() {
// function Register() {
//     const [redirect, setRedirect] = useState(false);
//     const initialValues = {
//         username: "",
//         email: "",
//         password: "",
//     };

//     const validationSchema = Yup.object().shape({
//         email: Yup.string().min(3).max(150).required(),
//         username: Yup.string().min(3).max(15).required(),
//         password: Yup.string().min(4).max(20).required(),
//     });

//     const onSubmit = (data) => {
//         axios.post("http://localhost:8800/api/auth/signup", data).then(() => {
//             console.log(data);
//         });

//         setRedirect(true);
//     };
//     if (redirect) {
//         return <Redirect to="/login" />;
//     }
//     return (
//         <div>
//             <Formik
//                 initialValues={initialValues}
//                 onSubmit={onSubmit}
//                 validationSchema={validationSchema}
//             >
//                 <Form className="login ">
//                     <div className="loginWrapper">
//                         <div className="loginLeft">

//                             <h3 className="loginLogo">Bienvenue a Groupomaia</h3>
//                             <span className="loginDesc">Connectez vous avec vous amis</span>
//                         </div>
//                         <div className="loginRight">
//                             <div className="loginBox">
//                                 <label>Username: </label>
//                                 <ErrorMessage name="username" component="span" />
//                                 <Field
//                                     className="loginInput"
//                                     autoComplete="on"
//                                     id="inputCreatePost"
//                                     name="username"
//                                     placeholder="(Ex. John123...)"
//                                 />
//                                 <label>Email: </label>
//                                 <ErrorMessage name="email" component="span" />
//                                 <Field

//                                     className="loginInput"
//                                     autoComplete="on"
//                                     id="inputCreatePost"
//                                     name="email"
//                                     placeholder="(Ex. John1@love.fr)"
//                                 />

//                                 <label>Password: </label>
//                                 <ErrorMessage name="password" component="span" />
//                                 <Field
//                                     className="loginInput"
//                                     autoComplete="on"
//                                     type="password"
//                                     id="inputCreatePost"
//                                     name="password"
//                                     placeholder="Your Password..."
//                                 />

// <button className="loginRegisterButton" type="submit"> Register</button>
                              
                          
//                                 <button className="loginButton" ><Link to="/Login">log in</Link> </button>
//                             </div>
//                         </div>
//                     </div>
//                 </Form>
//             </Formik>
//         </div>
//     );

// }
// export default Register;
// return (
//     <div className="login">
//         <div className="loginWrapper">
//             <div className="loginLeft">

//                 <h3 className="loginLogo">Bienvenue a Groupomaia</h3>
//                 <span className="loginDesc">Connectez vous avec vous amis</span>
//             </div>
//             <div className="loginRight">
//                 <div className="loginBox">



//                     <input placeholder="username" type="text" className="loginInput" />
//                     <input placeholder="email" type="text" className="loginInput" />
//                     <input placeholder="password" type="text" className="loginInput" />
//                     <input placeholder="password again" type="text" className="loginInput" />
//                     <button className="loginButton">Sign up</button>

//                     <button className="loginRegisterButton">log in to your count</button>

//                 </div>
//             </div>
//         </div>

//     </div>
// )
// import React from 'react'
// import { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { Redirect } from 'react-router-dom';
// import "./register.css"
// // function Registration() {
// function Register() {
//     const [redirect, setRedirect] = useState(false);
//     const initialValues = {
//         username: "",
//         email: "",
//         password: "",
//     };

//     const validationSchema = Yup.object().shape({
//         email: Yup.string().min(3).max(15).required(),
//         username: Yup.string().min(3).max(15).required(),
//         password: Yup.string().min(4).max(20).required(),
//     });

//     const onSubmit = (data) => {
//         axios.post("http://localhost:8800/auth", data).then(() => {
//             console.log(data);
//         });

//         setRedirect(true);
//     };
//     if (redirect) {
//         return <Redirect to="/login" />;
//     }
//     return (
//         <div>
//             <Formik
//                 initialValues={initialValues}
//                 onSubmit={onSubmit}
//                 validationSchema={validationSchema}
//             >
//                 <Form className="login ">
//                     <div className="loginWrapper">
//                         <div className="loginLeft">

//                             <h3 className="loginLogo">Bienvenue a Groupomaia</h3>
//                             <span className="loginDesc">Connectez vous avec vous amis</span>
//                         </div>
//                         <div className="loginRight">
//                             <div className="loginBox">
//                                 <label>Username: </label>
//                                 <ErrorMessage name="username" component="span" />
//                                 <Field
//                                     className="loginInput"
//                                     autoComplete="on"
//                                     id="inputCreatePost"
//                                     name="username"
//                                     placeholder="(Ex. John123...)"
//                                 />
//                                 <Field
//                                     className="loginInput"
//                                     autoComplete="on"
//                                     id="inputCreatePost"
//                                     name="email"
//                                     placeholder="(Ex. John1@love.fr)"
//                                 />

//                                 <label>Password: </label>
//                                 <ErrorMessage name="password" component="span" />
//                                 <Field
//                                     className="loginInput"
//                                     autoComplete="on"
//                                     type="password"
//                                     id="inputCreatePost"
//                                     name="password"
//                                     placeholder="Your Password..."
//                                 />

//                                 <button type="submit"> Register</button>
//                             </div>
//                         </div>
//                     </div>
//                 </Form>
//             </Formik>
//         </div>
//     );

// }
// export default Register;
