import React, {Component} from 'react';
import CommentsList from './CommentsList';

class CommentsContainer extends Component {
    state = {
        isCommentsOpen: false
    };

    render() {
        const {comments} = this.props;
        return (
            <div>
                <h6 className='card-subtitle text-muted'>Number of comments: {comments.length}</h6>
                <button onClick={this.toggleComments}>
                    {this.state.isCommentsOpen ? 'Close comment' : 'Show comment'}
                </button>
                {this.getCommentsList()}
            </div>
        );
    }

    getCommentsList() {
        if (!this.state.isCommentsOpen) return null;
        const {comments} = this.props;
        return (
            <CommentsList comments={comments}/>
        );
    }

    toggleComments = () => {
        this.setState({
                isCommentsOpen: !this.state.isCommentsOpen
            });
    }
}

export default CommentsContainer;