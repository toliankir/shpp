import React, {Component} from 'react';
import './style.css';

export default class ChatBody extends Component {
    state = {
        messages: [],
        lastId: -1
    };

    render() {
        return (
            <div id="chatContainer">
                <div id="chatData">
                    <ul id="chatDataList">
                        {this.showMessages(this.state.messages)}
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getMessages();
        setInterval(() => {
            this.getMessages();
        }, 2000);
    }

    showMessages(messages) {
        return messages.map((el, index) => {
            const message = el.message
                .replace(/:\)/g, '<img class="image-smile" src="img/smile1.png">')
                .replace(/:\(/g, '<img class="image-smile" src="img/smile2.png">');

            return (<li key={index}>
                {this.timestampToDate(el.timestamp)}&nbsp;
                <span className="chat-bold">{el.user}</span>:
                {message} </li>);
        });
    }

    timestampToDate(timestamp) {
        const date = new Date(timestamp * 1000);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    }

    async getMessages() {
        const responseData = await fetch(`http://localhost/shpp/ps5_ajax/public/api/?id=${this.state.lastId}`, {
            method: 'GET',
            credentials: 'include'
        });
        const json = await  responseData.json();


        if (json.body.length !== 0) {
            this.setState({
                lastId: json.body[json.body.length - 1].id
            });

            this.setState({
                messages: this.state.messages.concat(json.body)
            });
        }


    }
}