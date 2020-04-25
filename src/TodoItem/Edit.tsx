import React, { ChangeEvent, Fragment } from 'React';
import useItem from './useItem';
import { Item } from '@imaginary-machines/api-interfaces';
import Title from './Title';
type valueType = string | number;
export function Input(props: {
  id: string;
  type: 'input' | 'number' | 'date' | 'submit';
  value: valueType;
  onChange: (value: valueType) => void;
  label: string;
  input?: React.ComponentType<{}>;
}) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      {props.input ? (
        <Fragment>{props.input}</Fragment>
      ) : (
        <input
          id={props.id}
          value={props.value}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            props.onChange(e.target.value)
          }
          type={props.type}
        />
      )}
    </div>
  );
}

export function Edit(props: {
  titleText: string;
  submitText: string;
  onSave: (Item) => void;
  initialItem?: Item;
}) {
  const { titleText, onSave, submitText, initialItem } = props;

  const { item, setTitle, setUrgency, setImportance, setFun, setDue } = useItem(
    initialItem ? initialItem : null
  );

  function handleSave() {
    return onSave(item);
  }

  const { title, urgency, importance, due, fun } = item;

  return (
    <div>
      <h3>{titleText}</h3>
      <form onSubmit={handleSave} aria-label={titleText}>
        <Title
          {...{
            type: 'input',
            id: 'title',
            label: 'Title',
            setTitle: setTitle,
            title
          }}
        />
        <Input
          {...{
            type: 'number',
            id: 'urgency',
            label: 'Urgency',
            value: urgency,
            onChange: (value: number) => setUrgency(value)
          }}
        />
        <Input
          {...{
            type: 'number',
            id: 'importance',
            label: 'Importance',
            value: importance,
            onChange: (value: number) => setImportance(value)
          }}
        />
        <Input
          {...{
            type: 'number',
            id: 'fun',
            label: 'Fun',
            value: fun,
            onChange: (value: number) => setFun(value)
          }}
        />
        <Input
          {...{
            type: 'date',
            id: 'due',
            label: 'Due',
            value: due ? due.toString() : null,
            onChange: (value: string) => setDue(new Date(value))
          }}
        />
        <label htmlFor={'save'}>Save</label>
        <input
          id={'save'}
          value={submitText}
          onClick={(event: React.MouseEvent) => {
            event.preventDefault();
            onSave(item);
          }}
          type={'submit'}
        />
      </form>
    </div>
  );
}
