import React, { ChangeEvent, Fragment } from 'React';
import {
  itemCollection,
  Item,
  updateItem
} from '@imaginary-machines/api-interfaces';
import Title from './Title';

type onOpenType = (itemId: string) => void;
function ItemShort(props: {
  item: Item;
  onOpen: onOpenType;
  onChangeTitle: (newValue: string) => void;
}) {
  const { title, id } = props.item;
  const { onOpen, onChangeTitle } = props;
  return (
    <div>
      <Title
        title={title}
        setTitle={(newValue: string) => onChangeTitle(newValue)}
      />
      <button onClick={() => onOpen(id)}>Edit</button>
    </div>
  );
}
export default function ItemList(props: {
  items: itemCollection;
  notFoundText: string;
  onOpenIitem: onOpenType;
  updateItem: (update: Item) => void;
}) {
  const { items, notFoundText, onOpenIitem } = props;
  if (!items.length) {
    return <p>{notFoundText}</p>;
  }
  const onChangeTitle = (title: string, item: Item) =>
    updateItem({ ...item, title });

  const onOpen = (itemId: string, item: Item) => {
    onChangeTitle(item.title, item);
    onOpenIitem(itemId);
  };

  return (
    <ul>
      {items.map((item: Item) => (
        <li key={item.id}>
          <ItemShort
            item={item}
            onOpen={itemId => onOpen(itemId, item)}
            onChangeTitle={(newValue: string) => onChangeTitle(newValue, item)}
          />
        </li>
      ))}
    </ul>
  );
}
