
import React from "react";


const FormInput = ({value,setValue,placeholder}) => {

    const onChange = (e) => setValue(e.target.value)

    return(
        <div className="form-group my-2">

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="form-control"
            />

        </div>
    )

}

export default FormInput