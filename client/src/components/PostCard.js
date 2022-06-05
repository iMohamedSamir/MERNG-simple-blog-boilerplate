import React from 'react';
import { Link } from 'react-router-dom'
import { Item, Image, Button } from 'semantic-ui-react';
import moment from 'moment'
function PostCard({ post }) {
  const { title, body, username, createdAt, id } = post;
  return (
    <Item>
      <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as={Link} to={`/posts/${id}`}>{title}</Item.Header>
        <Item.Meta>Posted by: {username}, {moment(createdAt).fromNow()}</Item.Meta>
        <Item.Meta></Item.Meta>
        <Item.Description>
          {body}
        </Item.Description>
        <Item.Extra></Item.Extra>
      </Item.Content>
    </Item>

  );
}

export default PostCard;