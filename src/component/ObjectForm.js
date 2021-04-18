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
        this.changeInputHandler = this.changeInputHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        // this.createObject = this.createObject.bind(this);
    }

    changeInputHandler(event) {
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

    submitHandler = event => {
        event.preventDefault()
        // console.log(event.target.type.value)
        const type = event.target.type.value
        const name = event.target.name.value
        if (name.trim() === '') {
            return this.props.showAlert('Название не может быть пустым!')
        }
        const newObject = {
            type: Number(type),
            name: name,
            virusList: [],
            securitySWList: [],
            objectList: [],
            andCriteriaList: []
        }
        console.log("New object in JSON format: ", JSON.stringify(newObject))

        // todo: post response
        ObjectService.createObject(newObject)
            .then(res => {
                console.log(res)
                this.props.history.push('/objects');
            });
        // todo: post response
        this.state = {name: '', type: ''}
        // todo: redirect to objectList !

        /*
        if (type.trim() === '') {
            return this.props.showAlert('Тип не может быть пустым!')
        }
        */
    }

    cancel(){
        this.props.history.push('/objects')
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Create object</h3>
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
                                <button className="btn btn-success" type="submit" onClick={this.createObject}>Создать</button>
                                <button className="btn btn-danger" type="submit" onClick={this.cancel}>Отмена</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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