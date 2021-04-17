import React from "react";
import {connect} from 'react-redux'
import {showAlert} from "../redux/actions";
import {Alert} from "./Alert";
import ObjectService from "../service/ObjectService";

class ObjectForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            name: ''
        }

        this.changeInputHandler = this.changeInputHandler.bind(this)
    }

    submitHandler = event => {
        event.preventDefault()
        console.log(event.target.type.value)
        const type = event.target.type.value
        const name = event.target.name.value
        const newObject = {
            obj_id: 16,
            type: Number(type),
            name: name,
            virusList: [],
            securitySWList: [],
            objectList: [],
            andCriteriaList: []
        }
        console.log("New object: ", newObject)
        console.log("New object in JSON format: ", JSON.stringify(newObject))

        ObjectService.createObject(JSON.stringify(newObject))
        this.state = {name: '', type: ''}
        // console.log("Current state is ", this.state)


        /*
        const {type, name} = this.state
        console.log(type, name)
        */

        /*
        if (name.trim() === '') {
            return this.props.showAlert('Название не может быть пустым!')
        }
        if (type.trim() === '') {
            return this.props.showAlert('Тип не может быть пустым!')
        }
        const newObject = {
            type, name
        }
        console.log("newObject: ", newObject)
        // todo: post response
        // this.props.createObject(newObject)
        // todo: post response
        this.setState({name: '', type: ''})
        */
    }

    changeInputHandler(event) {
        event.persist()
        const target = event.target;
        // console.log(event)
        const key = target.id
        const value = target.value
        // console.log("Key: ", key, " Fetched value: ", value)
        this.setState({
            [key]: value
        });
        // console.log(this.state)
    }

    render() {
        return (
            <form method="post"
                  enctype="application/x-www-form-urlencoded"
                  action="http://localhost:8081/api/object/new" onSubmit={this.submitHandler}>
                {this.props.alert && <Alert text={this.props.alert}/>}

                <div className="form-group">
                    <label htmlFor="type" className="form-label">Object type</label>
                    <input
                        type="number"
                        className="form-control"
                        id="type"
                        value={this.state.type}
                        name="type"
                        onChange={this.changeInputHandler}
                    />
                </div>
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
    /*createObject,*/ showAlert
}

const mapStateToolProps = state => ({
    alert: state.app.alert
})

export default connect(mapStateToolProps, mapDispatchToProps)(ObjectForm)