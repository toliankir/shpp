import React, {Component} from 'react';
import './style.css';

class Login extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        jsonData: '123',
        username: '',
        password: ''
    };

    changeUserState(state) {
        const {setUserState} = this.props;
        setUserState(state);
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });

    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const responseData = await fetch('http://127.0.0.1/shpp/ps5_ajax/public/api/index.php',
            {
                method: 'POST',
                credentials: 'same-origin',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
                body: `user=${this.state.username}&password=${this.state.password}`
            });
        const jsonData = await responseData.json();
        if (jsonData.statusCode === 202) {
            this.changeUserState(true);
        }
        console.log(jsonData);
    };

    render() {
        return (
            <div id='loginContainer'>
                <form action='#' onSubmit={this.handleSubmit} id='loginForm'>
                    <div className='loginForm-section'>
                        <label htmlFor='userName'>Enter your name</label>
                        <input type='text' onChange={this.handleUsernameChange} id='userName'/>
                    </div>
                    <div className='loginForm-section'>
                        <label htmlFor='userPassword'>Enter your password</label>
                        <input type='password' onChange={this.handlePasswordChange} id='userPassword'/>
                    </div>
                    <div className='loginForm-section'>
                        <span id='errorResponse'/>
                        <div id='visualEffect'>
                            <input className='form__button' type='Submit' value='Submit'/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;