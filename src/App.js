import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import ObjectComponent from "./component/ObjectTable";
// import Objects from "./component/Objects";
import ObjectForm from "./component/ObjectForm";
import SchemeComponent from "./component/Scheme/SchemeComponent";
// import TreeComponent from "./component/Scheme/TreeComponent";
// todo: v удалить компонент UpdateObjectComponent за неиспользованием v
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
                        <Route exact path = "/" component = {SchemeComponent}/>
                        <Route path = "/objects" component = {ObjectComponent}/>
                        <Route path = "/create-object/:id" component = {ObjectForm}/>

                        {/*<Route path = "/update-object/:id" component = {UpdateObjectComponent}/>*/}
                    </Switch>
                </div>
                {/*<FooterComponent />*/}
            </Router>
        </div>
    );
}

