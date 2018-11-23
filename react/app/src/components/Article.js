import React, {Component} from 'react';
import CommentsContainer from './CommentsContainer'

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    render() {
        const {isOpen, article, onButtonClick} = this.props;
        return (
            <div className='card mx-auto' style={{width: '90%'}}>
                <div className='card-header'>
                    <h2 onClick={this.incrementCounter}>{article.title}
                        <span>{this.state.count}</span>
                        <button onClick={onButtonClick} className='btn btn-primary btn-lg float-right'>
                            {isOpen ? 'Close' : 'Open'}
                        </button>
                    </h2>
                </div>
                {this.getBody()}
            </div>
        );
    }

    incrementCounter = () => {
        this.setState({
            count: this.state.count + 1
        });
    };

    getBody() {
        const {article, isOpen} = this.props;
        if (!isOpen) return null;
        return (
            <div className='card-body'>
                <h6 className='card-subtitle text-muted'>creation date: {(new Date(article.date)).toDateString()}</h6>
                <section className='card-text'>{article.text}</section>
                {this.getCommentContainer(article.comments)}
            </div>
        );
    }

    getCommentContainer(comments) {
        if (!comments) return null;
        return (
            <CommentsContainer comments={comments}/>
        );
    }
}


export default Article;