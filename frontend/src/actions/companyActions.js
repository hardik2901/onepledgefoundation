import axios from 'axios'
import { COMPANIES_DATA_FAIL, COMPANIES_DATA_REQUEST, COMPANIES_DATA_SUCCESS, COMPANY_DELETE_FAIL, COMPANY_DELETE_REQUEST, COMPANY_DELETE_SUCCESS, COMPANY_PAGE_DATA_FAIL, COMPANY_PAGE_DATA_REQUEST, COMPANY_PAGE_DATA_SUCCESS } from '../constants/companyConstants'
import { logout } from './userActions'

export const getAllCompanyData = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: COMPANY_PAGE_DATA_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()
        console.log(userInfo.token)
        const token = `Bearer ${userInfo.token}`

        const config = {
            headers: { Authorization: token }
        };

        axios.get(`/api/company/${id}`, config)
            .then(function (res) {
                dispatch({
                    type: COMPANY_PAGE_DATA_SUCCESS,
                    payload: res.data,
                })
            })
            .catch(function (error) {
                const message = error.response && error.response.data.message ? error.response.data.message : error.message
                if (message === 'Not authorized, token failed')
                    dispatch(logout());
                dispatch({
                    type: COMPANY_PAGE_DATA_FAIL,
                    payload: message,
                })
            });


    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed')
            dispatch(logout());
        dispatch({
            type: COMPANY_PAGE_DATA_FAIL,
            payload: message,
        })
    }
}

export const getCompaniesData = () => async (dispatch, getState) => {
    try {
        dispatch({ type: COMPANIES_DATA_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()
        console.log(userInfo.token)
        const token = `Bearer ${userInfo.token}`

        const config = {
            headers: { Authorization: token }
        };

        axios.get(`/api/company`, config)
            .then(function (res) {
                dispatch({
                    type: COMPANIES_DATA_SUCCESS,
                    payload: res.data,
                })
            })
            .catch(function (error) {
                const message = error.response && error.response.data.message ? error.response.data.message : error.message
                if (message === 'Not authorized, token failed')
                    dispatch(logout());
                dispatch({
                    type: COMPANIES_DATA_FAIL,
                    payload: message,
                })
            });


    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed')
            dispatch(logout());
        dispatch({
            type: COMPANY_PAGE_DATA_FAIL,
            payload: message,
        })
    }
}

export const deleteCompany = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: COMPANY_DELETE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()
        console.log(userInfo.token)
        const token = `Bearer ${userInfo.token}`

        const config = {
            headers: { Authorization: token }
        };

        axios.delete(`/api/company/${id}`, config)
            .then(function (res) {
                dispatch({
                    type: COMPANY_DELETE_SUCCESS,
                    payload: res.data,
                })
            })
            .catch(function (error) {
                const message = error.response && error.response.data.message ? error.response.data.message : error.message
                if (message === 'Not authorized, token failed')
                    dispatch(logout());
                dispatch({
                    type: COMPANY_DELETE_FAIL,
                    payload: message,
                })
            });


    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed')
            dispatch(logout());
        dispatch({
            type: COMPANY_DELETE_FAIL,
            payload: message,
        })
    }
}


