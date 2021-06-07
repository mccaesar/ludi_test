import React from 'react';
import { useDispatch } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

// import { saveResource } from '../../../actions/resource.action';
import useStyles from './styles';

const ResourceCard = ({ resource, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const defaultImgUrl = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={resource.selectedFile || defaultImgUrl}
          title={resource.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {resource.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {resource.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

      {/* <CardMedia
        className={classes.media}
        image={
          resource.selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        title={resource.title}
      />
      <div className={classes.overlay1}>
        <Typography variant="h6">{resource.creator}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: 'white' }}
          size="small"
        // onClick={() => setCurrentId(resource._id)}
        >
          <FavoriteBorderIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.overlay3}>
        <Button
          style={{ color: 'white' }}
          size="small"
        onClick={() => setCurrentId(resource._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {resource.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
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
      </CardActions>*/}
    </Card>
  );
};

export default ResourceCard;
