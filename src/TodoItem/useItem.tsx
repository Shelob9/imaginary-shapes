import React, { useReducer } from 'react';
import {
  itemFactory,
  itemReducer,
  setUrgency,
  setTitle,
  setImportance,
  setDue,
  setFun,
  updateAll,
  Item
} from '@imaginary-machines/api-interfaces';

export default function useItem(intial?: any) {
  const [item, dispatch] = useReducer(
    itemReducer,
    intial ? intial : itemFactory({})
  );

  return {
    item,
    updateItem: (item: Item) => dispatch(updateAll(item)),
    setUrgency: (newValue: number) => dispatch(setUrgency(newValue)),
    setTitle: (newValue: string) => dispatch(setTitle(newValue)),
    setImportance: (newValue: number) => dispatch(setImportance(newValue)),
    setDue: (newValue: Date) => dispatch(setDue(newValue)),
    setFun: (newValue: number) => dispatch(setFun(newValue))
  };
}
