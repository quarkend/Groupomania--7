import React from 'react'
import { axios } from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {  useParams,useHistory } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';
export default function User({user}) {
    const history = useHistory();
     const token = JSON.parse(localStorage.getItem('user'));
     const storage = JSON.parse(localStorage.getItem('user'));
const userId = storage.id;
let { id } = useParams();
const deleteUser = (id) => {
    axios.delete(`/users/${user.id}`,
            {
                headers:
                    { "Authorization": token }
            })
        .then(() => {
            history.push("/");
        });
};
    return (
           
        <div className="card">
                  <div className="detail">
            <h1 > {user.username} </h1>
            <h1 > {user.email} </h1>
            <h1 > {user.profilePicture} </h1>
      
            {/* <Cancel onClick={()=>{deleteUser(storage.id)}}>XXxxxxxx</Cancel> */}
            <li className="fas fa-user-slash white fa-3x"  onClick={() => { history.push("/deleteuser/" + id) }}>Supprimer</li>
            
            </div>
        </div>
    )
}
