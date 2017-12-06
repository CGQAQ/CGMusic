import { createStore, combineReducers } from 'redux';
import { trendingRankList } from "./reducers/trendingRankList";


const mainReducer = combineReducers({
    trendingRankList: trendingRankList
});

export const Store = createStore(mainReducer)