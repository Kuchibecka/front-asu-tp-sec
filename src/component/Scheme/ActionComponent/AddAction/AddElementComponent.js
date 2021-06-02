import React from 'react';
import Button from '@material-ui/core/Button';
import {Box} from "@material-ui/core";

export class AddElementComponent extends React.Component {

    render() {
        const {handleChange} = this.props;
        return (
                    <Box
                    >
                        <h3 style={{borderBottomStyle: "solid"}} className={"text-center"}>Выберите элемент для добавления</h3>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{marginBottom: 5}}
                            onClick={handleChange('addObject')}
                        >
                            Добавить объекты на схему
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{marginBottom: 5}}
                            onClick={handleChange('addVirus')}
                        >
                            Добавить вирусы на схему
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{marginBottom: 5}}
                            onClick={handleChange('addSecuritySw')}
                        >
                            Добавить СЗИ на схему
                        </Button>
                        <br/>

                        <Button
                            fullWidth
                            variant="contained"
                            style={{marginBottom: 5}}
                            color="secondary"
                            onClick={handleChange('elements')}
                        >Назад</Button>
                    </Box>
        );
    }
}

export default AddElementComponent;