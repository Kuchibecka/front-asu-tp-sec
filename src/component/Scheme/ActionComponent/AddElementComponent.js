import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import ObjectService from "../../../service/ObjectService";

export class AddElementComponent extends React.Component {
    state = {
        button: false,
        objects: [],
    }

    componentDidMount() {
        console.log(this.props.prevStep)
        this.setState({objects: ObjectService.getAll()})
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
                            id={'elements'}
                            onClick={handleChange('step')}
                        >
                            Добавить элементы на схему
                        </Button>
                        <br/>

                        <Button
                            color="secondary"
                            variant="contained"
                            id={'elements'}
                            onClick={handleChange('step')}
                        >Назад</Button>
                    </Dialog>
        );
    }
}

export default AddElementComponent;