import urgency from './urgency';
import { findByTitle } from './find';
import { itemCollection } from 'types';

describe('Urgent', () => {
  const items = [
    { urgency: 1, importance: 10, title: 'U:1' },
    { urgency: 4, importance: 1, title: 'U:4' },
    { urgency: 5, importance: 1, title: 'U:5' },
    { urgency: 6, importance: 1, title: 'U:6' },
    { urgency: 3, importance: 10, title: 'U:3:I10' },
  ];

  test('findByTitle', () => {
    const r = findByTitle('U:4', items);
    if (null !== r) {
      expect(r.urgency).toBe(4);
    }
    expect(findByTitle('NOT REAL', items)).toBe(null);
  });

  const urgentItems = urgency(items);

  it('Describes U:5 as urgent', () => {
    const r = findByTitle('U:5', items);
    if (null !== r) {
      expect(r.title).toEqual('U:5');
    }
  });
  it('Describes U6 as urgent', () => {
    const r = findByTitle('U:6', urgentItems);
    if (null !== r) {
      expect(r.title).toEqual('U:6');
    }
  });
  it('Does not describe U:4 as urgent', () => {
    expect(findByTitle('U:4', urgentItems)).toBe(null);
  });
  it('Puts them in order', () => {
    expect(urgentItems[0].title).toEqual('U:6');
    expect(urgentItems[1].title).toEqual('U:5');
  });
});

describe('Urgent Sort', () => {
  it('When urgency is tied, more important task wins', () => {
    const items = [
      { urgency: 8, importance: 8, title: 'U:8:I8' },
      { urgency: 8, importance: 9, title: 'U:8:I9' },
    ];

    const urgentItems = urgency(items);
    expect(urgentItems[0].title).toEqual('U:8:I9');
  });

  it('Gives prefrence to fun', () => {
    const items: itemCollection = [
      // { urgency: 7, importance: 2, title: 'undefiend fun' },
      { urgency: 7, importance: 9, title: 'NOT', fun: 5 },
      { urgency: 7, importance: 9, title: 'FUN', fun: 10 },
    ];

    const urgentItems = urgency(items);
    expect(urgentItems[0].title).toEqual('FUN');
    expect(urgentItems[1].title).toEqual('NOT');
  });
});
