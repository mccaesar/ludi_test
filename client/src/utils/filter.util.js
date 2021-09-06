import Fuse from 'fuse.js';
import { TagOperatorOptions } from '../constants/filter.constant';

export const filterResources = ({
  resources,
  searchTerm,
  searchFields,
  filterTags,
  tagOperator,
  sortOption,
}) => {
  let filteredResources = [...resources];

  if (filterTags && filterTags.length) {
    filteredResources = filterByTags({
      resources: filteredResources,
      filterTags,
      tagOperator,
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

export const selectOptionsToStrings = (selectOptions) => {
  return selectOptions.map((selectOption) => selectOption.value);
};

export const nextTagOperator = (tagOperator) => {
  switch (tagOperator) {
    case TagOperatorOptions.And:
      return TagOperatorOptions.Or;
    case TagOperatorOptions.Or:
      return TagOperatorOptions.Nand;
    case TagOperatorOptions.Nand:
      return TagOperatorOptions.Nor;
    case TagOperatorOptions.Nor:
      return TagOperatorOptions.And;
    default:
      return TagOperatorOptions.And;
  }
};

function filterByTags({ resources, filterTags, tagOperator }) {
  switch (tagOperator) {
    case TagOperatorOptions.And:
      return resources.filter((resource) =>
        filterTags.every((filterTag) => resource.tags.includes(filterTag))
      );
    case TagOperatorOptions.Or:
      return resources.filter((resource) =>
        filterTags.some((filterTag) => resource.tags.includes(filterTag))
      );
    case TagOperatorOptions.Nand:
      return resources.filter((resource) =>
        filterTags.every((filterTag) => !resource.tags.includes(filterTag))
      );
    case TagOperatorOptions.Nor:
      return resources.filter((resource) =>
        filterTags.some((filterTag) => !resource.tags.includes(filterTag))
      );
    default:
      return resources;
  }
}

function filterBySearching({ resources, searchTerm, searchFields }) {
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
}

function sortResults({ results, sortOption }) {
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
}
