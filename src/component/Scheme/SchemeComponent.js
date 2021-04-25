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
            <div>
                <SchemeSelectorComponent updateElements={this.updateElements} updateTree={this.updateTree}/>
                <ElementsComponent data={this.state.elements}/>
                <TreeComponent data={this.state.tree}/>
            </div>
        )
    }
}

export default SchemeComponent;
