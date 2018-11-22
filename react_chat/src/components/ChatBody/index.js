import React, {Component} from 'react';
import './style.css';

export default class ChatBody extends Component {
    render() {
        return (
            <div id="chatContainer">
                <div id="chatData">
                    <ul id="chatDataList">
                    </ul>
                </div>
            </div>
        );
    }
}