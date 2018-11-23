import React from 'react'

export default function Comment({comment}){
        return (
            <li>
                <h5>{comment.user}</h5>
                <section>{comment.text}</section>
            </li>
        );
}
