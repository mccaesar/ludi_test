// import { useHistory } from 'react-router-dom';
import { Center, Text, SimpleGrid, Box } from '@chakra-ui/react';
import { Logo } from './Logo';
import { CannedSearch } from './CannedSearch';
import { CannedProfilePage } from './CannedProfilePage';

import { NavBar } from '../../components/NavBar';
import { WithFooter } from '../../components/Footer';
import { SearchBar } from '../../components/SearchBar';

export const HomePage = () => {
  //example params to use:
    //cannedParams1.set('q', 'python');
    //cannedParams1.set('field', 'category');
    //cannedParams1.set('sort', 'new');
    //cannedParams1.append('tag', 'Python');

  //"Find a good book on wireless protocols" --> tag:readings AND tag:wireless
  const cannedSearch1 = 'Find a good book on wireless protocols';
  const cannedParams1 = new URLSearchParams();
  cannedParams1.set('field', '');
  cannedParams1.append('tag', 'readings');
  cannedParams1.append('tag', 'wireless');

  //"Play with a real network" --> "GNS3"
  const cannedSearch2 = 'Play with a real network';
  const cannedParams2 = new URLSearchParams();
  cannedParams2.set('q', 'GNS3');
  cannedParams2.set('field', 'title');

  // "Meet other people who love networking" --> Category:"Professional Societies"
  const cannedSearch3 = 'Meet other people who love networking';
  const cannedParams3 = new URLSearchParams();
  cannedParams3.set('q', 'Professional Societies');
  cannedParams3.set('field', 'category');

  //"Help my students break the ice" --> should search for category:"Interaction Platforms" OR tag:social (can you handle ORs?)
  const cannedSearch4 = 'Help my students break the ice';
  const cannedParams4 = new URLSearchParams();
  cannedParams4.set('field', '');
  cannedParams4.append('tag', 'interaction platforms');
  cannedParams4.append('tag', 'social');


  return (
    <WithFooter>
      <NavBar />

      {/* LUDI logo */}
      <Center pt={20}>
        <Logo />
      </Center>

      {/* Tagline */}
      <Center pt={4}>
        <Text fontSize="md" as="i">
          Search hundreds of resources for teaching and learning computer
          science
        </Text>
      </Center>

      {/* SearchBar */}
      <SearchBar />
      <Box p={10}></Box>

      {/* Canned Search Options */}
      <Center pt={10}>
        <Text fontSize="lg">I want to...</Text>
      </Center>

      <Center pt={5}>
        <SimpleGrid w="80%" columns={{ base: 1, lg: 2 }} spacing="8">
          <CannedSearch searchParams={cannedParams1} text={cannedSearch1} />
          <CannedSearch searchParams={cannedParams2} text={cannedSearch2} />
          <CannedSearch searchParams={cannedParams3} text={cannedSearch3} />
          <CannedProfilePage/>
        </SimpleGrid>
      </Center>
    </WithFooter>
  );
};
