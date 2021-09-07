import {
    HOMEPAGE_CARDS_REQUEST,
    HOMEPAGE_CARDS_SUCCESS,
    HOMEPAGE_CARDS_FAIL
} from "../constants/homepageCardConstants"
import axios from 'axios'
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