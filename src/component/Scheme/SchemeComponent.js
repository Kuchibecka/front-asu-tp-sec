import React from "react";
import SchemeSelectorComponent from "./SchemeSelectorComponent";
import TreeComponent from "./TreeComponent";
import ElementsComponent from "./ElementsComponent";
import ActionComponent from "./ActionComponent/ActionComponent";

const initialState = {
    schemes: [],
    currentId: '',
    elements: [],
    tree: [],
    deleteMode: false,
    treeDeleteMode: false,
    editMode: false,
};

class SchemeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    updateTree = (value) => {
        this.setState({tree: value});
    }

    updateElements = (value) => {
        this.setState({elements: value});
    }

    updateId = (value) => {
        this.state.currentId = value;
        console.log("Current ID: ", this.state.currentId)
    }

    deleteMode = () => {
        this.setState({deleteMode: !this.state.deleteMode})
    }

    treeDeleteMode = () => {
        this.setState({treeDeleteMode: !this.state.treeDeleteMode})
    }

    editMode = () => {
        this.setState({editMode: !this.state.editMode})
    }

    render() {
        return (
            <div className="container-fluid">
                <SchemeSelectorComponent updateId={this.updateId} updateElements={this.updateElements}
                                         updateTree={this.updateTree}/>
                <div className="container-fluid" style={{borderStyle: "solid", borderWidth: "thin"}}>
                    <ElementsComponent data={this.state.elements} schemeId={this.state.currentId} deleteMode={this.state.deleteMode} editMode={this.state.editMode}/>
                </div>
                <div className="container-fluid" style={{borderStyle: "solid", borderWidth: "thin"}}>
                    <TreeComponent data={this.state.tree} schemeId={this.state.currentId} treeDeleteMode={this.state.treeDeleteMode}/>
                </div>
                <div>
                    <ActionComponent
                        schemeId={this.state.currentId}
                        updateElements={this.updateElements}
                        updateTree={this.updateTree}
                        deleteMode={this.deleteMode}
                        treeDeleteMode={this.treeDeleteMode}
                        editMode={this.editMode}
                    />
                </div>
            </div>
        )
    }
}

export default SchemeComponent;
