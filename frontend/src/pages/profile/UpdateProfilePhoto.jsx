
import  React, {useState, useEffect }  from 'react';

export default function UpdateProfilePhoto({submit, register, title}){
           const [image, setImage] = React.useState("")
           const [previewUrl, setPreviewUrl] = React.useState("")
           function imageHandler(e){
            if(e.target.files){
                 const pickedImage = e.target.files[0]
                 setImage(pickedImage)
                 console.log("PREVIEW", pickedImage )
            }
            else{
            }
           }
           useEffect(()=>{
                 if(image){
                              const imageReader = new FileReader()
                              imageReader.onload = ()=>{
                                    setPreviewUrl(imageReader.result)
                              }
                              imageReader.readAsDataURL(image)
                 }else{
                       return
                 }
           },[image])



           
      return(
                  <form className="user-action"  encType="multipart/form-data" onSubmit={submit}  >
                        <div className="form-group">
                              <label htmlFor="user-pic">{ title || "Selectioner une photo de profil" }</label>
                              <input type="file" id="user-pic" name="image" accept=".jpeg, .png, .jpg, .gif" onChange={imageHandler} ref={register}/>
                              { previewUrl &&
                                    <div className="profile-image-div ">
                                          <img src={previewUrl} alt=""/>
                                    </div>
                              }
                        </div>
                        <button type="submit">Mettre à jour</button>
                  </form>
      )
}
{/* <div className="image-preview"> */}
