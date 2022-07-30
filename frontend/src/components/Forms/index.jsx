
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import constants from "./constants";

import Card from "./Card";
import FormInput from "./FormInput";
import FormRoomIdInput from "./FormRoomIdInput";


const Forms = ({ uuid, socket, setUser }) => {

    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState(uuid());
    const [joinName, setJoinName] = useState("");
    const [joinRoomId, setJoinRoomId] = useState("");

    const genreateUuid = () => setRoomId(uuid())

    const navigate = useNavigate()

    const handleCreateSubmit = (e) => {

        e.preventDefault();

        if (!name) return toast.dark(constants.toastNameError);

        const roomData = {
            name,
            roomId,
            userId: uuid(),
            host: true,
            presenter: true,
        };
        setUser(roomData);
        navigate(`/${roomId}`);
        console.log(roomData);
        socket.emit("userJoined", roomData);

    };

    const handleJoinSubmit = (e) => {
        e.preventDefault();

        if (!joinName) return toast.dark(constants.toastNameError);

        const roomData = {
            name: joinName,
            roomId: joinRoomId,
            userId: uuid(),
            host: false,
            presenter: false,
        };
        setUser(roomData);
        navigate(`/${joinRoomId}`);
        socket.emit("userJoined", roomData);
    };


    return (
        <div className="container">

            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center my-5">
                        {constants.screenTitle}
                    </h1>
                </div>
            </div>

            <div className="row mx-5 mt-5">

                <Card
                    onSubmit={handleCreateSubmit}
                    cardTitle={constants.cardCreateRoom}
                    buttonTitle={constants.buttonCreateRoom}
                >
                    <FormInput
                        value={name}
                        setValue={setName}
                        placeholder={constants.placeholderName}
                    />
                    <FormRoomIdInput
                        value={roomId}
                        generateUuid={genreateUuid}
                    />
                </Card>

                <Card
                    onSubmit={handleJoinSubmit}
                    cardTitle={constants.cardJoinRoom}
                    buttonTitle={constants.buttonJoinRoom}
                >
                    <FormInput
                        value={joinName}
                        setValue={setJoinName}
                        placeholder={constants.placeholderName}
                    />
                    <FormInput
                        value={joinRoomId}
                        setValue={setJoinRoomId}
                        placeholder={constants.placeholderRoomId}
                    />
                </Card>

            </div>
        </div>
    );
};

export default Forms;