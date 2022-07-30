import React from "react";


const Card = ({ cardTitle, buttonTitle, onSubmit, children }) => {

    return (
        <div className="col-md-5 shadow p-3 mb-5 bg-white rounded border mx-auto">

            <h1 className="text-center text-primary mb-5">{cardTitle}</h1>

            <form onSubmit={onSubmit}>

                {children}

                <div className="form-group mt-5">
                    <button type="submit" className="form-control btn btn-dark">
                        {buttonTitle}
                    </button>
                </div>

            </form>

        </div>
    )
}

export default Card