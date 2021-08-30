// import { useHistory } from 'react-router-dom';
import { Center, Text, SimpleGrid, Box } from '@chakra-ui/react';
import { Logo } from './Logo';
import { CannedSearch } from './CannedSearch';

import { Navbar } from '../../components/Navbar';
import { WithFooter } from '../../components/Footer';
import { SearchBar } from '../../components/SearchBar';

export const HomePage = () => {
  const cannedSearch1 = 'Find newest added resources in the Python category';
  const cannedParams1 = new URLSearchParams();
  cannedParams1.set('q', 'python');
  cannedParams1.set('field', 'category');
  cannedParams1.set('sort', 'new');
  cannedParams1.append('tag', 'Python');

  const cannedSearch2 = 'Find Network Simulator resources';
  const cannedParams2 = new URLSearchParams();
  cannedParams2.set('q', 'Network Simulator');
  cannedParams2.set('field', 'category');

  const cannedSearch3 =
    'Find resources with "collaborative" in their description';
  const cannedParams3 = new URLSearchParams();
  cannedParams3.set('q', 'collaborative');
  cannedParams3.set('field', 'description');

  return (
    <WithFooter>
      <Navbar />

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
          <CannedSearch searchParams={cannedParams3} text={cannedSearch3} />
          <CannedSearch searchParams={cannedParams2} text={cannedSearch2} />
          <CannedSearch searchParams={cannedParams1} text={cannedSearch1} />
        </SimpleGrid>
      </Center>
    </WithFooter>
  );
};
