import React from "react";
import {connect} from 'react-redux'
import {showAlert} from "../redux/actions";
import {Alert} from "./Alert";
import ObjectService from "../service/ObjectService";

class ObjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            type: '',
            name: ''
        }
        this.changeInputHandler = this.changeInputHandler.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return
        } else {
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
    }

    changeInputHandler(event) {
        event.persist()
        const target = event.target;
        const key = target.id
        const value = target.value
        this.setState({
            [key]: value
        });
        console.log(this.state)
    }

    submitHandler = event => {
        event.preventDefault()
        const type = event.target.type.value
        const name = event.target.name.value
        if (name.trim() === '') {
            return this.props.showAlert('Название не может быть пустым!')
        }
        if (this.state.id == -1) {
            const newObject = {
                type: Number(type),
                name: name,
                virusList: [],
                securitySWList: [],
                objectList: [],
                andCriteriaList: []
            }
            ObjectService.createObject(newObject)
                .then(res => {
                    console.log(res);
                    this.state = {name: '', type: ''};
                    this.props.history.push('/objects');
                });
        } else {
            const newObject = {
                obj_id: this.state.id,
                type: Number(type),
                name: name,
                virusList: [],
                securitySWList: [],
                objectList: [],
                andCriteriaList: []
            }
            ObjectService.updateObject(newObject, this.state.id)
                .then(res => {
                    console.log(res);
                    this.props.history.push('/objects');
                })
        }
    }

    cancel() {
        this.props.history.push('/objects')
    }

    getTitle() {
        if (this.state.id == -1){
            return <h3 className="text-center">Create object</h3>
        } else {
            return <h3 className="text-center">Edit object</h3>
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        { this.getTitle() }
                        <div className="card-body">
                            <form onSubmit={this.submitHandler}>
                                {this.props.alert && <Alert text={this.props.alert}/>}
                                <div class="input-group">
                                    <label htmlFor="type" className="input-group-text">Object type</label>
                                    <select class="form-select" id="type" onChange={this.changeInputHandler}
                                            defaultValue="1">
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
                                <button className="btn btn-success" type="submit" onClick={this.createObject}>Создать
                                </button>
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
    showAlert
}

const mapStateToolProps = state => ({
    alert: state.app.alert
})

export default connect(mapStateToolProps, mapDispatchToProps)(ObjectForm)