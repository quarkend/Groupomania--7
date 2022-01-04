
// import React from "react";


// import Topbar from "../../components/topbar/Topbar"
// import Sidebar from "../../components/sidebar/Sidebar"
// import Feed from "../../components/feed/Feed"
// import Rightbar from "../../components/rightbar/Rightbar"
// import "./home.css"

// export default function Home() {
//     return (

//         <div className="kontainer">


//             <div className="homeContainer">
//                 <Sidebar />
//                 <Feed />

//             </div>

//         </div>

//     );
// }



// // export default function Home() {
// //     return (

// //         <div className="kontainer">

// //             <Topbar />
// //             <div className="homeContainer">
// //                 <Sidebar />
// //                 <Feed />
// //                 <Rightbar />
// //             </div>

// //         </div>

// //     );
// // }

import React, { useEffect, useState, useContext } from "react";

// import Post from "./../../Post";
import { AuthContext } from './../../App';
import Feed from './../../components/feed/Feed';

import Post from './../../components/post/Post';
import Share from './../../components/share/Share';


const initialState = {
    posts: [],
    isFetching: false,
    hasError: false,
};

const reducer = (state, action) => {
    
    switch (action.type) {
        case "FETCH_POSTS_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false
            };
        case "FETCH_POSTS_SUCCESS":
            return {
                ...state,
                isFetching: false,
                posts: action.payload
            };
        case "FETCH_POSTS_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false
            };
        default:
            return state;
    }
};

export const Home = () => {
    const { state: authState } = React.useContext(AuthContext);
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        
        dispatch({
            type: "FETCH_POSTS_REQUEST"
        });
        fetch("/posts", {
            headers: {
                Authorization: `Bearer ${authState.token}`
            }
        })
            .then(res => {
                if (res.ok) {
               
                    return res.json();
                } else {
                    throw res;
                }
            })
            .then(resJson => {
        
                dispatch({
                    type: "FETCH_POSTS_SUCCESS",
                    payload: resJson,
                   
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: "FETCH_POSTS_FAILURE"
                });
            });
    }, [authState.token]);


    return (
        <React.Fragment>
            <div className="home">
                {state.isFetching ? (
                    <span className="loader">LOADING...</span>
                ) : state.hasError ? (
                    <span className="error">AN ERROR HAS OCCURED</span>
                ) : (
                    <>
                    
                     <Share />
                             {
                                 
            state.posts.map(post => (
                
              <Post key={post.id.toString()} post={post} />
            ))} 

            
                    </>
                )}
            </div>
        </React.Fragment>
    );
};
export default Home;

// // import React, { useEffect, useState, useContext } from "react";
// // import Card from "./../../components/Card";
// // // import Post from "./../../Post";
// // import { AuthContext } from './../../App';
// // import Feed from './../../components/feed/Feed';

// // import Post from './../../components/post/Post';
// // import Share from './../../components/share/Share';
// // import User from "../profile/User";


// // const initialState = {
// //     users: [],
// //     isFetching: false,
// //     hasError: false,
// // };

// // const reducer = (state, action) => {
    
// //     switch (action.type) {
// //         case "FETCH_POSTS_REQUEST":
// //             return {
// //                 ...state,
// //                 isFetching: true,
// //                 hasError: false
// //             };
// //         case "FETCH_POSTS_SUCCESS":
// //             return {
// //                 ...state,
// //                 isFetching: false,
// //                 posts: action.payload
// //             };
// //         case "FETCH_POSTS_FAILURE":
// //             return {
// //                 ...state,
// //                 hasError: true,
// //                 isFetching: false
// //             };
// //         default:
// //             return state;
// //     }
// // };

// // export const Home = () => {
// //     const { state: authState } = React.useContext(AuthContext);
// //     const [state, dispatch] = React.useReducer(reducer, initialState);

// //     React.useEffect(() => {
        
// //         dispatch({
// //             type: "FETCH_POSTS_REQUEST"
// //         });
// //         fetch("/users", {
// //             headers: {
// //                 Authorization: `Bearer ${authState.token}`
// //             }
// //         })
// //             .then(res => {
// //                 if (res.ok) {
               
// //                     return res.json();
// //                 } else {
// //                     throw res;
// //                 }
// //             })
// //             .then(resJson => {
        
// //                 dispatch({
// //                     type: "FETCH_POSTS_SUCCESS",
// //                     payload: resJson,
                   
// //                 });
// //             })
// //             .catch(error => {
// //                 console.log(error);
// //                 dispatch({
// //                     type: "FETCH_POSTS_FAILURE"
// //                 });
// //             });
// //     }, [authState.token]);


// //     return (
// //         <React.Fragment>
// //             <div className="home">
// //                 {state.isFetching ? (
// //                     <span className="loader">LOADING...</span>
// //                 ) : state.hasError ? (
// //                     <span className="error">AN ERROR HAS OCCURED</span>
// //                 ) : (
// //                     <>
                    
// //                      <Share />
// //                              {
                                 
// //             state.users.map(user => (
                
// //               <User key={user.id.toString()} user={user} />
// //             ))} 

            
// //                     </>
// //                 )}
// //             </div>
// //         </React.Fragment>
// //     );
// // };
// // export default Home;






// import React, { useEffect, useState, useContext } from "react";
// import Card from "./../../components/Card";
// // import Post from "./../../Post";
// import { AuthContext } from './../../App';
// import Feed from './../../components/feed/Feed';

// import Post from './../../components/post/Post';
// import Share from './../../components/share/Share';
// import User from "../profile/User";


// const initialState = {
//     posts: [],
//     isFetching: false,
//     hasError: false,
// };
// const initialStateu = {
//     users: [],
//     isFetching: false,
//     hasError: false,
// };
// const reducer = (state, action) => {
    
//     switch (action.type) {
//         case "FETCH_POSTS_REQUEST":
//             return {
//                 ...state,
//                 isFetching: true,
//                 hasError: false
//             };
//         case "FETCH_POSTS_SUCCESS":
//             return {
//                 ...state,
//                 isFetching: false,
//                 posts: action.payload
//             };
//         case "FETCH_POSTS_FAILURE":
//             return {
//                 ...state,
//                 hasError: true,
//                 isFetching: false
//             };       case "FETCH_U_REQUEST":
//             return {
//                 ...state,
//                 isFetching: true,
//                 hasError: false
//             };
//         case "FETCH_U_SUCCESS":
//             return {
//                 ...state,
//                 isFetching: false,
//                 posts: action.payload
//             };
//             case "FETCH_U_FAILURE":
//                 return {
//                     ...state,
//                     hasError: true,
//                     isFetching: false
//                 };
//         default:
//             return state;
//     }
// };

// export const Home = () => {
//     const { state: authState } = React.useContext(AuthContext);
//     const [state, dispatch] = React.useReducer(reducer, initialStateu);
 
//     React.useEffect(() => {
        
//         dispatch({
//             type: "FETCH_POSTS_REQUEST"
//         });
//         fetch("/posts", {
//             headers: {
//                 Authorization: `Bearer ${authState.token}`
//             }
//         })
//             .then(res => {
//                 if (res.ok) {
               
//                     return res.json();
//                 } else {
//                     throw res;
//                 }
//             })
//             .then(resJson => {
        
//                 dispatch({
//                     type: "FETCH_POSTS_SUCCESS",
//                     payload: resJson,
                   
//                 });
//             })
//             .catch(error => {
//                 console.log(error);
//                 dispatch({
//                     type: "FETCH_POSTS_FAILURE"
//                 });
//             });
//     }, [authState.token]);

//     React.useEffect(() => {
        
//         dispatch({
//             type: "FETCH_U_REQUEST"
//         });
//         fetch("/users", {
//             headers: {
//                 Authorization: `Bearer ${authState.token}`
//             }
//         })
//             .then(res => {
//                 if (res.ok) {
               
//                     return res.json();
//                 } else {
//                     throw res;
//                 }
//             })
//             .then(resJson => {
        
//                 dispatch({
//                     type: "FETCH_U_SUCCESS",
//                     payload: resJson,
                   
//                 });
//             })
//             .catch(error => {
//                 console.log(error);
//                 dispatch({
//                     type: "FETCH_U_FAILURE"
//                 });
//             });
//     }, [authState.token]);
//     return (
//         <React.Fragment>
//             <div className="home">
//                 {state.isFetching ? (
//                     <span className="loader">LOADING...</span>
//                 ) : state.hasError ? (
//                     <span className="error">AN ERROR HAS OCCURED</span>
//                 ) : (
//                     <>
                    
//                      <Share />
//                              {
                                 
//             state.posts.map(post => (
                
//               <Post key={post.id.toString()} post={post} />
//             ))} 

            
//                     </>
//                 )}



               
//             </div>
//             <div>
//             <div className="e">
//                 {state.isFetching ? (
//                     <span className="loader">LOADING...</span>
//                 ) : state.hasError ? (
//                     <span className="error">AN ERROR HAS OCCURED</span>
//                 ) : (
//                     <>
                    
               
//                              {
                                 
//             state.users.map(user => (
                
//               <User key={user.id.toString()} user={user} />
//             ))} 

            
//                     </>
//                 )}



               
//             </div>
       
//             </div>

            
//         </React.Fragment>
//     );
// };
// export default Home;