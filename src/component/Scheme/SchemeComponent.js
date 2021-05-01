import React from "react";
import SchemeSelectorComponent from "./SchemeSelectorComponent";
import TreeComponent from "./TreeComponent";
import ElementsComponent from "./ElementsComponent";

const initialState = {
    schemes: [],
    currentId: '',
    elements: [],
    tree: [],
};

class SchemeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    updateTree = (value) => {
        this.setState({tree: value})
    }

    updateElements = (value) => {
        this.setState({elements: value})
    }

    render() {
        return (
            <div className="container-fluid">
                <SchemeSelectorComponent updateElements={this.updateElements} updateTree={this.updateTree}/>
                <div className="container-fluid" style={{borderStyle: "solid", borderWidth: "thin"}}>
                    <ElementsComponent data={this.state.elements}/>
                </div>
                <div className="container-fluid" style={{borderStyle: "solid", borderWidth: "thin"}}>
                    <TreeComponent data={this.state.tree}/>
                </div>
            </div>
        )
    }
}

export default SchemeComponent;
