import React from 'react';
import { useSelector } from 'react-redux';

import { Grid, CircularProgress } from '@material-ui/core';

import ResourceCard from './ResourceCard/ResourceCard';
import useStyles from './styles';

const ResourceContainer = ({ setCurrentId }) => {
  const resources = useSelector((state) => state.resources.resources);
  const loading = useSelector((state) => state.loading);
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
          {console.log("Resources: ", loading)}
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
