import React, {Component} from 'react'
import './style.css';


export default class LogoutBtn extends Component {

    logout = async () => {
        const responseData = await fetch('http://127.0.0.1/shpp/ps5_ajax/public/api/index.php?logout', {
            credentials: 'same-origin'
        });
        const jsonData = await responseData.json();
        console.log(jsonData);
    };

    render() {
        return (
            <form id="chatLogout">
                <input className="form__button-light" onClick={this.logout} title="Logout" type="button" value="Logout"/>
            </form>
        );
    }
}