import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';
import { SearchBar } from '../../components/SearchBar';
import { ResourceContainer } from '../../containers/ResourceContainer';
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
      <SearchBar search={handleSearch} />
      <ResourceContainer />
      <Footer />
    </>
  );
};
