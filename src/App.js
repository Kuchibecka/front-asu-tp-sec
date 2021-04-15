import React from "react";

import ObjectComponent from "./component/ObjectTable";
import GraphComponent from "./component/GraphComponent";
import Objects from "./component/Objects";
import ObjectForm from "./component/ObjectForm";
import FetchedObjects from "./component/FetchedObjects";


export default function App() {
    return [
        <div className="container pt-3">
            <div className="row">
                <div className="col">
                    <h1>ASU TP Reactive app</h1>
                </div>
                <div className="col">
                    <Objects/>
                </div>
                <div className="col">
                    <FetchedObjects/>
                </div>
            </div>
            <div className="container pt-3">
                <ObjectForm/>
            </div>
        </div>,
        <div className="container pt-2">
            <ObjectComponent/>
        </div>,
        <div className="container pt-xl-1">
            <GraphComponent/>
        </div>,
    ]
}

