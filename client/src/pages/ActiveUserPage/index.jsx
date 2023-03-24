import { Spinner } from '@chakra-ui/spinner';
import { Center, Text, Box } from '@chakra-ui/layout';

import { chakra, useColorModeValue} from '@chakra-ui/react';

import { Navbar } from '../../components/Navbar';
import { WithFooter } from '../../components/Footer';
import { ResourceContainer } from '../../components/ResourceContainer';

import { FilterType } from '../../constants/commonVariable';
import { userApi } from '../../services';
import { useQuery } from 'react-query';

export const ActiveUserPage = () => {
  const {
    isLoading, error, data, isFetching 
  } = useQuery('activeUser', userApi.getProfessionalUsers);


  return (
    <WithFooter>
      <Navbar />

      <Center pt={4}>
        <chakra.h1
              fontSize="4xl"
              fontWeight="bold"
              mt={2}
              color={useColorModeValue('black', 'white')}
            >
            See what other people like
        </chakra.h1>
      </Center>
      
      <center pt={4}>
        <chakra.h2> 
        Unsure which resources to use? Here is a list of favorite resources from different top researchers in your community. (want to be included in this list or see someone we missed? Please email caesar@illinois.edu)
        </chakra.h2>
      </center>

      <Box mt="4%">
      {!isLoading ? (
          <ResourceContainer resources={data} type={FilterType.SHOW_PROFESSIONALS} />
        ) : (
          <Center>
            <Spinner />
          </Center>
        )}

      </Box>
    </WithFooter>
  );
};
