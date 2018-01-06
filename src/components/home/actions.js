export const actionTypes = {
    updateSideBarData: 'ACTION_updateSideBarData',
};



export function updateSideBarDataAction(payload) {
    return {
        type: actionTypes.updateSideBarData,
        payload
    }
}