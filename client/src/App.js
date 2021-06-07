import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import { getResources, searchResources } from './actions/resource.action';

import ResourceContainer from './components/ResourceContainer/ResourceContainer';
import SearchBar from './components/SearchBar/SearchBar';

import useStyles from './styles';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getResources());
  }, [currentId, dispatch]);

  const handleSearch = async (searchValue) => {
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
          <SearchBar search={handleSearch} />
          <ResourceContainer
            setCurrentId={setCurrentId}
          />
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
