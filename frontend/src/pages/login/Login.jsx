import React from 'react'
import "./login.css"
export default function Login() {
    return (
        <div className="login">
            <div class="loginWrapper">
                <div class="loginLeft">
                    <h3 class="loginLogo">Bienvenue a Groupomaia</h3>
                    <span class="loginDesc">Connectez vous avec vous amis</span>
                </div>
                <div class="loginRight">
                    <div class="loginBox">
                        <input placeholder="email" type="text" class="loginInput" />
                        <input placeholder="password" type="text" class="loginInput" />
                        <button class="loginButton">Log In</button>
                        <span class="loginForgot">forgot pass!</span>
                        <button class="loginRegisterButton">Creat a count</button>

                    </div>
                </div>
            </div>

        </div>
    )
}
