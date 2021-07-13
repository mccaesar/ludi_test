import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';
import { ResourceContainer } from '../../components/ResourceContainer';
import { fetchResources } from '../../actions/resource.action';
import { SearchBar } from '../../components/SearchBar';

export const HomePage = ({match}) => {

  return (
    <>
      <NavBar />
      <SearchBar url={match.url}/>
      {/* <ResourceContainer /> */}
      <Footer />
    </>
  );
};
