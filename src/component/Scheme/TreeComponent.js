import React from "react";
import ReactFlow, {ReactFlowProvider} from "react-flow-renderer";

const initialState = {
    tree: [],
};

class TreeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    async componentDidMount() {
        await this.setState({tree: this.props.data});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({tree: this.props.data})
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
                <ReactFlowProvider>
                    <ReactFlow
                        elements={this.state.tree}
                        style={graphStyles}
                    />
                </ReactFlowProvider>
            )
        }
    }

    render() {
        return (
            <div className="container-fluid"> {
                this.treeShow(this.props.data)
            }
            </div>
        )
    }
}

export default TreeComponent;