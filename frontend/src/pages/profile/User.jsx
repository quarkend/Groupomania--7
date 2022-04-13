import React from 'react'
import { axios } from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {  useParams,useHistory ,Link} from 'react-router-dom';
import { Cancel } from '@material-ui/icons';
import Post from '../../components/post/Post';
import UpdateProfilePhoto from './UpdateProfilePhoto';

import UpdateProfileUsername from './UpdateProfileUsername';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form'
import Moment from 'react-moment';
import UpdateProfileEmail from './UpdateProfileEmail';
import { AuthContext } from '../../App';
import Logout from './../logout/Logout';
const POSTS_URL = "/posts/"
const UPDATE = "/users/"
const DELETE_ACCOUNT_URL = "/users/delete/"


export default function User({user,post}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState('')
    const { handleSubmit, register } = useForm()
    const [showUpdatePhoto, setShowUpdatePhoto] = useState(false);
    const [showUpdateEmail, setShowUpdateEmail] = useState(false)
    const [showUpdateUsername, setShowUpdateUsername] = useState(false)
    const { state, dispatch } = React.useContext(AuthContext);
    const history = useHistory();
    let { id} = useParams();
     const storage = JSON.parse(localStorage.getItem('user'));
    const posts = JSON.parse(localStorage.getItem('userposts'));
 
    const token = "Bearer " +JSON.parse(localStorage.getItem('token'));
 
const userId = state.user.id;
 async function handleUpdateProfilePhoto(data) {
  
        const formData = new FormData()
        formData.append('image', data.image[0])
        const sendPhoto = await fetch(`${'/users'}/${storage.id}`, {
            method: 'put',
            headers: {
                Authorization: "Bearer " + token
            },
            body: formData
        })
        const response = await sendPhoto.json()
        console.log(response)
        getPostData()
        setShowUpdatePhoto(false)
    }
    async function handleUpdateProfileUsername(data) {
     
        const sendedUsername = await fetch( "http://localhost:8800/api/users/"+ user.id, {
              method: 'put',
              headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
              },
              body: JSON.stringify(data)
        })
        const response = await sendedUsername.json()
        console.log(response)


        getUserData()
        setShowUpdateUsername(false)
  }
    async function handleUpdateProfileEmail(data) {
        
        const sendedEmail = await fetch( "http://localhost:8800/api/users/"+ user.id, {
              method: 'put',
              headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    Authorization: "Bearer " + token
              },
              body: JSON.stringify(data)
        })
        const response = await sendedEmail.json()
        console.log(response)
        getUserData()
        setShowUpdateEmail(false)
  }
    async function getUserData() {
        const URL = `${"/users/"}/${userId}`
        const data = await fetch(URL, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const response = await data.json()
        setData(response)
        console.log(response)
 
            setIsLoaded(true);
            setError(error);
        
    }
    useEffect(() => {
        getUserData()
       
    }, [])
    async function getPostData() {
        const URL = `${POSTS_URL}`
        const data = await fetch(URL, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const response = await data.json()
        setData(response)
        console.log(response)
        setIsLoaded(true);
        setError(error);
    }
    useEffect(() => {
        getPostData()
    }, [])
    //  Supprimer utilisateur
    // const deleteUser = async (event) => {
    //      event.preventDefault();

    //     try {
    //         await fetch(`/profile/${userId}`, "DELETE", null, {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + token,
    //         });
    //                  localStorage.clear();
    //  window.location.reload();
    //  Logout();
    //      history.push("/");
          
           
    //     } catch (err) { }
    // };

    // async function deleteUser() {
    //     const URL = `${"/users/"}/${userId}`
    //     const data = await fetch(URL,"delete",
    //          {
    //         headers: {
    //             Authorization: 'Bearer ' + token
    //         }
    //     })
    //     const response = await data.json()
    //     setData(response)
    //     console.log(response)
    //     // localStorage.clear();
    //     // window.location.reload();
    //     // history.push("/");
    // }
    useEffect(() => {
        getUserData()
       
    }, [])
const deleteUser = (id) => {
   
  axios.delete(`/users/${id}`,
            {
                headers:
                    { "Authorization": token }
            })
        .then(() => {
            
            window.location.reload();
            history.push("/");
            Logout();
        });
};
let idUser;
 if (error) {
    return <div>Erreur : {error.message}</div>;
} else if (!isLoaded) {
    return <div>Chargement...</div>;
} else
 if (state.user.id === id || state.user.isAdmin === true) {
    idUser = <div className="user-button">
          <Fragment>
          
          <div className="card"> 
        

         
<div className="user-action">
                                   <i className="fas fa-user white fa-3x" onClick={() => {
                                         setShowUpdateUsername(!showUpdateUsername)
                                         setShowUpdateEmail(false)
                                         setShowUpdatePhoto(false)
                                   }}
                                   >  </i>
                                   <i className="fas fa-envelope-open white fa-3x" onClick={() => {
                                         setShowUpdateEmail(!showUpdateEmail)
                                         setShowUpdatePhoto(false)
                                         setShowUpdateUsername(false)
                                   }}>
                                   </i>
                                   <i className="fas fa-portrait white fa-3x" onClick={() => {
                                         setShowUpdatePhoto(!showUpdatePhoto)
                                         setShowUpdateEmail(false)
                                         setShowUpdateUsername(false)
                                   }}>
                                   </i>
                                   <i className="fas fa-user-slash white fa-3x" onClick={() => { history.push("/deleteuser/" + id) }}></i>
                             </div>
         </div> 
          {showUpdatePhoto &&
                             <UpdateProfilePhoto submit={handleSubmit(handleUpdateProfilePhoto)} register={register({ required: true })} />
                       }

                       {showUpdateUsername &&
                             <UpdateProfileUsername submit={handleSubmit(handleUpdateProfileUsername)} register={register({ required: true })} />
                       }
                           {showUpdateEmail &&
                             <UpdateProfileEmail submit={handleSubmit(handleUpdateProfileEmail)} register={register({ required: true })} />
                       } 
     </Fragment>
       
        <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/deleteuser/" + userId) }}>Supprimer</button>
        <button className="btn btn-outline-dark btn-sm" >Déconnecter</button>
    </div>
}

    return (
           
        <div className="card">
                  <div className="detail">
            <h1 > {user.username} </h1>
            <img className="postProfileImg"
                                src={"http://localhost:8800/images/" + user.profilePicture}
                                alt="user"
                            />
            <h1 > {user.email} </h1>
            <h1 > {user.profilePicture} </h1>
      
        
            
           
          
      
            <div className="postsAdmin" >
                    
    
                                    <div >
                          
                         
                                   
                       {idUser}
                                  
  
                                </div>
                                
                   
                </div>
            
            </div>
        </div>
    )
}
