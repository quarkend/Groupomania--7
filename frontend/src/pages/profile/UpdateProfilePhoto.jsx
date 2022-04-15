
import React, { useEffect } from 'react';
import "./share.css";
import {
      PermMedia,
   
} from "@material-ui/icons";
export default function UpdateProfilePhoto({ submit, register, title }) {
      const [image, setImage] = React.useState("")
      const [previewUrl, setPreviewUrl] = React.useState("")
      function imageHandler(e) {
            if (e.target.files) {
                  const pickedImage = e.target.files[0]
                  setImage(pickedImage)
                  console.log("PREVIEW", pickedImage)
            }
            else {
            }
      }
      useEffect(() => {
            if (image) {
                  const imageReader = new FileReader()
                  imageReader.onload = () => {
                        setPreviewUrl(imageReader.result)
                  }
                  imageReader.readAsDataURL(image)
            } else {
                  return
            }
      }, [image])
      return (
            <form className="user-action" encType="multipart/form-data" onSubmit={submit}  >
                  <div className="form-group">


                        <label htmlFor="file" className="shareOption">
                              <PermMedia htmlColor="tomato" className="shareIcon" />
                              <span className="shareOptionText">Selectioner une photo</span>
                              <input
                                    style={{ display: "none" }}
                                    className="shareInput"
                                    type="file" name="image" accept=".jpeg, .png, .jpg, .gif" onChange={imageHandler} ref={register}

                              />
                        </label>
                        {previewUrl &&
                              <div >
                                    <img src={previewUrl} alt="" />
                              </div>
                        }
                  </div>


                  <button className="fa-solid fa-highlighter   " type="submit" >Mettre à jour</button>
            </form>
      )
}

