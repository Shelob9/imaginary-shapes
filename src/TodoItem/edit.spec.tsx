import {
  cleanup,
  getByText,
  render,
  wait,
  fireEvent
} from '@testing-library/react';
import React from 'react';
import { Edit } from './Edit';
import { Item } from '@imaginary-machines/api-interfaces';

describe('Edit', () => {
  const item: Item = {
    id: '888--aaa',
    urgency: 7,
    importance: 9,
    title: 'NOT',
    fun: 5
  };

  const titleText = 'Edit or create the item please';
  const submitText = 'Save form. Submit to item.';
  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    const { baseElement } = render(
      <Edit submitText={submitText} titleText={titleText} onSave={jest.fn()} />
    );
    await wait(() => getByText(baseElement, titleText));
  });

  it('calls the save callback', async () => {
    const onSave = jest.fn();
    const { baseElement } = render(
      <Edit submitText={submitText} titleText={titleText} onSave={onSave} />
    );
    const submitButton = await getByText(baseElement, submitText);
    await wait(() => fireEvent(submitButton, new Event('')));
    expect(onSave.mock.calls.length).toBe(1);
  });
});
