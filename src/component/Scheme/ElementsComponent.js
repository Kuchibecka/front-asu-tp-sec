import React from "react";
import ReactFlow, {ReactFlowProvider, Handle} from "react-flow-renderer";
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
import GraphService from "../../service/GraphService";
import {range} from "lodash-es";

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
            this.setState({elements: this.props.data, deleteMode: false, editMode: false})
        }
        if (prevProps.deleteMode !== this.props.deleteMode) {
            this.setState({deleteMode: this.props.deleteMode, editMode: false})
        }
        if (prevProps.editMode !== this.props.editMode) {
            this.setState({editMode: this.props.editMode, deleteMode: false})
        }
    }

    click = (event, element) => {
        if (this.state.deleteMode) {
            this.setState({idToDelete: element.id, openModal: true})

            // todo: Когда не delete-mode и не edit-mode добавить вывод информации об объекте в отдельном поле
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
                <h5 style={{color: "darkred"}}>
                    РЕЖИМ УДАЛЕНИЯ АКТИВИРОВАН
                </h5>
            )
        }
        if (this.state.editMode) {
            return (
                <h5 style={{color: "darkorange"}}>
                    РЕЖИМ РЕДАКТИРОВАНИЯ АКТИВИРОВАН
                </h5>
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
                            style={graphStyles}
                            onConnect={this.onConnect}
                            onElementClick={this.click}
                            nodeTypes={{customNode: this.CustomNode}}
                        />
                    </ReactFlowProvider>
                    <Dialog
                        open={this.state.openModal}
                        onClose={() => this.handleClose}
                    >
                        <DialogTitle id="delete-alert" style={{textAlign: "center"}}>
                            "Вы действительно хотите удалить этот объект?"
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="delete-alert" style={{textAlign: "center"}}>
                                Нажимая "Да", Вы подтверждаете удаление из базы данных объекта и всех связей с ним
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


    //todo: сделать кастомный Node без точки входа для: Вирусов, СЗИ
    CustomNode = ({id}) => (
        <>
            <Handle type="target" position="left"/>
            <div>{id}</div>
            <Handle type="source" position="right"/>
        </>
    );

    onConnect = (params) => {
        let source = params.source;
        let target = params.target;
        let id = "e" + source + "-" + target;
        let contains = false;
        if (!this.state.deleteMode) {
            if (source.startsWith("virus") && (/^\d+$/.test(target))) {
                for (let i in range(0, this.state.elements.length)) {
                    if (this.state.elements[i].id === id) {
                        contains = true;
                        break;
                    }
                }
                if (!contains) {
                    VirusService.getById(source.slice(5))
                        .then(vi => {
                            ObjectService.addVirus(vi.data, target)
                                .then(() => {
                                    GraphService.getObjects(this.props.schemeId)
                                        .then(scheme => {
                                            this.setState({elements: scheme});
                                        });
                                });
                        });
                }
            } else {
                if (source.startsWith("securitySW") && (/^\d+$/.test(target))) {
                    for (let i in range(0, this.state.elements.length)) {
                        if (this.state.elements[i].id === id) {
                            contains = true;
                            break;
                        }
                    }
                    if (!contains) {
                        SecuritySwService.getById(source.slice(10))
                            .then(secSW => {
                                ObjectService.addSecuritySW(secSW.data, target)
                                    .then(() => {
                                        GraphService.getObjects(this.props.schemeId)
                                            .then(scheme => {
                                                this.setState({elements: scheme});
                                            });
                                    });
                            });
                    }
                } else {
                    if ((/^\d+$/.test(source)) && (/^\d+$/.test(target))) {
                        let alterId = "e" + target + "-" + source;
                        for (let i in range(0, this.state.elements.length)) {
                            if ((this.state.elements[i].id === id) || (this.state.elements[i].id === alterId)) {
                                contains = true;
                                break;
                            }
                        }
                        if (!contains) {
                            ObjectService.getById(source)
                                .then(obj => {
                                    ObjectService.addObject(obj.data, target)
                                        .then(() => {
                                            GraphService.getObjects(this.props.schemeId)
                                                .then(scheme => {
                                                    this.setState({elements: scheme});
                                                });
                                        });
                                });
                        }
                    }
                }
            }
        } else {
            if (source.startsWith("virus") && (/^\d+$/.test(target))) {
                for (let i in range(0, this.state.elements.length)) {
                    if (this.state.elements[i].id === id) {
                        contains = true;
                        break;
                    }
                }
                if (contains) {
                    VirusService.getById(source.slice(5))
                        .then(vi => {
                            ObjectService.removeVirus(vi.data.virus_id, target)
                                .then(() => {
                                    GraphService.getObjects(this.props.schemeId)
                                        .then(scheme => {
                                            this.setState({elements: scheme});
                                        });
                                });
                        });
                }
            } else {
                if (source.startsWith("securitySW") && (/^\d+$/.test(target))) {
                    for (let i in range(0, this.state.elements.length)) {
                        if (this.state.elements[i].id === id) {
                            contains = true;
                            break;
                        }
                    }
                    if (contains) {
                        SecuritySwService.getById(source.slice(10))
                            .then(secSW => {
                                ObjectService.removeSecuritySW(secSW.data.secSW_id, target)
                                    .then(() => {
                                        GraphService.getObjects(this.props.schemeId)
                                            .then(scheme => {
                                                this.setState({elements: scheme});
                                            });
                                    });
                            });
                    }
                } else {
                    if ((/^\d+$/.test(source)) && (/^\d+$/.test(target))) {
                        let alterId = "e" + target + "-" + source;
                        for (let i in range(0, this.state.elements.length)) {
                            if (this.state.elements[i].id === id) {
                                contains = true;
                                [source, target] = [target, source];
                                break;
                            }
                            if (this.state.elements[i].id === alterId) {
                                contains = true;
                                break;
                            }
                        }
                        if (contains) {
                            ObjectService.getById(source)
                                .then(obj => {
                                    ObjectService.removeObject(obj.data.obj_id, target)
                                        .then(() => {
                                            GraphService.getObjects(this.props.schemeId)
                                                .then(scheme => {
                                                    //todo: можно заменить на фильтрацию удалённого для ускорения
                                                    this.setState({elements: scheme});
                                                });
                                        });
                                });
                        }
                    }
                }
            }
        }
    }

    render() {
        return (
            <div className="container-fluid">
                {this.elementsShow(this.props.data)}
            </div>
        )
    }
}
