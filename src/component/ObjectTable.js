import React from 'react';
import ObjectService from "../service/ObjectService";


class ObjectComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            objects: [],
        };
        this.createObject = this.createObject.bind(this);
        this.editObject = this.editObject.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
    }


    componentDidMount() {
        ObjectService.getObjects()
            .then((res) => {
                this.setState({objects: res.data});
            });
    }

    createObject() {
        this.props.history.push('/create-object/-1');
    }

    editObject(id) {
        this.props.history.push(`/create-object/${id}`);
    }

    deleteObject(id) {
        ObjectService.deleteObject(id).then(() => {
            this.setState({objects: this.state.objects.filter(obj => obj.obj_id !== id)})
        });
    }

    render() {
        return (
            <div>
                <h3 className={"text-center"}> Object list</h3>
                <button className="btn btn-success" onClick={this.createObject}>Add new object</button>
                <table className={"table table-striped"}>
                    <thead>
                    <tr>
                        <td> Object Name</td>
                        <td> Object Type</td>
                        <td> Object Id</td>
                        <td> Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.objects.map(object =>
                        <tr key={object}>
                            <td> {object.name}</td>
                            <td> {object.type}</td>
                            <td> {object.obj_id}</td>
                            <td>
                                <button onClick={() => this.editObject(object.obj_id)}
                                        className="btn btn-primary">Edit
                                </button>
                                <button style={{marginLeft: "10px"}} onClick={() => this.deleteObject(object.obj_id)}
                                        className="btn btn-danger">Delete
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ObjectComponent;