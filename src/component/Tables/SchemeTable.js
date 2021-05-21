import React from 'react';
import SchemeService from "../../service/SchemeService";
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


export default class SchemeTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            schemes: [],
            openModal: '',
            idToDelete: '',
        };
        this.createScheme = this.createScheme.bind(this);
        this.editScheme = this.editScheme.bind(this);
        this.deleteScheme = this.deleteScheme.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        SchemeService.getAll()
            .then((res) => {
                this.setState({schemes: res.data, openModal: false})
            });
        this.state.openModal = false
    }

    createScheme() {
        this.props.history.push('/scheme/-1');
    }

    editScheme(id) {
        this.props.history.push(`/scheme/${id}`);
    }

    deleteScheme(id) {
        SchemeService.delete(id).then(() => {
            this.setState({schemes: this.state.schemes.filter(sch => sch.scheme_id !== id), openModal: false})
        });
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
                    className={"text-center"}> Список схем</h3>
                <Tooltip title="Создать схему">
                    <Button
                        onClick={this.createScheme}
                        startIcon={<AddIcon/>}
                        style={{backgroundColor: "#b3ffb3", marginTop: "35px"}}
                    />
                </Tooltip>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Описание</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.schemes.map(scheme =>
                            <TableRow key={scheme}>
                                <Tooltip title={scheme.name} enterDelay={500} leaveDelay={0}>
                                    <TableCell>
                                        {(scheme.name.length > 20) ? scheme.name.substring(0, 17) + "..." : scheme.name}
                                    </TableCell>
                                </Tooltip>
                                <Tooltip title={scheme.description} enterDelay={500} leaveDelay={0}>
                                    <TableCell style={{maxWidth: "300px"}}>
                                        {(scheme.description.length > 40) ? scheme.description.substring(0, 37) + "..." : scheme.description}
                                    </TableCell>
                                </Tooltip>
                                <TableCell style={{maxWidth: "65px"}}>
                                    <Tooltip title="Редактировать">
                                        <Button
                                            onClick={() => this.editScheme(scheme.scheme_id)}
                                            startIcon={<EditIcon/>}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Удалить">
                                        <Button
                                            onClick={() => this.setState({
                                                idToDelete: scheme.scheme_id,
                                                openModal: true
                                            })}
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
                        <DialogTitle id="delete-alert" style={{textAlign: "center"}}>
                            "Вы действительно хотите удалить эту схему?"
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="delete-alert" style={{textAlign: "center"}}>
                                Нажимая "Да", Вы подтверждаете удаление из базы данных схемы и всех связей с ней
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => this.deleteScheme(this.state.idToDelete)}
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