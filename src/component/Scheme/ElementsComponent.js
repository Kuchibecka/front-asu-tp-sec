import React from "react";
import ReactFlow, {ReactFlowProvider, addEdge, Handle} from "react-flow-renderer";

const initialState = {
    elements: [],
    deleteMode: false,
};

class ElementsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
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
    }

    delete = (event, element) => {
        if (this.state.deleteMode) {
            console.log("Delete mode ON. Deleting: ")
            console.log(element)
            alert("Удалить эелемент? " + element.id)
            // todo: парсинг id => тип удаляемого элемента => нужный call в Service
            // todo: Окно подтверждения удаления?

            // todo: Когда не delete-mode добавить вывод информации об объекте в отдельном окошке
            // todo: Добавить edit-mode => по кнопке переход к редактированию нужной записи
        }
    }

    deleteModeCheck() {
        if (this.state.deleteMode) {
            return (
                <h2 style={{color: "red"}}>
                    DELETE MODE ACTIVATED
                </h2>
            )
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
                <div className={"container-fluid"}>
                    <h1>
                        {this.deleteModeCheck()}
                    </h1>
                    <ReactFlowProvider>
                        <ReactFlow
                            elements={this.state.elements}
                            onConnect={this.onConnect}
                            onElementClick={this.delete}
                            style={graphStyles}
                            nodeTypes={{customNode: this.CustomNode}}
                            onConnectStart={this.onConnectStart}
                            onConnectStop={this.onConnectStop}
                            onConnectEnd={this.onConnectEnd}
                        />
                    </ReactFlowProvider>
                </div>
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
        console.log(connection.target)
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

export default ElementsComponent;