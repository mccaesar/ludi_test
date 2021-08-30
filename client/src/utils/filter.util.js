import Fuse from 'fuse.js';

const filterByTags = ({ resources, filterTags }) =>
  resources.filter((resource) =>
    filterTags.every((filterTag) => resource.tags.includes(filterTag))
  );

const filterBySearching = ({ resources, searchTerm, searchFields }) => {
  if (searchTerm) {
    const options = {
      includeScore: true,
      ignoreLocation: true,
      keys: searchFields,
      threshold: 0.6,
    };
    const fuse = new Fuse(resources, options);
    return fuse.search(searchTerm).map(({ item }) => item);
  }
};

const sortResults = ({ results, sortOption }) => {
  switch (sortOption) {
    case 'popularity':
      return results.sort((a, b) => (a.saveCount < b.saveCount ? 1 : -1));
    case 'az':
      return results.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      );
    case 'za':
      return results.sort((a, b) =>
        a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
      );
    case 'old':
      return results.sort((a, b) =>
        a.dateAdded.substring(0, 10) > b.dateAdded.substring(0, 10) ? 1 : -1
      );
    case 'new':
      return results.sort((a, b) =>
        a.dateAdded.substring(0, 10) < b.dateAdded.substring(0, 10) ? 1 : -1
      );
    default:
      return results;
  }
};

export const filterResources = ({
  resources,
  searchTerm,
  searchFields,
  filterTags,
  sortOption,
}) => {
  let filteredResources = [...resources];

  if (filterTags && filterTags.length) {
    filteredResources = filterByTags({
      resources: filteredResources,
      filterTags,
    });
  }

  if (searchTerm && searchFields && searchFields.length) {
    filteredResources = filterBySearching({
      resources: filteredResources,
      searchTerm,
      searchFields,
    });
  }

  if (sortOption) {
    filteredResources = sortResults({ results: filteredResources, sortOption });
  }

  return filteredResources;
};

export const stringsToSelectOptions = (stringArr) => {
  const selectOptions = [];
  for (const string of stringArr) {
    selectOptions.push({
      label: string,
      value: string,
    });
  }
  return selectOptions;
};

export const selectOptionsToStrings = (selectOptions) =>
  selectOptions.map((selectOption) => selectOption.value);
