import React from "react";
import SchemeService from "../../service/SchemeService";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControl from '@material-ui/core/FormControl';
import {Card, CardContent, CardHeader, Container, TextField} from "@material-ui/core";

export default class SchemeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: '',
            objectList: [],
            virusList: [],
            securitySWList: [],
            criteriaList: [],
        }
        this.changeInputHandler = this.changeInputHandler.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return
        } else {
            SchemeService.getById(this.state.id)
                .then((res) => {
                    let sch = res.data;
                    this.setState({
                        id: this.state.id,
                        name: sch.name,
                        description: sch.description,
                        objectList: sch.objectList,
                        virusList: sch.virusList,
                        securitySWList: sch.securitySWList,
                        criteriaList: sch.criteriaList,
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
        const name = event.target.name.value.replace(/\s+/g, ' ').trim()
        const description = event.target.description.value.replace(/\s+/g, ' ').trim()

        if (this.state.id == -1) {
            const newScheme = {
                name: name,
                description: description,
                objectList: [],
                virusList: [],
                securitySWList: [],
                criteriaList: [],
            }
            SchemeService.create(newScheme)
                .then(() => {
                    this.setState({name: '', type: '', description: ''});
                    this.props.history.push('/schemes');
                });
        } else {
            const editedScheme = {
                scheme_id: this.state.id,
                name: name,
                description: description,
                objectList: this.state.objectList,
                virusList: this.state.virusList,
                securitySWList: this.state.securitySWList,
                criteriaList: this.state.criteriaList,
            }
            SchemeService.update(editedScheme, this.state.id)
                .then(() => {
                    this.props.history.push('/schemes');
                })
        }
    }

    cancel() {
        this.props.history.push('/schemes')
    }

    getTitle() {
        if (this.state.id == -1) {
            return <h3 className="text-center">Создание новой схемы</h3>
        } else {
            return <h3 className="text-center">Редактирование существующей схемы</h3>
        }
    }

    render() {
        return (
            <Container>
                <Card style={{borderWidth: 1, borderStyle: "solid", borderRadius: 30}}>
                    <CardHeader title={this.getTitle()} style={{borderBottom: 1, borderBottomStyle: "solid"}}/>
                    <CardContent>
                        <form onSubmit={this.submitHandler}>
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
                                    onClick={this.createScheme}
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