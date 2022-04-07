/* eslint-disable import/no-anonymous-default-export */


// ============================================================
// NOTES:
// ------------------------------
// 2 Components: App & SearchBox
// useFetch = load external json data
// App Component: main component rendered once
// SearchBox: contains input text, and displays searched data
// getMatches: function for searching json for whatever was typed into search box
// useKeyNavigation: keyboard navigation using arrows and enter key for select
// ==============================================================================

import React from 'react'
import  ReactDOM  from 'react-dom';
import  MenuIcon  from '@material-ui/icons/Menu';
import props from './../MenuDots';
import "./search.css"
import {useRef,useState,useEffect} from 'react'
console.clear();
const apiUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/708818/countries.json';

// // console styler (use browser console to see styles as opposed to codepen console)
// const consoleStyle = (color) => `color: black;background-color: ${color}; font-weight:800;padding:2px 8px;`;
export default propos =>{
const DisplayInfo = React.memo(({ title, content }) => 
  <pre>
    <div className="title">{title}</div>
    <div className="content">{content}</div>
  </pre>
);

// Custom useFetch hook
const useFetch = (run) => {
  const [ response, setResponse ] = useState({});
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    // if 'run' bool is true, then fetchData
    if (run) {
      const fetchData = async () => {
        setLoading(true); // loading
        try {
          const res = await fetch(apiUrl);
          const json = await res.json();
          setResponse(json); // response loaded as json
          setLoading(false); // loading complete
        } catch(err) {
          // console.log('%cAn Error has occured', consoleStyle('crimson'));
          console.log(err);
        }
      };
      fetchData();
    }
  }, [run, apiUrl]);
  
  return { response, loading }
}

// <SearchBox> Component
const SearchBox = (props) => {
  const [searchString, setSearchString] = useState('');
  const [fetchData, setFetchData] = useState(false); // bool: true = fetchData using useFetch()
  const [dataSet, setDataSet] = useState([]); // load response into state
  const [matches, setMatches] = useState([]); // load matches into state
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { response, loading } = useFetch(fetchData);
  
  // onChange for input field
  const handleChange = (e) => {
    setSearchString(e.target.value);
    if (e.target.value.length > 0) {
      setFetchData(true);
    }
    else {
      setSelectedItemIndex(0); // reset to preserve keyboard navigation
      setMatches([]); // reset 'matches' array
      // console.log('%cmatches array reset', consoleStyle('pink'))
    }
  }
  
  // Load dataSet from fetch
  useEffect(() => {
    if (!loading) {
      setDataSet(response);
      // console.log('%cData loaded successfully', 'color: dodgerblue; font-weight: 900')
    }
  }, [loading, response, setDataSet]);
  
  // Load "matches" array
  useEffect(() => {
    if (dataSet && searchString.length > 1) {
      setMatches(getMatches(dataSet, searchString));
      console.log('Matches updated')
    }
  }, [dataSet, searchString, setMatches, getMatches]);
  
  useKeyNavigation(matches, selectedItemIndex, setSelectedItemIndex, setSelectedItem);
  
  // Display "matches" array
  const displayMatches = () => 
    // double check matches is valid for map()
    matches && matches.length > 0 ?
        matches.map((m, i) => (
          <li key={i} className={selectedItemIndex-1 === i ? 'highlight':''} onClick={() => setSelectedItem(m.country)}>
            {m.country} [{m.abbreviation}]
          </li>
        )) : '';
  
  return (
    <>
      <input type="text"  name={props.name}  value={searchString} className="text-box"
        autoComplete="off" placeholder="Type country name or code" onChange={handleChange} />
      
      { !loading &&
      <ul className="search-results">
        {displayMatches()}
      </ul>
      }
      { selectedItem.length > 0 &&
        <div className="selected-item">
          <div className="title">selectedItem</div>
          <div className="content">{selectedItem}</div>
        </div>
      }
      <DisplayInfo title="searchString" content={searchString} />
      <DisplayInfo title="dataSet" content={ dataSet.length > 0 ? dataSet.length + ' countries' : 'not loaded' } />
      <DisplayInfo title="matches" content={ matches.length > 0 ? matches.length + ' countries' : 'no matches' } />
      { selectedItem &&
      <DisplayInfo title="useKeyNavigation" content={selectedItemIndex + ":" + selectedItem} />
      }
    </>
  )
};

// <App>: Main Component
const App = () => {
  // console.log('%c===] App Init [===', consoleStyle('greenyellow'));
  
  // added to prevent submit on ENTER
  const onSubmit = (e) => { e.preventDefault(); }
  const [open, setOpen] = useState(false);
  const app = useRef(null)
  const handleClickOutside = event => {
     if(app.current && !app.current.contains(event.target)){
       setOpen(false)
     }
  }
  useEffect(() => {
    document.removeEventListener("mousedown", handleClickOutside);
    return()=> {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })
  return (
      <div className = "app" ref = {app}>
        <MenuIcon onClick={() => setOpen(!open)}{...props}/>
      <form onSubmit={onSubmit}>
        
        <div className="form-input">
          <label>Search Country Name</label>
          <div className="input">
            <SearchBox name="search"/>
          </div>
        </div>
      </form>
    
      </div>
      
  );

}

  return <App  />;

}


// KeyEvent Handler Effect
function useKeyNavigation(matches, selectedItemIndex, setSelectedItemIndex, setSelectedItem) {
  useEffect(() => {
    if (matches && matches.length > 0) {
      let matchCount = matches.length;
      
      const handleKeyEvent = (e) => {
        // 38: Up Arrow Key 
        if (e.keyCode === 38 || e.which === 38) {
          if (selectedItemIndex > 1 && selectedItemIndex <= matchCount) {
            setSelectedItemIndex(selectedItemIndex);
            setSelectedItem(matches[selectedItemIndex - 2].country);
            setSelectedItemIndex(c => c - 1);
          } else {
            setSelectedItemIndex(matchCount);
            setSelectedItem(matches[matchCount-1].country);
          }
        }
        // 40: DownArrow KEY
        if (e.keyCode === 40 || e.which === 40) {
          if (selectedItemIndex < matchCount) {
            setSelectedItemIndex(selectedItemIndex);
            setSelectedItem(matches[selectedItemIndex].country);
          } else {
            setSelectedItemIndex(0);
            setSelectedItem(matches[0].country);
          }
          setSelectedItemIndex(c => c+1);
        }
        // ENTER KEY
        if (e.keyCode === 13 || e.which === 13) {
          e.preventDefault();
          // pending selectedItemIndex update from arrows causes it to add 1 extra when Enter is pressed.
          // The following is required to allow it to select the correctly highlighted option.
          let selectedIndex = selectedItemIndex - 1;
          if (selectedIndex === -1) selectedIndex = 0;
          setSelectedItem(matches[selectedIndex].country);
        }
      };
      
      window.addEventListener("keydown", handleKeyEvent);
      return () => window.removeEventListener("keydown", handleKeyEvent);
    }
  }, [
    matches, selectedItemIndex, setSelectedItemIndex, setSelectedItem
  ]);
}

// find matches inside response using searchString
// Used by SearchBox component
function getMatches(response, searchString) {
  return response.filter(
    (x) =>
      x.country.search(new RegExp(searchString, "i")) > -1 ||
      x.abbreviation.search(new RegExp(searchString, "i")) > -1,
  );
}
