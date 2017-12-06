import React, { Component } from "react";
import ReactDom from "react-dom";
import { Provider, connect } from "react-redux";

import { Store } from "./store";
import HeaderComponent from './components/header/headerComponent'


class MainComponent extends Component {


    render() {
        return (
            <div>
                <HeaderComponent />
            </div>
        )
    }
}

const App = connect((state) => {
    return {hello: state.trendingRankList}
})(MainComponent)


ReactDom.render(
    <Provider store={Store}>
        <App />
    </Provider>,
    document.getElementById('root')
);