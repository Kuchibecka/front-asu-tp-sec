import React from "react";
import GraphService from "../../service/GraphService";

const initialState = {
    schemes: [],
    currentId: '',
    elements: [],
    tree: [],
};

class SchemeSelectorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.objectInit = this.objectInit.bind(this)
        this.treeInit = this.treeInit.bind(this)
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

    async treeInit(currentId) {
        await GraphService.getTree(currentId)
            .then((res) => {
                this.setState({tree: res});
            });
    }

    handleSchemeSelect = e => {
        if (e.target.value !== "Choose scheme...") {
            this.objectInit(e.target.value)
                .then(() => this.props.updateElements(this.state.elements))
            this.treeInit(e.target.value)
                .then(() => this.props.updateTree(this.state.tree))
        } else {
            this.setState({elements: [], tree: [], currentId: ''})
        }
    };

    render() {
        return (
            <div className="container">
                <div className="input-group">
                    <label htmlFor="type" className="input-group-text">Scheme selection</label>
                    <select className="form-select" onChange={this.handleSchemeSelect}>
                        <option selected>Choose scheme...</option>
                        {
                            this.state.schemes.map(scheme => {
                                return (
                                    <option value={scheme.scheme_id} id="scheme_id" key={scheme}>{scheme.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }
}

export default SchemeSelectorComponent;
