import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import ObjectService from "../../../../service/ObjectService";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import {Box, Input, InputLabel, Select} from "@material-ui/core";
import SchemeService from "../../../../service/SchemeService";

export class AddElementComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allObjects: [],
            selectedObjects: [],
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
            });                                             //todo: Можно все получать и .filter убрать те, что уже есть (нужна передача id схемы)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.schemeId !== this.props.schemeId) {
            this.setState({schemeId: this.props.schemeId})
        }
    }

    changeInputHandler(event) {
        event.persist();
        this.setState({
            selectedObjects: event.target.value
        });
    }

    submitHandler = (event) => {
        if (this.state.selectedObjects.length === 0) {
            alert("Выберите хотя бы один объект или нажмите кнопку Назад для возврата")
            // this.props.handleChange('initial');
        } else {
            //todo: вызов метода сервера добавления на схему
            let arr = this.state.selectedObjects;
            let i = 0;
            while (i < arr.length) {
                console.log("Push to instance creation: ", arr[i]);
                ObjectService.newInstance(arr[i])
                    .then(inst => {
                        console.log("Instance created: ", inst)
                        SchemeService.addObject(inst.data, this.state.schemeId)
                            .then(sch => {
                                console.log("Result scheme: ", sch);
                            });
                    });
                i++;
            }
            this.setState({selectedObjects: []});
        }
    }

    render() {
        const {handleChange} = this.props;
        return (
            <Box
            >
                <h3 style={{borderBottomStyle: "solid"}} className={"text-center"}>Выберите
                    действие</h3> {/*todo: Сменить заголовок*/}
                <FormControl>
                    <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
                    <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={this.state.selectedObjects}
                        onChange={this.changeInputHandler}
                        input={<Input/>}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {this.state.allObjects.map(object => (
                            <MenuItem key={object.obj_id} value={object.obj_id}>
                                <Checkbox checked={this.state.selectedObjects.indexOf(object.obj_id) > -1}/>
                                <ListItemText primary={object.name}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    color="primary"
                    variant="contained"
                    id={'elements'}
                    onClick={this.submitHandler} /*todo: Тут сабмит к серверу + переход в 'initial' состояние*/
                >
                    Добавить
                </Button>

                <br/>

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

export default AddElementComponent;