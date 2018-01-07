import { createStore, combineReducers } from 'redux';
import { sideBarItemDataReducer } from "./components/home/reducers";


const mainReducer = combineReducers({
    sideBarItemDataReducer,
});

export const Store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());