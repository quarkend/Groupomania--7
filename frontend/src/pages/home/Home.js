import React from "react";
import { AuthContext } from './../../App';
import "./home.css"
import Post from './../../components/post/Post';
import Share from './../../components/share/Share';
const initialState = {
    posts: [],
    isFetching: false,
    hasError: false,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_POSTS_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false
            };
        case "FETCH_POSTS_SUCCESS":
            return {
                ...state,
                isFetching: false,
                posts: action.payload
            };
        case "FETCH_POSTS_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false
            };
        default:
            return state;
    }
};
export const Home = () => {
    const { state: authState } = React.useContext(AuthContext);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    React.useEffect(() => {
        dispatch({
            type: "FETCH_POSTS_REQUEST"
        });
        fetch("/posts", {
            headers: {
                Authorization: `Bearer ${authState.token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw res;
                }
            })
            .then(resJson => {
                dispatch({
                    type: "FETCH_POSTS_SUCCESS",
                    payload: resJson,
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: "FETCH_POSTS_FAILURE"
                });
            });
    }, [authState.token]);
    return (
        <div className="homeContainer">
            {/* <Sidebar/> */}
            <div className="feed">
                <div className="feedWrapper">
                    <Share />
                </div>
                {state.isFetching ? (
                    <span className="loader">LOADING...</span>
                ) : state.hasError ? (
                    <span className="error">AN ERROR HAS OCCURED</span>
                ) : (
                    <>
                        {
                            state.posts.map(post => (
                                <Post key={post.id.toString()} post={post} />
                            ))}
                    </>
                )}
            </div>
            {/* <Rightbar/>   */}
        </div>
    );
};
export default Home;
