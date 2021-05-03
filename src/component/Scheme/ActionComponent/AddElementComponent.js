import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

export class AddElementComponent extends React.Component {

    render() {
        const {handleChange} = this.props;
        return (
                    <Dialog
                        open
                        fullWidth
                        maxWidth='sm'
                    >
                        <h3 style={{borderBottomStyle: "solid"}} className={"text-center"}>Выберите действие</h3>
                        <Button
                            onClick={handleChange('addObject')}
                        >
                            Добавить объекты на схему
                        </Button>
                        <Button
                            onClick={handleChange('addVirus')}
                        >
                            Добавить вирусы на схему
                        </Button>
                        <Button
                            onClick={handleChange('addSecuritySw')}
                        >
                            Добавить СЗИ на схему
                        </Button>
                        <br/>

                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleChange('elements')}
                        >Назад</Button>
                    </Dialog>
        );
    }
}

export default AddElementComponent;