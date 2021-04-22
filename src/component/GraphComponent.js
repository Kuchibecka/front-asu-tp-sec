import ReactFlow from "react-flow-renderer";
import React from "react";
import GraphService from "../service/GraphService";

// todo: 1) react saga (есть на видосах), redux, redux-thunk  -- для запросов

// todo: 2.1) react router
// todo: 2.2) architecture

// todo: 3) css grid / flex

const initialState = {
    schemes: [],
    currentId: '',
    elements: [],
};

class GraphComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.objectInit = this.objectInit.bind(this)
    }


    async componentDidMount() {
        await GraphService.getSchemes()
            .then((res) => {
                this.setState({schemes: res.data})
            });
    }

    async objectInit(currentId) {
        await GraphService.getObjects(currentId)
            .then((res) => {
                this.setState({elements: res});
            });
    }

    handleTypeSelect = e => {
        if (e.target.value !== "Choose scheme...") {
            this.objectInit(e.target.value)
        } else {
            this.setState({elements: [], currentId: ''})
        }
    };

    contentShow() {
        const graphStyles = {width: "100%", height: "500px"};
        if (this.state.elements.length == 0) {
            return (
                <h3>SCHEME NOT SPECIFIED</h3>
            )
        } else {
            return (
                <ReactFlow elements={this.state.elements} style={graphStyles}/>
            )
        }
    }

    render() {

        return (
            <div className="container">
                <div className="input-group">
                    <label htmlFor="type" className="input-group-text">Scheme selection</label>
                    <select className="form-select" onChange={this.handleTypeSelect}>
                        <option selected>Choose scheme...</option>
                        {this.state.schemes.map(scheme => {
                            return (
                                <option value={scheme.scheme_id} id="scheme_id" key={scheme}>{scheme.name}</option>
                            )
                        })
                        }
                    </select>
                </div>
                {/*todo: Показ изображения, если схема не выбрана*/}
                {this.contentShow()}
            </div>
        )
    }
}

export default GraphComponent;
