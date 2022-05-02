import axios from 'axios'
import {
    REGISTER_LIST_REQUEST,
    REGISTER_LIST_SUCCESS,
    REGISTER_LIST_FAIL,

    REGISTER_DETAILS_REQUEST,
    REGISTER_DETAILS_SUCCESS,
    REGISTER_DETAILS_FAIL,

    REGISTER_DELETE_REQUEST,
    REGISTER_DELETE_SUCCESS,
    REGISTER_DELETE_FAIL,

    REGISTER_CREATE_REQUEST,
    REGISTER_CREATE_SUCCESS,
    REGISTER_CREATE_FAIL,

    REGISTER_UPDATE_REQUEST,
    REGISTER_UPDATE_SUCCESS,
    REGISTER_UPDATE_FAIL,

} from '../constants/registerConstants'


export const listRegisters = () => async (dispatch, getState) => {
    try {
        dispatch({ type: REGISTER_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/registers/`,
            config 
        )

        dispatch({
            type: REGISTER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: REGISTER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listRegisterDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: REGISTER_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/registers/${id}/`,
            config
            )

        dispatch({
            type: REGISTER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: REGISTER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteRegister = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REGISTER_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/registers/delete/${id}/`,
            config
        )

        dispatch({
            type: REGISTER_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: REGISTER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createRegister = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: REGISTER_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/registers/create/`,
            {},
            config
        )
        dispatch({
            type: REGISTER_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: REGISTER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateRegister = (register) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REGISTER_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/registers/update/${register.id}/`,
            register,
            config
        )
        dispatch({
            type: REGISTER_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: REGISTER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: REGISTER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}