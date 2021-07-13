import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import { searchResources } from './actions/resource.action';

import ResourceContainer from './components/ResourceContainer/ResourceContainer';
import SearchBar from './components/SearchBar/SearchBar';

import useStyles from './styles';

const App = () => {
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();
  const { resources } = useSelector((state) => state.resourceList.resources);

  const classes = useStyles();

  useEffect(() => {
    dispatch(searchResources());
  }, [dispatch]);

  const searchUpdate = (searchValue) => {
    dispatch(searchResources(searchValue));
  };

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Resources
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <SearchBar search={searchUpdate} />
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <ResourceContainer
                resources={resources}
                setCurrentId={setCurrentId}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
