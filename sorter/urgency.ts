import { itemCollection } from './types';

import { urgentOnly, importantanceSort, urgencySort } from './sorters';

export default function urgency(items: itemCollection): itemCollection {
  let results = urgentOnly(items);
  if (null !== results) {
    urgencySort(results);
    importantanceSort(results);
  }
  return results;
}
