import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import SchemeComponent from "./component/Scheme/SchemeComponent";
import ObjectTable from "./component/Tables/ObjectTable";
import ObjectForm from "./component/Forms/ObjectForm";
import ExploitTable from "./component/Tables/ExploitTable";
import ExploitForm from "./component/Forms/ExploitForm";
// todo: 0*) удалить redux + thunk

// todo: 1) Use Atomic Layout
//          to configure structure of main page
//  https://redd.gitbook.io/atomic-layout/motivation


export default function App() {
    return (
        <div>
            <Router>
                {/* todo: <HeaderComponent/>*/}
                <div className="container">
                    <Switch> {/*http://localhost:3000/*/}
                        <Route exact path="/" component={SchemeComponent}/>

                        <Route path="/objects" component={ObjectTable}/>
                        <Route path="/object/:id" component={ObjectForm}/>

                        <Route path="/exploits" component={ExploitTable}/>
                        <Route path="/exploit/:id" component={ExploitForm}/>
                        {/*<Route path = "/update-object/:id" component = {UpdateObjectComponent}/>*/}
                    </Switch>
                </div>
                {/* todo: <FooterComponent />*/}
            </Router>
        </div>
    );
}

