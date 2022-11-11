import { useEffect, useState } from 'react';
import { Heading, Text, Stack } from '@chakra-ui/react';

import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { ResourceContainer } from '../../components/ResourceContainer';

import { useResources } from '../../hooks/useResources';
import { useUser } from '../../hooks/useUser';

import { FilterType } from '../../constants/commonVariable';

export const ProfilePage = () => {
  const { resources } = useResources();
  const { user, savedResources, upvotedResources } = useUser();

  const [profileSavedResources, setProfileSavedResources] = useState([]);
  const [profileUpvotedResources, setProfileUpvotedResources] = useState([]);

  useEffect(() => {
    if (resources && savedResources) {
      const temp = resources.filter((resource) =>
        savedResources.includes(String(resource._id))
      );
      setProfileSavedResources(temp);
    }
  }, [resources, savedResources]);

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
      {user ? (
        <>
          {/* User Info */}
          <Heading pt={10} pb={2} mx="auto" fontSize="2xl" textAlign="center">
            {' '}
            User:{' '}
          </Heading>
          <Stack pb={5} justifyContent="center" mx="auto">
            <Text fontSize="lg" textAlign="center">
              {' '}
              Name: {user.firstName + ' ' + user.lastName}{' '}
            </Text>
            <Text fontSize="lg" textAlign="center">
              {' '}
              Screen Name: {user.screenName}{' '}
            </Text>
            <Text fontSize="lg" textAlign="center">
              {' '}
              Email: {user.email}{' '}
            </Text>
          </Stack>

          {/* Saved Resources */}
          <Heading py={5} mx="auto" fontSize="2xl" textAlign="center">
            {' '}
            Saved Resources:
          </Heading>
          {profileSavedResources ? (
            <ResourceContainer resources={profileSavedResources} type={FilterType.SHOW_RESOURCES} />
          ) : null}

          {/* Liked Resources */}
          <Heading py={5} mx="auto" fontSize="2xl" textAlign="center">
            {' '}
            Liked Resources:
          </Heading>
          {profileUpvotedResources ? (
            <ResourceContainer resources={profileUpvotedResources} type={FilterType.SHOW_RESOURCES} />
          ) : null}
        </>
      ) : (
        <div style={{display: "flex"}}>
          <Text py={10} mx="auto" fontSize="2xl">
            {' '}
            Log in to view your profile.{' '}
          </Text>
        </div>
      )}
    </WithFooter>
  );
};
