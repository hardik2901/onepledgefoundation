import {
    COMPANIES_DATA_FAIL,
    COMPANIES_DATA_REQUEST,
    COMPANIES_DATA_SUCCESS,
    COMPANY_DELETE_FAIL,
    COMPANY_DELETE_REQUEST,
    COMPANY_DELETE_SUCCESS,
    COMPANY_EDITOR_DATA_FAIL,
    COMPANY_EDITOR_DATA_REQUEST,
    COMPANY_EDITOR_DATA_SUCCESS,
    COMPANY_EDITOR_DELETE_FAIL,
    COMPANY_EDITOR_DELETE_REQUEST,
    COMPANY_EDITOR_DELETE_SUCCESS,
    COMPANY_EDITOR_LIST_FAIL,
    COMPANY_EDITOR_LIST_REQUEST,
    COMPANY_EDITOR_LIST_SUCCESS,
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

export const allcompaniesReducer = (state = {}, action) => {
    switch (action.type) {
        case COMPANIES_DATA_REQUEST:
            return { loading: true, payload: [] }
        case COMPANIES_DATA_SUCCESS:
            return { loading: false, companies: action.payload }
        case COMPANIES_DATA_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteCompanyReducer = (state = {}, action) => {
    switch (action.type) {
        case COMPANY_DELETE_REQUEST:
            return { loading: true, payload: [] }
        case COMPANY_DELETE_SUCCESS:
            return { loading: false, data: action.payload }
        case COMPANY_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const companyEditorsListReducer = (state = {}, action) => {
    switch (action.type) {
        case COMPANY_EDITOR_LIST_REQUEST:
            return { loading: true, payload: [] }
        case COMPANY_EDITOR_LIST_SUCCESS:
            return { loading: false, editors: action.payload }
        case COMPANY_EDITOR_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const companyEditorsDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case COMPANY_EDITOR_DELETE_REQUEST:
            return { loading: true, payload: [] }
        case COMPANY_EDITOR_DELETE_SUCCESS:
            return { loading: false, status: action.payload }
        case COMPANY_EDITOR_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const companyEditorDataReducer = (state = {}, action) => {
    switch (action.type) {
        case COMPANY_EDITOR_DATA_REQUEST:
            return { loading: true, payload: [] }
        case COMPANY_EDITOR_DATA_SUCCESS:
            return { loading: false, data: action.payload }
        case COMPANY_EDITOR_DATA_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

