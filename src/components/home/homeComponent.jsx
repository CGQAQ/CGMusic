import React from 'react';
import _ from 'lodash';
import { updateSideBarDataAction } from './actions';
import { connect } from "react-redux";


class HomeComponent extends React.Component {

    getSideBarList(){
        _.keys(this.props.sideBarItemData).forEach(
            item => {

            }
        )
    }

    render() {
        return (
            <div className='container' >
                <div id='sideBar' className='float-left'>
                    <ul className='list-group'>

                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sideBarItemData: state.sideBarItemDataReducer,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateSideBarData: () => {
            $.post('/api/rankList', success = d => {
                if(!d.err){
                    dispatch(updateSideBarDataAction(d.data))
                }
            })
        },
    }
};

export default connect(mapStateToProps//, mapDispatchToProps
)(HomeComponent)


