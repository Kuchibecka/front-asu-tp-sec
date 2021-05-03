import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import ObjectService from "../../../../service/ObjectService";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import {Input, InputLabel, Select} from "@material-ui/core";

export class AddElementComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allObjects: [],
            selectedObjects: [],
        }
        this.changeInputHandler = this.changeInputHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentDidMount() {
        ObjectService.getAll()
            .then((res) => {
                this.setState({allObjects: res.data}); //todo: Изменить на загрузку только отсутствующих на схеме объектов?
            });                                             //todo: Можно все получать и .filter убрать те, что уже есть (нужна передача id схемы)
        console.log(this.state.allObjects);
    }

    changeInputHandler(event) {
        event.persist();
        this.setState({
            selectedObjects: event.target.value
        });
        // console.log("Selected objects: ", this.state.selectedObjects);
    }

    submitHandler = (event) => {
        if (this.state.selectedObjects.isEmpty){
            alert("Выберите хотя бы один объект или нажмите кнопку Назад")
        } else {
            //todo: вызов метода сервера добавления на схему
            console.log(this.state.selectedObjects)
        }
        // this.props.handleChange('initial') //todo: Изменить handleChange на только изменение step
    }

    render() {
        const {handleChange} = this.props;
        return (
            <Dialog
                open
                fullWidth
                maxWidth='sm'
            >
                <h3 style={{borderBottomStyle: "solid"}} className={"text-center"}>Выберите действие</h3> {/*todo: Сменить заголовок*/}
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
                                <Checkbox checked={this.state.selectedObjects.indexOf(object.obj_id) > -1} />
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
            </Dialog>
        );
    }
}

export default AddElementComponent;