import React from "react";
import {connect} from 'react-redux'
import {createObject, showAlert} from "../redux/actions";
import {Alert} from "./Alert";

class ObjectForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ''
        }
    }

    submitHandler = event => {
        event.preventDefault()

        const {name} = this.state

        if (name.trim() === '') {
            return this.props.showAlert('Название не может быть пустым!')
        }

        const newObject = {
            name, id: Date.now().toString()
        }

        console.log(newObject)
        this.props.createObject(newObject)
        this.setState({name: ''})
    }

    changeInputHandler = event => {
        event.persist()
        this.setState(prev => ({...prev, ...{
            [event.target.name]: event.target.value
        }}))
    }

    render() {
        return(
        <form onSubmit={this.submitHandler}>

            {this.props.alert && <Alert text={this.props.alert} />}

            <div className="form-group">
                <label htmlFor="name" className="form-label">Object name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={this.state.name}
                    name="name"
                    onChange={this.changeInputHandler}
                />
            </div>
            <button className="btn btn-success" type="submit">Создать</button>
        </form>
        )
    }
}

const mapDispatchToProps = {
    createObject, showAlert
}

const mapStateToolProps = state => ({
    alert: state.app.alert
})

export default connect(mapStateToolProps, mapDispatchToProps)(ObjectForm)