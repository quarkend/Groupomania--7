import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../App';
import Cookies from 'js-cookie';

export default function DeleteUser() {
    const Auth = React.useContext(AuthContext);

    const storage = JSON.parse(localStorage.getItem('user'));
    const userId = storage.id;

    let token = "Bearer " + storage.token;

    const handleSubmit = useCallback(function (value) {


        fetch(('/users/' + userId), {
            method: "delete",
            headers:
            {
                "Content-type": 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                id: value.id,
                userId: userId,
               
            })
        })
            .then(res => res.json())
            .then(
                (res) => {
                    if (res.error) {
                        alert("Votre compte n'a pas pu être supprimé.");
                    } else {
                        alert("Compte supprimé !")
                        Auth.setAuth(false);
                        Cookies.remove("user");
                        localStorage.clear();
                    }
                }
            )
            .catch(error => {
          
                alert("Votre compte n'a pas pu être supprimé !");
                console.error('There was an error!', error);
            })
    }, [Auth, userId, token])

    return (
        <div className="container">
            <h1>Souhaitez vous vraiment supprimer votre compte ?</h1>
            <div className="form-submit">
                {/* <Link to={'/profile/' + userId} className="btn btn-outline-info btn-sm">Retour à mon compte</Link> */}
                <button className="btn btn-outline-danger btn-sm" onClick={handleSubmit}>Supprimer mon compte</button>
            </div>
        </div>
    );
}

// import { Link } from 'react-router-dom';
// import React, { useEffect, useState, useContext } from "react";
// import Card from "./../../components/Card";
// // import Post from "./../../Post";
// import { AuthContext } from './../../App';
// import Feed from './../../components/feed/Feed';

// import Post from './../../components/post/Post';
// import Share from './../../components/share/Share';
// import User from "../profile/User";
// import { useCallback } from 'react';



// const storage = JSON.parse(localStorage.getItem('user'));
// const userId = storage.id;

// let token = "Bearer " + storage.token;
// const initialState = {
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
//             };
//             case "DELETE_USER":
//                 return {
//                     ...state,
//                     hasError: true,
//                     isFetching: false
//                 };
//         default:
//             return state;
//     }
// };

// export const DeleteUser= () => {

//     const Auth = React.useContext(AuthContext);
//     const { state: authState } = React.useContext(AuthContext);
//     const [state, dispatch] = React.useReducer(reducer, initialState);


//     const handleSubmit = useCallback(function (value) {


//         fetch(('/users/' + userId), {
//             method: "delete",
//             headers:
//             {
//                 "Content-type": 'application/json',
//                 'Authorization': token
//             },
//             body: JSON.stringify({
//                 id: value.id,
//                 userId: userId,
               
//             })
//         })
//             .then(res => res.json())
//             .then(
//                 (res) => {
//                     if (res.error) {
//                         alert("Votre compte n'a pas pu être supprimé.");
//                     } else {
//                         alert("Compte supprimé !")
//                         Auth.setAuth(false);
                      
//                         localStorage.clear();
//                     }
//                 }
//             )
//             .catch(error => {
          
//                 alert("Votre compte n'a pas pu être supprimé !");
//                 console.error('There was an error!', error);
//             })
//     }, [Auth, userId, token])




//     React.useEffect(() => {



        
//         dispatch({
//             type: "FETCH_POSTS_REQUEST"
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
                                 
//             state.users.map(user => (
                
//               <User key={user.id.toString()} user={user} />
//             ))} 

            
//                     </>
//                 )}
//                     <div className="container">
//             <h1>Souhaitez vous vraiment supprimer votre compte ?</h1>
//             <div className="form-submit">
//                 <Link to={'/user/' + authState.id} className="btn btn-outline-info btn-sm">Retour à mon compte</Link>
//                 <button className="btn btn-outline-danger btn-sm" onClick={handleSubmit}>Supprimer mon compte</button>
//             </div>
//         </div>
//             </div>
         
//         </React.Fragment>
//     );
// };
// export default DeleteUser;