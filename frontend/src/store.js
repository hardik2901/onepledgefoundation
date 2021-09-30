import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    homepageCardDeleteReducer,
    homepageCardEditReducer,
    homepageCardReducer,
    singleHomepagecardReducer,
    homepageCardAddReducer
} from './reducers/homepageCardReducer'
import { userReducers } from './reducers/userReducers'
import {
    allcompaniesReducer,
    companyEditorDataReducer,
    companyEditorsDeleteReducer,
    companyEditorsListReducer,
    companyReducer,
    deleteCompanyReducer
} from './reducers/companyReducer'



const reducer = combineReducers({
    homepageCards: homepageCardReducer,
    homepageCard: singleHomepagecardReducer,
    homepageCardDelete: homepageCardDeleteReducer,
    homepageCardEdit: homepageCardEditReducer,
    userLogin: userReducers,
    companyPageData: companyReducer,
    companiesData: allcompaniesReducer,
    newHomepageCardId: homepageCardAddReducer,
    companyDelete: deleteCompanyReducer,
    companyEditorList: companyEditorsListReducer,
    companyEditorDelete: companyEditorsDeleteReducer,
    companyEditorData: companyEditorDataReducer
})



const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const companyEditorDataFromStorage = localStorage.getItem('companyEditorData') ? JSON.parse(localStorage.getItem('companyEditorData')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    companyEditorData: { data: companyEditorDataFromStorage }
}

const middleware = [thunk]

export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


