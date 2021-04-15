import {CREATE_OBJECT, FETCH_OBJECTS, HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER} from "./types";

export function createObject(object) {
    return {
        type: CREATE_OBJECT,
        payload: object
    }
}

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function showAlert(text) {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: text
        })
        setTimeout(() => {
            dispatch(hideAlert())
        }, 2000)
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

export function fetchObjects() {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await fetch('http://jsonplaceholder.typicode.com/posts?_limit=5')
            const json = await response.json()
            setTimeout(() => {
                dispatch({type: FETCH_OBJECTS, payload: json})
                dispatch(hideLoader())
            }, 500) //todo: убрать в prod
        } catch (e) {
            dispatch(showAlert('Ошибка загрузки данных с сервера'))
            dispatch(hideLoader())
        }
    }
}