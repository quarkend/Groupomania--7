// const { useState, useEffect, useCallback } = React;
import React, { useEffect, useState,  useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "./search.css"
import { ReactDOM } from 'react-dom';


 
export default function Search(){


    const storage = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " +JSON.parse(localStorage.getItem('token'));
    const userId = storage.id;
    const [users, setUsers] = useState([]);

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
  
  const FilteredList = () => {
    const [items, setItems] = useState([]);
  
    const filterList = useCallback(({target}) => {
      const searchQuery = target.value.toLowerCase();
      const updatedList = filterIt(searchQuery, users);
      setItems(updatedList);
    }, []);
  
    return (
      <div className="filter-list">
        <h2>Material List</h2>
        <input type="text" placeholder="Search" onChange={filterList} />
        <List items={items} />
      </div>
    );
  };
  
  var List = ({ items }) => (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <h6>{item.id}</h6>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
      }
  ReactDOM.render(<FilteredList />, document.getElementById("search-list"));