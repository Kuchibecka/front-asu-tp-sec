import React from 'react';
import SchemeService from "../service/SchemeService";
import {Box, Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default class PriceCounterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schemeId: '',
            totalPrice: '',
        };
    }

    async componentDidMount() {
        await this.setState({
            schemeId: this.props.schemeId,
        });
        if (this.state.schemeId === '' || this.state.schemeId < 0) {
            await this.setState({allowPriceCounting: false});
        } else {
            await this.setState({allowPriceCounting: true});
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.schemeId !== this.props.schemeId) {
            this.setState({scheme: this.props.schemeId});
            if (this.state.schemeId === '' || this.state.schemeId < 0) {
                this.setState({allowPriceCounting: false});
            } else {
                this.setState({allowPriceCounting: true});
            }
        }
    }

    contentShow(allow) {
        if (allow === false) {
            return (
                <h6 style={{color: "darkred", textAlign: "center"}}>
                    Внимание! Схема не сконфигурирована!
                </h6>
            )
        }
    }

    async priceCounting() {
        let result;
        await SchemeService.priceCounting(this.state.schemeId)
            .then(res => result = res.data);
        this.setState({totalPrice: result});
        console.log(this.state.totalPrice)
    }

    resultShow() {
        if (this.state.totalPrice !== '') {
            return (
                <h5 style={{color: "green"}}>
                    Подсчёт стоимости завершён! Итоговая стоимость СЗИ системы:
                    {this.state.totalPrice}
                </h5>
            )
        }
    }

    render() {
        const {handleChange} = this.props

        return (
            <Box>
                <h5 style={{borderBottomStyle: "solid"}} className={"text-center"}>
                    Нажмите на кнопку для запуска моделирования на отказоустойчивость.
                </h5>
                <br/>
                {this.contentShow(this.state.allowModeling)}
                <br/>
                {this.resultShow()}
                <Grid container>
                    <Grid item xs>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.priceCounting()}
                            disabled={!this.state.allowPriceCounting}
                        >
                            Рассчитать стоимость
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
