



/* eslint-disable import/no-anonymous-default-export */
// eslint-disable-next-line import/no-anonymous-default-export
// const { useState, useEffect, useCallback } = React;
import React, { useRef,useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "./search.css"
// import "../topbar/topbar.css"
import ReactDOM from 'react-dom';
import { Search } from "@material-ui/icons";
const storage = JSON.parse(localStorage.getItem('userAount'));

export default (props) => {
  let history = useHistory();
  // const initialItems = [
  //   {
  //     area: "Development",
  //     group: "Sales",
  //     sgroup: "New",
  //     id: "1104905",
  //     name: "GOLDEN KNIGHT",
  //     comp: "100% Gold"
  //   },
  //   {
  //     area: "Development",
  //     group: "Sales",
  //     sgroup: "Avengers",
  //     id: "1207791",
  //     name: "CAPITAIN AMERICA SHIELD",
  //     comp: "50% Steel, 50% Vibranium"
  //   },
  //   {
  //     area: "Development",
  //     group: "Sales",
  //     sgroup: "Avengers",
  //     id: "1209362",
  //     name: "IRON MAN SUIT",
  //     comp: "100% Iron"
  //   },
  //   {
  //     area: "Development",
  //     group: "Exploration",
  //     sgroup: "New",
  //     id: "1306485",
  //     name: "METALLIC VEST BURGUNDY",
  //     comp: "100% Adamantium"
  //   },
  //   {
  //     area: "Development",
  //     group: "Exploration",
  //     sgroup: "Default",
  //     id: "1308612",
  //     name: "METALLIC VEST GRENADINE",
  //     comp: "100% Adamantium"
  //   },
  //   {
  //     area: "Development",
  //     group: "Exploration",
  //     sgroup: "Default",
  //     id: "1406599",
  //     name: "METALLIC VEST NUDE",
  //     comp: "100% Adamantium"
  //   },
  //   {
  //     area: "Development",
  //     group: "Exploration",
  //     sgroup: "Default",
  //     id: "1508062",
  //     name: "METALLIC VEST BIC BLUE",
  //     comp: "100% Adamantium"
  //   },
  //   {
  //     area: "Development",
  //     group: "Exploration",
  //     sgroup: "Default",
  //     id: "1508435",
  //     name: "METALLIC VEST BLUE SPACE",
  //     comp: "100% Adamantium"
  //   },
  //   {
  //     area: "Development",
  //     group: "Exploration",
  //     sgroup: "Default",
  //     id: "1608938",
  //     name: "CHAIN SHIRT VERT ACIDE",
  //     comp: "100% Adamantium"
  //   },
  //   {
  //     area: "Development",
  //     group: "Exploration",
  //     sgroup: "Default",
  //     id: "1609949",
  //     name: "CHAIN SHIRT AZTECA",
  //     comp: "100% Steel"
  //   },
  //   {
  //     area: "Development",
  //     group: "Exploration",
  //     sgroup: "Default",
  //     id: "1610128",
  //     name: "CHAIN SHIRT GREEN TEA",
  //     comp: "100% Iron"
  //   },
  //   {
  //     area: "Development",
  //     group: "Exploration",
  //     sgroup: "Default",
  //     id: "1611865",
  //     name: "CHAIN SHIRT URBAN",
  //     comp: "100% Adamantium"
  //   },
  //   {
  //     area: "Development",
  //     group: "Exploration",
  //     sgroup: "Default",
  //     id: "1709378",
  //     name: "CHAIN SHIRT ANGELIM",
  //     comp: "100% Adamantium"
  //   }
  // ];
  
const FilteredList = () => {
  const [items, setItems] = useState([]);
  const filterIt = (terms, arr) => {
    if ("" === terms || terms.length < 3) return arr;
    const words = terms.match(/\w+|"[^"]+"/g);
    words.push(terms);
    return arr.filter((a) => {
      const v = Object.values(a);
      const f = JSON.stringify(v).toLowerCase();
  
      return words.every(val => f.includes(val));
    });
  };

  const filterList = useCallback(({target}) => {
    const searchQuery = target.value.toLowerCase();
    const updatedList = filterIt(searchQuery, storage);
    setItems(updatedList);
  }, []);

  return (
    <div className="">

<Search className="" />
      <input type="text" placeholder="Search" onChange={filterList} />
      <List items={items} />
    </div>
    
  );
  
  
};

var List = ({ items }) => (
  <ul className="search-results ">
    {items.map((item) => (
      <li key={item.id}>
        <h1> <img src={"http://localhost:8800/images/" +item.profilePicture} alt="" className="topbarImg"  
        onClick={() => { history.push("/profile/" + item.id) }} />{item.username} </h1>
        
        <br/>
        <span>{item.email}</span>
        <br/>
        <a className="menu-item" href={"/profile/" + item.id}>
    Profile de {item.username}
    </a>
      </li>
      
    ))}
  </ul>
);
return (
<div >

<FilteredList  />


</div>
);
    }

// export default props => {
//   const [open, setOpen] = useState(false);
//   const dropdownSearchbar = useRef(null);
//   const users = JSON.parse(localStorage.getItem('userAount'));
//   const token = "Bearer " + JSON.parse(localStorage.getItem('token'));

//   // const userId = storage.id;
//   //     // const [users, setUsers] = useState([]);
//   //     const [items, setItems] = useState([]);
//   // useEffect(() => {
//   //     const fetchUser = async () => {
//   //         const res = await axios.get(`/users`,
//   //             {
//   //                 headers:
//   //                     { "Authorization": token }
//   //             }
//   //         );
//   //         setUsers(res.data);
//   //         localStorage.setItem('userAount', JSON.stringify(res.data));
//   //         console.log(res.data)
//   //     };
//   //     fetchUser();
//   // }, [token]);

//   // const filterIt = (terms, arr) => {
//   //   if ("" === terms || terms.length < 3) return arr;
//   //   const words = terms.match(/\w+|"[^"]+"/g);
//   //   words.push(terms);
//   //   return arr.filter((a) => {
//   //     const v = Object.values(a);
//   //     const f = JSON.stringify(v).toLowerCase();

//   //     return words.every(val => f.includes(val));
//   //   });
//   // };
//   const filterIt = (terms, arr,event) => {
//     if ("" === terms || terms.length < 3) return arr;
//     const words = terms.match(/\w+|"[^"]+"/g);
//     words.push(terms);
//     return arr.filter((a) => {
//       const v = Object.values(a);
//       const f = JSON.stringify(v).toLowerCase();

//       return words.every(val => f.includes(val));
//     });
//   };
//    const handleClickOutside = event => {
//     if (dropdownSearchbar.current && !dropdownSearchbar.current.contains(event.target)) {

//       setOpen(false);
//     }
//   }
//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // clean
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   })
//   const [items, setItems] = useState([]);

//   const filterList = useCallback(({ target }) => {
//     const searchQuery = target.value.toLowerCase();
//     const updatedList = filterIt(searchQuery, users);
//     setItems(updatedList);
//   }, [users]);

//   return (
   
//         <div className = "dropdownSearchbar" ref = {dropdownSearchbar}>
       
//     <Search className=" searchIcon " />
//     <input className="searchInput"
//           placeholder="Rechercher sur Groupomania" onChange={filterList} onClick={() => setOpen(!open)}  { ...props}/>
//     {(open && 
//      <><div class="modal-wrapper">
//             <ul >

// <List items={items}/>
//             </ul>
//           </div></>
//         )}
//       </div>
//   );
// };

// var List = ({ items }) => (
//   <ul >
//     {items.map((item) => (
//       <li key={item.id}>
//         <h6>{item.id}</h6>
//         <span>{item.email}</span>
//         <h1>{item.username}</h1>
//         <li><a className="dropdown-menu__item" href={"/profile/" + storage.id}>
//     Profile
//     </a> </li>
//       </li>
//     ))}

//   </ul>

// );
  // ReactDOM.render(<FilteredList />, document.getElementById("search-list"));
      
    