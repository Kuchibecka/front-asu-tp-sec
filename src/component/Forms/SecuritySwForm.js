import React from "react";
import SecuritySwService from "../../service/SecuritySwService";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControl from '@material-ui/core/FormControl';
import {Card, CardContent, CardHeader, Container, TextField} from "@material-ui/core";

export default class SecuritySwForm extends React.Component {
    //todo: Реализовать добавление и удаление эксплоитов
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            price: '',
            description: '',
            isInstance: false,
            securityExploit: [],
        }
        this.changeInputHandler = this.changeInputHandler.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== -1) {
            SecuritySwService.getById(this.state.id)
                .then((res) => {
                    let secSW = res.data;
                    this.setState({
                        id: this.state.id,
                        name: secSW.name,
                        price: secSW.price,
                        description: secSW.description,
                        isInstance: secSW.isInstance,
                        securityExploit: secSW.securityExploit,
                    });
                });
        }
    }

    changeInputHandler(event) {
        event.persist()
        const target = event.target;
        const key = target.name
        const value = target.value
        if (key === 'price') {
            if (value.match(/\D/g)) {
                alert("Это поле только для числовых значений!")
                this.setState({[key]: value.replace(/\D/g, '')})
            } else {
                if (value > -2000000000 && value < 2000000001)
                    this.setState({[key]: value})
                else
                    alert("Укажите число в диапазоне [-2000000000, 2000000000]!")
            }
        } else {
            this.setState({
                [key]: value
            });
        }
    }

    submitHandler = event => {
        event.preventDefault()
        const name = event.target.name.value.replace(/\s+/g, ' ').trim()
        const description = event.target.description.value.replace(/\s+/g, ' ').trim()
        const price = event.target.price.value

        if (this.state.id === -1) {
            const newSecuritySw = {
                name: name,
                price: price,
                description: description,
                isInstance: false,
                securityExploit: [],
            }
            SecuritySwService.create(newSecuritySw)
                .then(() => {
                    this.setState({name: '', type: '', description: ''});
                    this.props.history.push('/securitySws');
                });
        } else {
            const editedSecuritySw = {
                secSW_id: this.state.id,
                name: name,
                price: price,
                description: description,
                isInstance: this.state.isInstance,
                securityExploit: this.state.securityExploit,
            }
            SecuritySwService.update(editedSecuritySw, this.state.id)
                .then(() => {
                    this.props.history.push('/securitySws');
                })
        }
    }

    cancel() {
        this.props.history.push('/securitySws')
    }

    getTitle() {
        if (this.state.id === -1) {
            return <h3 className="text-center">Создание нового средства защиты информации</h3>
        } else {
            return <h3 className="text-center">Редактирование существующего средства защиты информации</h3>
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
                                    style={{minWidth: 60}}
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
                                    style={{minWidth: 60}}
                                    name="price"
                                    id="price"
                                    label="Цена"
                                    value={this.state.price}
                                    onChange={this.changeInputHandler}
                                    multiline
                                    rowsMax={1}
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
                                    onClick={this.createSecuritySw}
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
