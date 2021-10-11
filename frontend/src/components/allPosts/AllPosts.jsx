
import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
// import Moment from 'react-moment';
import axios from "axios";
import { AuthContext } from './../../helpers/AuthContext';
import "./post.css";
import { useParams } from 'react-router-dom';
import Post from '../post/Post';


export default function AllPosts(Post) {
    let { id } = useParams();

    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);

    const [users, setUser] = useState([]);
    const history = useHistory();
    const { user } = useContext(AuthContext);


    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    console.log(user);


    return (
        <div className="postWrapper">
            <h1>Tous les posts publiés</h1>
            <div className="form-submit">
                <button className="btn btn-outline-info btn-sm" onClick={() => { history.push("/createpost/") }}>Publier un post</button>
            </div>
            {posts.map((post) => (
                <div className="post-card" key={"postCard" + post.id}>
                    {users.map((user) => {
                        if (user.id === post.userId && user.imageUrl) {
                            return <img src={"http://localhost:3001/images/" + user.imageUrl} alt="user" key={"userImage" + post.id} />
                        } else if (user.id === post.userId && !user.imageUrl) {
                            return <img />
                        } else {
                            return null
                        }
                    })}
                    <div className="show-post" key={"show" + post.id}>
                        {users.map((user) => {
                            if (user.id === post.userId) {
                                return <h2 key={"h2" + user.id}>Publié par <Link to={"/users/" + user.id} key={user.id + post.id} className="nav-link">{user.firstname} {user.lastname}</Link></h2>
                            } else {
                                return null
                            }
                        })}
                        {/* <Link to={"/post/" + post.id} key={"post" + post.id} className="nav-link">{post.title}</Link> */}
                        <p key={"content" + user.id}>{user.content}</p>

                    </div>
                </div>
            ))}
        </div>
    )



}
/****************************************************************************** */

// import React, { useEffect, useState, useContext } from "react";
// import { Link, useHistory } from 'react-router-dom';
// // import Moment from 'react-moment';
// import axios from "axios";
// import { AuthContext } from './../../helpers/AuthContext';
// import "./post.css";



// export default function AllPosts() {

//     const [postObject, setPostObject] = useState({});
//     const [posts, setPosts] = useState([]);
//     const [newComment, setNewComment] = useState("");
//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);

//     const [users, setUser] = useState([]);
//     const history = useHistory();





//     useEffect(() => {
//         axios
//             .get("http://localhost:3001/posts", {
//                 headers: {
//                     accessToken: localStorage.getItem("accessToken"),
//                 },
//             })
//             .then((response) => {
//                 if (response.data.error) {
//                     setPosts({ ...useState, status: true });
//                 } else {
//                     setPosts({
//                         username: response.data.username,
//                         id: response.data.id,

//                     });
//                 }
//             });
//     }, []);

//     return (
//         <div className="container">
//             <h1>Tous les posts publiés</h1>
//             <div className="form-submit">
//                 <button className="btn btn-outline-info btn-sm" onClick={() => { history.push("/createpost/") }}>Publier un post</button>
//             </div>
//             {posts.map((post) => (
//                 <div className="post-card" key={"postCard" + post.id}>

//                     <div className="show-post" key={"show" + post.id}>
//                         {users.map((user) => {
//                             if (user.id === post.userId) {
//                                 return <h2 key={"h2" + user.id}>Publié par <Link to={"/users/" + user.id} key={user.id + post.id} className="nav-link">{user.firstname} {user.lastname}</Link></h2>
//                             } else {
//                                 return null
//                             }
//                         })}
//                         {/* <Link to={"/post/" + post.id} key={"post" + post.id} className="nav-link">{post.title}</Link> */}
//                         {/* <p key={"content" + useState.id}>{authState.content}</p> */}

//                     </div>
//                 </div>
//             ))}
//         </div>
//     )



// }

