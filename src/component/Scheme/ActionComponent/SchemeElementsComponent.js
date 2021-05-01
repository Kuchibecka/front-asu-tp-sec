import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

export class SchemeElementsComponent extends React.Component {
    state = {
        prevStep: '',
    }

    componentDidMount() {
        console.log(this.props.prevStep)
        this.setState({prevStep: this.props.prevStep})
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep(this.state.prev);
    };

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
                            id={'addElement'}
                            onClick={handleChange('step')}
                        >
                            Добавить элементы на схему
                        </Button>
                        <Button
                            id={'editElement'}
                            onClick={handleChange('step')}
                        >
                            Редактировать элементы схемы
                        </Button>
                        <Button
                            id={'deleteElement'}
                            onClick={handleChange('step')}
                        >
                            Удалить элементы со схемы {/*todo: Каскадно удалить связи с другими объектами*/}
                        </Button>
                        <br/>

                        <Button
                            color="secondary"
                            variant="contained"
                            id={'initial'}
                            onClick={handleChange('step')}
                        >Назад</Button>
                    </Dialog>
        );
    }
}

export default SchemeElementsComponent;