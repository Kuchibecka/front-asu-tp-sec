import React from "react";
import ReactFlow, {addEdge, Handle, ReactFlowProvider} from "react-flow-renderer";
import ObjectService from "../../service/ObjectService";
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
import {range} from "lodash-es";
import GraphService from "../../service/GraphService";
import SchemeService from "../../service/SchemeService";
import {esES} from "@material-ui/core/locale";

const initialState = {
    tree: [],
    deleteMode: false,
    openModal: false,
};

export default class TreeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.click = this.click.bind(this);
    }

    async componentDidMount() {
        await this.setState({tree: this.props.data, schemeId: this.props.schemeId});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({tree: this.props.data})
        }
        if (prevProps.treeDeleteMode !== this.props.treeDeleteMode) {
            this.setState({deleteMode: this.props.treeDeleteMode, editMode: false})
        }
    }

    click = (event, element) => {
        if (this.state.deleteMode) {
            this.setState({idToDelete: element.id, openModal: true})
            // todo: Когда не delete-mode и не edit-mode добавить вывод информации об объекте в отдельном поле
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
    }

    deleteElement(id) {
        if (id.includes("treeRoot")) {
            alert("Ошибка: Нельзя удалить корневой элемент дерева!");
            this.setState({openModal: false})
            return;
        }
        if (id.includes("_")) {
            let source = id.replace(/_\d*/gm, "");
            let target = id.replace(/\d*_/gm, "")
            ObjectService.removeCriteriaObject(target, source)
                .then(() => {
                    GraphService.getTree(this.state.schemeId)
                        .then((tree) => {
                            this.setState({tree: tree, openModal: false})
                        });
                })
            return;
        }
        let andAppear = [];
        for (let i in range(0, this.state.tree.length)) {
            if (this.state.tree[i].id.includes(id.toString() + "_") || this.state.tree[i].id.includes("_" + id.toString())) {
                andAppear.push(Number(i));
            }
        }

        if (andAppear.length === 0) {
            SchemeService.removeCriteriaObject(id, this.state.schemeId)
                .then(() => {
                    GraphService.getTree(this.state.schemeId)
                        .then((tree) => {
                            this.setState({tree: tree, openModal: false})
                        });
                });
        } else {
            for (let i = 0; i < andAppear.length; i++) {
                let connectionId = this.state.tree[andAppear[i]].id;
                if (connectionId.includes(id.toString() + "_")) {
                    let detach = connectionId.replace(id.toString() + "_", "")
                    SchemeService.removeCriteriaObject(id, this.state.schemeId)
                        .then(() => {
                            ObjectService.removeCriteriaObject(detach, id)
                                .then(() => {
                                    GraphService.getTree(this.state.schemeId)
                                        .then((tree) => {
                                            this.setState({tree: tree, openModal: false})
                                        });
                                })
                        });
                } else {
                    if (connectionId.includes("_" + id.toString())) {
                        let detach = connectionId.replace("_" + id.toString(), "")
                        SchemeService.removeCriteriaObject(id, this.state.schemeId)
                            .then(() => {
                                ObjectService.removeCriteriaObject(id, detach)
                                    .then(() => {
                                        GraphService.getTree(this.state.schemeId)
                                            .then((tree) => {
                                                this.setState({tree: tree, openModal: false})
                                            });
                                    })
                            });
                    }
                }
            }

        }

    }

    treeShow(tree) {
        const graphStyles = {width: "100%", height: "500px"};
        /*todo: Показ изображения, если схема не выбрана*/
        if (tree.length <= 1) {
            return (
                <h3>Нет дерева отказов</h3>
            )
        } else {
            return (
                <Container>
                    <div>
                        {this.modCheck()}
                    </div>
                    <ReactFlowProvider>
                        <ReactFlow
                            elements={this.state.tree}
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
                        <DialogTitle id="delete-alert">
                            <h4 className="text-center"> {/* todo: убрать h4 и h5 */}
                                "Вы действительно хотите удалить этот объект из дерева отказа?"
                            </h4>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="delete-alert">
                                <h5 className={"text-center"}>
                                    Нажимая "Да", Вы подтверждаете удаление из дерева отказа выбранного объекта
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

    CustomNode = ({id}) => (
        <>
            <Handle type="target" position="left" isValidConnection={this.isValidConnection}/>
            <div>{id}</div>
            <Handle type="source" position="right" isValidConnection={this.isValidConnection}/>
        </>
    );

    isValidConnection = (connection) => {
        return true;
    }

    onConnect = (params) => {
        let source = params.source;
        let target = params.target;
        let id = source + "_" + target;
        let contains = false;
        let alterId = target + "_" + source;
        if ((/^\d+$/.test(source)) && (/^\d+$/.test(target))) {
            for (let i in range(0, this.state.tree.length)) {
                if ((this.state.tree[i].id === id) || (this.state.tree[i].id === alterId)) {
                    contains = true;
                    break;
                }
            }
            if (contains) {
                alert("Связь между выбранными элементами уже существует!")
            } else {
                ObjectService.getById(source)
                    .then(obj => {
                        ObjectService.addCriteriaObject(obj.data, target)
                            .then(() => {
                                GraphService.getTree(this.props.schemeId)
                                    .then(tree => {
                                        this.setState({tree: tree});
                                    });
                            });
                    });
            }
        }
    }

    render() {
        return (
            <div className="container-fluid"> {
                this
                    .treeShow(this.props.data)
            }
            </div>
        )
    }
}
