import axios from 'axios';

export const objectIsEmpty = (object) => {
  if (Object.keys(object).length === 0 && object.constructor === Object) {
    return true;
  }

  return false;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const removeDuplicatesFromList = (list) => {
  return list.filter((item, currentIndex) => list.indexOf(item) === currentIndex);
};

export const setIdAsObjectKey = (object) => {
  return {
    [object.id]: object,
  };
};

export const groupListByPageIndex = (list, pageIndex) => {
  return { [pageIndex]: list };
};

export const groupObjectByProperty = (object, property) => {
  return { [property]: object };
};

export const getSortedListOfObject = (list) => {
  return list.map((item) => setIdAsObjectKey(item)).sort((a, b) => a.id - b.id);
};

export const joinObjectsFromList = (list) => {
  return list.reduce((accumulator, currentValue) => {
    return { ...accumulator, ...currentValue };
  });
};

const handleSuccessDefault = function (response, callbacks, options) {
  if (response?.hasOwnProperty('data') && response.data?.hasOwnProperty('Result')) {
    const { Result: result } = response.data;

    switch (result.toUpperCase()) {
      case 'OK':
        if (checkCallbackFunctionExistence(callbacks, ['200', 'success'])) {
          callbacks['200']['success'](response);
        }
        break;
      case 'KO':
        if (checkCallbackFunctionExistence(callbacks, ['200', 'error'])) {
          callbacks['200']['error'](response);
        }
        break;
      default:
        console.warn('Success case not managed');
    }
  } else if (response?.hasOwnProperty('data')) {
    if (checkCallbackFunctionExistence(callbacks, ['200'])) {
      callbacks['200'](response);
    }
  }
};

const handleFailDefault = function (error, callbacks) {
  if (error?.hasOwnProperty('response') && error.response?.hasOwnProperty('status')) {
    const { status } = error.response;

    switch (status) {
      case 400:
        if (checkCallbackFunctionExistence(callbacks, ['400'])) {
          callbacks['400']();
        } else {
          console.warn(error.responseText);
        }
        break;
      case 404:
        if (checkCallbackFunctionExistence(callbacks, ['404'])) {
          callbacks['404']();
        } else {
          console.warn(error.responseText);
        }
        break;
      case 500:
        if (checkCallbackFunctionExistence(callbacks, ['500'])) {
          callbacks['500']();
        } else {
          console.error('Error: ', error);
        }
        break;
      default:
        if (checkCallbackFunctionExistence(callbacks, ['default'])) {
          callbacks['default']();
        } else {
          console.error('Error: ', error);
        }
    }
  } else {
    if (checkCallbackFunctionExistence(callbacks, ['default'])) {
      callbacks['default']();
    } else {
      console.warn(error.message);
    }
  }
};

const checkCallbackFunctionExistence = function (callbacks, functionLevels) {
  var reference = callbacks;

  for (var i = 0; i < functionLevels.length; i++) {
    if (reference?.hasOwnProperty(functionLevels[i])) {
      reference = reference[functionLevels[i]];
    } else {
      return false;
    }
  }

  if (typeof reference === 'function') {
    return true;
  }

  return false;
};

export const handleAPIRequest = function (settings, callbacks) {
  axios(settings)
    .then((response) => {
      handleSuccessDefault(response, callbacks);
    })
    .catch((error) => {
      handleFailDefault(error, callbacks);
    });
};
