import { useEffect, useState } from 'react';
import { Heading, Text, Stack } from '@chakra-ui/react';

import { WithFooter } from '../../components/Footer';
import { NavBar } from '../../components/NavBar';
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
    <NavBar />
      {user ? (
        <>
          
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
          {userResources ? (
            <ResourceContainer resources={userResources} />
          ) : null}
        </>
      ) : (
        <>
          <Text py={10} mx="auto" fontSize="2xl"> Log in to view saved resources </Text>
        </>
      )}
    </WithFooter>
  );
};
