import React from 'react';
import Comment from './Comment';

export default function CommentsList({comments}) {
    const allComments = comments.map((comment) => {
        return (
            <Comment key={comment.id} comment={comment}/>
        );
    });

    return (
        <div>
            <ul>
                {allComments}
            </ul>
        </div>
    );
}
