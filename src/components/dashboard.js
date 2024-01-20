import React, { useState, useEffect } from "react";
import "./dashboard.css"
import Priority from "./priority";
import Status from "./status";
import User from "./user";

function Dashboard() {
 
  const [displayon, setdisplayon] = useState(false);
  const [group, setgroup] = useState("Status");
  const [order, setorder] = useState("");

  const handleselection = (e) => {
    e.stopPropagation();
    setdisplayon(!displayon);
  }

  const handlegroup = (e) => {
    setgroup(e.target.value);
  }

  const handleorder = (e) => {
    setorder(e.target.value);
  }
  const handlebtn = () => {
    setdisplayon(false);
  }

  

  return (
    <div className="main">
      <div className="displaydiv" onClick={handlebtn}>
        <button className="displaybutton" onClick={handleselection}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="filter" width="13" height="13" style={{marginTop:"3px"}}><path d="M4 10h7.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2H22.91A6 6 0 0 0 11.09 8H4a1 1 0 0 0 0 2zM17 5a4 4 0 1 1-4 4A4 4 0 0 1 17 5zM44 23H36.91a6 6 0 0 0-11.82 0H4a1 1 0 0 0 0 2H25.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2zM31 28a4 4 0 1 1 4-4A4 4 0 0 1 31 28zM44 38H22.91a6 6 0 0 0-11.82 0H4a1 1 0 0 0 0 2h7.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2zM17 43a4 4 0 1 1 4-4A4 4 0 0 1 17 43z" data-name="Layer 15"></path></svg>{" "}Display</button>
        {displayon && (
            <div className="displaydropdown" 
            onClick={(e) => e.stopPropagation()}
            >
                <div >
                    <label>Grouping</label>
                    <select onChange={handlegroup} value={group}>
                        <option value="Status">Status</option>
                        <option value="User">User</option>
                        <option value="Priority">Priority</option>
                    </select>
                </div>
                <div style={{display:"flex"}}>
                    <label>Ordering</label>
                    <select onChange={handleorder} value={order}>
                    <option value="">Select</option>
                        <option value="Priority">Priority</option>
                        <option value="Title">Title</option>
                    </select>
                </div>
            </div>
        )}
      </div>
      <div className="contentdiv" onClick={handlebtn}>
        {group === "Priority" && <Priority order = {order}/>}
        {group === "Status" && <Status order = {order}/>}
        {group === "User" && <User order = {order}/>}
      </div>
    </div>
  );
}

export default Dashboard;
