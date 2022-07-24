import io from "socket.io-client";
import { ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";

import "./App.css"
import { generateUUID } from "./utils";

import RoomJoined from "./screens/RoomJoined";
import JoinCreateRoom from "./screens/JoinCreateRoom";


const server = "http://localhost:5000";
const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
};

const socket = io(server, connectionOptions);



const App = () => {

    const [userNo, setUserNo] = useState(0);
    const [roomJoined, setRoomJoined] = useState(false);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);


    useEffect(() => {
        if (roomJoined) socket.emit("user-joined", user);
    }, [roomJoined]);


    return (
        <div className="home">

            <ToastContainer />
            
            {roomJoined 
                ?(<RoomJoined
                    user={user}
                    users={users}
                    userNo={userNo}
                    socket={socket}
                    setUsers={setUsers}
                    setUserNo={setUserNo}
                />)
                :(<JoinCreateRoom
                    setUser={setUser}
                    uuid={generateUUID}
                    setRoomJoined={setRoomJoined}
                />)
            }

        </div>
    );
};


export default App;