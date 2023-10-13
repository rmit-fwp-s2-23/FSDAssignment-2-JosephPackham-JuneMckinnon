import React, { useEffect, useState } from "react";
import { getUsers, setAdmin, setBlocked } from "../data/repository";
import "../css/users.css"

const UserList = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);
    
    const loadUsers = async () => {
        const currentUsers = await getUsers();
        setUsers(currentUsers);
    }

    const toggleButton = async (ev, email) => {
        const button = ev.target;
        let response;
        const currentClass = Array.from(button.classList)[0];
        switch (currentClass) {
            case "block-button":
                button.classList.remove("block-button");
                button.classList.add("block-toggled");
                button.innerText = "Blocked";

                response = await setBlocked(email, true);
                console.log(response);
                break;
            case "block-toggled":
                button.classList.remove("block-toggled");
                button.classList.add("block-button");
                button.innerText = "Block?";

                response = await setBlocked(email, false);
                console.log(response);
                break;
            case "admin-button":
                button.classList.remove("admin-button");
                button.classList.add("admin-toggled");
                button.innerText = "Admin";

                response = await setAdmin(email, true);
                console.log(response);
                break;
            case "admin-toggled":
                button.classList.remove("admin-toggled");
                button.classList.add("admin-button");
                button.innerText = "Admin?";

                response = await setAdmin(email, true);
                console.log(response);
                break;
            default:
                console.log("err");
        }
    }

    return (
        <div className = "user-container">
            {users?.map(user =>
                <div key = {user.email} className = "user-row">
                    <div className = "user-left">
                        <div className = "user-icon"></div>
                        <div className = "user-info">
                            <div className = "info">Name: {user.name}</div>
                            <div className = "info">Email: {user.email}</div>
                            <div className = "info">Joined: {user.joined}</div>
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
    )
}

export default UserList;