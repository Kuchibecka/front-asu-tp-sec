import React from "react";
import VirusService from "../../service/VirusService";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControl from '@material-ui/core/FormControl';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, Select,
    Table, TableBody, TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from "@material-ui/core";
import ExploitService from "../../service/ExploitService";
import {range} from "lodash-es";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";

export default class VirusForm extends React.Component {
    //todo: Реализовать добавление и удаление эксплоитов
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: '',
            isInstance: false,
            virusExploit: [],
            allExploits: [],
            selectedExploit: '',
        }
        this.changeInputHandler = this.changeInputHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        this.addExploit = this.addExploit.bind(this);
    }

    async componentDidMount() {
        if (this.state.id !== -1) {
            await VirusService.getById(this.state.id)
                .then((res) => {
                    let virus = res.data;
                    this.setState({
                        id: this.state.id,
                        name: virus.name,
                        description: virus.description,
                        isInstance: virus.isInstance,
                        virusExploit: virus.virusExploit,
                    });
                });
        }
        await ExploitService.getAll()
            .then((res) => {
                let arrId = []
                for (let j in range(0, this.state.virusExploit.length)) {
                    arrId.push(this.state.virusExploit[j].se_id);
                }
                let allExploits = [];
                for (let i in range(0, res.data.length)) {
                    if (!arrId.includes(res.data[i].se_id)) {
                        allExploits.push(res.data[i])
                    }
                }
                this.setState({allExploits: allExploits})
            });
    }

    changeInputHandler(event) {
        event.persist()
        const target = event.target;
        const key = target.name
        const value = target.value
        this.setState({
            [key]: value
        });
        console.log("Key: ", key, " Value: ", value)
        console.log(this.state.selectedExploit)
    }

    submitHandler = event => {
        event.preventDefault()
        const name = event.target.name.value.replace(/\s+/g, ' ').trim()
        const description = event.target.description.value.replace(/\s+/g, ' ').trim()

        if (this.state.id === -1) {
            const newVirus = {
                name: name,
                description: description,
                isInstance: false,
                virusExploit: [],
            }
            VirusService.create(newVirus)
                .then(() => {
                    this.setState({name: '', type: '', description: ''});
                    this.props.history.push('/viruses');
                });
        } else {
            const editedVirus = {
                virus_id: this.state.id,
                name: name,
                description: description,
                isInstance: this.state.isInstance,
                virusExploit: this.state.virusExploit,
            }
            VirusService.update(editedVirus, this.state.id)
                .then(() => {
                    if (!this.state.isInstance) {
                        this.props.history.push('/viruses')
                    } else {
                        this.props.history.push('/')
                    }
                })
        }
    }

    removeExploit(id) {
        VirusService.removeExploit(id, this.state.id)
            .then(() => {
                this.setState({
                    virusExploit: this.state.virusExploit.filter(ve => ve.se_id !== id),
                })
                ExploitService.getAll()
                    .then((res) => {
                        let arrId = []
                        for (let j in range(0, this.state.virusExploit.length)) {
                            arrId.push(this.state.virusExploit[j].se_id);
                        }
                        let allExploits = [];
                        for (let i in range(0, res.data.length)) {
                            if (!arrId.includes(res.data[i].se_id)) {
                                allExploits.push(res.data[i])
                            }
                        }
                        this.setState({allExploits: allExploits})
                    });
            })
    }

    editExploit(id) {
        this.props.history.push(`/exploit/${id}`);
    }

    addExploit() {
        console.log(this.state.virusExploit)
        ExploitService.getById(this.state.selectedExploit)
            .then(exp => {
                VirusService.addExploit(exp.data, this.state.id)
                    .then(() => {
                        VirusService.getById(this.state.id)
                            .then((res) => {
                                let virus = res.data;
                                this.setState({
                                    virusExploit: virus.virusExploit,
                                    allExploits: this.state.allExploits.filter(e => e.se_id !== exp.data.se_id)
                                });
                            });
                    })
            })
    }

    cancel() {
        if (!this.state.isInstance) {
            this.props.history.push('/viruses')
        } else {
            this.props.history.push('/')
        }
    }

    getTitle() {
        if (this.state.id === -1) {
            return <h3 className="text-center">Создание нового вируса</h3>
        } else {
            return <h3 className="text-center">Редактирование существующего вируса</h3>
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
                            <FormControl fullWidth style={{marginTop: "40px", marginBottom: "20px"}}>
                                <h5>Добавление уязвимости безопасности</h5>
                                <Select
                                    labelId="demo-mutiple-checkbox-label"
                                    id="demo-mutiple-checkbox"
                                    name="selectedExploit"
                                    value={this.state.selectedExploit}
                                    onChange={this.changeInputHandler}
                                    autoWidth
                                >
                                    {this.state.allExploits.map(exp => (
                                        <MenuItem key={exp.se_id} value={exp.se_id}>
                                            {exp.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br/>
                            <Button
                                color="primary"
                                variant="contained"
                                id={'addExploit'}
                                style={{marginLeft: 10, marginBottom: 40}}
                                onClick={this.addExploit}
                            >
                                Добавить
                            </Button>
                            <br/>
                            <Container>
                                <h5 style={{borderBottomStyle: "solid", marginTop: "25px", borderBottomWidth: "thin"}}
                                    className={"text"}> Список имеющихся уязвимостей</h5>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Название</TableCell>
                                            <TableCell>Описание</TableCell>
                                            <TableCell/>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.virusExploit.map(exploit =>
                                            <TableRow key={exploit}>
                                                <Tooltip title={exploit.name} enterDelay={500} leaveDelay={0}>
                                                    <TableCell>
                                                        {(exploit.name.length > 20) ? exploit.name.substring(0, 17) + "..." : exploit.name}
                                                    </TableCell>
                                                </Tooltip>
                                                <Tooltip title={exploit.description} enterDelay={500} leaveDelay={0}>
                                                    <TableCell style={{maxWidth: "300px"}}>
                                                        {(exploit.description.length > 40) ? exploit.description.substring(0, 37) + "..." : exploit.description}
                                                    </TableCell>
                                                </Tooltip>
                                                <TableCell style={{maxWidth: "65px"}}>
                                                    <Tooltip title="Редактировать">
                                                        <Button
                                                            onClick={() => this.editExploit(exploit.se_id)}
                                                            startIcon={<EditIcon/>}
                                                        />
                                                    </Tooltip>
                                                    <Tooltip title="Удалить">
                                                        <Button
                                                            onClick={() => this.removeExploit(exploit.se_id)}
                                                            startIcon={<DeleteIcon style={{color: "#ff5555"}}/>}
                                                        />
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </Container>
                            <br/>
                            <Container style={{marginTop: 40}}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    startIcon={<SaveIcon/>}
                                    onClick={this.createVirus}
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
