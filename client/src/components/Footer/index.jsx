import {
  Box,
  Flex,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Input,
  Button,
  IconButton,
  Switch,
  useColorModeValue,
  useColorMode
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';

import { Logo } from './Logo';
import { ListHeader } from './ListHeader';
import { SocialButton } from './SocialButton';


export const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex h="full" direction="column" position="relative" flexGrow>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        w="full"
        position="fixed"
        bottom="0"
        // as="footer"
      >
        <Container as={Stack} maxW={'7xl'} py={10}>
          <SimpleGrid
            templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
            spacing={8}
          >
            <Stack spacing={6}>
              <Box>
                <Logo color={useColorModeValue('black', 'white')} />
              </Box>
              <Text fontSize={'sm'}>
                © 2021 Project Ludi. All rights reserved
              </Text>
              <Stack direction={'row'} spacing={6}>
                <SocialButton label={'Twitter'} href={'#'}>
                  <FaTwitter />
                </SocialButton>
                <SocialButton label={'YouTube'} href={'#'}>
                  <FaYoutube />
                </SocialButton>
                <SocialButton label={'Instagram'} href={'#'}>
                  <FaInstagram />
                </SocialButton>
              </Stack>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Project Ludi</ListHeader>
              <Link href={'#'}>About Us</Link>
              <Link href={'#'}>What We Offer</Link>
              <Link href={'#'}>Contact Us</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>More</ListHeader>
              <Link href={'#'}>Support Us</Link>
              <Link href={'#'}>Privacy Policy</Link>
              <Link href={'#'}>Terms of Service</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Stay up to date</ListHeader>
              <Stack direction={'row'}>
                <Input
                  placeholder={'Your email address'}
                  bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                  border={0}
                  _focus={{
                    bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
                  }}
     
                />
                <IconButton
                  bg={useColorModeValue('gray.400', 'gray.800')}
                  color={useColorModeValue('gray.800', 'white.800')}
                  isRound={false}
                  _hover={{
                    bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.300'),
                  }}
                  aria-label="Subscribe"
                  icon={<BiMailSend />}
                />
              </Stack>
              <Switch onChange={toggleColorMode} colorScheme="gray" size="lg" defaultChecked/>
                  {/* Toggle {colorMode === "light" ? "Dark" : "Light"} */}
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </Flex>
  );
};
