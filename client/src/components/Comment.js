import moment from 'moment';
import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

function CommentComponent(props) {
    const { comment: postComment } = props
    return (
        postComment ? (
            <Comment.Group>
                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>{postComment.username}</Comment.Author>
                        <Comment.Metadata>
                            <div>{moment(postComment.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>{postComment.body}</p>
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                    {postComment.reply && (
                        <Comment.Group>
                            <Comment>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                                <Comment.Content>
                                    <Comment.Author as='a'>Jenny Hess</Comment.Author>
                                    <Comment.Metadata>
                                        <div>Just now</div>
                                    </Comment.Metadata>
                                    <Comment.Text>Elliot you are always so right :)</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>
                    )}
                </Comment>
            </Comment.Group>
        ) : (
            <h3>no Comments</h3>
        )
    )
}

export default CommentComponent;