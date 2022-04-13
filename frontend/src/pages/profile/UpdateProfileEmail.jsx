import React from 'react'
import './profile.css'
export default function UpdateProfileEmail({submit, register, content}){
    return(
        <form className="card-input" onSubmit={submit}  >
        <div className="form-group">
              <label htmlFor="email"> { content || "Email"}</label>
              <input className="add-input" type="text" name="email" id="email" placeholder={ content === undefined ?  'E-mail...' : content } ref={register}/>              
        </div>
  </form>
    )
}