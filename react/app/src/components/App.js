import React, {Component} from 'react';
import ArticleList from './ArticleList';
import {articles} from '../fixtures';
import RegistrationForm from './RegistrationForm';
import JsonGet from './JsonGet';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    state = {
        reverted: false
    };
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">App name</h1>
                    <button onClick={this.revert}>Revert</button>
                    <RegistrationForm />
                    <JsonGet/>
                </div>
                <ArticleList articles={this.state.reverted ? articles.slice().reverse() : articles}/>
            </div>
        );
    }

    revert = () => {
        this.setState({
            reverted: !this.state.reverted
        });
    }
}


export default App