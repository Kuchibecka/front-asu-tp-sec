import React from "react";

export default ( { object } ) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Title here {object.name}</h5>
            </div>

        </div>
    )
}