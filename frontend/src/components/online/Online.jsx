import React, { useEffect, useState,  } from "react";
import "./online.css"

export default function Online({ user }) {


    const [isOnline, set_isOnline] = useState(true);
    let interval = null;
   
    const InternetErrMessagenger = () => set_isOnline(navigator.onLine===true); // for do like this shortform
   
    
    useEffect(()=>{
       interval = setInterval(InternetErrMessagenger, 6000); // call the function name only not with function with call `()`
       return ()=>{
          clearInterval(interval) // for component unmount stop the interval
       }
    },[])
   // the <InternetChecker /> component contains a message that gets displayed when offline
    return (
        <div>
            <li className="rightbarColleague">
         
    
                <div className="rightbarProfileImgContainer">
                    <img className="rightbarProfileImg" src={"http://localhost:8800/images/" + user.profilePicture}alt="" />
                    {isOnline !== false ?  <span className="rightbarOnline"></span>: "off"}
                     {/* <InternetChecker /> */}
                </div>
                <span className="RightbarUsername">{user.username}</span>
            </li>
        </div>
    )
}
// import React, { useState, useEffect, useCallback } from "react";
// import "./styles.css";

// export default function App() {
//   const [isOnline, set_isOnline] = useState(true);
//   let interval = null;

//   const InternetErrMessagenger = () => set_isOnline(navigator.onLine === true); // for do like this shortform

//   useEffect(() => {
//     interval = setInterval(InternetErrMessagenger, 1000);
//     return () => {
//       clearInterval(interval); // for component unmount stop the interval
//     };
//   }, []);

//   return isOnline == true ? "online" : "offline";
// }