function withoutNullable(object) {
  let newObject = {};

  for (const key in object) {
    const value = object[key];
    const type = Object.prototype.toString.call(value);

    if (type === '[object Object]') {
      newObject[key] = withoutNullable(value);
    } else if (value !== null) {
      newObject[key] = value;
    }
  }

  return newObject;
}

function withoutFalsy(object) {
  let newObject = {};

  for (const key in object) {
    const value = object[key];
    const type = Object.prototype.toString.call(value);

    if (type === '[object Object]') {
      newObject[key] = withoutFalsy(value);
    } else if (value) {
      newObject[key] = value;
    }
  }

  return newObject;
}

function blackList(object, blackListArray) {
  let newObject = { ...object };

  for (const item of blackListArray) {
    const array = item.split('.');
    const firstElement = array[0];

    if (!newObject.hasOwnProperty(firstElement)) continue;

    const value = newObject[firstElement];

    if (array.length > 1 && Object.prototype.toString.call(value) === '[object Object]') {
      newObject[firstElement] = blackList(value, [array.slice(1).join('.')]);
    } else {
      delete newObject[item];
    }
  }

  return newObject;
}

function whiteList(object, whiteListArray) {
  let newObject = {};

  for (const item of whiteListArray) {
    const array = item.split('.');
    const firstElement = array[0];

    if (!object.hasOwnProperty(firstElement)) continue;

    const value = object[firstElement];

    if (array.length > 1 && Object.prototype.toString.call(value) === '[object Object]') {
      newObject[firstElement] = whiteList(value, [array.slice(1).join('.')]);
    } else {
      newObject[item] = value;
    }
  }

  return newObject;
}
