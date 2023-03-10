import { WithFooter } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';

import { Text, Center, Heading, Stack} from '@chakra-ui/react';

export const AboutPage = () => {
  return (
    <WithFooter>
      <Navbar />

      <Heading pt={10} pb={5} textAlign="center" mx="auto" fontSize="3xl"> About Open Library </Heading>

      <Text pb={10} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        Open Library aims to create a public web service consisting of a user-friendly database of open computer networking educational sources to provide an organized space for university educators to discover and share relevant software tools.
      </Text>

      <Heading pt={1} pb={3} textAlign="center" mx="auto" fontSize="3xl"> Curation Committee </Heading>

      <Heading pt={1} pb={3} textAlign="center" mx="auto" fontSize="2xl"> Co-Chairs </Heading>
      
      <Text pb={1} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        Jim Kurose, University of Massachusetts at Amherst, USA
      </Text>
      <Text pb={1} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        Matthew Caesar, University of Illinois at Urbana-Champaign, USA
      </Text>

      <Heading pt={1} pb={3} textAlign="center" mx="auto" fontSize="2xl"> Members </Heading>

      <Text pb={1} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        Ellen Zegura, Georgia Tech, USA
      </Text>
      <Text pb={1} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        Olivier Bonaventure, Université catholique de Louvain, Belgium
      </Text>
      <Text pb={1} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        Sanjay Jha, University of New South Wales, Australia
      </Text>
      <Text pb={1} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
      Jennifer Rexford, Princeton, USA
      </Text>
      <Text pb={10} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
      Aditya Akella, University of Texas at Austin, USA
      </Text>


      <Heading pt={1} pb={3} textAlign="center" mx="auto" fontSize="3xl"> Student Developers </Heading>

      <Text pb={1} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        Michael Chen, Vien Vuong, Liana Koleva
      </Text>
      <Text pb={1} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        Andrea Kirit Roy, Yaning (Calvin) Wang, Jianan Hou, Xinshuo Lei, Lu Wang, Runzhong(Denny) Li
      </Text>


      <Heading pt={10} pb={3} textAlign="center" mx="auto" fontSize="3xl"> How to use Open Library </Heading>

      {/*  */}
      <Heading pt={5} pb={2} textAlign="center"  mx="auto" textDecoration="underline" fontSize="xl"> Searching: </Heading>

      <Text pb={5} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        To search for resources, either enter text into the search bar or select a tag to search by. 
      </Text>

      <Text pb={5} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        Selecting search fields (title, description, category, author) determines which fields of the resources we check for matches to the text in the search bar. 
      </Text>

      <Text pb={5} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        Selecting tags will search within the tags/categories field of the resources. If the tags search has ‘AND’ selected, only resources that have all the tags are returned. If ‘OR’ is selected, resources that have any of the tags can be returned. 
      </Text>


      {/*  */}
      <Heading pt={10} pb={2} textAlign="center" mx="auto" textDecoration="underline" fontSize="xl"> Signing up and Logging in: </Heading>

      <Text pb={5} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        To sign up, click the ‘Sign Up’ button in the top right corner of the webpage. After you enter the required fields and click ‘Create my account’ a new account will be created if the email isn't already taken. Reload the page to check if you have been logged in successfully.
      </Text>

      <Text pb={5} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        To log in, click the ‘Sign In’ button and enter your information. To verify you’ve been logged in successfully, reload the page.
      </Text>

      <Text pb={5} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        To sign out, click your name in the upper right corner of the page and click ‘Sign out’
      </Text>


      {/*  */}
      <Heading pt={10} pb={2} textAlign='center' mx="auto" textDecoration="underline" fontSize="xl"> Saving and Viewing saved resources: </Heading>

      <Text pb={5} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        To save a resource, navigate to any resource and click on the bookmark icon. You must be signed in to save a resource.
      </Text>

      <Text pb={5} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        To view your saved resources, click on your name or avatar in the upper right corner or the webpage and then click ‘Profile’ in the dropdown options.
      </Text>


      {/*  */}
      <Heading pt={10} pb={2} textAlign='center' mx="auto" textDecoration="underline" fontSize="xl"> Submitting new resources: </Heading>

      <Text pb={30} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        To submit a new resource, click ‘Submission’ in the footer of the webpage. Fill out the embedded form and then click ‘Submit’.
      </Text>

      <Heading pt={1} pb={3} textAlign="center" mx="auto" fontSize="3xl"> Getting help </Heading>

      <Text pb={5} justifyContent="center" textAlign='center' maxWidth='3xl' mx="auto" fontSize="lg">
        If you have comments, suggestions, or need help, please email us at ludi-help@illinois.edu 
      </Text>

    </WithFooter>
  );
};
