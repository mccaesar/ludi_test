import { useHistory, useLocation } from 'react-router-dom';
import { Box, SimpleGrid, useColorModeValue as mode } from '@chakra-ui/react';
import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { CategoryCard } from '../../components/CategoryCard';
import { Heading } from '@chakra-ui/react';
import { CATEGORIES } from '../../categories';

export const CategoryPage = () => {

    const categoriesList = Object.keys(CATEGORIES).map(function(key, index) 
        { return <CategoryCard category={key}></CategoryCard> })
       
    return (
        <WithFooter>
            <Navbar />
    
            <Heading pt={10} pb={5} textAlign="center" mx="auto" fontSize="3xl"> Categories </Heading>
            <Box
                as="section"
                bg={mode('white', 'gray.800')}
                px={{ base: '6', md: '8' }}
                // py={{ base: '10', sm: '24' }}
                maxW={{ base: 'xl', md: '7xl' }}
                mx="auto"
                mt={3}
            >
                <SimpleGrid columns={{ base: 2, lg: 2 }} spacing="12" mb="10">
                {categoriesList}
                </SimpleGrid>
            </Box>
        </WithFooter>
        );
}