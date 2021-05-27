import React from 'react';
import ObjectService from "../../service/ObjectService";
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Tooltip,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from "@material-ui/icons/Cancel";


export default class ObjectTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            objects: [],
            openModal: '',
            idToDelete: '',
        };
        this.createObject = this.createObject.bind(this);
        this.editObject = this.editObject.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        ObjectService.getAll()
            .then((res) => {
                this.setState({objects: res.data.filter(obj => obj.isInstance === false), openModal: false});
            });
        this.state.openModal = false //todo: убрать?
    }

    createObject() {
        this.props.history.push('/object/-1');
    }

    editObject(id) {
        this.props.history.push(`/object/${id}`);
    }

    deleteObject(id) {
        ObjectService.delete(id).then(() => {
            this.setState({objects: this.state.objects.filter(obj => obj.obj_id !== id), openModal: false})
        });
    }

    getType(type) {
        if (type === 1) {
            return <TableCell>ПК</TableCell>
        }
        return <TableCell>Контроллер</TableCell>
    }

    getModal = () => {
        return this.state.openModal
    }

    handleOpen = (id) => {
        this.setState({openModal: true, idToDelete: id})
    }

    handleClose = () => {
        this.setState({openModal: false, idToDelete: -1})
    }

    render() {
        return (
            <Container>
                <h3 style={{borderBottomStyle: "solid", marginTop: "10px", borderBottomWidth: "thin"}}
                    className={"text-center"}> Список объектов</h3>
                <Tooltip title="Создать объект">
                    <Button
                        onClick={this.createObject}
                        startIcon={<AddIcon/>}
                        style={{backgroundColor: "#b3ffb3", marginTop: "35px"}}
                    />
                </Tooltip>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Тип</TableCell>
                            <TableCell>Описание</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.objects.map(object =>
                            <TableRow key={object}>
                                <TableCell> {(object.name.length > 11) ? object.name.substring(0, 8) + "..." : object.name}</TableCell>
                                {this.getType(object.type)}
                                <TableCell
                                    style={{maxWidth: "200px"}}> {(object.description.length > 51) ? object.description.substring(0, 48) + "..." : object.description}
                                </TableCell>
                                <TableCell style={{maxWidth: "65px"}}>
                                    <Tooltip title="Редактировать">
                                        <Button
                                            onClick={() => this.editObject(object.obj_id)}
                                            startIcon={<EditIcon/>}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Удалить">
                                        <Button
                                            onClick={() => this.setState({idToDelete: object.obj_id, openModal: true})}
                                            startIcon={<DeleteIcon style={{color: "#ff5555"}}/>}
                                        />
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <Dialog
                        open={this.state.openModal}
                        onClose={() => this.handleClose}
                    >
                        <DialogTitle id="delete-alert">
                            <h4 className="text-center">
                                "Вы действительно хотите удалить этот объект?"
                            </h4>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="delete-alert">
                                <h5 className={"text-center"}>
                                    Нажимая "Да", Вы подтверждаете удаление из базы данных объекта и всех связей с ним
                                </h5>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => this.deleteObject(this.state.idToDelete)}
                                startIcon={<DeleteIcon style={{color: "#ff5555"}}/>}
                            >
                                Да
                            </Button>
                            <Button
                                onClick={() => this.handleClose()}
                                startIcon={<CancelIcon/>}
                            >
                                Отмена
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Table>
            </Container>
        )
    }
}