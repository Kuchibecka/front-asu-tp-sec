import React from 'react';
import VirusService from "../../service/VirusService";
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


export default class VirusTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viruses: [],
            openModal: '',
            idToDelete: '',
        };
        this.createVirus = this.createVirus.bind(this);
        this.editVirus = this.editVirus.bind(this);
        this.deleteVirus = this.deleteVirus.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        VirusService.getAll()
            .then((res) => {
                this.setState({viruses: res.data.filter(virus => virus.isInstance === false), openModal: false})
            });
        this.state.openModal = false
    }

    createVirus() {
        this.props.history.push('/virus/-1');
    }

    editVirus(id) {
        this.props.history.push(`/virus/${id}`);
    }

    deleteVirus(id) {
        VirusService.delete(id).then(() => {
            this.setState({viruses: this.state.viruses.filter(virus => virus.virus_id !== id), openModal: false})
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
                    className={"text-center"}> Список вирусов</h3>
                <Tooltip title="Создать уязвимость">
                    <Button
                        onClick={this.createVirus}
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
                        {this.state.viruses.map(virus =>
                            <TableRow key={virus}>
                                <Tooltip title={virus.name} enterDelay={500} leaveDelay={0}>
                                    <TableCell>
                                        {(virus.name.length > 20) ? virus.name.substring(0, 17) + "..." : virus.name}
                                    </TableCell>
                                </Tooltip>
                                <Tooltip title={virus.description} enterDelay={500} leaveDelay={0}>
                                    <TableCell style={{maxWidth: "300px"}}>
                                        {(virus.description.length > 40) ? virus.description.substring(0, 37) + "..." : virus.description}
                                    </TableCell>
                                </Tooltip>
                                <TableCell style={{maxWidth: "65px"}}>
                                    <Tooltip title="Редактировать">
                                        <Button
                                            onClick={() => this.editVirus(virus.virus_id)}
                                            startIcon={<EditIcon/>}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Удалить">
                                        <Button
                                            onClick={() => this.setState({idToDelete: virus.virus_id, openModal: true})}
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
                            <h4 className={"text-center"}>"Вы действительно хотите удалить этот вирус?"</h4>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="delete-alert">
                                <h5 className={"text-center"}>
                                    Нажимая "Да", Вы подтверждаете удаление из базы данных вируса и всех связей с
                                    ним
                                </h5>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => this.deleteVirus(this.state.idToDelete)}
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
