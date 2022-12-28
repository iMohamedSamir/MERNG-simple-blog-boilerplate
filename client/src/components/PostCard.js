import React from 'react';
import { Link } from 'react-router-dom'
import { Item, Image, Button } from 'semantic-ui-react';
import moment from 'moment'

function PostCard({ post }) {
  const { title, body, username, createdAt, id } = post;
  const regex = /(<([^>]+)>)/ig;
  const trimmedBody = body.replace(regex, '').replace(/&nbsp;/g, '');
  function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) : str;
  };
  const truncated = truncate(trimmedBody, 120)
  // console.log()
  return (
    <Item>
      <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
      <Item.Content>
        <Item.Header as={Link} to={`/posts/${id}`}>{title}</Item.Header>
        <Item.Meta>Posted by: {username}, {moment(createdAt).fromNow()}</Item.Meta>
        <Item.Meta></Item.Meta>
        <Item.Description>
          {truncated}&hellip;
        </Item.Description>
        <Item.Extra></Item.Extra>
      </Item.Content>
    </Item>

  );
}

export default PostCard;