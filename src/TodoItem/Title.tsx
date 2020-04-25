import React from 'React';
import { Input } from './Edit';

type P = {
  setTitle: (newValue: string) => void;
  title: string;
};

function Field(props: P) {
  return (
    <Input
      {...{
        type: 'input',
        id: 'title',
        label: 'Title',
        onChange: (value: string) => props.setTitle(value),
        value: props.title
      }}
    />
  );
}
export default function Title(props: P) {
  return <Field {...props} />;
}
