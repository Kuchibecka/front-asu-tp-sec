import React from 'react';
import ObjectService from "../service/ObjectService";
import {method} from "lodash-es";

class ObjectComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            objects:[]
        }
    }

    componentDidMount() {
        /*
        ObjectService.fetchData('http://localhost:8081/api/object/')
            .then((response) => {
            this.setState({ objects: response.json()})
        })
            .then(data => console.log(data));
         */
        fetch('http://localhost:8081/api/object/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(data => console.log(data));
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