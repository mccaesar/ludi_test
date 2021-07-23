import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Center } from '@chakra-ui/react';

import { fetchSavedResources } from '../../actions/resource.action';

import { Footer } from '../../components/Footer';
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
    <>
    { user ? 
      <>
        <NavBar />
        <Box p={10} justifyContent="center">
          <Text fontSize="lg">
            {' '}
            Name: {user.firstName + ' ' + user.lastName}{' '}
          </Text>
          <Text fontSize="lg"> Email: {user.email} </Text>
        </Box>

        <Center py={5}>
          <Text fontSize="2xl"> Saved Resources:</Text>
        </Center>
        <ResourceContainer resources={savedResources} />
        <Footer />
      </>
      :
      null
    }

    </>
  );
};
