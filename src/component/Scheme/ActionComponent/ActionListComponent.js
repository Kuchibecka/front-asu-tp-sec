import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {Box} from "@material-ui/core";

export class ActionListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {values, handleChange} = this.props;
        return (
                    <Box
                    >
                        <h3 style={{borderBottomStyle: "solid"}} className={"text-center"}>Выберите действие</h3>
                        <Button
                            onClick={handleChange('elements')}
                        >
                            Редактировать элементы
                        </Button>
                        <Button
                            onClick={handleChange('connections')}
                        >
                            Редактировать связи
                        </Button>
                        <Button
                            onClick={handleChange('params')}
                        >
                            Изменить данные схемы
                        </Button>
                        <br/>
                    </Box>
        );
    }
}

export default ActionListComponent;