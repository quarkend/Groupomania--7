import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Profile from './pages/profile/Profile';

import Topbar from "./components/topbar/Topbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "X":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || null)
    const token = JSON.parse(localStorage.getItem('token') || null)

    if(user && token){
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])
  return (
    <Router>
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
<Topbar/>
      {/* <div className="App">{!state.isAuthenticated ? <Login/> : <Home/>}</div> */}
      <Switch>
        <Route exact path="/">
          {state.isAuthenticated ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{state.isAuthenticated? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {state.isAuthenticated? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </AuthContext.Provider>
      </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import React from 'react'
// import Home from "./pages/home/Home";
// import Profile from './pages/profile/Profile';
// // import CreatePost from "./pages/CreatePost";
// // import Post from "./pages/CreateComment";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import PageNotFound from "./pages/PageNotFound";
// import AuthApi from './components/AuthApi';
// // import axios from "axios";
// // import ImageUpdate from './components/Images/ImageUpdate'
// // import CreateComment from './pages/CreateComment';
// // import AllPosts from './components/allPosts/AllPosts';
// import Cookies from 'js-cookie';
// // import { API_AUTH_AUTHUSER } from '../../constants/api'
// // import Topbar from './components/topbar/Topbar'
// // import Logout from './pages/logout/Logout';
// function App() {
//   const [auth, setAuth] = React.useState(false);

//   // gestion des cookies
//   const readCookie = () => {
//     const user = Cookies.get("user");
//     if (user) {
//       setAuth(false);
//     }
//   }

//   React.useEffect(() => {
//     readCookie();
//   }, [])



//   // Gestion de la NavBar
//   let navLink;
//   if (auth === true) {
//     const userLog = JSON.parse(localStorage.getItem('accessToken'));
//     const userId = userLog.id;

//     navLink = <>
//       <div className="mr-auto">
//         <Link to="/" className="nav-link">Tous les articles</Link>
//         <Link to={"/profile/" + userId} className="nav-link">Mon compte</Link>
//       </div>
//     </>
//   } else {
//     navLink = <div className="mr-auto">
//       <Link to="/register" className="nav-link">S'inscrire</Link>
//       <Link to="/login" className="nav-link">Se connecter</Link>
//     </div>
//   }

//   // const logout = () => {
//   //   localStorage.removeItem("accessToken");
//   //   setAuth({ username: "", id: 0, status: false });
//   // };

//   return (
//     <div className="App">
//       <AuthApi.Provider value={{ auth, setAuth }}>
//         <Router>
//           <div className="navbar">
//             <div className="links">

//             </div>
//             <div className="className= mr-auto">
//               <Link to="/" >Home</Link>
//               {navLink}
//               {/* <Link className="shareButton" onClick={logout} >Logout</Link> */}
//             </div>
//           </div>
//           <Switch>

//             <Route path="/" exact component={Home} />
//             {/* <Route path="/createComment" exact component={CreateComment} /> */}
//             {/* <Route path="/createpost" exact component={CreatePost} />
//             <Route path="/post/:id" exact component={Post} />
//             <Route path="/AllPosts/:id" exact component={AllPosts} /> */}
//             <Route path="/register" exact component={Register} />
//             <Route path="/login" exact component={Login} />

//             <Route path="/profile/:username" exact component={Profile} />
//             <Route path="*" exact component={PageNotFound} />
//             {/* <Route path="/imageupdate/:id" exact component={ImageUpdate} />  */}

//           </Switch>
//         </Router>
//       </AuthApi.Provider>
//     </div>
//   );
// }

// export default App;