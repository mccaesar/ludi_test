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

export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResources());
  }, [dispatch]);

  const handleSearch = async (searchTerm) => {
    dispatch(fetchResources(searchTerm));
  };

  return (
    <>
      <NavBar />
      <ResourceContainer />
      <Footer />
    </>
  );
};
