import React from 'react';
import Button from "@material-ui/core/Button";
import {Box, Grid} from "@material-ui/core";
import SchemeService from "../../../service/SchemeService";

export default class ModelingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schemeId: '',
            scheme: '',
            tree: '',
            allowModeling: '',
            result: '',
        };
    }

    async componentDidMount() {
        await this.setState({
            schemeId: this.props.schemeId,
            scheme: this.props.scheme,
            tree: this.props.tree,
        });
        if (this.state.scheme === [] || this.state.tree.length <= 1) {
            await this.setState({allowModeling: false});
        } else {
            await this.setState({allowModeling: true});
        }
        console.log("State is: ", this.state);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.schemeId !== this.props.schemeId) {
            this.setState({scheme: this.props.schemeId});
        }
        if (prevProps.scheme !== this.props.scheme) {
            this.setState({scheme: this.props.scheme});
            if (this.state.scheme === []) {
                this.setState({allowModeling: false});
            } else {
                this.setState({allowModeling: true});
            }
        }
        if (prevProps.tree !== this.props.tree) {
            this.setState({scheme: this.props.tree});
            if (this.state.tree.length <= 1) {
                this.setState({allowModeling: false});
            } else {
                this.setState({allowModeling: true});
            }
        }
    }

    contentShow(schemeId, scheme, tree) {
        if (scheme === []) {
            return (
                <h6 style={{color: "darkred", textAlign: "center"}}>
                    Внимание! Схема не сконфигурирована!
                    Моделирование невозможно!
                </h6>
            )
        } else {
            if (tree.length <= 1) {
                return (
                    <h6 style={{color: "darkred", textAlign: "center"}}>
                        Внимание! Дерево отказов не сконфигурировано!
                        Моделирование невозможно!
                    </h6>
                )
            }
        }
    }

    async modeling() {
        let result;
        await SchemeService.modeling(this.state.schemeId)
            .then(res => result = res.data);
        this.setState({result: result});
        console.log(this.state.result)
    }

    resultShow() {
        if (this.state.result === true) {
            return (
                <h5 style={{color: "green"}}>
                    Моделирование завершено: система отказоустойчива!
                </h5>
            )
        } else {
            if (this.state.result === false) {
                return (
                    <h5 style={{color: "red"}}>
                        Моделирование завершено: система не отказоустойчива!
                    </h5>
                )
            } else {
                console.log("ELSE")
            }
        }
    }

    render() {
        const {schemeId, scheme, tree, handleChange} = this.props

        return (
            <Box>
                <h5 style={{borderBottomStyle: "solid"}} className={"text-center"}>
                    Нажмите на кнопку для запуска моделирования на отказоустойчивость.
                </h5>
                <br/>
                {this.contentShow(schemeId, scheme, tree)}
                <br/>
                {this.resultShow()}
                <Grid container>
                    <Grid item xs>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.modeling()}
                            disabled={!this.state.allowModeling}
                        >
                            Запустить моделирование
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{marginLeft: 15}}
                            onClick={handleChange('initial')}
                        >
                            Назад
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}