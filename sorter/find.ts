import { Item, itemCollection } from 'types';

function findByTitle(title: string, items: itemCollection): Item | null {
  const result = items.find((i: Item) => title === i.title);
  return result ? result : null;
}

/**
 * Get the difference between two collections
 * @see https://stackoverflow.com/a/1187628/1469799
 * @param collectionOne
 * @param collectionTwo
 */
function difference(
  collectionOne: itemCollection,
  collectionTwo: itemCollection
): itemCollection | null {
  const result = collectionOne.filter(x => !collectionTwo.includes(x));
  return result ? result : null;
}

/**
 * Get the intersection of two collections
 *
 * @see https://stackoverflow.com/a/1187628/1469799
 * @param collectionOne
 * @param collectionTwo
 */
function itersection(
  collectionOne: itemCollection | null,
  collectionTwo: itemCollection | null
): itemCollection | null {
  if (collectionOne === null && collectionTwo === null) {
    return null;
  }
  if (collectionTwo === null) {
    return collectionOne;
  }

  if (collectionOne === null) {
    return collectionTwo;
  }
  const result = collectionOne.filter(value => collectionTwo.includes(value));
  return result ? result : null;
}

export { findByTitle, itersection, difference };
