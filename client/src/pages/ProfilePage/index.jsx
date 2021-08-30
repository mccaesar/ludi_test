import { Box, Text, Center } from '@chakra-ui/react';

import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { ResourceContainer } from '../../components/ResourceContainer';

import { useResources } from '../../hooks/useResources';
import { useUser } from '../../hooks/useUser';

export const ProfilePage = () => {
  const { resources } = useResources();
  const { user } = useUser();

  // const savedResources = resources.find((resource) =>
  //   savedResourceIds.includes(resource._id)
  // );

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
          {/* <ResourceContainer resources={savedResources} /> */}
        </>
      ) : (
        <Center py={10}>
          <Text fontSize="2xl"> Log in to view saved resources </Text>
        </Center>
      )}
    </WithFooter>
  );
};
