import React, {Component} from 'react';
import Article from '../Article';
import './style.css'

export default class ArticleList extends Component {
    state = {
        openArticleId: null
    };

    render() {
        const {articles} = this.props;

        const articleElements = articles.map((article) => {
                return (
                    <li key={article.id} className='article-list__li'>
                        <Article article={article}
                                 onButtonClick = {this.openArticleById.bind(this, article.id)}
                                 isOpen={this.state.openArticleId === article.id}/>
                    </li>
                );
            }
        );

        return (
            <ul>
                {articleElements}
            </ul>
        );
    }

    openArticleById = (id) => {
        this.setState({
            openArticleId: this.state.openArticleId === id ? null : id
        });
    }
}


