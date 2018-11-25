import React, {Component} from 'react';
import './style.css';

export default class SendMessage extends Component {
    state = {
        message: ''
    };

    handleMessageChange = (event) => {
    this.setState({
        message: event.target.value
    });

    };

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.message.empty) {
            return;
        }
        await fetch('http://localhost/shpp/ps5_ajax/public/api/index.php',
            {
                method: 'POST',
                credentials: 'include',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
                body: `message=${this.state.message}`
            });
    };

    render() {
        return (
            <div id="sendContainer">
                <form id="sendForm">
                    <input onChange={this.handleMessageChange} title="Message" type="text" id="message"/>
                    <input readOnly onClick={this.handleSubmit} className="form__button" type="Submit" id="sendMessage" value="Send"/>
                </form>
            </div>
        );
    }
}