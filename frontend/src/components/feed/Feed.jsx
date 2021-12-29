
import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
// import { Posts } from '../../DATA'
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from './../../helpers/AuthContext';
import { useParams, Link, useHistory } from "react-router-dom";

export default function Feed({ username }) {
    const [Posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    // let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const storage = JSON.parse(localStorage.getItem('user'));


    const id = storage.id;


    let token = "Bearer " + storage.token;
    let history = useHistory();
    useEffect(() => {
        const fetchPosts = async () => {

            axios.get(`/posts`,
                {
                    headers: { accessToken: localStorage.getItem("accessToken") }
                }).then((response) => {
                    setPosts(response.data)
                    localStorage.setItem(' setLtOfPtsbyuserId', JSON.stringify(response.data));
                });
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`users/${id}`,
                {
                    headers:
                        { "Authorization": token }
                }
            );
            setUser(res.data);
            localStorage.setItem('userAccounxxt', JSON.stringify(res.data));
        };
        fetchUser();
    }, [token, id]);
    // useEffect(() => {
    //     axios.get(`/posts`,
    //         {
    //             headers:
    //                 { "Authorization": token }
    //         }).then((response) => {
    //             setPosts(response.data);


    //         });

    // axios.get(`http://localhost:8800/api/comments`,
    //     {
    //         headers:
    //             { "Authorization": token }
    //     }).then((response) => {
    //         setComments(response.data);
    //     });
    // }, [token, id]);

    // // useEffect(() => {
    // //     const fetchPosts = async () => {
    // //         const res = username
    // //         await axios.get(`http://localhost:8800/api/users/${user.username}`,
    // //             {
    // //                 headers:
    // //                     { "Authorization": token }
    // //             })

    // //         setPosts(
    // //             res.username((p1, p2) => {
    // //                 return (p2) - (p1);
    // //             })
    // //         );
    // //     };
    // //     fetchPosts();
    // // }, [token, userId, id, username]);

    return (
        <div className="feed">

            <div className="feedWrapper">
                <Share />

                {Posts.map(p => (
                    <Post key={p.id} post={p} />
                ))}


            </div>
        </div>
    );
}

// import Share from '../share/Share'

// import "./feed.css"
// // import { Posts } from '../../DATA'
// // import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
// import React from 'react';
// import axios from "axios";
// import { useEffect, useState } from "react";
// // import { AuthContext } from './../../helpers/AuthContext';
// import { useParams, Link, useHistory } from "react-router-dom";
// import Post from './../post/Post';

// export default function Feed({ username }) {
//     const [Posts, setPosts] = useState([]);
//     // const { user } = useContext(AuthContext);
//     const [user, setUser] = useState({});
//     let { id } = useParams();
//     const [postObject, setPostObject] = useState({});
//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState("");
//     const storage = JSON.parse(localStorage.getItem('accessToken'));
//     const userId = storage.id;
//     let token = "Bearer " + storage.token;
//     let history = useHistory();
//     useEffect(() => {
//         const fetchPosts = async () => {
//             const res = username
//             await axios.get("http://localhost:8800/api/profile/" + username)

//             setPosts(
//                 res.data.sort((p1, p2) => {
//                     return new Date(p2.createdAt) - new Date(p1.createdAt);
//                 })
//             );
//         };
//         fetchPosts();
//     }, [username]);
//     useEffect(() => {
//         const fetchUser = async () => {
//             const res = await axios.get(`/users?userId=${userId}`,
//                 {
//                     headers:
//                         { "Authorization": token }
//                 }
//             );
//             setUser(res.data);
//             localStorage.setItem('userAccount', JSON.stringify(res.data));
//         };
//         fetchUser();
//     }, []);

//     // useEffect(() => {
//     //     axios.get(`http://localhost:8800/api/posts/byId/${id}`).then((response) => {
//     //         setPostObject(response.data);
//     //     });

//     //     axios.get(`http://localhost:8800/api/comments/${id}`).then((response) => {
//     //         setComments(response.data);
//     //     });
//     // }, []);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         const res = username
    //         await axios.get("http://localhost:8800/api/profile/" + username)

    //         setPosts(
    //             res.data.sort((p1, p2) => {
    //                 return new Date(p2.createdAt) - new Date(p1.createdAt);
    //             })
    //         );
    //     };
    //     fetchPosts();
    // }, [username]);
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const res = await axios.get(`/users?userId=${userId}`,
    //             {
    //                 headers:
    //                     { "Authorization": token }
    //             }
    //         );
    //         setUser(res.data);
    //         localStorage.setItem('userAccount', JSON.stringify(res.data));
    //     };
    //     fetchUser();
//     }, []);

//     return (
//         <div className="feed">
//             <h1>ess
//                 {storage.username}


//             </h1>
//             <div className="feedWrapper">
//                 {(storage.username) && <Share />}
//                 {Posts.map((p) => (
//                     <Post key={p.id} post={p} />
//                 ))}
//             </div>
//         </div>
//     );
// }
