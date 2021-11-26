import React, { useState, useCallback, useContext, useMemo, createContext } from 'react';
import AuthApi from './../../components/AuthApi';
import Cookies from 'js-cookie';
// import { useHistory, Link } from "react-router-dom";
const FormContext = createContext({})

function FormWithContext({ defaultValue, onSubmit, children }) {

    const [data, setData] = useState(defaultValue)

    const change = useCallback(function (name, value) {
        setData(d => ({ ...d, [name]: value }))
    }, [])

    const value = useMemo(function () {
        return { ...data, change }
    }, [data, change])

    const handleSubmit = useCallback(function (e) {
        e.preventDefault()
        onSubmit(value)
    }, [onSubmit, value])

    return <FormContext.Provider value={value}>
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    </FormContext.Provider>
}

function FormField({ name, type, children }) {
    const data = useContext(FormContext)
    const handleChange = useCallback(function (e) {
        data.change(e.target.name, e.target.value)
    }, [data])

    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type={type} name={name} id={name} className="form-control" value={data[name] || ''} onChange={handleChange} />
    </div>
}

function PrimaryButton({ children }) {
    return <button className="btn btn-info">{children}</button>
}

function Login() {
    localStorage.clear();
    const [error, setError] = useState(null);
    const Auth = React.useContext(AuthApi);

    const handleSubmit = useCallback(function (value) {

        fetch("http://localhost:8800/api/auth/login/", {
            method: "post",
            headers: { "Content-type": 'application/json' },
            body: JSON.stringify({
                email: value.email,
                password: value.password
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    localStorage.setItem('accessToken', JSON.stringify(result));
                    let storage = JSON.parse(localStorage.getItem('accessToken'));
                    if (storage.token === undefined) {
                        Auth.setAuth(false)
                        alert("Utilisateur non identifié. Tentez de vous connecter à nouveau !")
                    } else {
                        Auth.setAuth(true)
                        Cookies.set("user", "loginTrue")

                        alert("La communauté de Groupomania est contente de vous revoir !")

                    }

                },
                (error) => {
                    if (error) {
                        setError(error);
                        Auth.setAuth(false)
                    }
                }
            )

    }, [Auth])

    if (error) {
        return <div>Erreur : {error.message}</div>;

    } else {
        return (

            <React.Fragment>
                <div className="container">

                    <h1>Connectez-vous à votre compte</h1>
                    <FormWithContext onSubmit={handleSubmit}>
                        <FormField name="email" type="text">Email</FormField>
                        <FormField name="password" type="password">Mot de passe</FormField>
                        <PrimaryButton>Me connecter</PrimaryButton>
                    </FormWithContext>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useHistory, Link } from "react-router-dom";
// import { AuthContext } from './../../helpers/AuthContext';


// import "./login.css"

// function Login() {

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const { setAuthState } = useContext(AuthContext);

//     let history = useHistory();

//     const login = () => {
//         const data = { email: email, password: password };
//         axios.post("http://localhost:8800/api/auth/login", data).then((response) => {
//             if (response.data.error) {
//                 alert(response.data.error);
//             } else {


//                 setAuthState({

//                     email: response.data.email,
//                     id: response.data.id,
//                     status: true,
//                 });

//                 console.log('setAuthState: ', JSON.stringify(response));
//                 localStorage.setItem('accessToken', JSON.stringify(response.data));
//                 // localStorage.setItem('us', JSON.stringify(response.data));

//                 history.push("/");
//             }
//         });
//     };
//     return (


//         <div className="login">
//             <div className="loginWrapper">
//                 <div className="loginLeft">
//                     <h3 className="loginLogo">Bienvenue a Groupomaia</h3>
//                     <span className="loginDesc">Connectez vous avec vous amis</span>
//                 </div>
//                 <div className="loginRight">
//                     <div className="loginContainer">

//                         <label>email:</label>
//                         <input
//                             type="text"
//                             onChange={(event) => {
//                                 setEmail(event.target.value);
//                             }}
//                         />
//                         <label>Password:</label>
//                         <input
//                             type="password"
//                             onChange={(event) => {
//                                 setPassword(event.target.value);
//                             }}
//                         />



//                         <button className="loginButton" onClick={login}> Login </button>
//                         <button className="loginRegisterButton">Creat a count<Link to="/Register">inscrivez-vous ici</Link> </button>
//                     </div>

//                 </div>
//             </div>

//         </div>

//     )
// }
// export default Login;

// // {/* <div className="loginBox">
// //     <input placeholder="email" type="text" className="loginInput" />
// //     <input placeholder="password" type="text" className="loginInput" />
// //     <button className="loginButton">Log In</button>
// //     <span className="loginForgot">forgot pass!</span>
// //     <button className="loginRegisterButton">Creat a count</button>

// // </div> */}