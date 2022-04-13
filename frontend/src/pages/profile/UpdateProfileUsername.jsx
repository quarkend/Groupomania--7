import React from 'react'
import './profile.css'
export default function UpdateProfileUsername({submit, register, content}){
    return(
        <form className="card-input" onSubmit={submit}  >
        <div className="form-group ">
              <label htmlFor="Noveau Username"> { content || "Username"}</label>
              <input className="card-edit" type="text" name="username" id="username" placeholder={ content === undefined ?  'Username...' : content } ref={register}/>              
        </div>
  </form>
    )
}