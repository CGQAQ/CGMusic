import { createStore, combineReducers } from 'redux';
import { sideBarItemDataReducer } from "./components/home/reducers";


const mainReducer = combineReducers({
    sideBarItemDataReducer,
});

export const Store = createStore(mainReducer)