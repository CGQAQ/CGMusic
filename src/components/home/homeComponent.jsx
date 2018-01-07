import React from 'react';
import { connect } from "react-redux";

import _ from 'lodash';
import axios from 'axios'

import { updateSideBarDataAction } from './actions';


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
                <h1>helllo lllll</h1>
                <div id='sideBar' className='float-left' onLoad={this.props.updateSideBarData}>
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
            axios.post('/api/rankList').then(res => console.log(res))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)


