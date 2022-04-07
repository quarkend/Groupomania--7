import React from 'react'
import './profile.css'
export default function UpdateProfileUsername({submit, register, content}){
    return(
        <form className="user-action" onSubmit={submit}  >
        <div className="form-group">
              <label htmlFor="username"> { content || "username"}</label>
              <input className="card-edit" type="text" name="username" id="username" placeholder={ content === undefined ?  'username...' : content } ref={register}/>              
        </div>
  </form>
    )
}