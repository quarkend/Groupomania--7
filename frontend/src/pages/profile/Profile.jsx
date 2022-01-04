
import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import "./profile.css"
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import { AuthContext } from './../../App';

export default function Profile() {
    // let { id } = useParams();
    let history = useHistory();
    const [user, setUser] = useState([]);
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const { authState } = useContext(AuthContext);

    const storage = JSON.parse(localStorage.getItem('user'));


    const id = storage.id;


    let token = "Bearer " + storage.token;


    // useEffect(() => {


    //     axios.get(`/profile/${username}`,
    //     {
    //         headers:
    //             { "Authorization": token }
    //     }).then((response) => {
    //             setListOfPosts(response.data)
    //             localStorage.setItem(' setListOfPostsbyuserIdnn', JSON.stringify(response.data));
    //         });
    // }, [id, token, username]);
    // useEffect(() => {


    //     axios.get(`/posts/byuserId/${id}`,
    //         {
    //             headers: { accessToken: localStorage.getItem("accessToken") }
    //         }).then((response) => {
    //             setListOfPosts(response.data)
    //             localStorage.setItem(' setListOfPostsbyuserId', JSON.stringify(response.data));
    //         });
    // }, [id]);
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const res = await axios.get(`users/${id}`,
    //             {
    //                 headers:
    //                     { "Authorization": token }
    //             }
    //         );
    //         setUser(res.data);
    //         localStorage.setItem('userAount', JSON.stringify(res.data));
    //         console.log(user)
    //     };
    //     fetchUser();
    // }, [token, id, user]);
    return (

        <div className="profilePageContainer">
         
            <div className="profile">
            
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                             <img className="profileCoverImg"  src={"http://localhost:8800/images/" + storage.profilePicture} alt="" /> 
                                                          
                             <img className="profileUserImg" src={"http://localhost:8800/images/" + storage.profilePicture}  alt="" /> 
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{storage.username}</h4>

                            <span className="profileInfoDesc">hello my fuuuriend</span>
                        </div>

                    </div>
                    <div className="profileRightBottom">
                    <Sidebar />
                        <Feed />
                        <Rightbar/>
                    </div>

                </div>
            </div>


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

//                 <div className="profileRight">
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
//                 </div>
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