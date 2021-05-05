import React from "react";
import ReactFlow, {ReactFlowProvider, addEdge, Handle} from "react-flow-renderer";

const initialState = {
    elements: [],
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
                <ReactFlowProvider>
                    <ReactFlow
                        elements={this.state.elements}
                        onConnect={this.onConnect}
                        style={graphStyles}
                        nodeTypes={{customNode: this.CustomNode}}
                        onConnectStart={this.onConnectStart}
                        onConnectStop={this.onConnectStop}
                        onConnectEnd={this.onConnectEnd}
                    />
                </ReactFlowProvider>
            )
        }
    }

    onConnect = (params) => {
        // this.state.elements = addEdge(params, )
        const setElements = (els) => {addEdge(params, els)};
        console.log(params)
    }

    //todo: сделать кастомный Node без точки входа для: Вирусов, СЗИ
    CustomNode = ({id}) => (
        <>
            <Handle type="target" position="left" isValidConnection={this.isValidConnection} />
            <div>{id}</div>
            <Handle type="source" position="right" isValidConnection={this.isValidConnection} />
        </>
    );

    isValidConnection = (connection) => {
        console.log(connection.target)
        return true /*connection.target === 'qwerty'*/;
    }

    onConnectStart = (event, { nodeId, handleType }) => console.log('on connect start', { nodeId, handleType });
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