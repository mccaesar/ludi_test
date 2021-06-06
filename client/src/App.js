import React, { useState, useReducer, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import { getResources } from './actions/resource.action';
import { initialState, reducer } from './reducers/resource.reducer';

import ResourceContainer from './components/ResourceContainer/ResourceContainer';
import SearchBar from './components/SearchBar/SearchBar';

import useStyles from './styles';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, resources } = state;

  const classes = useStyles();

  useEffect(() => {
    dispatch(searchResources());
  }, [dispatch]);

  const searchResources = (searchValue) => {
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
          <SearchBar search={searchResources} />
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <ResourceContainer resources={resources} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
