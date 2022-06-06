import { useUser } from '../../hooks/useUser';
import {
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Textarea,
    Input,
    Stack,
    Text,
    Box,
    useColorModeValue as mode,
    HStack,
  } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { useResources } from '../../hooks/useResources';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API_URI } from '../../config';
import { useParams, useHistory } from 'react-router-dom';

 
export const AdminPage = () => {
    const { user } = useUser();
    const { tags } = useResources();
    const [isHovering, setIsHovering] = useState(false);
    const toast = useToast();
    const history = useHistory();

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

    const {
      handleSubmit,
      register,
      setError,
      formState: { errors, isSubmitting },
    } = useForm({
      mode: 'onBlur'
    });

    const addResource = async (values) => {
      const newResource = { title: values.title, 
                            author: values.author,
                            url: values.url, 
                            description: values.description, 
                            additionalDescription: values.additionalDescription,
                            tags:values.tags};
      console.log(newResource);
      axios.post(`${API_URI}/resource/create`, newResource).
      then(function(res) {
        toast({
          title: 'successfully added resource',
          description: 'redirecting to the home page after 3 seconds',
          status: 'success',
          duration: 3000,
          position: 'bottom-right',
          isClosable: true,
          onCloseComplete: function() { history.push(`/`);
                                        window.location.reload();}
        })
      }).catch(function(error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            toast({
              title: 'an error occured while adding this resource',
              description: error.response.data.message,
              status: 'error',
              duration: 9000,
              position: 'bottom-right',
              isClosable: true,
            })
        } 
      })
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
              <form onSubmit={handleSubmit(addResource)}>
                <Stack spacing={4}>
                    <FormLabel mb={1}>Title</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="title"
                        type="text"
                        {...register("title")}
                    />

                    <FormLabel mb={1}>Author</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="author"
                        type="text"
                        {...register("author")}
                    />

                    <FormLabel mb={1}>URL</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="url"
                        type="text"
                        {...register("url")}
                    />

                    <FormLabel mb={1}>Short Description</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="shortDescription"
                        type="text"
                        {...register("description")}
                    />

                    <FormLabel mb={1}>Long Description</FormLabel>
                    <Textarea
                        borderColor={mode('gray.400', 'gray.600')}
                        id="longDescription"
                        type="text"
                        {...register("additionalDescription")}
                    />
                    <HStack spacing={2}>
                      <FormLabel mb={1} marginBottom={0}
                                onMouseOver={handleMouseOver}
                                onMouseLeave={handleMouseLeave}
                                spacing={2}
                      > 
                          Render HTML 
                      </FormLabel>
                      <input type="checkbox" {...register("html")}/> 
                      {isHovering ? hoverText() : <Text whiteSpace="pre-line">{"\n"}</Text>}
                    </HStack>

                    <FormLabel mb={1}>Tags</FormLabel>
                    {tags.map((tag)=> 
                    <FormLabel>
                        <input type="checkbox" 
                               key={tag} 
                               value={tag}
                               name={tag}
                               {...register("tags")}
                               /> {tag}
                    </FormLabel>)}

                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      fontSize="md"
                      isLoading={isSubmitting}
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