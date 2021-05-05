import React from 'react';
import SecuritySwService from "../../service/SecuritySwService";
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


export default class SecuritySwTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            securitySws: [],
            openModal: '',
            idToDelete: '',
        };
        this.createSecuritySw = this.createSecuritySw.bind(this);
        this.editSecuritySw = this.editSecuritySw.bind(this);
        this.deleteSecuritySw = this.deleteSecuritySw.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        SecuritySwService.getAll()
            .then((res) => {
                this.setState({securitySws: res.data.filter(secSw => secSw.isInstance === false), openModal: false})
            });
        this.state.openModal = false
    }

    createSecuritySw() {
        this.props.history.push('/securitySw/-1');
    }

    editSecuritySw(id) {
        this.props.history.push(`/securitySw/${id}`);
    }

    deleteSecuritySw(id) {
        SecuritySwService.delete(id).then(() => {
            this.setState({securitySws: this.state.securitySws.filter(sec => sec.secSW_id !== id), openModal: false})
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
                    className={"text-center"}> Список средств защиты информации (СЗИ)</h3>
                <Tooltip title="Создать уязвимость">
                    <Button
                        onClick={this.createSecuritySw}
                        startIcon={<AddIcon/>}
                        style={{backgroundColor: "#b3ffb3", marginTop: "35px"}}
                    />
                </Tooltip>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Стоимость</TableCell>
                            <TableCell>Описание</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.securitySws.map(securitySw =>
                            <TableRow key={securitySw}>
                                <Tooltip title={securitySw.name} enterDelay={500} leaveDelay={0}>
                                    <TableCell>
                                        {(securitySw.name.length > 20) ? securitySw.name.substring(0, 17) + "..." : securitySw.name}
                                    </TableCell>
                                </Tooltip>
                                <Tooltip title={securitySw.price} enterDelay={500} leaveDelay={0}>
                                    <TableCell>
                                        {(securitySw.price.length > 7) ? securitySw.price.substring(0, 4) + "..." : securitySw.price}
                                    </TableCell>
                                </Tooltip>
                                <Tooltip title={securitySw.description} enterDelay={500} leaveDelay={0}>
                                    <TableCell style={{maxWidth: "300px"}}>
                                        {(securitySw.description.length > 40) ? securitySw.description.substring(0, 37) + "..." : securitySw.description}
                                    </TableCell>
                                </Tooltip>
                                <TableCell style={{maxWidth: "65px"}}>
                                    <Tooltip title="Редактировать">
                                        <Button
                                            onClick={() => this.editSecuritySw(securitySw.secSW_id)}
                                            startIcon={<EditIcon/>}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Удалить">
                                        <Button
                                            onClick={() => this.setState({
                                                idToDelete: securitySw.secSW_id,
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
                        <DialogTitle id="delete-alert">
                            <h4 className={"text-center"}>"Вы действительно хотите удалить это СЗИ?"</h4>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="delete-alert">
                                <h5 className={"text-center"}>
                                    Нажимая "Да", Вы подтверждаете удаление из базы данных СЗИ и всех связей с
                                    ним
                                </h5>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => this.deleteSecuritySw(Number(this.state.idToDelete))}
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
