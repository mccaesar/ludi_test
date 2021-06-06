import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core/';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

// import { saveResource } from '../../../actions/resource.action';
import useStyles from './styles';

const ResourceCard = ({ resource, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          resource.selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        title={resource.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{resource.creator}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size="small"
          onClick={() => setCurrentId(resource._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      {/* <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {resource.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div> */}
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {resource.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {resource.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          // onClick={() => dispatch(saveResource(resource._id))}
        >
          <FavoriteBorderIcon fontSize="small" /> Save{' '}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ResourceCard;
