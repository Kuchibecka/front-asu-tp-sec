import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {fetchObjects} from "../redux/actions"

export default () => {
    const dispatch = useDispatch()
    const objects = useSelector(state => state.objects.fetchedObjects)

    if (!objects.length) {
         dispatch(fetchObjects())
    }
    return objects
}