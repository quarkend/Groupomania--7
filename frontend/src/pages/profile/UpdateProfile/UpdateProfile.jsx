// import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// // import NavBtn from "../../../components/NavBtn/NavBtn";
// import { useForm } from "../../../hooks/form-hook";

// import styles from "./UpdateProfile.css";

// import Share from '../../../components/share/Share';
// import ImageUpload from "../../../components/ImageUpload/ImageUpload";
// import { FaYahoo } from "react-icons/fa";

// // import ConfirmModal from './../../../components/ConfirmModal/ConfirmModal';

// import { AuthContext } from './../../../App';
// const token = "Bearer " + JSON.parse(localStorage.getItem('token'));
// // const user = JSON.parse(localStorage.getItem('user'));
// export default function UpdateProfile() {
//     // Authentication context
//     const auth = useContext(AuthContext);
// const user = JSON.parse(localStorage.getItem('user'))
// const id = user.id
//     // const [userDataState, setUserDataState] = useState('')
//     // History context
//     const history = useHistory();
   
//     // Profile useState
//     const [userDataState, setUserDataState] = useState('');
 

//     // Form useState
//     const [formState, inputHandler, setFormState] = useForm(
//         {
//             profilePicture: {
//                 value: null,
                
//             },
//             username: {
//                 value: "",
               
//             },
//             email: {
//                 value: "",
           
//             }
//         },
//      false
//     );
//     // Fetch User et initialiser le formState
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const userData = await fetch(
//                     `${'/users'}/${user.id}`,
//                     "GET",
//                     null,
//                     {
//                         Authorization:  token,
//                     }
//                 );
//                 setUserDataState(userData);
//                 setFormState(
//                     {
//                         profilePicture: {
//                             value: userData.profilePicture,
                           
//                         },
//                         username: {
//                             value: userData.username,
                          
//                         },
//                         email: {
//                             value: userData.email,
//                             // isValid: true,
//                         }

//                     },
//                     false
//                 );
//             } catch (err) { }
//         };
//         fetchUser();
//     }, [user.id, setFormState]);
//     // Mettre à jour les donnés de l'utilisateur
//     const updateProfileHandler = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append("image", formState.inputs.profilePicture.value);
//         formData.append("username",formState.inputs.username.value);
//         formData.append("email", formState.inputs.email.value);
//         // formData.append("password", formState.inputs.password.value);
   

//         try {
//             await axios.put("http://localhost:8800/api/users/" + user.id, formData,

//                 {
//                     headers:
//                         { "Authorization": token }
//                 }

//             )



//             window.location.reload();
//         } catch (err) { }
//     };
//     console.log(formState.inputs.username)


//     async function getUserData() {
//         const URL = `${"http://localhost:8800/api/users/"}/${user.id}`
//         const userDataState = await fetch(URL, {
//             headers: {
//                 Authorization: 'Bearer ' + token
//             }
//         })
//         const response = await userDataState.json()
//         setUserDataState(response)
//         console.log(response)
//     }
//     useEffect(() => {
//         getUserData()
//     }, [])
   
//     // };
//     if (!userDataState) {
//         return (
//             <>
//                 <div >
//                     <h2>No User Data!</h2>
//                 </div>
//             </>
//         );
//     }
//     // Mettre à jour le mot de passe de l'utilisateur
//     const updatePasswordHandler = async (event) => {
//         event.preventDefault();

//         try {
//             await fetch(
//                 `${"http://localhost:8800/api/users/update"}/${user.id}`,
//                 "PUT",
//                 JSON.stringify({
//                     password: formState.inputs.password.value,
//                 }),
//                 {
//                     "Content-Type": "application/json",
//                     Authorization: "Bearer " + token,
//                 }
//             );

//             // écran de confirmation
         
//         } catch (err) { }
//     };
//     return (
//         <>
//             <div
//                 // show={showConfirmModal}
//                 // message="Votre profil a été bien mis a jour !"
//                 // onCancel={closeConfirmModalHandler}
//             />
//             <div className="card">
//                 {(
//                     <div className={styles.wrapper}>
//                         <ImageUpload
//                             center
//                             id="profilePicture"
//                             onInput={inputHandler}
//                             errorText="Choisissez une image"
//                             profilePicture={userDataState.profilePicture}
//                         />
//                         <h4 className={styles.title}>Vos informations personnelles</h4>

//                         {/* {desktopNav} */}
//                         <div className="user-info">
//                             <p>image : {userDataState.profilePicture}</p>
//                             <p>Username : {userDataState.username}</p>
//                             <p>Email : {userDataState.email}</p>
//                             <p>Profil crée le : {userDataState.createdAt}</p>
//                             <p>Profil Modifié le : {userDataState.updatedAt}</p>
//                         </div>

//                         {userDataState.profilePicture && (
//                             <div className="card">

//                                 <img className="shareImg" src={"http://localhost:8800/images/" + userDataState.profilePicture} alt="profilePicture" />

//                             </div>
//                         )}

//                         <form id="update-form" className={styles.update_list} onSubmit={updateProfileHandler}>
//                             <input
//                                 id="username"
//                                 label="username:"
//                                 name="username"
//                                 type="text"
//                                 placeholder="user name"
                    
//                                 onInput={inputHandler}
//                                 initialValue={userDataState.username}

//                             />
//                             <input
//                                 id="email"
//                                 label="E-mail :"
//                                 name="email"
//                                 type="email"
//                                 placeholder="Votre e-mail"
                           
//                                 // validators={[isEmail(), MinLength(6), MaxLength(100)]}
//                                 errorText="Votre email n'est pas correct"
//                                 onInput={inputHandler}
//                                 initialValue={userDataState.email}
//                             />
//                             <button

//                                 id="update-profile-btn"
//                                 className="shareButton"
//                                 form="update-form"
//                                 name="Mettre à jour mon profil"
//                                 type="submit"
//                             >update-profile-btn :)</button>
//                         </form>
//                         <h4 className={styles.title}>Changer mon mot de passe</h4>
//                         <form id="update-password-form"  onSubmit={updatePasswordHandler}>
//                             <input
//                                 id="password"
//                                 label="Mot de passe :"
//                                 name="password"
//                                 type="password"
//                                 placeholder="Votre nouveau mot de passe"
                              
//                                 element="input"
                          
                             
                          
                            
//                                 onInput={inputHandler}
//                                 // initialValue={formState.inputs.password.value}
//                                 // initialValid={formState.inputs.password.isValid}
//                             />
//                         </form>
//                      <button       className="shareButton"
//                             id="update-password-btn"
//                             form="update-password-form"
//                             name="Changer mon mot de passe"
//                             type="submit"
//                             btnType="valid"> up mot de pass</button>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };