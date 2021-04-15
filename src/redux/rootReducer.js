import {combineReducers} from "redux";
import {objectsReducer} from "./objectsReducer"
import {appReducer} from "./appReducer";

export const rootReducer = combineReducers( {
    objects: objectsReducer,
    app: appReducer
})