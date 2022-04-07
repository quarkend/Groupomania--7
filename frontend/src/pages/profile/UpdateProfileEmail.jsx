import React from 'react'
import './profile.css'
export default function UpdateProfileEmail({submit, register, content}){
    return(
        <form className="user-action" onSubmit={submit}  >
        <div className="form-group">
              <label htmlFor="email"> { content || "email"}</label>
              <input className="add-input" type="text" name="email" id="email" placeholder={ content === undefined ?  'email...' : content } ref={register}/>              
        </div>
  </form>
    )
}