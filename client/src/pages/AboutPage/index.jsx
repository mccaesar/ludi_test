import { Footer } from '../../components/Footer';
import { NavBar } from '../../components/NavBar';

import { Text, Center } from '@chakra-ui/react';

export const AboutPage = () => {
    return (
        <>
            <NavBar />

            <Center py={10}>
                <Text fontSize="2xl"> About LUDI </Text>
            </Center>


            <Footer />
        </>
    );
};
