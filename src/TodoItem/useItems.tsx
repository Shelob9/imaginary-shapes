import React, { useReducer, createContext } from 'react';
import {
  itemCollectionReducer,
  itemCollection,
  updateItem,
  createItem,
  removeItem,
  Item
} from '@imaginary-machines/api-interfaces';
export const ItemsCollectionContext = createContext(null);

export default function useItems(props: { initialState: itemCollection }) {
  const { initialState } = props;
  const [items, itemsDispatch] = useReducer(
    itemCollectionReducer,
    initialState
  );

  const getItem = (itemId: string) =>
    items.find((item: Item) => itemId === item.id);

  return {
    items,
    getItem,
    updateItem: (item: Item) => itemsDispatch(updateItem(item)),
    createItem: () => itemsDispatch(createItem()),
    removeItem: (itemId: string) => itemsDispatch(removeItem(itemId))
  };
}
