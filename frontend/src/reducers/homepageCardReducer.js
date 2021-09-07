import {
    HOMEPAGE_CARDS_REQUEST,
    HOMEPAGE_CARDS_SUCCESS,
    HOMEPAGE_CARDS_FAIL
} from "../constants/homepageCardConstants"

export const homepageCardReducer = (state = { cards: [] }, action) => {
    switch (action.type) {
        case HOMEPAGE_CARDS_REQUEST:
            return { loading: true, cards: [] }
        case HOMEPAGE_CARDS_SUCCESS:
            return { loading: false, cards: action.payload }
        case HOMEPAGE_CARDS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}