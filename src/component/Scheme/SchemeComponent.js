import React from "react";
import SchemeSelectorComponent from "./SchemeSelectorComponent";
import TreeComponent from "./Displaying/TreeComponent";
import ElementsComponent from "./Displaying/ElementsComponent";
import ActionComponent from "./ActionComponent/ActionComponent";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
            <Grid container xs spacing={4} style={{marginBottom: 10}}>
                <Grid item xs={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Button
                                href="http://localhost:3000/objects"
                                fullWidth
                                style={{marginLeft: 10}}
                                variant="contained"
                            >
                                Объекты
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                href="http://localhost:3000/viruses"
                                fullWidth
                                style={{marginLeft: 10}}
                                color="inherit"
                                variant="contained"
                            >
                                Вирусы
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                href="http://localhost:3000/securitysws"
                                fullWidth
                                style={{marginLeft: 10}}
                                color="inherit"
                                variant="contained"
                            >
                                СЗИ
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                href="http://localhost:3000/exploits"
                                fullWidth
                                style={{marginLeft: 10}}
                                color="inherit"
                                variant="contained"
                            >
                                Уязвимости безопасности
                            </Button>
                        </Grid>
                        <Grid item xs style={{marginLeft: 10,borderStyle: "solid"}}>
                            <ActionComponent
                                schemeId={this.state.currentId}
                                updateElements={this.updateElements}
                                updateTree={this.updateTree}
                                deleteMode={this.deleteMode}
                                treeDeleteMode={this.treeDeleteMode}
                                editMode={this.editMode}
                                scheme={this.state.elements}
                                tree={this.state.tree}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            <SchemeSelectorComponent updateId={this.updateId} updateElements={this.updateElements}
                                                     updateTree={this.updateTree}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{borderStyle: "solid"}}>
                        <Grid item xs={12} justify="center" style={{borderStyle: "solid"}}>
                            <ElementsComponent data={this.state.elements} schemeId={this.state.currentId}
                                               deleteMode={this.state.deleteMode}
                                               editMode={this.state.editMode}/>
                        </Grid>
                        <Grid item xs={12} justify="center" style={{borderStyle: "solid"}}>
                            <TreeComponent data={this.state.tree} schemeId={this.state.currentId}
                                           treeDeleteMode={this.state.treeDeleteMode}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default SchemeComponent;
