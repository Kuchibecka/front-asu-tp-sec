import React from 'react';
import ObjectService from "../service/ObjectService";
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
    DialogTitle
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from '@material-ui/core/Modal';
import CancelIcon from "@material-ui/icons/Cancel";


class ObjectComponent extends React.Component {

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
                this.setState({objects: res.data, openModal: false});
            });
        this.state.openModal = false
        console.log(this.state)
    }

    createObject() {
        this.props.history.push('/create-object/-1');
    }

    editObject(id) {
        this.props.history.push(`/create-object/${id}`);
    }

    deleteObject(id) {
        ObjectService.deleteObject(id).then(() => {
            this.setState({objects: this.state.objects.filter(obj => obj.obj_id !== id), openModal: false})
        });

    }

    getType(type) {
        if (type == 1) {
            return <TableCell>ПК</TableCell>
        }
        return <TableCell>Контроллер</TableCell>
    }

    getModal = () => {
        console.log(this.state.openModal)
        return this.state.openModal
    }

    handleOpen = (id) => {
        this.setState({openModal: true, idToDelete: id})
        console.log(this.state);
    }

    handleClose = () => {
        this.setState({openModal: false, idToDelete: -1})
        console.log("Close!")
    }

    render() {
        return (
            <Container>
                <h3 className={"text-center"}> Список объектов</h3>
                <button className="btn btn-success" onClick={this.createObject}>Добавить новый объект</button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Тип</TableCell>
                            <TableCell>Описание</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.objects.map(object =>
                            <TableRow key={object}>
                                <TableCell> {object.name}</TableCell>
                                {this.getType(object.type)}
                                <TableCell> {object.description}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => this.editObject(object.obj_id)}
                                        startIcon={<EditIcon/>}
                                    />
                                    <Button
                                        onClick={() => this.setState({idToDelete: object.obj_id, openModal: true})}
                                        startIcon={<DeleteIcon/>}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <Dialog
                        open={this.state.openModal}
                        onClose={() => this.handleClose}
                    >
                        <DialogTitle id="alert-dialog-title">{"Вы действительно хотите удалить этот объект?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Нажимая "Да", Вы подтверждаете удаление объекта и всех связей с ним из базы данных
                            </DialogContentText>
                        </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => this.deleteObject(this.state.idToDelete)}
                                    startIcon={<DeleteIcon/>}
                                >
                                    Да
                                </Button>
                                <Button
                                    onClick={() => this.handleClose()}
                                    startIcon={<CancelIcon/>}
                                >
                                    Нет
                                </Button>
                            </DialogActions>
                    </Dialog>
                </Table>
            </Container>
        )
    }
}

export default ObjectComponent;