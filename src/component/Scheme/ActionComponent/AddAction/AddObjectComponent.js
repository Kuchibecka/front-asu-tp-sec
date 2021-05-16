import React from 'react';
import Button from '@material-ui/core/Button';
import ObjectService from "../../../../service/ObjectService";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import {Box, InputLabel, Select} from "@material-ui/core";
import SchemeService from "../../../../service/SchemeService";
import GraphService from "../../../../service/GraphService";

export class AddObjectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allObjects: [],
            selectedObject: '',
            schemeId: '',
        }
        this.changeInputHandler = this.changeInputHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentDidMount() {
        this.setState({schemeId: this.props.schemeId})
        ObjectService.getAll()
            .then((res) => {
                this.setState({allObjects: res.data.filter(obj => obj.isInstance === false)}); //todo: Изменить на загрузку только отсутствующих на схеме объектов?
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.schemeId !== this.props.schemeId) {
            this.setState({schemeId: this.props.schemeId})
        }
    }

    async changeInputHandler(event) {
        event.persist();
        console.log(event.target.value)
        await this.setState({
            selectedObject: event.target.value
        });
        console.log("Selected object: ", this.state.selectedObject)
    }

    submitHandler = (event) => {
        if (this.state.selectedObject.length === 0) {
            alert("Выберите хотя бы один объект или нажмите кнопку Назад для возврата")
        } else {
            ObjectService.newInstance(this.state.selectedObject)
                .then(inst => {
                    SchemeService.addObject(inst.data, this.state.schemeId)
                        .then(sch => {
                            console.log("Result scheme: ", sch.data.objectList);
                            GraphService.getObjects(this.state.schemeId)
                                .then(scheme => {
                                    this.props.updateElements(scheme);
                                });
                        });
                });
            this.setState({selectedObject: ''});
        }
    }

    render() {
        const {handleChange} = this.props;
        return (
            <Box
            >
                <h5 style={{borderBottomStyle: "solid"}} className={"text-center"}>Выберите
                    объект для добавления на текущую схему</h5> {/*todo: Сменить заголовок*/}
                <FormControl fullWidth style={{marginBottom: 15}}>
                    <InputLabel id="demo-mutiple-checkbox-label">Объект</InputLabel>
                    <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        value={this.state.selectedObject}
                        onChange={this.changeInputHandler}
                        autoWidth
                    >
                        {this.state.allObjects.map(object => (
                            <MenuItem key={object.obj_id} value={object.obj_id}>
                                {object.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <br/>

                <Button
                    color="primary"
                    variant="contained"
                    id={'elements'}
                    style={{marginRight: 10}}
                    onClick={this.submitHandler} /*todo: Тут сабмит к серверу + переход в 'initial' состояние*/
                >
                    Добавить
                </Button>

                <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleChange('addElement')}
                >
                    Назад
                </Button>
            </Box>
        );
    }
}

export default AddObjectComponent;