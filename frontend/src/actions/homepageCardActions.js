import {
    HOMEPAGE_CARDS_REQUEST,
    HOMEPAGE_CARDS_SUCCESS,
    HOMEPAGE_CARDS_FAIL,
    HOMEPAGE_CARDS_DELETE_REQUEST,
    HOMEPAGE_CARDS_DELETE_SUCCESS,
    HOMEPAGE_CARDS_DELETE_FAIL,
    HOMEPAGE_CARD_SUCCESS,
    HOMEPAGE_CARD_REQUEST,
    HOMEPAGE_CARD_FAIL,
    HOMEPAGE_CARD_EDIT_REQUEST,
    HOMEPAGE_CARD_EDIT_SUCCESS,
    HOMEPAGE_CARD_EDIT_FAIL
} from "../constants/homepageCardConstants"
import axios from 'axios'
import { logout } from "./userActions"
export const homepageCardList = () => async (dispatch) => {
    try {
        dispatch({ type: HOMEPAGE_CARDS_REQUEST })

        const { data } = await axios.get('/api/homepage/cards')

        dispatch({
            type: HOMEPAGE_CARDS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HOMEPAGE_CARDS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })
    }
}

export const singleHomepageCard = (id) => async (dispatch) => {
    try {
        dispatch({ type: HOMEPAGE_CARD_REQUEST })

        const { data } = await axios.get(`/api/homepage/cards/${id}`)

        dispatch({
            type: HOMEPAGE_CARD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HOMEPAGE_CARD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })
    }
}

export const deleteHomePageCard = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOMEPAGE_CARDS_DELETE_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
            params: {
                id
            }
        }

        axios.delete(`/api/homepage/cards/${id}`, config)
            .then(function (res) {
                dispatch({
                    type: HOMEPAGE_CARDS_DELETE_SUCCESS,
                    payload: res.data,
                })
            })
            .catch(function (error) {
                const message = error.response && error.response.data.message ? error.response.data.message : error.message
                if (message === 'Not authorized, token failed')
                    dispatch(logout());
                dispatch({
                    type: HOMEPAGE_CARDS_DELETE_FAIL,
                    payload: message,
                })
            });
    } catch (error) {
        dispatch({
            type: HOMEPAGE_CARDS_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })
    }
}

export const addNewHomepageCard = () => {

}

export const editHomepageCard = (card, id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOMEPAGE_CARD_EDIT_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${userInfo.token}`,
            }
        }

        axios.put(`/api/homepage/cards/${id}`, card, config)
            .then(function (res) {
                dispatch({
                    type: HOMEPAGE_CARD_EDIT_SUCCESS,
                    payload: res.data,
                })
            })
            .catch(function (error) {
                const message = error.response && error.response.data.message ? error.response.data.message : error.message
                if (message === 'Not authorized, token failed')
                    dispatch(logout());
                dispatch({
                    type: HOMEPAGE_CARD_EDIT_FAIL,
                    payload: message,
                })
            });
    } catch (error) {
        dispatch({
            type: HOMEPAGE_CARDS_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,

        })
    }

}