import React from 'react';
import Button from '@material-ui/core/Button';
import {Box} from "@material-ui/core";

export default class EditComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {handleChange, editMode} = this.props;
        return (
            <Box>
                <h5 style={{borderBottomStyle: "solid"}} className={"text-center"}>
                    Нажмите на кнопку для перехода в режим редактирования.
                    Нажмите ещё раз для выхода из режима.
                    В режиме редактирования нажмите на элемент схемы для редактирования.
                </h5>
                <Button
                    color="primary"
                    variant="contained"
                    id={'elements'}
                    onClick={editMode}
                >
                    Удаление
                </Button>
                <br/>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleChange('elements')}
                >
                    Назад
                </Button>
            </Box>
        );
    }
}
