import React, { useState, useEffect, useMemo } from "react";
import "./user.css";

function User(props) {
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

  const userTicketMap = useMemo(() => {
    const map = new Map();
    tickets.forEach((ticket) => {
      const userTickets = map.get(ticket.userId) || [];
      map.set(ticket.userId, [...userTickets, ticket]);
    });
    return map;
  }, [tickets]);

  const sortedUserDetails = useMemo(() => {
    const sortedDetails = user.map((currentUser) => {
      const userTickets = userTicketMap.get(currentUser.id) || [];
      if (order === "Title") {
        return userTickets.sort((a, b) => a.title.localeCompare(b.title));
      } else if (order === "Priority") {
        return userTickets.sort((a, b) => a.priority - b.priority);
      } else {
        return userTickets;
      }
    });
    return sortedDetails;
  }, [user, userTicketMap, order]);

  return (
    <div className="pmaindiv">
      {user.map((currentUser, index) => (
        <div className="titlecontainer" key={index}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
              <span style={{ color: "gray", marginLeft: "15px" }}>...</span>{"  "}
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>{currentUser.name}</span>{" "}
              <span style={{ fontSize: "12px", color: "gray" }}>{sortedUserDetails[index].length}</span>
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
          {sortedUserDetails[index] &&
            sortedUserDetails[index].map((el, ind) => {
              return (
                <div className="titlediv" key={ind}>
                  <div style={{ fontSize: "13px", color: "gray", paddingTop: "5px" }}>{el.id}</div>
                  <div style={{ fontSize: "14px", fontWeight: "bold", paddingTop: "7px" }}>{el.title}</div>
                  <div style={{ fontSize: "13px", color: "gray", paddingTop: "7px" }}>
                    {el.tag.length > 0 ? "Feature request" : "no content"}
                  </div>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}

export default User;
