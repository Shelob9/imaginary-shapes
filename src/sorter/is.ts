import { Item } from 'types';

function isBeacuseFun(item: Item): boolean {
  return undefined !== item.beacuseFun ? true === item.beacuseFun : false;
}

export { isBeacuseFun };
