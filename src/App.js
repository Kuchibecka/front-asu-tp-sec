import React from "react";

import ObjectComponent from "./component/ObjectTable";
import GraphComponent from "./component/GraphComponent";
import Object from "./component/Object";
import Objects from "./component/Objects";


export default function App() {
    return [
        <div className="container pt-3">
            <div className="row">
                <div className="col">
                    <h1>ASU TP Reactive app</h1>
                </div>
                <div className="col">
                    <Objects objects={[1, 2, 3]}/>
                </div>
            </div>
        </div>,
    <ObjectComponent />,
    <GraphComponent />,
    ]
}

