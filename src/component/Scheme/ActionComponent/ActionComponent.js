import React from 'react';
import ActionListComponent from "./ActionListComponent";
import SchemeElementsComponent from "./SchemeElementsComponent";
import AddElementComponent from "./AddElementComponent";

export class UserForm extends React.Component {
    state = {
        step: 'initial',
        target: '',
        firstType: '',
        secondType: '',
        firstElement: '',
        secondElement: '',
        isLogical: false,
        isAnd: false,
    };

    nextStep = (step) => {
        this.setState({
            step: step
        });
    };

    prevStep = (step) => {
        console.log("PREV STEP", step)
        this.setState({
            step: step
        });
    };

    handleChange = input => e => {
        this.setState({[input]: e.target.offsetParent.id});
    };

    render() {
        const {step} = this.state;
        const {target, firstType, secondType, firstElement, secondElement, isLogical, isAnd} = this.state;
        const values = {target, firstType, secondType, firstElement, secondElement, isLogical, isAnd};

        switch (step) {
            case 'initial':
                return (
                    <ActionListComponent
                        handleChange={this.handleChange}
                    />
                );
            // todo: Выбор: редактировать схему ИЛИ дерево отказа
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
            case 'editElement':
                return (
                    <br/>
                )
            case 'deleteElement':
                return (
                    <br/>
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