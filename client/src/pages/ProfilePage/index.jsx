import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';

import { fetchSavedResources } from '../../actions/resource.action';

import { WithFooter } from '../../components/Footer';
import { NavBar } from '../../components/NavBar';
import { ResourceContainer } from '../../components/ResourceContainer';
import { fetchUser } from '../../actions/user.action';

export const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchSavedResources());
  }, [dispatch]);

  const { user } = useSelector((state) => state.users);
  const { savedResources } = useSelector((state) => state.resources);

  return (
    <WithFooter>
      {user ? (
        <>
          <NavBar />
          
          {/* User Info */}
          <Heading pt={10} pb={2} mx="auto" fontSize="2xl"> User: </Heading>
          <Stack
            pb={5}
            justifyContent="center"
            mx="auto"
          >
            <Text fontSize="lg">{' '}Name: {user.firstName + ' ' + user.lastName}{' '}
            </Text>
            <Text fontSize="lg"> Email: {user.email} </Text>
          </Stack>

          {/* Saved Resources */}
          <Heading py={5} mx="auto" fontSize="2xl"> Saved Resources:</Heading>
          <ResourceContainer resources={savedResources} />
        </>
      ) : (
        <>
          <NavBar />
          <Text py={10} mx="auto" fontSize="2xl"> Log in to view saved resources </Text>
        </>
      )}
    </WithFooter>
  );
};
