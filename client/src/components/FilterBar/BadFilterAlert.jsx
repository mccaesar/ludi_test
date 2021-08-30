import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

export const BadFilterAlert = ({ bg }) => {
  const url = useLocation();

  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(url.search);

    const hasSearchTerm = !!query.get('q');
    const isSearchingField = !!query.get('field');
    const isFilteringTag = !!query.get('tag');

    const currentSort = query.get('sort');
    const isSortingNotRelevance = currentSort && currentSort !== 'relevance';
    const isSortingRelevance = currentSort && currentSort === 'relevance';

    if (!isSearchingField && !isFilteringTag && !isSortingNotRelevance) {
      setAlertMessage('No filter selected!');
    } else if (hasSearchTerm && !isSearchingField) {
      setAlertMessage('Select at least one search field to search!');
    } else if (!hasSearchTerm && isSortingRelevance) {
      setAlertMessage('Must be searching to sort by relevance!');
    } else {
      setAlertMessage(null);
    }
  }, [url]);

  if (alertMessage) {
    return (
      <Alert status="warning" bg={bg}>
        <AlertIcon />
        <AlertTitle p={2}>{alertMessage}</AlertTitle>
      </Alert>
    );
  } else {
    return null;
  }
};
