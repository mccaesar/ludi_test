import React from 'react';
import { useSelector } from 'react-redux';

import { Grid, CircularProgress } from '@material-ui/core';

import ResourceCard from './ResourceCard/ResourceCard';
import useStyles from './styles';

const ResourceContainer = ({ setCurrentId }) => {
  const { loading, resources } = useSelector((state) => state.resourceList);
  const classes = useStyles();

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {resources.map((resource) => (
            <Grid key={resource._id} item xs={12} sm={6} md={6}>
              <ResourceCard resource={resource} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ResourceContainer;
