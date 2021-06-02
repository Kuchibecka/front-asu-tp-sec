import React from 'react';
import Button from '@material-ui/core/Button';
import {Box} from "@material-ui/core";

export default class SchemeElementsComponent extends React.Component {

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
                            onClick={handleChange('addElement')}
                        >
                            Добавить элементы на схему
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{marginBottom: 5}}
                            onClick={handleChange('editElement')}
                        >
                            Редактировать элементы схемы
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{marginBottom: 5}}
                            onClick={handleChange('deleteElement')}
                        >
                            Удалить элементы со схемы {/*todo: Каскадно удалить связи с другими объектами*/}
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
