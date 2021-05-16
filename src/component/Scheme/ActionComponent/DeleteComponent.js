import React from 'react';
import Button from '@material-ui/core/Button';
import {Box} from "@material-ui/core";

export default class DeleteComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {handleChange, deleteMode} = this.props;
        return (
            <Box>
                <h5 style={{borderBottomStyle: "solid"}} className={"text-center"}>
                    Нажмите на кнопку для перехода в режим удаления. Ещё раз для выхода из режима
                </h5>
                <Button
                    color="primary"
                    variant="contained"
                    id={'elements'}
                    onClick={deleteMode}
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
