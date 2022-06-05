import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Image, Item, Header } from 'semantic-ui-react';
import AddComment from '../components/AddComment';
import CommentComponent from '../components/Comment';
import { AuthContext } from '../context/auth';

function SinglePost(props) {
    const postId = props.match.params.postId;
    const user = useContext(AuthContext);

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })
    let postMarkup;
    if (!data) {
        postMarkup = <p>loading...</p>
    } else {
        const { id, title, body, username, createdAt, likes, comments } = data.getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Image src="https://react.semantic-ui.com/images/wireframe/image.png"
                            width="100%" height="300px"
                        />
                        <Card fluid className="no-shadow">
                            <Card.Header><h1>{title}</h1></Card.Header>
                            <Card.Meta>
                                By <Item.Header as={Link} to={`/u/${username}`}>{username}</Item.Header> on {moment(createdAt).fromNow()}, 
                                {comments.length > 0 && (` ${comments.length } comments`)}
                                {likes.length > 0 && (` ${likes.length } Likes`)}
                            </Card.Meta>
                            <Card.Content className="no-padding">
                                {body}
                            </Card.Content>
                        </Card>
                        <Card fluid className="no-shadow">
                            <Header as='h3' dividing>Comments</Header>
                            {comments && comments.map((comment) => (
                                <CommentComponent key={comment.id} comment={comment} />
                            ))}
                        </Card>
                        <Card fluid className="no-shadow">
                            <AddComment postId={postId} user={user} />
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return (
        postMarkup
    );
}

const FETCH_POST_QUERY = gql`

    query($postId: ID!) {
        getPost(postId: $postId) {
            title body username createdAt 
            comments {
                id
                body
                username
                createdAt
            }
            likes {
                id
                username
                createdAt
            }

        }
    }

`

export default SinglePost;