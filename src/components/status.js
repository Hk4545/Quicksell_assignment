import React, { useState, useEffect, useMemo } from "react";
import "./status.css";

function Status(props) {
  const { order } = props;
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState([]);
  const [tickets, settickets] = useState([]);
  const [back, setback] = useState([]);
  const [todo, settodo] = useState([]);
  const [progress, setprogress] = useState([]);
  const [done, setdone] = useState([]);
  const [cancel, setcancel] = useState([]);

  const arr = ["...", <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reception-1" viewBox="0 0 16 16">
  <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
</svg>, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reception-2" viewBox="0 0 16 16">
            <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4 5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
            </svg>, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reception-3" viewBox="0 0 16 16">
            <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
          </svg>, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reception-4" viewBox="0 0 16 16">
            <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"/>
          </svg>]

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();
      console.log(data);
      setuser(data.users);
      settickets(data.tickets);
       
    } catch (error) {
      console.error("Error fetching data:", error);
      
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let temp0 = tickets.filter((el) => el.status === "Backlog");
    let temp1 = tickets.filter((el) => el.status === "Todo");
    let temp2 = tickets.filter((el) => el.status === "In progress");
    let temp3 = tickets.filter((el) => el.status === "Done");
    let temp4 = tickets.filter((el) => el.status === "Canceled");
    setback(temp0);
    settodo(temp1);
    setprogress(temp2);
    setdone(temp3);
    setcancel(temp4);
    setLoading(!loading);
  }, [tickets]);

  useEffect(() => {
    function sortbytitle(a, b) {
      let tempa = a.title.toLowerCase();
      let tempb = b.title.toLowerCase();
      if (tempa < tempb) return -1;
      if (tempa > tempb) return 1;
      return 0;
    }

    function sortbypriority(a, b) {
      let tempa = a.priority;
      let tempb = b.priority;
      if (tempa < tempb) return -1;
      if (tempa > tempb) return 1;
      return 0;
    }

    if (order === "Title") {
      setback([...back.sort((a, b) => sortbytitle(a, b))]);
      settodo([...todo.sort((a, b) => sortbytitle(a, b))]);
      setprogress([...progress.sort((a, b) => sortbytitle(a, b))]);
      setdone([...done.sort((a, b) => sortbytitle(a, b))]);
      setcancel([...cancel.sort((a, b) => sortbytitle(a, b))]);
    }

    if (order === "Priority") {
      setback([...back.sort((a, b) => sortbypriority(a, b))]);
      settodo([...todo.sort((a, b) => sortbypriority(a, b))]);
      setprogress([...progress.sort((a, b) => sortbypriority(a, b))]);
      setdone([...done.sort((a, b) => sortbypriority(a, b))]);
      setcancel([...cancel.sort((a, b) => sortbypriority(a, b))]);
    }
  }, [order, loading]);

  return (
    <div className="pmaindiv">
      <div className="titlecontainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span style={{ color: "gray", marginLeft: "15px" }}><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="white" class="bi bi-circle-fill" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8"/>
</svg></span>
            {"  "}
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              Backlog
            </span>{" "}
            <span style={{ fontSize: "12px", color: "gray" }}>
              {back.length}
            </span>
          </div>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
              </svg>
            </span>{" "}
            <span style={{ color: "gray" }}>...</span>
          </div>
        </div>
        {back &&
          back.map((el, index) => {
            let temp = user.filter((elm) => elm.id == el.userId)
            return (
              <div className="titlediv">
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "5px", display:"flex", justifyContent:"space-between" }}
                >
                  <span>{el.id}</span><span>{temp[0]?.name}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={temp[0]?.available? "green" : "red"} class="bi bi-circle-fill" viewBox="0 0 16 16">
  <circle cx="4" cy="4" r="4"/>
</svg></span>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    paddingTop: "7px",
                  }}
                >
                  {el.title}
                </div>
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "7px" }}
                > {arr[el.priority]}
                  {el.tag.length > 0 ? "Feature request" : ""}
                </div>
              </div>
            );
          })}
      </div>
      <div className="titlecontainer" style={{ marginRight: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span style={{ color: "gray", marginLeft: "15px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="lightblue" class="bi bi-circle-fill" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8"/>
</svg>
            </span>
            {"  "}
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              Todo
            </span>{" "}
            <span style={{ fontSize: "12px", color: "gray" }}>
              {todo.length}
            </span>
          </div>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
              </svg>
            </span>{" "}
            <span style={{ color: "gray" }}>...</span>
          </div>
        </div>
        {todo &&
          todo.map((el, index) => {
            let temp = user.filter((elm) => elm.id == el.userId)
            return (
              <div className="titlediv">
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "5px",display:"flex", justifyContent:"space-between" }}
                >
                  <span>{el.id}</span><span>{temp[0]?.name}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={temp[0]?.available? "green" : "red"} class="bi bi-circle-fill" viewBox="0 0 16 16">
  <circle cx="4" cy="4" r="4"/>
</svg></span>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    paddingTop: "7px",
                  }}
                >
                  {el.title}
                </div>
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "7px" }}
                >
                  {arr[el.priority]}{el.tag.length > 0 ? "Feature request" : ""}
                </div>
              </div>
            );
          })}
      </div>
      <div className="titlecontainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span style={{ color: "gray", marginLeft: "15px" }}><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="blue" class="bi bi-circle-fill" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8"/>
</svg></span>
            {"  "}
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              In Progress
            </span>{" "}
            <span style={{ fontSize: "12px", color: "gray" }}>
              {progress.length}
            </span>
          </div>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
              </svg>
            </span>{" "}
            <span style={{ color: "gray" }}>...</span>
          </div>
        </div>
        {progress &&
          progress.map((el, index) => {
            let temp = user.filter((elm) => elm.id == el.userId)
            return (
              <div className="titlediv">
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "5px", display:"flex", justifyContent:"space-between" }}
                >
                  <span>{el.id}</span><span>{temp[0]?.name}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={temp[0]?.available? "green" : "red"} class="bi bi-circle-fill" viewBox="0 0 16 16">
  <circle cx="4" cy="4" r="4"/>
</svg></span>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    paddingTop: "7px",
                  }}
                >
                  {el.title}
                </div>
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "7px" }}
                >
                  {arr[el.priority]}{el.tag.length > 0 ? "Feature request" : ""}
                </div>
              </div>
            );
          })}
      </div>

      <div className="titlecontainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span style={{ color: "gray", marginLeft: "15px" }}><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="black" class="bi bi-circle-fill" viewBox="0 0 16 16">
  <circle cx="8" cy="8" r="8"/>
</svg></span>
            {"  "}
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              Done
            </span>{" "}
            <span style={{ fontSize: "12px", color: "gray" }}>
              {done.length}
            </span>
          </div>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
              </svg>
            </span>{" "}
            <span style={{ color: "gray" }}>...</span>
          </div>
        </div>
        {done &&
          done.map((el, index) => {
            let temp = user.filter((elm) => elm.id == el.userId)
            return (
              <div className="titlediv">
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "5px", display:"flex", justifyContent:"space-between" }}
                >
                  <span>{el.id}</span><span>{temp[0]?.name}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={temp[0]?.available? "green" : "red"} class="bi bi-circle-fill" viewBox="0 0 16 16">
  <circle cx="4" cy="4" r="4"/>
</svg></span>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    paddingTop: "7px",
                  }}
                >
                  {el.title}
                </div>
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "7px" }}
                >
                  {arr[el.priority]}{el.tag.length > 0 ? "Feature request" : ""}
                </div>
              </div>
            );
          })}
      </div>

      <div className="titlecontainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span style={{ color: "gray", marginLeft: "15px" }}><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
</svg></span>
            {"  "}
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              Canceled
            </span>{" "}
            <span style={{ fontSize: "12px", color: "gray" }}>
              {cancel.length}
            </span>
          </div>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />{" "}
              </svg>
            </span>{" "}
            <span style={{ color: "gray" }}>...</span>
          </div>
        </div>
        {cancel &&
          cancel.map((el, index) => {
            let temp = user.filter((elm) => elm.id == el.userId)
            return (
              <div className="titlediv">
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "5px", display:"flex", justifyContent:"space-between" }}
                >
                  <span>{el.id}</span><span>{temp[0]?.name}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={temp[0]?.available? "green" : "red"} class="bi bi-circle-fill" viewBox="0 0 16 16">
  <circle cx="4" cy="4" r="4"/>
</svg></span>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    paddingTop: "7px",
                  }}
                >
                  {el.title}
                </div>
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "7px" }}
                >
                  {arr[el.priority]}{el.tag.length > 0 ? "Feature request" : ""}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Status;
