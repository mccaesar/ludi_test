import ClickableTag from './ClickableTag';
import Grid from '@material-ui/core/Grid';
import LaunchIcon from '@material-ui/icons/Launch';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import './Overview.css';
import BookmarkIcon from '@material-ui/icons/Bookmark';

// check if a string is a valid Http Url
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

export default function Overview(props) {
  var download;
  if (isValidHttpUrl(props.download)) {
    download = (
      <h6>
        <a href={props.download}>
          download <LaunchIcon style={{ fontSize: 15 }} />
        </a>
      </h6>
    );
  } else {
    download = null;
  }

  var author;
  if (props.author === '') {
    author = null;
  } else if (isValidHttpUrl(props.author)) {
    author = (
      <h6>
        <a href={props.author}>author</a>
      </h6>
    );
  } else {
    author = <h6>{props.author}</h6>;
  }

  var tags;
  var display;
  if (props.tags === '') {
    tags = null;
    display = null;
  } else {
    tags = props.tags;
    tags = tags.split(', ');
    display = tags.map((tag) => <ClickableTag tag={tag} />);
  }

  return (
    <div>
      <Paper id="parent" variant="outlined">
        <Grid container justify="center">
          <Grid id="item" item xs={12} sm={6}>
            <h3>{props.title}</h3>
            {display}
          </Grid>
          <Grid id="item" item xs={8} sm={4}>
            <h6>
              <a href={props.website}>
                website <LaunchIcon style={{ fontSize: 15 }} />
              </a>
            </h6>
            {author}
            {download}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
