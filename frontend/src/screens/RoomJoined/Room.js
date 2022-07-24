import { toast } from "react-toastify";
import React, { useEffect, useRef, useState } from "react";

import constants from "./constants";

import Canvas from "../../components/Canvas";



const FormInputTool = ({ tool ,label, id, value, onClick, htmlFor }) => {
    return(
        <div className="form-check form-check-inline">
            <input
                id={id}
                type="radio"
                value={value}
                name={"tools"}
                readOnly={true}
                onClick={onClick}
                checked={tool === value}
                className="form-check-input mt-1"
            />
            <label className="form-check-label" htmlFor={htmlFor}>
                {label}
            </label>
        </div>
    )
}



const Room = ({ userNo, socket, setUsers, setUserNo }) => {

    const ctx = useRef(null);
    const canvasRef = useRef(null);

    const [history, setHistory] = useState([]);
    const [elements, setElements] = useState([]);

    const [tool, setTool] = useState("pencil");
    const changeTool = (e) => setTool(e.target.value)

    const [color, setColor] = useState("#000000");
    const onChangeColor = (e) => setColor(e.target.value)

    /** Socket Event's Callback functions   */
    const onMessage = (data) => {
        toast.info(data.message);
    }
    const onUsers = (data) => {
        setUsers(data);
        setUserNo(data.length);
    }
    useEffect(() => {
        socket.on("users", onUsers);
        socket.on("message", onMessage);
    }, []);


    /** Canvas operations */
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        setElements([]);
    };

    const undo = () => {
        setHistory((prevHistory) => [
            ...prevHistory,
            elements[elements.length - 1],
        ]);
        setElements((prevElements) =>
            prevElements.filter((ele, index) => index !== elements.length - 1)
        );
    };

    const redo = () => {
        setElements((prevElements) => [
            ...prevElements,
            history[history.length - 1],
        ]);
        setHistory((prevHistory) =>
            prevHistory.filter((ele, index) => index !== history.length - 1)
        );
    };


    return (
        <div className="container-fluid">

            <div className="row">
                <h1 className="display-5 pt-4 pb-3 text-center">
                   {constants.titlePlaceHolder} {userNo}
                </h1>
            </div>

            <div className="row justify-content-center align-items-center text-center py-2">

                <div className="col-md-2">
                    <div className="color-picker d-flex align-items-center justify-content-center">
                        Color Picker : &nbsp;
                        <input
                            type="color"
                            value={color}
                            onChange={onChangeColor}
                        />
                    </div>
                </div>

                <div className="col-md-3">
                    <FormInputTool 
                        tool={tool}
                        id={"pencil"}
                        value={"pencil"}
                        htmlFor={"pencil"}
                        onClick={changeTool}
                        label={constants.pencilLabel}
                    />
                    <FormInputTool 
                        id={"line"}
                        tool={tool}
                        value={"line"}
                        htmlFor={"line"}
                        onClick={changeTool}
                        label={constants.lineLabel}
                    />
                    <FormInputTool 
                        id={"rect"}
                        tool={tool}
                        value={"rect"}
                        htmlFor={"rect"}
                        onClick={changeTool}
                        label={constants.rectLabel}
                    />
                </div>

                <div className="col-md-2">
                    <button
                        type="button"
                        onClick={undo}
                        disabled={elements.length === 0}
                        className="btn btn-outline-primary"
                    >
                        {constants.undoButton}
                    </button>
                    &nbsp;&nbsp;
                    <button
                        type="button"
                        onClick={redo}
                        disabled={history.length < 1}
                        className="btn btn-outline-primary ml-1"
                    >
                        {constants.redoButton}
                    </button>
                </div>

                <div className="col-md-1">
                    <div className="color-picker d-flex align-items-center justify-content-center">
                        <input
                            type="button"
                            onClick={clearCanvas}
                            className="btn btn-danger"
                            value={constants.clearButton}
                        />
                    </div>
                </div>

            </div>
            
            <div className="row">
                <Canvas
                    ctx={ctx}
                    tool={tool}
                    color={color}
                    socket={socket}
                    elements={elements}
                    canvasRef={canvasRef}
                    setElements={setElements}
                />
            </div>

        </div>
    );
};

export default Room;