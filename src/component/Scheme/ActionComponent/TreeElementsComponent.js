import React from 'react';
import Button from '@material-ui/core/Button';
import {Box} from "@material-ui/core";

export default class TreeElementsComponent extends React.Component {

    render() {
        const {handleChange} = this.props;
        return (
            <Box
            >
                <h3 style={{borderBottomStyle: "solid"}} className={"text-center"}>Выберите действие</h3>
                <Button
                    fullWidth
                    variant="contained"
                    style={{marginBottom: 5}}
                    onClick={handleChange('addTreeElement')}
                >
                    Добавить элементы в дерево
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    style={{marginBottom: 5}}
                    onClick={handleChange('deleteTreeElement')}
                >
                    Удалить элементы из дерева
                </Button>
                <br/>

                <Button
                    fullWidth
                    variant="contained"
                    style={{marginBottom: 5}}
                    color="secondary"
                    onClick={handleChange('initial')}
                >Назад</Button>
            </Box>
        );
    }
}
