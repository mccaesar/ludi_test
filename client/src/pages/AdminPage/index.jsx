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
    HStack,
  } from '@chakra-ui/react';
import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { useResources } from '../../hooks/useResources';
import { useState } from 'react';
 
export const AdminPage = () => {
    const { user } = useUser();
    const { tags } = useResources();
    const [isHovering, setIsHovering] = useState(false);
    const tagsCheckbox = tags.map((tag)=> <FormLabel><input type="checkbox" key={tag} /> {tag}</FormLabel>)

    const handleMouseOver = () => {
      setIsHovering(true);
    }

    const handleMouseLeave = () => {
        setIsHovering(false);
    }

    const hoverText = () => {
        return (
            <Box textAlign="center" 
                bg={{ md: mode('white', 'gray.500') }} 
                width="fit-content"
                paddingLeft={2}
                paddingRight={2}
                ml={3}>
                <Text>select if description is in written HTML</Text>
            </Box>
        );
    }
    return (
    <WithFooter>
        <Navbar />
        {user && user.role == "ADMIN" ? 
        <Box
          w="full"
          maxW="2xl"
          justifyContent="center"
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
                    <HStack spacing={2}>
                      <FormLabel mb={1} marginBottom={0}
                                onMouseOver={handleMouseOver}
                                onMouseLeave={handleMouseLeave}
                                spacing={2}
                      > 
                          Render HTML 
                          
                      </FormLabel>
                      <input type="checkbox"/> 
                      {isHovering ? hoverText() : <Text whiteSpace="pre-line">{"\n"}</Text>}
                    </HStack>

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