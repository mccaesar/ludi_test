import { useUser } from '../../hooks/useUser';
import {
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Textarea,
    Input,
    Stack,
    HStack,
    Text,
    Box,
    useColorModeValue as mode,
  } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { useResources } from '../../hooks/useResources';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API_URI } from '../../config';


 
export const EditPage = () => {

    const [resource, setResource] = useState(null);
    const { user } = useUser();
    const { resources, tags } = useResources();
    const { index: resourceIdx } = useParams();
    const [isHovering, setIsHovering] = useState(false);
    const toast = useToast()
    const history = useHistory();

    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting },
      } = useForm({
        mode: 'onBlur'
      });

    useEffect(() => {
        if (resources) {
          setResource(
            resources.find(
              (currentResource) =>
                String(currentResource.index) === String(resourceIdx)
            )
          );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [resources]);

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

    const updateResource = async (values) => {
        const update = { title: values.title, 
                         author: values.author,
                         url: values.url, 
                         category: resource.category,
                         description: values.description, 
                         additionalDescription: values.additionalDescription,
                         submittedBy: resource.submittedBy ? resource.submittedBy : null,
                         isOpenResource: resource.isOpenResource ? resource.isOpenResource : null,
                         tags:values.tags};
        axios.put(`${API_URI}/resource/${resource._id}/edit`, update)
        .then(function(res) {
          toast({
            title: 'successfully updated resource',
            description: 'redircting to the resource page after 3 seconds',
            status: 'success',
            duration: 3000,
            position: 'bottom-right',
            isClosable: true,
            onCloseComplete: function() { const path = `/resource/${resourceIdx}/`;
                                          history.push(path);
                                          window.location.reload();}
          })
        }).
        catch(function(error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                toast({
                  title: 'an error occured while updating this resource',
                  description: error.response.data.message,
                  status: 'error',
                  duration: 9000,
                  position: 'bottom-right',
                  isClosable: true,
                })
            }
        });
    }

    //const tagsCheckbox = resource.tags.map((tag)=> <FormLabel><input type="checkbox" value={tag} checked={true}/> {tag}</FormLabel>)
    return resource ? (
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
              <form onSubmit={handleSubmit(updateResource)}>
                <Stack spacing={4}>
                    <FormLabel mb={1}>Title</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="title"
                        type="text"
                        defaultValue ={resource.title}
                        {...register("title")}
                    />

                    <FormLabel mb={1}>Author</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="author"
                        type="text"
                        defaultValue ={resource.author}
                        {...register("author")}
                    />

                    <FormLabel mb={1}>URL</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="url"
                        type="text"
                        defaultValue ={resource.url}
                        {...register("url")}
                    />

                    <FormLabel mb={1}>Short Description</FormLabel>
                    <Input
                        borderColor={mode('gray.400', 'gray.600')}
                        id="shortDescription"
                        type="text"
                        defaultValue={resource.description}
                        {...register("description")}
                    />

                    <FormLabel mb={1}>Long Description</FormLabel>
                    <Textarea
                        borderColor={mode('gray.400', 'gray.600')}
                        id="longDescription"
                        type="text"
                        defaultValue={resource.additionalDescription}
                        {...register("additionalDescription")}
                    />

                    <HStack spacing={2} mb={1}>
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
                               defaultChecked={resource.tags.includes(tag)} 
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
                      Update resource
                    </Button>
                </Stack>
              </form>
          </Box>
        </Box>
        :
        <Stack justifyContent={'center'} direction={'column'} alignItems={'center'} height={'full'}>
          <Text textAlign='center' verticalAlign={'center'}>Sorry, you are not an admin</Text>
        </Stack>}
    </WithFooter>) : null;
}