import React, { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

const API_URL = "https://reqres.in/api/users?per_page=12";

export const Employees = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((employees) => {
        setUsers(employees.data);
      });
  }, []);

  const handleChange = (e) => {
    setNewUserName(e.target.value);
  };

  const addUser = () => {
    if (!newUserName.trim()) return;
    setUsers([
      ...users,
      { first_name: newUserName, id: (users[users.length - 1]?.id || 1) + 1 },
    ]);
    setNewUserName("");
    scrollToBottom();
  };

  const createUserDeleteHandler = (id) => () => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <ul style={{ listStyleType: "none", paddingLeft: "0px" }}>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <div
                style={{
                  width: "17rem",
                  border: "0.5px solid gray",
                  borderRadius: "0 6px 6px 0",
                  marginTop: "0.3rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ paddingLeft: "0.5rem" }}>{user.first_name}</div>
                <button
                  className="btn btn-secondary"
                  onClick={createUserDeleteHandler(user.id)}
                >
                  Delete user
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <input
        style={{ width: "12.1rem", marginTop: "1rem", paddingLeft: "0.5rem" }}
        value={newUserName}
        onChange={handleChange}
      />
      <button onClick={addUser}>Add user</button>
    </div>
  );
};
