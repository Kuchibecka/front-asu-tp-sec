import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import SchemeComponent from "./component/Scheme/SchemeComponent";
import ObjectTable from "./component/Tables/ObjectTable";
import ObjectForm from "./component/Forms/ObjectForm";
import ExploitTable from "./component/Tables/ExploitTable";
import ExploitForm from "./component/Forms/ExploitForm";
import SchemeTable from "./component/Tables/SchemeTable";
import SchemeForm from "./component/Forms/SchemeForm";
import SecuritySwTable from "./component/Tables/SecuritySwTable";
import SecuritySwForm from "./component/Forms/SecuritySwForm";
import VirusTable from "./component/Tables/VirusTable";
import VirusForm from "./component/Forms/VirusForm";
import ActionComponent from "./component/Scheme/ActionComponent/ActionComponent";
import HeaderComponent from "./component/HeaderComponent";
import FooterComponent from "./component/FooterComponent";
import NotFoundComponent from "./component/NotFoundComponent";

export default function App() {
    return (
            <Router>
                <HeaderComponent />
                    <Switch> {/*http://localhost:3000/*/}
                        <Route exact path="/" component={SchemeComponent}/>
                        <Route exact path="/action" component={ActionComponent}/>

                        <Route path="/objects" component={ObjectTable}/>
                        <Route path="/object/:id" component={ObjectForm}/>

                        <Route path="/exploits" component={ExploitTable}/>
                        <Route path="/exploit/:id" component={ExploitForm}/>

                        <Route path="/schemes" component={SchemeTable}/>
                        <Route path="/scheme/:id" component={SchemeForm}/>

                        <Route path="/securitysws" component={SecuritySwTable}/>
                        <Route path="/securitysw/:id" component={SecuritySwForm}/>

                        <Route path="/viruses" component={VirusTable}/>
                        <Route path="/virus/:id" component={VirusForm}/>

                        <Route component={NotFoundComponent} />

                        {/*<Route path = "/update-object/:id" component = {UpdateObjectComponent}/>*/}
                    </Switch>
                <FooterComponent />
            </Router>
    );
}

