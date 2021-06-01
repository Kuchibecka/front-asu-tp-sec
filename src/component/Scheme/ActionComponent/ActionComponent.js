import React from 'react';
import ActionListComponent from "./ActionListComponent";
import SchemeElementsComponent from "./SchemeElementsComponent";
import AddElementComponent from "./AddAction/AddElementComponent";
import AddObjectComponent from "./AddAction/AddObjectComponent"
import AddSecuritySwComponent from "./AddAction/AddSecuritySwComponent"
import AddVirusComponent from "./AddAction/AddVirusComponent"
import DeleteComponent from "./DeleteAction/DeleteComponent";
import EditComponent from "./EditComponent";
import DeleteTreeObjectComponent from "./DeleteAction/DeleteTreeObjectComponent";
import TreeElementsComponent from "./TreeElementsComponent";
import AddTreeObjectComponent from "./AddAction/AddTreeObjectComponent";
import ModelingComponent from "./ModelingComponent";
import PriceCounterComponent from "../../PriceCounterComponent";


export default class ActionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 'initial',
            schemeId: '',
            scheme: '',
            tree: '',
            deleteMode: false,
            treeDeleteMode: false,
            editMode: false,
        };
        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount() {
        await this.setState({
            schemeId: this.props.schemeId,
            scheme: this.props.scheme,
            tree: this.props.tree,
        })
        if (this.props.schemeId === '')
            this.setState({step: '0'})
    }

    componentDidUpdate(prevProps) {
        if (prevProps.schemeId !== this.props.schemeId) {
            this.setState({schemeId: this.props.schemeId})
            if (this.props.schemeId === '') {
                this.setState({step: '0'})
            } else {
                this.setState({step: 'initial'});
            }
        }
        if (prevProps.scheme !== this.props.scheme) {
            this.setState({scheme: this.props.scheme})
        }
        if (prevProps.tree !== this.props.tree) {
            this.setState({tree: this.props.tree})
        }
    }

    updateElements = (value) => {
        this.props.updateElements(value);
    }

    updateTree = (value) => {
        this.props.updateTree(value);
    }

    handleChange = input => e => {
        this.setState({step: input});
    };

    render() {
        const {step} = this.state;

        switch (step) {
            case '0':
                return (
                    <h4>Меню неактивно Выберите схему</h4>
                )
            case 'initial':
                return (
                    <ActionListComponent
                        handleChange={this.handleChange}
                    />
                );
            case 'elements':
                return (
                    <SchemeElementsComponent
                        handleChange={this.handleChange}
                    />
                );
            case 'addElement':
                return (
                    <AddElementComponent
                        handleChange={this.handleChange}
                    />
                )
            case 'addObject':
                return (
                    <AddObjectComponent
                        schemeId={this.state.schemeId}
                        handleChange={this.handleChange}
                        updateElements={this.updateElements}
                    />
                )
            case 'addVirus':
                return (
                    <AddVirusComponent
                        schemeId={this.state.schemeId}
                        handleChange={this.handleChange}
                        updateElements={this.updateElements}
                    />
                )
            case 'addSecuritySw':
                return (
                    <AddSecuritySwComponent
                        schemeId={this.state.schemeId}
                        handleChange={this.handleChange}
                        updateElements={this.updateElements}
                    />
                )
            case 'editElement':
                return (
                    <EditComponent
                        handleChange={this.handleChange}
                        editMode={this.props.editMode}
                    />
                )
            case 'deleteElement':
                return (
                    <DeleteComponent
                        handleChange={this.handleChange}
                        deleteMode={this.props.deleteMode}
                    />
                )
            case 'treeElements':
                return (
                    <TreeElementsComponent
                        handleChange={this.handleChange}
                    />
                )
            case 'addTreeElement':
                return (
                    <AddTreeObjectComponent
                        handleChange={this.handleChange}
                        schemeId={this.state.schemeId}
                        updateTree={this.updateTree}
                    />
                )
            case 'deleteTreeElement':
                return (
                    <DeleteTreeObjectComponent
                        handleChange={this.handleChange}
                        treeDeleteMode={this.props.treeDeleteMode}
                    />
                )
            case 'schemeParams':
                return (
                    window.location.assign(`/scheme/${this.state.schemeId}`)
                )
            case 'modeling':
                return (
                    <ModelingComponent
                        schemeId={this.state.schemeId}
                        scheme={this.state.scheme}
                        tree={this.state.tree}
                        handleChange={this.handleChange}
                    />
                )
            case 'price':
                return (
                    <PriceCounterComponent
                        schemeId={this.state.schemeId}
                        handleChange={this.handleChange}
                    />
                )
            default:
                (console.log('This is a multi-step form built with React.'))
        }
    }
}
