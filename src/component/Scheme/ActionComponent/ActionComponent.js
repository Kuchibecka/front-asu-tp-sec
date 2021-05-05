import React from 'react';
import ActionListComponent from "./ActionListComponent";
import SchemeElementsComponent from "./SchemeElementsComponent";
import AddElementComponent from "./AddElementComponent";
import AddObjectComponent from "./AddAction/AddObjectComponent"
import AddSecuritySwComponent from "./AddAction/AddSecuritySwComponent"
import AddVirusComponent from "./AddAction/AddVirusComponent"
import DeleteComponent from "./DeleteComponent";


export class UserForm extends React.Component {
//todo: убрать за ненадобностью из-за использования всего в дочерних компонентах
    constructor(props) {
        super(props);
        this.state = {
            step: 'initial',
            schemeId: '',
            elements: '',
            tree: '',
            deleteMode: false,
            target: '',
            firstType: '',
            secondType: '',
            firstElement: '',
            secondElement: '',
            isLogical: false,
            isAnd: false,
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
        console.log("In ActionComponent: ", value);
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
        const {target, firstType, secondType, firstElement, secondElement, isLogical, isAnd} = this.state;
        const values = {target, firstType, secondType, firstElement, secondElement, isLogical, isAnd};

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
                        handleChange={this.handleChange}
                    />
                )
            case 'addSecuritySw':
                return (
                    <AddSecuritySwComponent
                        handleChange={this.handleChange}
                    />
                )
            case 'editElement':
                return (
                    <br/>
                )
            case 'deleteElement':
                return (
                    <DeleteComponent
                        handleChange={this.handleChange}
                        deleteMode={this.props.deleteMode}
                    />
                )
            case 'connections':
                return (
                    <h1>connections</h1>
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

export default UserForm;