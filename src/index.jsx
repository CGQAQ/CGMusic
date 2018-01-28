import React, { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { Provider, connect } from "react-redux";

import { Store } from "./store";
import HeaderComponent from './components/header/headerComponent'
import HomeComponent from  './components/home/homeComponent'
import PlayerComponent from "./components/player/playerComponent";


class MainComponent extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <HeaderComponent />
                    <Route path='/home' component={HomeComponent}/>
                    <Route path='/player' component={PlayerComponent}/>
                </div>
            </Router>
        )
        // return (
        //     <h1> what the hell is going on world</h1>
        // )
    }
}


ReactDom.render(
    <Provider store={Store}>
        <MainComponent />
    </Provider>,
    document.getElementById('root')
);