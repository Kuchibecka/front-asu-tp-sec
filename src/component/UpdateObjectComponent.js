import React, { Component } from "react";
import ObjectService from "../service/ObjectService";
import {Alert} from "./Alert";

class UpdateObjectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            type: '',
            name: ''
        }
        this.changeInputHandler = this.changeInputHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        // this.createObject = this.createObject.bind(this);
    }

    changeInputHandler(event) {
        console.log("Initial: ", this.state)
        event.persist()
        const target = event.target;
        const key = target.id
        const value = target.value
        // console.log("Key: ", key, " Fetched value: ", value)
        this.setState({
            [key]: value
        });
        console.log(this.state)
    }

    componentDidMount() {
        ObjectService.getObjectById(this.state.id)
            .then((res) => {
                let obj = res.data;
                this.setState({
                    type: obj.type,
                    name: obj.name,
                    id: this.state.id
                });
                console.log("Init state: ", this.state)
            });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const type = this.state.type
        const name = this.state.name
        console.log("Type: ", type, " Name: ", name)
        if (name.trim() === '') {
            return this.props.showAlert('Название не может быть пустым!')
        }
        const newObject = {
            obj_id: this.state.id,
            type: Number(type),
            name: name,
            virusList: [],
            securitySWList: [],
            objectList: [],
            andCriteriaList: []
        }
        console.log("New object in JSON format: ", JSON.stringify(newObject))

        ObjectService.updateObject(newObject, this.state.id)
            .then(res => {
                console.log(res);
                // this.state = {name: '', type: '', id: ''};
                this.props.history.push('/objects');
            })
    }

    cancel(){
        this.props.history.push('/objects')
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Edit object</h3>
                        <div className="card-body">
                            <form onSubmit={this.submitHandler}>
                                {this.props.alert && <Alert text={this.props.alert}/>}
                                <div class="input-group">
                                    <label htmlFor="type" className="input-group-text">Object type</label>
                                    <select class="form-select" id="type" onChange={this.changeInputHandler} defaultValue="1">
                                        <option value="1">ПК</option>
                                        <option value="2">Контроллер</option>
                                    </select>
                                </div>
                                <br/>
                                <div class="input-group">
                                    <label htmlFor="type" className="input-group-text">Object name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={this.state.name}
                                        onChange={this.changeInputHandler}
                                    />
                                </div>
                                <br/>
                                <button className="btn btn-success" type="submit" onClick={this.submitHandler}>Сохранить изменения</button>
                                <button className="btn btn-danger" type="submit" onClick={this.cancel}>Отмена</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateObjectComponent;