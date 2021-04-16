import React from "react";

import ObjectComponent from "./component/ObjectTable";
import GraphComponent from "./component/GraphComponent";
import Objects from "./component/Objects";
import ObjectForm from "./component/ObjectForm";
import FetchedObjects from "./component/FetchedObjects";

// todo: Update node, create node and connection
//  front:  https://reactflow.dev/examples/update-node/
//  back:   repo.save() method


export default function App() {
    return [
        <span className="boder">
        <div className="row">
            <h1 align="center">ASU TP Reactive app</h1>
        </div>
        </span>,
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
        </div>

    ]
}

