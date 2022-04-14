// import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// // import NavBtn from "../../../components/NavBtn/NavBtn";
// import { useForm } from "../../../hooks/form-hook";
// import { AuthContext } from '../../../App';
// import styles from "./MyPost.css";


// import ImageUpload from "../../../components/ImageUpload/ImageUpload";
// // const { user } = useContext(AuthContext);
// // import ConfirmModal from './../../../components/ConfirmModal/ConfirmModal';
// const token = "Bearer " + JSON.parse(localStorage.getItem('token'));

// const UpdateProfile = () => {
//     const user =  JSON.parse(localStorage.getItem('user'));
//     // Authentication context
  
//    const userId=user.id;
    
//     // History context
//     const history = useHistory();
//     // Backend Request Hook


//     // Profile useState
//     const [userDataState, setUserDataState] = useState();

//     // Delete message useState
//     const [showInfo, setShowInfo] = useState(false);

//     // Show confirm modal useState
//     const [showConfirmModal, setShowConfirmModal] = useState(false);

//     // Form useState
//     const [formState, inputHandler, setFormState] = useForm(
//         {
//             image: {
//                 value: null,
//                 isValid: false,
//             },
//             username: {
//                 value: "",
//                 isValid: false,
//             },
//             username: {
//                 value: "",
//                 isValid: false,
//             },
//             email: {
//                 value: "",
//                 isValid: false,
//             },
//             department: {
//                 value: "",
//                 isValid: false,
//             },
//             role: {
//                 value: "",
//                 isValid: false,
//             },
//             linkedin_url: {
//                 value: "",
//                 isValid: false,
//             },
//             password: {
//                 value: "",
//                 isValid: false,
//             },
//         },
//         false
//     );

//     // Fetch User et initialiser le formState
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const userData = await fetch(
//                     `http://localhost:8800/api/users/${user.userId}`,
//                     "GET",
//                     null,
//                     {
//                         Authorization: "Bearer " +token,
//                     }
//                 );
//                 setUserDataState(userData);
//                 setFormState(
//                     {
//                         img: {
//                             value: userData.img,
//                             isValid: false,
//                         },
                       
//                         username: {
//                             value: userData.username,
//                             isValid: true,
//                         },
                      
//                        isAdmin: {
//                             value: userData.role,
//                             isValid: true,
//                         },
//                         email: {
//                             value: userData.email,
//                             isValid: true,
//                         }
//                     },
//                     true
//                 );
//             } catch (err) { }
//         };
//         fetchUser();
//     }, [ user.userId, user.token, setFormState]);

//     // Mettre à jour les donnés de l'utilisateur
//     const updateProfileHandler = async (event) => {
//         event.preventDefault();

//         const formData = new FormData();
//         formData.append("image", formState.inputs.image.value);
//         formData.append("username", formState.inputs.username.value);
    
//         formData.append("isAdmin", formState.inputs.isAdmin.value);
//         formData.append("email", formState.inputs.email.value);
     
//         try {
//             await fetch(`${process.env.REACT_APP_API_URL}/profile/update`, "PATCH", formData, {
//                 Authorization: "Bearer " + token,
//             });

//             openConfirmModalHandler();
//         } catch (err) { }
//     };

//     // Mettre à jour le mot de passe de l'utilisateur
//     const updatePasswordHandler = async (event) => {
//         event.preventDefault();

//         try {
//             await fetch(
//                 `${process.env.REACT_APP_API_URL}/users/update`,
//                 "PUT",
//                 JSON.stringify({
//                     password: formState.inputs.password.value,
//                 }),
//                 {
//                     "Content-Type": "application/json",
//                     Authorization: "Bearer " + user.token,
//                 }
//             );

//             // écran de confirmation
//             openConfirmModalHandler();
//         } catch (err) { }
//     };

//     //  Intention de Supprimer utilisateur
//     const showDeleteMessage = (event) => {
//         event.preventDefault();
//         if (showInfo === false) {
//             setShowInfo(true);
//         } else {
//             setShowInfo(false);
//         }
//     };

//     //  Supprimer utilisateur
//     const deleteUserHandler = async (event) => {
//         event.preventDefault();

//         try {
//             await fetch(`${process.env.REACT_APP_API_URL}/profile/${user.userId}`, "DELETE", null, {
//                 "Content-Type": "application/json",
//                 Authorization: "Bearer " + user.token,
//             });
//             user.logout();
//             history.push(`/`);
//         } catch (err) { }
//     };

//     //  Fonctions écran de confirmation
//     const openConfirmModalHandler = () => {
//         setShowConfirmModal(true);
//     };

//     const closeConfirmModalHandler = () => {
//         setShowConfirmModal(false);
//         setTimeout(() => {
//             history.push(`/profile/${user.userId}`);
//         }, 300);
//     };



   



//     return (
//         <>
      
       
//             <div className="card">
//                 {  (
//                     <div >
//                         <div className={styles.background_img}></div>
//                         <ImageUpload
//                             center
//                             id="image"
//                             onInput={inputHandler}
//                             errorText="Choisissez une image"
                         
//                         />
//                         <h4 className={styles.title}>Vos informations personnelles</h4>
                 
//                         <form id="update-form"className="user-action" onSubmit={updateProfileHandler}>
//                             <input
//                                 id="username"
//                                 label="Prénom :"
//                                 name="username"
//                                 type="text"
                          
//                                 errorText="Veuillez rentrer votre prénom"
//                                 onInput={inputHandler}
//                                 // initialValue={userDataState.username}
//                                 initialValid={true}
//                             />
//                             <input
//                                 id="username"
//                                 label="Nom :"
//                                 name="username"
//                                 type="text"
//                                 placeholder="Votre nom"
//                                 autocomplete="family-name"
                    
//                                 errorText="Veuillez rentrer votre nom de famille"
//                                 onInput={inputHandler}
//                                 // initialValue={userDataState.username}
//                                 initialValid={true}
//                             />
//                             <input
//                                 id="email"
//                                 label="E-mail :"
//                                 name="email"
//                                 type="email"
//                                 placeholder="Votre e-mail"
//                                 autocomplete="email"
//                                 maxLength="100"
//                                 element="input"
//                                 hasLabel="yes"
                    
//                                 errorText="Votre email n'est pas correct"
//                                 onInput={inputHandler}
//                                 // initialValue={userDataState.email}
//                                 initialValid={true}
//                             />
                            
                          
//                         </form>
//                         <button className="btn-comment"
//                             id="update-profile-btn"
//                             form="update-form"
//                             name="Mettre à jour mon profil"
//                             type="submit"
//                             btnType="valid"
//                         />
//                         <h4 className={styles.title}>Changer mon mot de passe</h4>
//                         <form id="update-password-form" className={styles.update_list} onSubmit={updatePasswordHandler}>
//                             <input
//                                 id="password"
//                                 label="Mot de passe :"
//                                 name="password"
//                                 type="password"
//                                 placeholder="Votre nouveau mot de passe"
                             
//                                 alt="password icon"
//                                 maxLength="50"
//                                 element="input"
//                                 hasLabel="yes"
//                                 textIsWhite="no"
                            
//                                 errorText="Minimum une majuscule, un chiffre et 8 lettres"
//                                 onInput={inputHandler}
//                                 initialValue={formState.inputs.password.value}
//                                 initialValid={formState.inputs.password.isValid}
//                             />
//                         </form>
//                         <button className="btn-comment"
//                             id="update-password-btn"
//                             form="update-password-form"
//                             name="Changer mon mot de passe"
//                             type="submit"
//                             btnType="valid"
//                         />
//                         <h4 className={styles.title}>Supprimer mon compte</h4>
//                         <button className="btn-comment"
//                             id="delete-profile-btn"
                     
//                             name="Supprimer"
//                             onClick={showDeleteMessage}
//                             btnType="warning"
//                             iconColor="icon_white"
//                         />
//                         <div style={{ display: showInfo === true ? "block" : "none" }}>
//                             <p className={styles.role}>
//                                 Vous êtes sur le point de supprimer votre compte. Toutes les informations liées à ce
//                                 compte seront supprimées.
//                             </p>
//                             <h5 className={styles.title}>Êtes-vous sûr(e) de vouloir supprimer votre compte ?</h5>
//                             <div className={styles.btn_block}>
//                                 <button
//                                     id="accept-btn"
//                                     name="Oui"
//                                     type="submit"
//                                     onClick={deleteUserHandler}
//                                     btnType="warning"
//                                 />
//                                 <button className="btn-comment" id="cancel-btn" name="Annuler" onClick={showDeleteMessage} btnType="cancel" />
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };
// export default UpdateProfile;