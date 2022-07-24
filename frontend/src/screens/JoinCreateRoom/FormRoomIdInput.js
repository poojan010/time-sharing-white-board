import React from "react";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";

import constants from "./constants";

const FormRoomIdInput = ({ value,generateUuid }) => {

    const toastSuccess = () => toast.success(constants.toastCopy)

    return(
        <div className="input-group my-2 border align-items-center">
            <input
                type="text"
                value={value}
                readOnly={true}
                className="form-control border-0 outline-0"
            />
            <div className="input-group-append">
                <button
                    type="button"
                    onClick={generateUuid}
                    className="btn btn-outline-primary  border-0 btn-sm"
                >
                    {constants.buttonGenerate}
                </button>
                &nbsp;&nbsp;
                <CopyToClipboard text={value} onCopy={toastSuccess}>
                    <button type="button" className="btn btn-outline-dark border-0 btn-sm">
                        {constants.buttonCopy}
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    )
}

export default FormRoomIdInput