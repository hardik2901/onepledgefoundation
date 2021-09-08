import {
    COMPANY_PAGE_DATA_FAIL,
    COMPANY_PAGE_DATA_REQUEST,
    COMPANY_PAGE_DATA_SUCCESS
} from "../constants/companyConstants"

export const companyReducer = (state = {}, action) => {
    switch (action.type) {
        case COMPANY_PAGE_DATA_REQUEST:
            return { loading: true, payload: [] }
        case COMPANY_PAGE_DATA_SUCCESS:
            return { loading: false, companyData: action.payload }
        case COMPANY_PAGE_DATA_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }

}