import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from './../../helpers/AuthContext';


import "./login.css"

function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext);

    let history = useHistory();

    const login = () => {
        const data = { username: username, email: email, password: password };
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                    status: true,
                });
                history.push("/");
            }
        });
    };
    return (


        <div className="login">
            <div class="loginWrapper">
                <div class="loginLeft">
                    <h3 class="loginLogo">Bienvenue a Groupomaia</h3>
                    <span class="loginDesc">Connectez vous avec vous amis</span>
                </div>
                <div class="loginRight">
                    <div className="loginContainer">
                        <label>Username:</label>
                        <input
                            type="text"
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        <label>email:</label>
                        <input
                            type="text"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />



                        <button class="loginButton" onClick={login}> Login </button>
                        <button class="loginRegisterButton">Creat a count<Link to="/Register">inscrivez-vous ici</Link> </button>
                    </div>

                </div>
            </div>

        </div>

    )
}
export default Login;

// {/* <div class="loginBox">
//     <input placeholder="email" type="text" class="loginInput" />
//     <input placeholder="password" type="text" class="loginInput" />
//     <button class="loginButton">Log In</button>
//     <span class="loginForgot">forgot pass!</span>
//     <button class="loginRegisterButton">Creat a count</button>

// </div> */}