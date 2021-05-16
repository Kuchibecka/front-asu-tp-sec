import React from "react";
import ReactFlow, {ReactFlowProvider, addEdge, Handle} from "react-flow-renderer";
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import ObjectService from "../../service/ObjectService";
import VirusService from "../../service/VirusService";
import SecuritySwService from "../../service/SecuritySwService";

const initialState = {
    elements: [],
    deleteMode: false,
    editMode: false,
    openModal: false,
};

export default class ElementsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.click = this.click.bind(this);
    }

    async componentDidMount() {
        await this.setState({elements: this.props.data});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({elements: this.props.data})
        }
        if (prevProps.deleteMode !== this.props.deleteMode) {
            this.setState({deleteMode: this.props.deleteMode})
        }
        if (prevProps.editMode !== this.props.editMode) {
            this.setState({editMode: this.props.editMode})
        }
    }

    click = (event, element) => {
        if (this.state.deleteMode) {
            this.setState({idToDelete: element.id, openModal: true})

            // todo: Когда не delete-mode добавить вывод информации об объекте в отдельном окошке
            // todo: Добавить edit-mode => по кнопке переход к редактированию нужной записи
        }
        if (this.state.editMode) {
            if (element.id.startsWith("virus")) {
                window.location.assign(`/virus/${element.id.slice(5)}`);
            } else {
                if (element.id.startsWith("securitySW")) {
                    window.location.assign(`/securitysw/${element.id.slice(10)}`);
                } else {
                    window.location.assign(`/object/${element.id}`);
                }
            }
        }
    }

    handleClose = () => {
        this.setState({openModal: false, idToDelete: -1})
    }

    modCheck() {
        if (this.state.deleteMode) {
            return (
                <h2 style={{color: "darkred"}}>
                    DELETE MODE ACTIVATED
                </h2>
            )
        }
        if (this.state.editMode) {
            return (
                <h2 style={{color: "darkorange"}}>
                    EDIT MODE ACTIVATED
                </h2>
            )
        }
    }

    deleteElement(id) {
        if (id.startsWith("virus")) {
            VirusService.delete(id.slice(5))
                .then(() => {
                    this.setState({elements: this.state.elements.filter(el => el.id !== id), openModal: false})
                });
        } else {
            if (id.startsWith("securitySW")) {
                SecuritySwService.delete(id.slice(10))
                    .then(() => {
                        this.setState({elements: this.state.elements.filter(el => el.id !== id), openModal: false})
                    });
            } else {
                ObjectService.delete(id)
                    .then(() => {
                        this.setState({elements: this.state.elements.filter(el => el.id !== id), openModal: false})
                    });
            }
        }
    }

    elementsShow(elements) {
        const graphStyles = {width: "100%", height: "500px"};
        if (elements.length === 0) {
            return (
                /*todo: Показ изображения, если схема не выбрана*/
                <h3>Упс, схема не сконфигурирована!</h3>
            )
        } else {
            return (
                <Container>
                    <div>
                        {this.modCheck()}
                    </div>
                    <ReactFlowProvider>
                        <ReactFlow
                            elements={this.state.elements}
                            onConnect={this.onConnect}
                            onElementClick={this.click}
                            style={graphStyles}
                            nodeTypes={{customNode: this.CustomNode}}
                            onConnectStart={this.onConnectStart}
                            onConnectStop={this.onConnectStop}
                            onConnectEnd={this.onConnectEnd}
                        />
                    </ReactFlowProvider>
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
                                onClick={() => this.deleteElement(this.state.idToDelete)}
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
                </Container>
            )
        }
    }

    onConnect = (params) => {
        const setElements = (els) => {
            addEdge(params, els)
        };
        console.log(params)
    }

    //todo: сделать кастомный Node без точки входа для: Вирусов, СЗИ
    CustomNode = ({id}) => (
        <>
            <Handle type="target" position="left" isValidConnection={this.isValidConnection}/>
            <div>{id}</div>
            <Handle type="source" position="right" isValidConnection={this.isValidConnection}/>
        </>
    );

    isValidConnection = (connection) => {
        console.log("Validator: ", connection.target)
        return true /*connection.target === 'qwerty'; connection.source === 'qwerty'*/;
    }

    onConnectStart = (event, {nodeId, handleType}) => console.log('on connect start', {nodeId, handleType});
    onConnectStop = (event) => console.log('on connect stop', event);
    onConnectEnd = (event) => console.log('on connect end', event);


    render() {
        return (
            <div className="container-fluid">
                {this.elementsShow(this.props.data)}
            </div>
        )
    }
}
