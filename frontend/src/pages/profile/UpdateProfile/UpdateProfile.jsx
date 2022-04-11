// import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// // import NavBtn from "../../../components/NavBtn/NavBtn";
// import { useForm } from "../../../hooks/form-hook";
// import { AuthContext } from '../../../App';
// import styles from "./UpdateProfile.css";


// import ImageUpload from "../../../components/ImageUpload/ImageUpload";
// // const { user } = useContext(AuthContext);
// // import ConfirmModal from './../../../components/ConfirmModal/ConfirmModal';
// const token = "Bearer " + JSON.parse(localStorage.getItem('token'));

// const UpdateProfile = () => {
//     const user =  JSON.parse(localStorage.getItem('user'));
//     // Authentication context
//     const auth = useContext(AuthContext);
   
    
//     // History context
//     const history = useHistory();
//     // Backend Request Hook
//     // Profile useState

//     // Delete message useState
//     const [showInfo, setShowInfo] = useState(false);
//     // Show confirm modal useState
//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     // Form useState
//     const [userDataState, setUserDataState] = useState();
//     const [formState, inputHandler, setFormState] = useForm(
//         {
//             profilePicture: {
//                 value: null,
//                 isValid: true,
//             }, 
//                  username: {
//                 value:"",
//                 isValid: true,
//             },
//             email: {
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
//                             isValid: false,
//                         },      
//                         username: {
//                             value: userData.username,
//                             isValid: false,
//                         },
//                         email: {
//                             value: userData.email,
//                             isValid: false,
//                         },
//                     },
//                  true
//                 );
//             } catch (err) { }
//         };
//         fetchUser();
//     }, [user.id,token, setFormState]);
//     // Mettre à jour les donnés de l'utilisateur
//     const updateProfileHandler = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
   
//         formData.append("image", formState.inputs.profilePicture.value);
       
//         formData.append("email", formState.inputs.email.value);
//         formData.append("username", formState.inputs.userame.value);
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
//     console.log( formState.inputs.username)


//     async function getUserData() {
//         const URL = `${"http://localhost:8800/api/users/"}/${user.id}`
//         const userDataState = await fetch(URL, {
//               headers: {
//                     Authorization: 'Bearer ' + token
//               }
//         })
//         const response = await userDataState.json()
//         setUserDataState(response)
//         console.log(response)
//   }
//   useEffect(() => {
//         getUserData()
//   }, [])

//     let desktopNav;
//     let btnStyle = styles.btnStyle;
//     let iconStyle = `${styles.iconStyle} icon_red`;
//     // desktopNav = (
//     //     <button
//     //         id="back"
//     //         name="Retourner"
//     //         link={`/profile/${user.id}`}
//     //         btnStyle={btnStyle}
//     //         iconColor={iconStyle}
//     //     />
//     // );
//     const closeConfirmModalHandler = () => {
//         setShowConfirmModal(false);
//         setTimeout(() => {
//             history.push(`/profile/${user.id}`);
//         }, 300);
//     };
//     if (!userDataState) {
//         return (
//             <>
//                 <div className={styles.container}>
//                     <h2>No User Data!</h2>
//                 </div>
//             </>
//         );
//     }
//     return (
//         <>
       
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
                        
          
//                         <div className="user-info">
//                               <p>image : {userDataState.image}</p>
//                                     <p>Username : {userDataState.username}</p>
//                                     <p>Email : {userDataState.email}</p>
//                                     <p>Profil crée le : {userDataState.createdAt}</p>
//                                     <p>Profil Modifié le : {userDataState.updatedAt}</p>
//                               </div>

//                         {userDataState.profilePicture && (
//                             <div className="card">
                        
//                        <img className="shareImg" src={"http://localhost:8800/images/" + userDataState.profilePicture} alt="profilePicture" /> 
//                        <form id="update-form" className={styles.update_list} onSubmit={updateProfileHandler}>
            
//                             <input
//                         id="username"
//                         label="Nom :"
//                         name="username"
//                         type="text"
//                         placeholder="Votre nom"
//                         autocomplete="family-name"
//                         maxLength="45"
//                         element="input"
//                         hasLabel="yes"
//                         textIsWhite="no"
//                         // validators={[MinLength(2), MaxLength(45), isText()]}
//                         errorText="Veuillez rentrer votre nom de famille"
//                         onInput={inputHandler}
//                         initialValue={userDataState.username}
//                         initialValid={true}
//                             />
//                                  <input
//                                 id="email"
//                                 label="E-mail :"
//                                 name="email"
//                                 type="email"
//                                 placeholder="Votre e-mail"
//                                 autocomplete="email"
//                                 maxLength="100"
//                                 element="input"
//                                 hasLabel="yes"
//                                 textIsWhite="no"
//                                 // validators={[isEmail(), MinLength(6), MaxLength(100)]}
//                                 errorText="Votre email n'est pas correct"
//                                 onInput={inputHandler}
//                                 initialValue={userDataState.email}
//                                 initialValid={true}
//                             />
//                             <button

//                                 id="update-profile-btn"
//                                 className="shareButton"
//                                 form="update-form"
//                                 name="Mettre à jour mon profil"
//                                 type="submit"
//                             >update-profile-btn :)</button>
//                         </form>
//                             </div>
                            
//                         )}
                       
                      
//                         <h4 className={styles.title}>Changer mon mot de passe</h4>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default UpdateProfile;


