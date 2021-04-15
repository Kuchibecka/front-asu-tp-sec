import {CREATE_OBJECT, FETCH_OBJECTS, HIDE_ALERT} from "./types";

const initialState = {
    objects: [],
    fetchedObjects: []
}

export const objectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_OBJECT:
            return {...state, objects: state.objects.concat([action.payload])}
        case FETCH_OBJECTS:
            return { ...state, fetchedObjects: action.payload }
        default:
            return state
    }
    return state
}