import React from 'react';
import Button from '@material-ui/core/Button';
import SecuritySwService from "../../../../service/SecuritySwService";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from '@material-ui/core/MenuItem';
import {Box, InputLabel, Select} from "@material-ui/core";
import SchemeService from "../../../../service/SchemeService";
import GraphService from "../../../../service/GraphService";

export default class AddSecuritySwComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allSecuritySws: [],
            selectedSecuritySw: '',
            schemeId: '',
        }
        this.changeInputHandler = this.changeInputHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentDidMount() {
        this.setState({schemeId: this.props.schemeId})
        SecuritySwService.getAll()
            .then((res) => {
                this.setState({allSecuritySws: res.data.filter(obj => obj.isInstance === false)}); //todo: Изменить на загрузку только отсутствующих на схеме объектов?
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.schemeId !== this.props.schemeId) {
            this.setState({schemeId: this.props.schemeId})
        }
    }

    async changeInputHandler(event) {
        event.persist();
        await this.setState({
            selectedSecuritySw: event.target.value
        });
    }

    submitHandler = (event) => {
        if (this.state.selectedSecuritySw.length === 0) {
            alert("Выберите хотя бы одно СЗИ или нажмите кнопку Назад для возврата")
        } else {
            SecuritySwService.newInstance(this.state.selectedSecuritySw)
                .then(inst => {
                    SchemeService.addSecuritySW(inst.data, this.state.schemeId)
                        .then(sch => {
                            GraphService.getObjects(this.state.schemeId)
                                .then(scheme => {
                                    this.props.updateElements(scheme);
                                });
                        });
                });
            this.setState({selectedSecuritySw: ''});
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
                    <InputLabel id="demo-mutiple-checkbox-label">СЗИ</InputLabel>
                    <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        value={this.state.selectedSecuritySw}
                        onChange={this.changeInputHandler}
                        autoWidth
                    >
                        {this.state.allSecuritySws.map(SecuritySw => (
                            <MenuItem key={SecuritySw.secSW_id} value={SecuritySw.secSW_id}>
                                {SecuritySw.name}
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
