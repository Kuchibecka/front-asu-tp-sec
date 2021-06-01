import React, {Component} from 'react';

export default class FooterComponent extends Component {
    render() {
        return (
            <div>
                <footer className="footer">
                    <span style={{marginLeft: 10}} className="text-muted">
                        All rights reserved 2021.
                            Contacts:
                            <a href="https://telegram.me/kuchibecka" style={{marginLeft: 10}}>
                                Telegram
                            </a>
                            <a href="mailto:kuchibecka@icloud.com" style={{marginLeft: 10}}>
                                E-mail
                            </a>
                    </span>

                </footer>
            </div>
        );
    }
}
