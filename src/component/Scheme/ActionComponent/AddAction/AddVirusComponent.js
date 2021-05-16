import React from 'react';
import Button from '@material-ui/core/Button';
import VirusService from "../../../../service/VirusService";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import {Box, InputLabel, Select} from "@material-ui/core";
import SchemeService from "../../../../service/SchemeService";
import GraphService from "../../../../service/GraphService";

export default class AddVirusComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allViruses: [],
            selectedVirus: '',
            schemeId: '',
        }
        this.changeInputHandler = this.changeInputHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentDidMount() {
        this.setState({schemeId: this.props.schemeId})
        VirusService.getAll()
            .then((res) => {
                this.setState({allViruses: res.data.filter(obj => obj.isInstance === false)}); //todo: Изменить на загрузку только отсутствующих на схеме объектов?
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
            selectedVirus: event.target.value
        });
        console.log("Selected virus: ", this.state.selectedVirus)
    }

    submitHandler = (event) => {
        if (this.state.selectedVirus.length === 0) {
            alert("Выберите хотя бы один вирус или нажмите кнопку Назад для возврата")
        } else {
            VirusService.newInstance(this.state.selectedVirus)
                .then(inst => {
                    SchemeService.addVirus(inst.data, this.state.schemeId)
                        .then(sch => {
                            GraphService.getObjects(this.state.schemeId)
                                .then(scheme => {
                                    this.props.updateElements(scheme);
                                });
                        });
                });
            this.setState({selectedVirus: ''});
        }
    }

    render() {
        const {handleChange} = this.props;
        return (
            <Box
            >
                <h5 style={{borderBottomStyle: "solid"}} className={"text-center"}>Выберите
                    вирус для добавления на текущую схему</h5> {/*todo: Сменить заголовок*/}
                <FormControl fullWidth style={{marginBottom: 15}}>
                    <InputLabel id="demo-mutiple-checkbox-label">Вирус</InputLabel>
                    <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        value={this.state.selectedVirus}
                        onChange={this.changeInputHandler}
                        autoWidth
                    >
                        {this.state.allViruses.map(virus => (
                            <MenuItem key={virus.virus_id} value={virus.virus_id}>
                                {virus.name}
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
