import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';

import { Text, Center } from '@chakra-ui/react';

export const AboutPage = () => {
  return (
    <WithFooter>
      <Navbar />

      <Center py={10}>
        <Text fontSize="2xl"> About LUDI </Text>
      </Center>
    </WithFooter>
  );
};
