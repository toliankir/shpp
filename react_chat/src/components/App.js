import React, {Component} from 'react';
import './style.css';
import Topper from './Topper';
import Login from './Login';
import Header from './Header';
import LogoutBtn from './LogoutBtn';
import ChatBody from './ChatBody';
import SendMessage from './SendMessage';

class App extends Component {

    state = {
        userState: false,
    };

    async componentDidMount() {
        await this.getMessages();
    }

    setChatState = (userState) => {
        this.setState({
            userState: userState
        });
    };

    render() {
        return (
            <div>
                <Topper/>
                {this.state.userState ? <LogoutBtn setChatState={this.setChatState}/> : ''}
                <Header/>
                <main>
                    {this.state.userState ? <ChatBody/> :
                    <Login setChatState={this.setChatState}/>}
                </main>
                <footer>
                    {this.state.userState ? <SendMessage/>: '' }
                </footer>
            </div>
        );
    }


    async getMessages() {
        const responseData = await fetch('http://localhost/shpp/ps5_ajax/public/api/?id=-1', {
            method: 'GET',
            credentials: 'include'
        });
        const json = await  responseData.json();
        let userState = false;

        if (json.statusCode === 202) {
            userState = true;
        }
        this.setState({
            userState: userState
        });
    }
}

export default App;