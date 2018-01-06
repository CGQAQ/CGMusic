import { actionTypes } from './actions'

export function sideBarItemDataReducer(state, action) {
    if(action.type === actionTypes.updateSideBarData)
        return action.payload;
    return {}
}