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
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: "root",
    storage,
}

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

const persistedReducer = persistReducer(persistConfig, reducer)


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

export const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export const persistor = persistStore(store)

