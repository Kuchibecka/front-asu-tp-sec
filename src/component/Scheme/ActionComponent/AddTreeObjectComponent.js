import React from 'react';
import Button from '@material-ui/core/Button';
import ObjectService from "../../../service/ObjectService";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import {Box, InputLabel, Select} from "@material-ui/core";
import SchemeService from "../../../service/SchemeService";
import GraphService from "../../../service/GraphService";
import {range} from "lodash-es";

export default class AddTreeObjectComponent extends React.Component {
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

    async componentDidMount() {
        await this.setState({schemeId: this.props.schemeId})
        SchemeService.getById(this.state.schemeId)
            .then((scheme) => {
                console.log(scheme)
                let criteriaList = scheme.data.criteriaList;
                let allObjects = scheme.data.objectList;
                console.log("All objects on scheme: ", allObjects)
                console.log("All criteria objects: ", criteriaList)
                let res = []
                let criteriaId = [];
                for (let j in range(0, criteriaList.length)) {
                    criteriaId.push(criteriaList[j].obj_id);
                }
                console.log(criteriaId);
                for (let i in range(0, allObjects.length)) {
                    if (!criteriaId.includes(allObjects[i].obj_id)) {
                        res.push(allObjects[i]);
                    }
                }
                console.log("Non-included: ", res)
                this.setState({allObjects: res});
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
            ObjectService.getById(this.state.selectedObject)
                .then((obj) => {
                    SchemeService.addCriteriaObject(obj.data, this.state.schemeId)
                        .then(sch => {
                            GraphService.getTree(this.state.schemeId)
                                .then(scheme => {
                                    this.props.updateTree(scheme);
                                });
                        });
                })
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
                    id={'treeElements'}
                    style={{marginRight: 10}}
                    onClick={this.submitHandler} /*todo: Тут сабмит к серверу + переход в 'initial' состояние*/
                >
                    Добавить
                </Button>

                <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleChange('treeElements')}
                >
                    Назад
                </Button>
            </Box>
        );
    }
}
