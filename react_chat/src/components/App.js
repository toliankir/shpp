import React, {Component} from 'react';
import './style.css';
import Topper from './Topper';
import Login from './Login';
import Header from './Header';
import LogoutBtn from './LogoutBtn';
import ChatBody from './ChatBody';

class App extends Component {

    state = {
        userState: false
    };

    async componentDidMount() {
        await this.getDataForLogin();
    }

    setUserState = (userState) => {
        this.setState({
            userState: userState
        });
    };

    render() {
        return (
            <div>
                <Topper/>
                {this.state.userState ? <LogoutBtn/> : ''}
                <Header/>
                <main>
                    {this.state.userState ? <ChatBody setUserState={this.setUserState} /> : <Login setUserState={this.setUserState}/>}
                </main>
            </div>
        );
    }


    async getDataForLogin() {
        const responseData = await fetch('http://127.0.0.1/shpp/ps5_ajax/public/api/?id=0', {

        });
        console.log(responseData);
        const json = await  responseData.json();
        let userState = false;
        if (json.statusCode === 200) {
            userState = true;
        }
        console.log(json);
        this.setState({
            userState: userState
        });

    }
}

export default App;