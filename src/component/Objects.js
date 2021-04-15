import React from "react";
import {connect} from "react-redux"
import Object from "./Object";

const Posts = ({justObjects}) => {
    if (!justObjects.length) {
        return <p className="text-center">No objects!</p>
    }
    return justObjects.map(object => <Object object={object} key={object.id} />)
}

const mapStateToProps = state => {
    return {
        justObjects: state.objects.objects
    }
}

export default connect(mapStateToProps, null)(Posts)
