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
        ObjectService.getAll()
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

    getType(type) {
        if (type == 1) {
            return <td>ПК</td>
        }
        return <td>Контроллер</td>
    }

    render() {
        return (
            <div className="container-fluid">
                <h3 className={"text-center"}> Список объектов</h3>
                <button className="btn btn-success" onClick={this.createObject}>Добавить новый объект</button>
                <table className={"table table-striped"}>
                    <thead>
                    <tr>
                        <td>Название</td>
                        <td>Тип</td>
                        <td>Описание</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.objects.map(object =>
                        <tr key={object}>
                            <td> {object.name}</td>
                            {this.getType(object.type)}
                            <td> {object.description}</td>
                            <td>
                                <button onClick={() => this.editObject(object.obj_id)}
                                        className="btn btn-primary">Редактировать
                                </button>
                                <button style={{marginLeft: "10px"}} onClick={() => this.deleteObject(object.obj_id)}
                                        className="btn btn-danger">Удалить
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