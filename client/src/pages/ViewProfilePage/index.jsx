import { useEffect, useState } from 'react';
import { Heading, Text, Stack } from '@chakra-ui/react';

import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { ResourceContainer } from '../../components/ResourceContainer';

import { Spinner } from '@chakra-ui/spinner';
import { Center, Box } from '@chakra-ui/layout';

import { useResources } from '../../hooks/useResources';
import { useUserById } from '../../hooks/useUserById';
import { userApi } from '../../services';
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';

import { FilterType } from '../../constants/commonVariable';

export const ViewProfilePage = () => {
  let param = useParams();
  //const {isLoading, error, data, isFetching } = useQuery('userbyId', () =>userApi.getUserById(param.id));
  const { resources } = useResources();
  const { user, upvotedResources, isLoading } = useUserById(param.id);
  const [profileUpvotedResources, setProfileUpvotedResources] = useState([]);

  useEffect(() => {
    if (resources && upvotedResources) {
      const temp = resources.filter((resource) =>
        upvotedResources.includes(String(resource._id))
      );
      setProfileUpvotedResources(temp);
    }
  }, [resources, upvotedResources]);

  return (
    <WithFooter>
      <Navbar />
      {
        <>
         {/* User Info */}
         <Heading pt={10} pb={2} mx="auto" fontSize="2xl" textAlign="center">
            {' '}
            User:{' '}
          </Heading>

          {!isLoading ? (
            <>
              <Stack pb={5} justifyContent="center" mx="auto">
              <Text fontSize="lg" textAlign="center">
                {' '}
                Name: {user.firstName + ' ' + user.lastName}{' '}
              </Text>
              <Text fontSize="lg" textAlign="center">
                {' '}
                Email: {user.email}{' '}
              </Text>
            </Stack>
  
            {/* Liked Resources */}
            <Heading py={5} mx="auto" fontSize="2xl" textAlign="center">
              {' '}
              Liked Resources:
            </Heading>
  
            {profileUpvotedResources ? (
              <ResourceContainer resources={profileUpvotedResources} type={FilterType.SHOW_RESOURCES}/>
            ) : null }

          </>
        ) : (
          <Center>
            <Spinner />
          </Center>
        )}
        </>
      }

    </WithFooter>
  );
};
