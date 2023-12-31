// imports
import React, { useEffect, useState } from "react";
import { getUsers, setAdmin, setBlocked } from "../data/repository";
import "../css/users.css"

const UserList = () => {
    // define state for all users
    const [users, setUsers] = useState(null);

    // on component load set all users
    useEffect(() => {
        loadUsers();
    }, []);
    
    // retrieve all users
    const loadUsers = async () => {
        const currentUsers = await getUsers();
        setUsers(currentUsers);
    }

    // this function onclick changes the button's class depending on the button, admin or block
    const toggleButton = async (ev, email) => {
        const button = ev.target; // retrieve button
        let response;

        // get the button's current class
        const currentClass = Array.from(button.classList)[0];

        // depending on class, change to different class / text
        switch (currentClass) {
            case "block-button":
                response = await setBlocked(email, true);
                console.log(response);

                if (response.success === true) {
                    button.classList.remove("block-button");
                    button.classList.add("block-toggled");
                    button.innerText = "Blocked";
                } else {
                    alert(response.message);
                }

                break;
            case "block-toggled":
                button.classList.remove("block-toggled");
                button.classList.add("block-button");
                button.innerText = "Block?";

                response = await setBlocked(email, false);
                console.log(response);
                break;
            case "admin-button":
                response = await setAdmin(email, true);
                console.log(response);

                if (response.success === true) {
                    button.classList.remove("admin-button");
                    button.classList.add("admin-toggled");
                    button.innerText = "Admin";
                } else {
                    alert(response.message);
                }
                
                break;
            case "admin-toggled":
                response = await setAdmin(email, false);
                console.log(response);

                if (response.success === true) {
                    button.classList.remove("admin-toggled");
                    button.classList.add("admin-button");
                    button.innerText = "Admin?";
                } else {
                    alert(response.message);
                }

                break;
            default:
                console.log("err");
        }
    }

    return (
        <div className = "user-container">
            <div className = "shadow-top"></div>
                <div className = "user-list">
                    {users?.map(user =>
                        <div key = {user.email} className = "user-row">
                            <div className = "user-left">
                                <div className = "user-icon"></div>
                                <div className = "user-info">
                                    <div className = "info">Name: {user.name}</div>
                                    <div className = "info">Email: {user.email}</div>
                                    <div className = "info">Joined: {user.joined.slice(0, 10)}</div>
                                </div>
                            </div>
                            <div className = "user-toggles">
                                <button key = {`block${user.email}`} className = {user.blocked ? "block-toggled" : "block-button"} id = "user-button" onClick = {(ev) => toggleButton(ev, user.email)}>
                                    {user.blocked ? "Blocked" : "Block?"}
                                </button>
                                <button key = {`admin${user.email}`} className = {user.admin ? "admin-toggled" : "admin-button"} id = "user-button" onClick = {(ev) => toggleButton(ev, user.email)}>
                                    {user.admin ? "Admin" : "Admin?"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            <div className = "shadow-bottom"></div>
        </div>
    )
}

export default UserList;