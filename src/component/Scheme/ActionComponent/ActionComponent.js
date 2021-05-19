import React from 'react';
import ActionListComponent from "./ActionListComponent";
import SchemeElementsComponent from "./SchemeElementsComponent";
import AddElementComponent from "./AddElementComponent";
import AddObjectComponent from "./AddAction/AddObjectComponent"
import AddSecuritySwComponent from "./AddAction/AddSecuritySwComponent"
import AddVirusComponent from "./AddAction/AddVirusComponent"
import DeleteComponent from "./DeleteComponent";
import EditComponent from "./EditComponent";
import DeleteTreeObjectComponent from "./DeleteTreeObjectComponent";
import TreeElementsComponent from "./TreeElementsComponent";
import AddTreeObjectComponent from "./AddTreeObjectComponent";


export default class ActionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 'initial',
            schemeId: '',
            elements: '',
            tree: '',
            deleteMode: false,
            treeDeleteMode: false,
            editMode: false,
        };
        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount() {
        await this.setState({schemeId: this.props.schemeId})
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
                    <h1>Выберите схему</h1>
                )
            case 'initial':
                return (
                    <ActionListComponent
                        handleChange={this.handleChange}
                    />
                );
            // todo: Выбор: редактировать схему ИЛИ !дерево отказа!
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
                        /*updateTree={this.updateTree}*/
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
                        treeDeleteMode={this.props.treeDeleteMode}
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
                        // deleteMode={this.props.treeDeleteMode}
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
            case 'params':
                return (
                    <h1>params</h1>
                )
            default:
                (console.log('This is a multi-step form built with React.'))
        }
    }
}
