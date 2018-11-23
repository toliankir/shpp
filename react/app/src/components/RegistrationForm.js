import React, {Component} from 'react';

class RegistrationForm extends Component {
    state = {
        email: '1'
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('form is submitted. Email is: ', this.state.email);
    };

    handleEmailChange = (event) => {
        console.log('Email was changed', event.target.value);
        this.setState({
            email: event.target.value
        });
    };

    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text'
                       value={this.state.email}
                       onChange={this.handleEmailChange}
                />
            </form>
        );
    };
}

export default RegistrationForm;