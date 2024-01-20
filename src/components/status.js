import React, { useState, useEffect } from "react";
import "./status.css";

function Status(props) {
  const { order } = props;
  const [user, setuser] = useState([]);
  const [tickets, settickets] = useState([]);
  const [back, setback] = useState([]);
  const [todo, settodo] = useState([]);
  const [progress, setprogress] = useState([]);
  const [done, setdone] = useState([]);
  const [cancel, setcancel] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();
      console.log(data);
      setuser(data.users);
      settickets(data.tickets);
      console.log(data.tickets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let temp0 = tickets.filter((el) => el.status == "Backlog");
    let temp1 = tickets.filter((el) => el.status == "Todo");
    let temp2 = tickets.filter((el) => el.status == "In progress");
    let temp3 = tickets.filter((el) => el.status == "Done");
    let temp4 = tickets.filter((el) => el.status == "Canceled");
    setback(temp0);
    settodo(temp1);
    setprogress(temp2);
    setdone(temp3);
    setcancel(temp4);
  }, [tickets]);

  useEffect(() => {
    function sortbytitle(a, b) {
      let tempa = a.title.toLowerCase();
      let tempb = b.title.toLowerCase();
      if (tempa < tempb) return -1;
      if (tempa > tempb) return 1;
      return 0;
    }

    function sortbypriorty(a, b) {
      let tempa = a.priority;
      let tempb = b.priority;
      if (tempa < tempb) return -1;
      if (tempa > tempb) return 1;
      return 0;
    }

    if (order == "Title") {
      setback([...back.sort((a, b) => sortbytitle(a, b))]);
      settodo([...todo.sort((a, b) => sortbytitle(a, b))]);
      setprogress([...progress.sort((a, b) => sortbytitle(a, b))]);
      setdone([...done.sort((a, b) => sortbytitle(a, b))]);
      setcancel([...cancel.sort((a, b) => sortbytitle(a, b))]);
    }

    if (order == "Priority") {
      setback([...back.sort((a, b) => sortbypriorty(a, b))]);
      settodo([...todo.sort((a, b) => sortbypriorty(a, b))]);
      setprogress([...progress.sort((a, b) => sortbypriorty(a, b))]);
      setdone([...done.sort((a, b) => sortbypriorty(a, b))]);
      setcancel([...cancel.sort((a, b) => sortbypriorty(a, b))]);
    }
  }, [order, back, todo, progress, done, cancel]);

  return (
    <div className="pmaindiv">
      <div className="titlecontainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span style={{ color: "gray", marginLeft: "15px" }}>...</span>
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
            return (
              <div className="titlediv">
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "5px" }}
                >
                  {el.id}
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
                  {el.tag.length > 0 ? "Feature request" : "no content"}
                </div>
              </div>
            );
          })}
      </div>
      <div className="titlecontainer" style={{ marginRight: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span style={{ color: "gray", marginLeft: "15px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5" id="circle" height="14px" width="14px"><defs><clipPath id="a"><path d="M0 38h38V0H0v38Z"></path></clipPath></defs><g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)"><path fill="#e6e7e8" d="M37 19c0-9.941-8.059-18-18-18S1 9.059 1 19s8.059 18 18 18 18-8.059 18-18"></path></g></svg>
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
            return (
              <div className="titlediv">
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "5px" }}
                >
                  {el.id}
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
                  {el.tag.length > 0 ? "Feature request" : "no content"}
                </div>
              </div>
            );
          })}
      </div>
      <div className="titlecontainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span style={{ color: "gray", marginLeft: "15px" }}>...</span>
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
            return (
              <div className="titlediv">
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "5px" }}
                >
                  {el.id}
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
                  {el.tag.length > 0 ? "Feature request" : "no content"}
                </div>
              </div>
            );
          })}
      </div>

      <div className="titlecontainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span style={{ color: "gray", marginLeft: "15px" }}>...</span>
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
            return (
              <div className="titlediv">
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "5px" }}
                >
                  {el.id}
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
                  {el.tag.length > 0 ? "Feature request" : "no content"}
                </div>
              </div>
            );
          })}
      </div>

      <div className="titlecontainer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ paddingBottom: "15px", paddingTop: "10px" }}>
            <span style={{ color: "gray", marginLeft: "15px" }}>...</span>
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
            return (
              <div className="titlediv">
                <div
                  style={{ fontSize: "13px", color: "gray", paddingTop: "5px" }}
                >
                  {el.id}
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
                  {el.tag.length > 0 ? "Feature request" : "no content"}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Status;
