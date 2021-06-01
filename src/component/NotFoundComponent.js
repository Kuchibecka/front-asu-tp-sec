import React, {Component} from 'react';

export default class NotFoundComponent extends Component {
    constructor(props) {
        super(props);
    }

    redirect() {
        setTimeout(() => window.location.assign('/'), 2300);
    }

    render() {
        return (
            <div>
                <h3 style={{color: "darkred"}}>
                    Запрашиваемой страницы не существует. Вы будете перенаправлены на домашнюю страницу...
                </h3>
                <div>
                    {this.redirect()}
                </div>
            </div>
        );
    }
}
