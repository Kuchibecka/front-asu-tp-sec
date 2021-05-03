import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

export class SchemeElementsComponent extends React.Component {

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
                            onClick={handleChange('addElement')}
                        >
                            Добавить элементы на схему
                        </Button>
                        <Button
                            onClick={handleChange('editElement')}
                        >
                            Редактировать элементы схемы
                        </Button>
                        <Button
                            onClick={handleChange('deleteElement')}
                        >
                            Удалить элементы со схемы {/*todo: Каскадно удалить связи с другими объектами*/}
                        </Button>
                        <br/>

                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleChange('initial')}
                        >Назад</Button>
                    </Dialog>
        );
    }
}

export default SchemeElementsComponent;