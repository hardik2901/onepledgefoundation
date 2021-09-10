import {
    HOMEPAGE_CARDS_REQUEST,
    HOMEPAGE_CARDS_SUCCESS,
    HOMEPAGE_CARDS_FAIL,
    HOMEPAGE_CARDS_DELETE_REQUEST,
    HOMEPAGE_CARDS_DELETE_SUCCESS,
    HOMEPAGE_CARDS_DELETE_FAIL,
    HOMEPAGE_CARD_ADD_REQUEST,
    HOMEPAGE_CARD_ADD_SUCCESS,
    HOMEPAGE_CARD_ADD_FAIL,
    HOMEPAGE_CARD_EDIT_REQUEST,
    HOMEPAGE_CARD_EDIT_SUCCESS,
    HOMEPAGE_CARD_EDIT_FAIL,
    HOMEPAGE_CARD_REQUEST,
    HOMEPAGE_CARD_SUCCESS,
    HOMEPAGE_CARD_FAIL
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

export const singleHomepagecardReducer = (state = {}, action) => {
    switch (action.type) {
        case HOMEPAGE_CARD_REQUEST:
            return { ...state, loading: true }
        case HOMEPAGE_CARD_SUCCESS:
            return { loading: false, card: action.payload }
        case HOMEPAGE_CARD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const homepageCardDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case HOMEPAGE_CARDS_DELETE_REQUEST:
            return { loading: true }
        case HOMEPAGE_CARDS_DELETE_SUCCESS:
            return { loading: false, success: true }
        case HOMEPAGE_CARDS_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const homepageCardAddReducer = (state = {}, action) => {
    switch (action.type) {
        case HOMEPAGE_CARD_ADD_REQUEST:
            return { loading: true }
        case HOMEPAGE_CARD_ADD_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case HOMEPAGE_CARD_ADD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const homepageCardEditReducer = (state = {}, action) => {
    switch (action.type) {
        case HOMEPAGE_CARD_EDIT_REQUEST:
            return { loading: true }
        case HOMEPAGE_CARD_EDIT_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case HOMEPAGE_CARD_EDIT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
