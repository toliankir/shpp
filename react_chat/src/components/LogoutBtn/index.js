import React, {Component} from 'react'
import './style.css';


export default class LogoutBtn extends Component {
    logout = async () => {
        const {setChatState} = this.props;
        const responseData = await fetch('http://localhost/shpp/ps5_ajax/public/api/index.php?logout', {
            method: 'POST',
            credentials: 'include'
        });

        const json = await responseData.json();
        if (json.statusCode === 401) {
            setChatState(false);
        }
    };

    render() {
        return (
            <form id="chatLogout">
                <input className="form__button-light" onClick={this.logout} title="Logout" type="button"
                       value="Logout"/>
            </form>
        );
    }
}