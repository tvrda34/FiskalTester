import axios from 'axios'
import {
    TEST_LIST_REQUEST,
    TEST_LIST_SUCCESS,
    TEST_LIST_FAIL,

    TEST_DETAILS_REQUEST,
    TEST_DETAILS_SUCCESS,
    TEST_DETAILS_FAIL,

    TEST_DELETE_REQUEST,
    TEST_DELETE_SUCCESS,
    TEST_DELETE_FAIL,

} from '../constants/testConstants'


export const listTests = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TEST_LIST_REQUEST })

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
            `/api/tests/${id}/`,
            config 
        )

        dispatch({
            type: TEST_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TEST_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const testDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TEST_DETAILS_REQUEST })

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
            `/api/tests/result/${id}/`,
            config
            )

        dispatch({
            type: TEST_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TEST_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteTest = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEST_DELETE_REQUEST
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
            `/api/tests/delete/${id}/`,
            config
        )

        dispatch({
            type: TEST_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: TEST_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}