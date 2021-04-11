import React from 'react';
import ObjectService from "../service/ObjectService";

class ObjectComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            objects: [],
        };
    }


    componentDidMount() {
        ObjectService.getObjects()
            .then((res) => {
                this.setState({objects: res});
            });
    }

    render() {
        return (
            <div>
                <h1 className={"text-center"}> Object list</h1>
                <table className={"table table-striped"}>
                    <thead>
                    <tr>
                        <td> Object Name</td>
                        <td> Object Type</td>
                        <td> Object Id</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.objects.map(
                            object =>
                                <tr key={object}>
                                    <td> {object.name}</td>
                                    <td> {object.type}</td>
                                    <td> {object.obj_id}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ObjectComponent;