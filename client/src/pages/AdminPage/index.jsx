import { useUser } from '../../hooks/useUser';
import {
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Stack,
    Text,
    Box,
    useColorModeValue as mode,
  } from '@chakra-ui/react';
import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { useResources } from '../../hooks/useResources';
 
export const AdminPage = () => {
    const { user } = useUser();
    const { tags } = useResources();
    const tagsCheckbox = tags.map((tag)=> <FormLabel><input type="checkbox" value={tag} /> {tag}</FormLabel>)
    return (
    <WithFooter>
        <Navbar />
        {user && user.role == "ADMIN" ? 
        <Box
          w="full"
          maxW="2xl"
          justifyConten="center"
          mx="auto"
          py={{ base: '10', md: '20' }}
          px={{ base: '4', md: '10' }}>
             <Box
              bg={{ md: mode('gray.200', 'gray.700') }}
              rounded={{ md: '2xl' }}
              p={{ base: '4', md: '12' }}
              borderWidth={{ md: '1px' }}
              borderColor={mode('transparent', 'transparent')}
              shadow={{ md: 'lg' }}
            >
              <form>
                <Stack spacing={4}>
                    <FormLabel mb={1}>Title</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="title"
                        type="text"
                    />

                    <FormLabel mb={1}>Author</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="author"
                        type="text"
                    />

                    <FormLabel mb={1}>URL</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="url"
                        type="text"
                    />

                    <FormLabel mb={1}>Short Description</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="shortDescription"
                        type="text"
                    />

                    <FormLabel mb={1}>Long Description</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="longDescription"
                        type="text"
                    />

                    <FormLabel mb={1}>Tags</FormLabel>
                    {tagsCheckbox}

                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      fontSize="md"
                    >
                      Add resource
                    </Button>
                </Stack>
              </form>
          </Box>
        </Box>
        :
        <Stack justifyContent={'center'} direction={'column'} alignItems={'center'} height={'full'}>
          <Text textAlign='center' verticalAlign={'center'}>Sorry, you are not an admin</Text>
        </Stack>}
    </WithFooter>);
}