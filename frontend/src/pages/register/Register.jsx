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
