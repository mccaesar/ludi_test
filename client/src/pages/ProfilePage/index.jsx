import { Box, Text, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { ResourceContainer } from '../../components/ResourceContainer';

import { useResources } from '../../hooks/useResources';
import { useUser } from '../../hooks/useUser';

export const ProfilePage = () => {
  const { resources } = useResources();
  const { user, savedResources } = useUser();

  const [userResources, setUserResources] = useState([]);

  useEffect(() => {
    if (resources && savedResources) {
      const tempUserResources = resources.filter((resource) =>
        savedResources.some(
          (savedResource) => savedResource.resourceId === resource._id
        )
      );
      console.log(resources, savedResources, tempUserResources);
      setUserResources(tempUserResources);
    }
  }, [resources, savedResources]);

  return (
    <WithFooter>
      <Navbar />
      {user ? (
        <>
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
          {userResources ? (
            <ResourceContainer resources={userResources} />
          ) : null}
        </>
      ) : (
        <Center py={10}>
          <Text fontSize="2xl"> Log in to view saved resources </Text>
        </Center>
      )}
    </WithFooter>
  );
};
