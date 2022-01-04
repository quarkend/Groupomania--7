// import React, { useEffect, useState, useContext } from "react";

// // import Post from "./../../Post";
// import { AuthContext } from './../../App';
// import Feed from './../../components/feed/Feed';

// import Post from './../../components/post/Post';
// import Share from './../../components/share/Share';
// import User from "../profile/User";


// const initialState = {
//     users: [],
//     isFetching: false,
//     hasError: false,
// };

// const reducer = (state, action) => {
    
//     switch (action.type) {
//         case "FETCH_U_REQUEST":
//             return {
//                 ...state,
//                 isFetching: true,
//                 hasError: false
//             };
//         case "FETCH_U_SUCCESS":
//             return {
//                 ...state,
//                 isFetching: false,
//                 posts: action.payload
//             };
//         case "FETCH_U_FAILURE":
//             return {
//                 ...state,
//                 hasError: true,
//                 isFetching: false
//             };
//         default:
//             return state;
//     }
// };

// export const Admin = () => {
//     const { state: authState } = React.useContext(AuthContext);
//     const [state, dispatch] = React.useReducer(reducer, initialState);

//     React.useEffect(() => {
        
//         dispatch({
//             type: "FETCH_U_REQUEST"
//         });
//         fetch("/users", {
//             headers: {
//                 Authorization: `Bearer ${authState.token}`
//             }
//         })
//             .then(res => {
//                 if (res.ok) {
               
//                     return res.json();
//                 } else {
//                     throw res;
//                 }
//             })
//             .then(resJson => {
        
//                 dispatch({
//                     type: "FETCH_U_SUCCESS",
//                     payload: resJson,
                   
//                 });
//             })
//             .catch(error => {
//                 console.log(error);
//                 dispatch({
//                     type: "FETCH_U_FAILURE"
//                 });
//             });
//     }, [authState.token]);


//     return (
//         <React.Fragment>
//             <div className="home">
//                 {state.isFetching ? (
//                     <span className="loader">LOADING...</span>
//                 ) : state.hasError ? (
//                     <span className="error">AN ERROR HAS OCCURED</span>
//                 ) : (
//                     <>
                    
                 
//                              {
                                 
//             state.users.map(user => (
                
//               <User key={user.id.toString()} user={user} />
//             ))} 

            
//                     </>
//                 )}
//             </div>
//         </React.Fragment>
//     );
// };
// export default Admin;






import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import User from './User';
import "./profile.css"
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import { AuthContext } from '../../App';

export default function Admin() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    let { id } = useParams();
    let history = useHistory();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [post, setPost] = useState([]);
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const { authState } = useContext(AuthContext);

    const storage = JSON.parse(localStorage.getItem('user'));


    // const id = storage.id;


    let token = "Bearer " + storage.token;


    useEffect(() => {


        axios.get(`/users/${id}`,
        {
            headers:
                { "Authorization": token }
        }).then((response) => {
                setUser(response.data)
                console.log(response.data)
                localStorage.setItem(' setLisuserIdX', JSON.stringify(response.data));
            });
    }, [id, token]);
    // useEffect(() => {


    //     axios.get(`/users`,
    //         {
    //             headers: { "Authorization": token}
    //         }).then((response) => {
    //             setUsers(response.data)
    //             localStorage.setItem(' setusers', JSON.stringify(response.data));
    //         });
    // }, [id]);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users`,
                {
                    headers:
                        { "Authorization": token }
                }
            );
            setUsers(res.data);
            localStorage.setItem('userAount', JSON.stringify(res.data));
            console.log(res.data)
        };
        fetchUser();
    }, [token]);
    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get("/users/" + id + "/posts/",
                {
                    headers:
                        { "Authorization": token }
                }
            );
            setPost(res.data);
            localStorage.setItem('userposts', JSON.stringify(res.data));
            console.log(res.data)
        };
        fetchPost();
    }, [token]);

    const deleteUserAccount = (id) =>  {
        axios.delete(`http://localhost:8800/api/users/${id}`, 
    
        {
            headers : {"Authorization" : token}
        }
        ).then(()=>
        {
            history.push("/")
        })
        window.location.reload();
    }


    return (

       <div className="profilePageContainer">
           <div className="profile">
         
       
         <div className="card">
      
               
                    <h1>admin</h1>
                    <h4 className="detail"> {user.username}</h4>
                   
                    <button className="btn btn-outline-danger btn-sm" onClick={() => { history.push("/deleteuser/" + id) }}>Supprimer</button>
                    </div> 
                    </div>
                                     {users.map(u => (
                    <User key={u.id} user={u} />
                ))} 

                     
            
                            
                        
             
             
            


             </div>
            
            

    );
}
/*************************copie Groupomania--7 15sep2021 14 12 */






// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import axios from "axios";

// // import "./profile.css"
// import Topbar from "../../components/topbar/Topbar"
// import Sidebar from "../../components/sidebar/Sidebar"
// import Feed from "../../components/feed/Feed"
// import Rightbar from "../../components/rightbar/Rightbar"

// import Post from './../../components/post/Post';
// import { AuthContext } from './../../App';


// export default function Profile() {
//     let { id } = useParams();
//     const [posts, setPosts] = useState([]);
//     const [comments, setComments] = useState([]);
//     // const [newComment, setNewComment] = useState("");
//     const [user, setUser] = useState({});
//     const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//     // const { user: currentUser } = useContext(AuthContext);


//     const [isLiked, setIsLiked] = useState(false)
//     const sPost = JSON.parse(localStorage.getItem(' setLtOfPtsbyuserId'));
//     const storage = JSON.parse(localStorage.getItem('user'));
//     const userId = storage.id;
//     const postId = 1;
//     let token = "Bearer " + storage.token;
//     let history = useHistory();
//     useEffect(() => {
//         const fetchUser = async () => {
//             const res = await axios.get(`/users/${userId}`,
//                 {
//                     headers:
//                         { "Authorization": token }
//                 }
//             )
//             setUser(res.data);
//             console.log(res.data)
//             localStorage.setItem('userAccount', JSON.stringify(res.data));
//         };
//         fetchUser();
//     }, [token, userId,]);

//     useEffect(() => {
//         axios.get(`/posts/byId/${postId}`,

//             {
//                 headers:
//                     { "Authorization": token }
//             }).then((response) => {
//                 setPosts(response.data);
//                 console.log(response.data)
//                 localStorage.setItem('postsbyuserIdprofile', JSON.stringify(response.data));
//             });

//         axios.get(`/comments/${userId}`,

//             {
//                 headers:
//                     { "Authorization": token }
//             }).then((response) => {
//                 setComments(response.data);
//                 console.log(response.data)
//             });
//     }, [postId, token, userId]);


//     return (
//         <div className="profilePageContainer">
      
//             <div className="profile">

//                 <div className="card-comment">
//                     <div className="profileRightTop">
//                         <div className="profileCover">
//                             {/* <img className="profileCoverImg" src={Posts.photo} alt="" /> */}
//                             {/* <img className="profileUserImg" src={authState.photo} alt="" /> */}
//                         </div>
//                         <div className="profileInfo">
//                             <h4 className="profileInfoName">user.username</h4>

//                             <span className="profileInfoDesc">hello my friend</span>
//                         </div>

//                     </div>
//                     <div className="listOfPosts">


//                         <div className="profileRightBottom">
//                             <Feed />

//                         </div>
//                     </div>
//                 </className=>
//             </div>

//         </div>
//     );
// }
// {/* <div className="listOfPosts">
//     <Post />

//     <div className="profileRightBottom">
//         <Feed />
//         <Rightbar profile />
//     </div> */}