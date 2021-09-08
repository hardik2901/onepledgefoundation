import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { homepageCardReducer } from './reducers/homepageCardReducer'
import { userReducers } from './reducers/userReducers'
import { companyReducer } from './reducers/companyReducer'
const reducer = combineReducers({
    homepageCards: homepageCardReducer,
    userLogin: userReducers,
    companyPageData: companyReducer,

})


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store