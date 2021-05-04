import React from "react";
import ObjectService from "../../service/ObjectService";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Card, CardContent, CardHeader, Container, TextField} from "@material-ui/core";

export default class ObjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            type: '',
            name: '',
            description: '',
            isInstance: false,
            virusList: [],
            securitySWList: [],
            objectList: [],
            andCriteriaList: [],
        }
        this.changeInputHandler = this.changeInputHandler.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== -1) {
            ObjectService.getById(this.state.id)
                .then((res) => {
                    let obj = res.data;
                    this.setState({
                        id: this.state.id,
                        type: obj.type,
                        name: obj.name,
                        description: obj.description,
                        isInstance: obj.isInstance,
                        virusList: obj.virusList,
                        securitySWList: obj.securitySWList,
                        objectList: obj.objectList,
                        andCriteriaList: obj.andCriteriaList,
                    });
                });
        }
    }

    changeInputHandler(event) {
        event.persist()
        const target = event.target;
        const key = target.name
        const value = target.value
        this.setState({
            [key]: value
        });
    }

    submitHandler = event => {
        event.preventDefault()
        const type = event.target.type.value.replace(/\s+/g, ' ').trim()
        const name = event.target.name.value.replace(/\s+/g, ' ').trim()
        const description = event.target.description.value.replace(/\s+/g, ' ').trim()

        if (this.state.id === -1) {
            const newObject = {
                type: Number(type),
                name: name,
                description: description,
                isInstance: false,
                virusList: [],
                securitySWList: [],
                objectList: [],
                andCriteriaList: [],
            }
            ObjectService.create(newObject)
                .then(() => {
                    this.setState({name: '', type: '', description: ''});
                    this.props.history.push('/objects');
                });
        } else {
            const editedObject = {
                obj_id: this.state.id,
                type: Number(type),
                name: name,
                description: description,
                isInstance: this.state.isInstance,
                virusList: this.state.virusList,
                securitySWList: this.state.securitySWList,
                objectList: this.state.objectList,
                andCriteriaList: this.state.andCriteriaList,
            }
            ObjectService.update(editedObject, this.state.id)
                .then(() => {
                    this.props.history.push('/objects');
                })
        }
    }

    cancel() {
        this.props.history.push('/objects')
    }

    getTitle() {
        if (this.state.id === -1) {
            return <h3 className="text-center">Создание нового объекта</h3>
        } else {
            return <h3 className="text-center">Редактирование существующего объекта</h3>
        }
    }

    render() {
        return (
            <Container>
                <Card style={{borderWidth: 1, borderStyle: "solid", borderRadius: 30}}>
                    <CardHeader title={this.getTitle()} style={{borderBottom: 1, borderBottomStyle: "solid"}}/>
                    <CardContent>
                        <form onSubmit={this.submitHandler}>
                            <FormControl style={{marginTop: 30}}>
                                <InputLabel id="Type">Тип объекта</InputLabel>
                                <Select
                                    style={{minWidth: 350, fontSize: 18}}
                                    labelId="Type"
                                    id="type"
                                    name="type"
                                    value={this.state.type}
                                    onChange={this.changeInputHandler}
                                >
                                    <MenuItem value={1}>ПК</MenuItem>
                                    <MenuItem value={2}>Контроллер</MenuItem>
                                </Select>
                            </FormControl>
                            <br/>
                            <FormControl style={{marginTop: 25}}>
                                <TextField
                                    style={{minWidth: 350}}
                                    name="name"
                                    id="name"
                                    label="Название"
                                    value={this.state.name}
                                    onChange={this.changeInputHandler}
                                    multiline
                                    rowsMax={2}
                                />
                            </FormControl>
                            <br/>
                            <FormControl style={{marginTop: 25}}>
                                <TextField
                                    style={{minWidth: 350}}
                                    name="description"
                                    id="description"
                                    label="Описание"
                                    value={this.state.description}
                                    onChange={this.changeInputHandler}
                                    multiline
                                    rowsMax={4}
                                />
                            </FormControl>
                            <br/>
                            <Container style={{marginTop: 40}}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    startIcon={<SaveIcon/>}
                                    onClick={this.createObject}
                                >
                                    Сохранить
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{marginLeft: 10}}
                                    type="submit"
                                    color="secondary"
                                    startIcon={<CancelIcon/>}
                                    onClick={this.cancel}
                                >
                                    Отмена
                                </Button>
                            </Container>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}