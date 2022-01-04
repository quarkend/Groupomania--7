// //imports React
// import React from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';

// //imports composants



// // import UpdateAccount from './Users/UpdateAccount';
// // import DeleteAccount from './Users/DeleteAccount';
// // import DeleteUserAccount from './Users/DeleteUserAccount';
// // import Posts from './Posts/Posts';
// // import PostPage from './Posts/PostPage';
// // import CreatePost from './Posts/CreatePost';
// // import UpdateArticle from './Posts/UpdateArticle';
// // import DeleteArticle from './Posts/DeleteArticle';
// // import DeleteComment from './Comments/DeleteComment';
// // import ImageUpdate from './Images/ImageUpdate';
// import AuthApi from './AuthApi';
// import Home from './../pages/home/Home';
// import Signup from './../pages/register/Register';
// import Login from './../pages/login/Login';


// // import UsersPage from './../pages/Users/UsersPage';
// import Profile from './../pages/profile/Profile';

// const Routes = () => {

//     const Auth = React.useContext(AuthApi)

//     return (
//         <Switch>
//             <ProtectedLogin path="/" exact component={Home} />
//             <ProtectedLogin path="/signup" component={Signup} />
//             <ProtectedLogin path="/login" component={Login} auth={Auth.auth} />
//             <Route path="/profile/:username" component={Profile} />
//             {/* <ProtectedRoute path="/posts" auth={Auth.auth} component={Posts} /> */}
//             {/* <ProtectedRoute path="/user/:id" auth={Auth.auth} component={User} /> */}
//             {/* <ProtectedRoute path="/userdelete/:id" auth={Auth.auth} component={DeleteAccount} /> */}
//             {/* <Route path="/userupdate/:id" auth={Auth.auth} component={UpdateAccount} /> */}
//             {/* <Route path="/users/:id" auth={Auth.auth} component={UsersPage} />
//             <Route path="/createpost" auth={Auth.auth} component={CreatePost} />*/}
//             {/* <Route path="/post/:id" auth={Auth.auth} component={PostPage} /> */}
//             {/* <Route path="/postupdate/:id" auth={Auth.auth} component={UpdateArticle} />
//             <Route path="/postdelete/:id" auth={Auth.auth} component={DeleteArticle} />
//             <Route path="/deletecomment/:id" auth={Auth.auth} component={DeleteComment} />
//             <Route path="/imageupdate/:id" auth={Auth.auth} component={ImageUpdate} />
//             <Route path="/adminuserdelete/:id" auth={Auth.auth} component={DeleteUserAccount} />  */}
//         </Switch>
//     )
// }

// const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
//     return (
//         <Route
//             {...rest}
//             render={() => !auth ? (
//                 <div className="mr-auto">
//                     <Component />
//                 </div>
//             ) :
//                 (
//                     <Redirect to="/" />
//                 )
//             }
//         />
//     )
// }

// const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
//     return (
//         <Route
//             {...rest}
//             render={() => auth ? (
//                 <div className="mr-auto">
//                     <Component />
//                 </div>
//             ) :
//                 (
//                     <Redirect to="/login" />
//                 )
//             }
//         />
//     )
// }

// export default Routes;

