import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Text, Center, useColorModeValue } from '@chakra-ui/react';

import { useEffectOnce } from '../../hooks/useEffectOnce';
import { fetchSavedResources } from '../../actions/resource.action';
import { Footer } from '../../components/Footer';
import { NavBar } from '../../components/NavBar';
import { ResourceContainer } from '../../components/ResourceContainer';
import { getUser, isLoggedIn } from '../../services';

export const ProfilePage = () => {
  const dispatch = useDispatch();

  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    dispatch(fetchSavedResources());
  }, [dispatch]);

  useEffectOnce(() => {
    getUser().then((user) => {
      setUserFullName(user.firstName + ' ' + user.lastName);
      setUserEmail(user.email);
    });
  });

  const { savedResources } = useSelector((state) => state.resources);

  return (
    <>
      <NavBar />
      <Box p={10} justifyContent="center">
        <Text fontSize="lg"> Name: {userFullName} </Text>
        <Text fontSize="lg"> Email: {userEmail} </Text>
      </Box>

      <Center py={5}>
        <Text fontSize="2xl"> Saved Resources:</Text>
      </Center>
      <ResourceContainer resources={savedResources} />
      <Footer />
    </>
  );
};
