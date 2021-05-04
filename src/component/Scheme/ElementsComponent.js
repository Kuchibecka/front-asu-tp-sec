import React from "react";
import ReactFlow, {ReactFlowProvider} from "react-flow-renderer";

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
        console.log(this.state.elements)
    }

    elementsShow(elements) {
        const graphStyles = {width: "100%", height: "500px"};
        if (elements.length === 0) {
            return (
                /*todo: Показ изображения, если схема не выбрана*/
                <h3>Схема не сконфигурирована</h3>
            )
        } else {
            return (
                <ReactFlowProvider>
                    <ReactFlow
                        elements={this.state.elements}
                        style={graphStyles}
                    />
                </ReactFlowProvider>
            )
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

export default ElementsComponent;