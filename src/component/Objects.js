import React from "react";
import Object from "./Object";

export default ({objects}) => {
    if (!objects.length) {
        return <p className="text-center">No objects!</p>
    }
    return objects.map(object => <Object object={object} key={object} />)
}
