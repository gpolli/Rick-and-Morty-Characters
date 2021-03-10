export const handleAPIRequest = async (endpoint, callback) => {
  const response = await fetch(endpoint);
  const json = await response.json();

  callback(json);
}

export const setIdAsObjectKey = (object) => {
  return {
    [object.id]: object
  }
}

export const groupListByPageIndex = (list, pageIndex) => {
  return { [pageIndex]: list }
}

export const getSortedListOfObject = (list) => {
  return list.map(item => setIdAsObjectKey(item)).sort((a, b) => a.id - b.id);
}

export const joinObjectsFromList = (list) => {
  return list.reduce((accumulator, currentValue) => {
    return { ...accumulator, ...currentValue };
  });
}