import React from "react";
import {useDispatch, useSelector} from "react-redux";

import Object from "./Object";
import {fetchObjects} from "../redux/actions"
import {SHOW_LOADER} from "../redux/types";

export default () => {
    const dispatch = useDispatch()
    const objects = useSelector(state => state.objects.fetchedObjects)
    const loading = useSelector(state => state.app.loading)

    if (loading) {
        return (
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    if (!objects.length) {
        return <button
            className="btn btn-primary"
            onClick={() => dispatch(fetchObjects())}
        >Загрузить</button>
    }
    return objects.map(obj => <Object object={obj} key={obj} />)
}