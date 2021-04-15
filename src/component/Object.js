import React from "react";

export default ( { object } ) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Object name: {object.name}</h5>
            </div>

        </div>
    )
}