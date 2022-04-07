// import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
// // import NavBtn from "../../../components/NavBtn/NavBtn";
// import { useForm } from "../../../hooks/form-hook";

// import styles from "./UpdateProfile.css";
// import { AuthContext } from '../../../helpers/AuthContext';
// import Share from '../../../components/share/Share';
// import ImageUpload from "../../../components/ImageUpload/ImageUpload";

// // import ConfirmModal from './../../../components/ConfirmModal/ConfirmModal';
// const token = "Bearer " + JSON.parse(localStorage.getItem('token'));
// const user =  JSON.parse(localStorage.getItem('user'));
// export default function UpdateProfile()  {
//     // Authentication context
//     const auth = useContext(AuthContext);
//     const { user } = useContext(AuthContext);
//     const [userDataState, setUserDataState] = useState('')
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
//             profilePicture: {
//                 value: null,
//                 isValid: true,
//             },      username: {
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
//                         Authorization: "Bearer " + token,
//                     }
//                 );
//                 setUserDataState(userData);
//                 setFormState(
//                     {
//                         profilePicture: {
//                             value: userData.profilePicture,
//                             isValid: true,
//                         },      username: {
//                             value: "",
//                             isValid: true,
//                         },
//                     },
//                     true
//                 );
//             } catch (err) { }
//         };
//         fetchUser();
//     }, [user.id, setFormState]);
//     // Mettre à jour les donnés de l'utilisateur
//     const updateProfileHandler = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         // formData.append("username", formState.inputs.userame.value);
//         formData.append("image", formState.inputs.profilePicture.value);
     
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
//     console.log( formState.inputs.profilePicture)


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
//         // try {
//     //        const sendRequest = await fetch(`${'/users'}/${user.id}`, formData, {
//     //         headers: {
//     //             "Content-Type": "application/json",
//     //             Authorization: "Bearer " + token
//     //         },
//     //         body: JSON.stringify(formData)
//     //         })
//     //         const response = await sendRequest.json()
//     //         console.log(response)
//     //         getUserData()
//     //         setShowInfo(true)
//     //     } catch (err) {}
//     // };
//     // async function getUserData() {
//     //     const URL = `${"http://localhost:8800/api/users/"}/${user.id}`
//     //     const userDataState = await fetch(URL, {
//     //         headers: {
//     //             Authorization: 'Bearer ' + token
//     //         }
//     //     })
//     //     const response = await userDataState.json()
//     //     setUserDataState(response)
//     //     console.log(response.username)
//     // }
//     // useEffect(() => {
//     //     getUserData()
//     // }, [])
//     // Mettre à jour le mot de passe de l'utilisateur
//     //  Intention de Supprimer utilisateur
//     //  Supprimer utilisateur
//     //  Fonctions écran de confirmation
//     //  Affichage Nav desktop
//     let desktopNav;
//     let btnStyle = styles.btnStyle;
//     let iconStyle = `${styles.iconStyle} icon_red`;
//     desktopNav = (
//         <button
//             id="back"
//             name="Retourner"
//             link={`/profile/${user.id}`}
//             btnStyle={btnStyle}
//             iconColor={iconStyle}
//         />
//     );
//     const closeConfirmModalHandler = () => {
//         setShowConfirmModal(false);
//         setTimeout(() => {
//             history.push(`/profile/${user.id}`);
//         }, 300);
//     };
//     if (userDataState) {
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
       
//             <div className={`container ${styles.class_mod}`}>
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
                        
//                         {desktopNav}
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

//                             </div>
//                         )}
                       
//                         <form id="update-form" className={styles.update_list} onSubmit={updateProfileHandler}>
//                             <input
//                                 id="username"
//                                 label="Description du poste :"
//                                 name="username"
//                                 type="text"
//                                 placeholder="Description du poste"
                          
//                                 onInput={inputHandler}
//                                username={userDataState.username}
                          
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
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };




import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import NavBtn from "../../../components/NavBtn/NavBtn";
import { useForm } from "../../../hooks/form-hook";

import styles from "./UpdateProfile.css";
import { AuthContext } from '../../../helpers/AuthContext';
import Share from '../../../components/share/Share';
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { FaYahoo } from "react-icons/fa";

// import ConfirmModal from './../../../components/ConfirmModal/ConfirmModal';
const token = "Bearer " + JSON.parse(localStorage.getItem('token'));
// const user = JSON.parse(localStorage.getItem('user'));
export default function UpdateProfile() {
    // Authentication context
    const auth = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    // const [userDataState, setUserDataState] = useState('')
    // History context
    const history = useHistory();
    // Backend Request Hook
    // Profile useState
    const [userDataState, setUserDataState] = useState('');
    // Delete message useState
    const [showInfo, setShowInfo] = useState(false);
    // Show confirm modal useState
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    // Form useState
    const [formState, inputHandler, setFormState] = useForm(
        {
            profilePicture: {
                value: null,
                
            },
            username: {
                value: "",
               
            },
            email: {
                value: "",
           
            }
        },
     false
    );
    // Fetch User et initialiser le formState
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await fetch(
                    `${'/users'}/${user.id}`,
                    "GET",
                    null,
                    {
                        Authorization: "Bearer " + token,
                    }
                );
                setUserDataState(userData);
                setFormState(
                    {
                        profilePicture: {
                            value: userData.profilePicture,
                           
                        },
                        username: {
                            value: userData.username,
                          
                        },
                        email: {
                            value: userData.email,
                            // isValid: true,
                        }

                    },
                    false
                );
            } catch (err) { }
        };
        fetchUser();
    }, [user.id, setFormState]);
    // Mettre à jour les donnés de l'utilisateur
    const updateProfileHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", formState.inputs.profilePicture.value);
        formData.append("username",formState.inputs.username.value);
        formData.append("email", formState.inputs.email.value);
        // formData.append("password", formState.inputs.password.value);
   

        try {
            await axios.put("http://localhost:8800/api/users/" + user.id, formData,

                {
                    headers:
                        { "Authorization": token }
                }

            )



            window.location.reload();
        } catch (err) { }
    };
    console.log(formState.inputs.username)


    async function getUserData() {
        const URL = `${"http://localhost:8800/api/users/"}/${user.id}`
        const userDataState = await fetch(URL, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const response = await userDataState.json()
        setUserDataState(response)
        console.log(response)
    }
    useEffect(() => {
        getUserData()
    }, [])
    // try {
    //        const sendRequest = await fetch(`${'/users'}/${user.id}`, formData, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + token
    //         },
    //         body: JSON.stringify(formData)
    //         })
    //         const response = await sendRequest.json()
    //         console.log(response)
    //         getUserData()
    //         setShowInfo(true)
    //     } catch (err) {}
    // };
    // async function getUserData() {
    //     const URL = `${"http://localhost:8800/api/users/"}/${user.id}`
    //     const userDataState = await fetch(URL, {
    //         headers: {
    //             Authorization: 'Bearer ' + token
    //         }
    //     })
    //     const response = await userDataState.json()
    //     setUserDataState(response)
    //     console.log(response.username)
    // }
    // useEffect(() => {
    //     getUserData()
    // }, [])
    // Mettre à jour le mot de passe de l'utilisateur
    //  Intention de Supprimer utilisateur
    //  Supprimer utilisateur
    //  Fonctions écran de confirmation
    //  Affichage Nav desktop
    // let desktopNav;
    // let btnStyle = styles.btnStyle;
    // let iconStyle = `${styles.iconStyle} icon_red`;
    // desktopNav = (
    //     <button
    //         id="back"
    //         name="Retourner"
    //         link={`/profile/${user.id}`}
    //         btnStyle={btnStyle}
    //         iconColor={iconStyle}
    //     />
    // );
    // const closeConfirmModalHandler = () => {
    //     setShowConfirmModal(false);
    //     setTimeout(() => {
    //         history.push(`/profile/${user.id}`);
    //     }, 300);
    // };
    // if (userDataState) {
    //     return (
    //         <>
    //             <div className={styles.container}>
    //                 <h2>No User Data!</h2>
    //             </div>
    //         </>
    //     );
    // }
    return (
        <>
            <div
                // show={showConfirmModal}
                // message="Votre profil a été bien mis a jour !"
                // onCancel={closeConfirmModalHandler}
            />
            <div className={`container ${styles.class_mod}`}>
                {(
                    <div className={styles.wrapper}>
                        <ImageUpload
                            center
                            id="profilePicture"
                            onInput={inputHandler}
                            errorText="Choisissez une image"
                            profilePicture={userDataState.profilePicture}
                        />
                        <h4 className={styles.title}>Vos informations personnelles</h4>

                        {/* {desktopNav} */}
                        <div className="user-info">
                            <p>image : {userDataState.profilePicture}</p>
                            <p>Username : {userDataState.username}</p>
                            <p>Email : {userDataState.email}</p>
                            <p>Profil crée le : {userDataState.createdAt}</p>
                            <p>Profil Modifié le : {userDataState.updatedAt}</p>
                        </div>

                        {userDataState.profilePicture && (
                            <div className="card">

                                <img className="shareImg" src={"http://localhost:8800/images/" + userDataState.profilePicture} alt="profilePicture" />

                            </div>
                        )}

                        <form id="update-form" className={styles.update_list} onSubmit={updateProfileHandler}>
                            <input
                                id="username"
                                label="username:"
                                name="username"
                                type="text"
                                placeholder="user name"
                    
                                onInput={inputHandler}
                                initialValue={userDataState.username}

                            />
                            <input
                                id="email"
                                label="E-mail :"
                                name="email"
                                type="email"
                                placeholder="Votre e-mail"
                           
                                // validators={[isEmail(), MinLength(6), MaxLength(100)]}
                                errorText="Votre email n'est pas correct"
                                onInput={inputHandler}
                                initialValue={userDataState.email}
                            />
                            <button

                                id="update-profile-btn"
                                className="shareButton"
                                form="update-form"
                                name="Mettre à jour mon profil"
                                type="submit"
                            >update-profile-btn :)</button>
                        </form>
                        <h4 className={styles.title}>Changer mon mot de passe</h4>
                    </div>
                )}
            </div>
        </>
    );
};


