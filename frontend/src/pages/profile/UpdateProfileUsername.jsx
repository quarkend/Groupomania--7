import React from 'react'
import './profile.css'
export default function UpdateProfileUsername({submit, register, content}){
    return(
        <form className="signup-form margin" onSubmit={submit}  >
        <div className="form-group">
              <label htmlFor="desc"> { content || "desc"}</label>
              <input className="add-input" type="text" name="desc" id="desc" placeholder={ content === undefined ?  'username...' : content } ref={register}/>              
        </div>
  </form>
    )
}