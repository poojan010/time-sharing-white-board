import { toast } from "react-toastify";
import React, { useEffect, useRef } from "react";


const titlePlaceholder = "React Drawing App - users online :"

const ClientRoom = ({ userNo, socket, setUsers, setUserNo }) => {

    const imgRef = useRef(null);
    

    /** Socket Event's Callback functions   */
    const onMessage = (data) => {
        toast.info(data.message);
    }
    const onUsers = (data) => {
        setUsers(data);
        setUserNo(data.length);
    }
    const onCanvasImage = (data) => {
        imgRef.current.src = data;
    }


    useEffect(() => {
        socket.on("users",onUsers);
        socket.on("message",onMessage);
        socket.on("canvasImage",onCanvasImage);
    }, []);
    
    
    return (
        <div className="container-fluid">

            <div className="row pb-2">
                <h1 className="display-5 pt-4 pb-3 text-center">
                    {titlePlaceholder} {userNo}
                </h1>
            </div>

            <div className="row mt-5">
                <div
                    style={{ height: "500px" }}
                    className="col-md-8 overflow-hidden border border-dark px-0 mx-auto mt-3"
                >
                    <img className="w-100 h-100" ref={imgRef} src="" alt="image" />
                </div>
            </div>

        </div>
    );
    
};

export default ClientRoom;