import React, { useState, useEffect, useMemo } from "react";
import "./priority.css";

function Priority(props) {
  const { order } = props;
  const [user, setuser] = useState([]);
  const [tickets, settickets] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
      const data = await response.json();
      setuser(data.users);
      settickets(data.tickets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const priorityLists = useMemo(() => {
    const result = [];
  
    for (let priority = 0; priority < 5; priority++) {
      const filteredTickets = tickets.filter((el) => el.priority === priority);
  
      if (order === "Title") {
        result.push([...filteredTickets].sort((a, b) => a.title.localeCompare(b.title)));
      } else {
        result.push(filteredTickets);
      }
    }
  
    return result;
  }, [tickets, order]);
  
  const renderPriorityList = (priorityList, priorityName) => (
    <div className="titlecontainer" key={priorityName}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
          <span style={{ color: "gray", marginLeft: "15px" }}>...</span>{"  "}
          <span style={{ fontSize: "14px", fontWeight: "bold" }}>{priorityName}</span>{" "}
          <span style={{ fontSize: "12px", color: "gray" }}>{priorityList.length}</span>
        </div>
        <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </span>{" "}
          <span style={{ color: "gray" }}>...</span>
        </div>
      </div>
      {priorityList && priorityList.map((el, index) => (
        <div className="titlediv" key={index}>
          <div style={{ fontSize: "13px", color: "gray", paddingTop: "5px" }}>{el.id}</div>
          <div style={{ fontSize: "14px", fontWeight: "bold", paddingTop: "7px" }}>{el.title}</div>
          <div style={{ fontSize: "13px", color: "gray", paddingTop: "7px" }}>{el.tag.length > 0 ? "Feature request" : "no content"}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="pmaindiv">
      {priorityLists.map((priorityList, index) => {
        const priorityName = index === 0 ? "No Priority" : index === 4 ? "Urgent" : index === 3 ? "High" : index === 2 ? "Medium" : "Low";
        return renderPriorityList(priorityList, priorityName);
      })}
    </div>
  );
}

export default Priority;
