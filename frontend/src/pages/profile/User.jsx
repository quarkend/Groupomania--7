import React from 'react'
import { axios } from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';

export default function User({user}) {
    const history = useHistory();


const storage = JSON.parse(localStorage.getItem('user'));
const token = storage.token;

// useEffect(() => {
//     axios.get(`/user`,
//     {
//         headers: {Authorization: token}
//     }).then((response) => {
//         setUser(response.data)
//     })
// })
// const deleteUser = (id) => {
//     axios.delete(`/user`, 
//     {
//         headers : {"Authorization" : token}
//     }
//     ).then(()=>
//     {
//         history.push("/")
//     })

// }
const id = storage.id;

const deleteUser = (id) => {
    axios.delete(`/users/${id}`,

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
      
            <Cancel onClick={()=>{deleteUser(user.id)}}>XX</Cancel>
            <Cancel className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/deleteuser/" + id) }}>Supprimer</Cancel>
            </div>
        </div>

    )
}
