import React from 'react'
import "./register.css"
export default function Register() {
    return (
        <div className="login">
            <div class="loginWrapper">
                <div class="loginLeft">
                    <h3 class="loginLogo">Bienvenue a Groupomaia</h3>
                    <span class="loginDesc">Connectez vous avec vous amis</span>
                </div>
                <div class="loginRight">
                    <div class="loginBox">
                        <input placeholder="username" type="text" class="loginInput" />
                        <input placeholder="email" type="text" class="loginInput" />
                        <input placeholder="password" type="text" class="loginInput" />
                        <input placeholder="password again" type="text" class="loginInput" />
                        <button class="loginButton">Sign up</button>

                        <button class="loginRegisterButton">log in to your count</button>

                    </div>
                </div>
            </div>

        </div>
    )
}
