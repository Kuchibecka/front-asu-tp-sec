import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import ObjectComponent from "./component/ObjectTable";
import GraphComponent from "./component/GraphComponent";
// import Objects from "./component/Objects";
import ObjectForm from "./component/ObjectForm";
// import UpdateObjectComponent from "./component/UpdateObjectComponent"
// import FetchedObjects from "./component/FetchedObjects";


// todo: 1) Update node, create node and connection
//  front:  https://reactflow.dev/examples/update-node/
//  back:   repo.save() method

// todo: 2) Selector for different schemes

// todo: 3) Use Atomic Layout
//          to configure structure of page
//  https://redd.gitbook.io/atomic-layout/motivation


export default function App() {
    return (
        <div>
            <Router>
                    {/*<HeaderComponent/>*/}
                    <div className="container">
                        <Switch> {/*http://localhost:3000/*/}
                            <Route exact path = "/" component = {GraphComponent}/>
                            <Route path = "/objects" component = {ObjectComponent}/>
                            <Route path = "/create-object/:id" component = {ObjectForm}/>

                            {/*<Route path = "/update-object/:id" component = {UpdateObjectComponent}/>*/}
                        </Switch>
                    </div>
                    {/*<FooterComponent />*/}
            </Router>
        </div>
        /*<div className="row">
            <h1 align="center">ASU TP Reactive app</h1>
        </div>,
        <div className="col-sm-12">
            <div className="row">
                <div className="col-sm-2">
                    <Objects/>
                </div>
                <div className="col-sm-8">
                    <GraphComponent/>
                </div>
                <div className="col-sm-2">
                    <FetchedObjects/>
                </div>
                <div className="row">
                    <div className="container">
                        <ObjectForm/>
                        <ObjectComponent/>
                    </div>
                </div>
            </div>
        </div>*/
    );
}

