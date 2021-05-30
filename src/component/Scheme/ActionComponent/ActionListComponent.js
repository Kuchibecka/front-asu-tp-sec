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
                            Редактировать схему
                        </Button>
                        <br/>
                        <Button
                            onClick={handleChange('treeElements')}
                        >
                            Редактировать дерево отказа
                        </Button>
                        <br/>
                        <Button
                            onClick={handleChange('schemeParams')}
                        >
                            Изменить данные схемы
                        </Button>
                        <br/>
                        <Button
                            onClick={handleChange('modeling')}
                        >
                            Проверить на отказоустойчивость
                        </Button>
                    </Box>
        );
    }
}

export default ActionListComponent;