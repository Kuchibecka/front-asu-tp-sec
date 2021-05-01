import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

export class ActionListComponent extends React.Component {

    render() {
        const {values, handleChange} = this.props;
        return (
                    <Dialog
                        open
                        fullWidth
                        maxWidth='sm'
                    >
                        <h3 style={{borderBottomStyle: "solid"}} className={"text-center"}>Выберите действие</h3>
                        <Button
                            id={'elements'}
                            onClick={handleChange('step')}
                        >
                            Редактировать элементы
                        </Button>
                        <Button
                            id={"connections"}
                            onClick={handleChange('step')}
                        >
                            Редактировать связи
                        </Button>
                        <Button
                            id={"params"}
                            onClick={handleChange('step')}
                        >
                            Изменить данные схемы
                        </Button>
                        <br/>
                    </Dialog>
        );
    }
}

export default ActionListComponent;