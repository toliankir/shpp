import React, {Component} from 'react';

class CommentsContainer extends Component{

    state = {
    showComments: false
    };

    render(){
        return (
            <button>Show comment</button>
        );
    }
}

export default CommentsContainer;