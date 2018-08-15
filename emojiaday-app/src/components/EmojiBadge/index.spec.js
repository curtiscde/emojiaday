import React from 'react';
import renderer from 'react-test-renderer';
import EmojiBadge from './index';

describe('EmojiBadge', () => {
  it('matches snapshot when empty', () => {
    const tree = renderer
      .create(<EmojiBadge />);
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot when emoji passed', () => {
    const emoji = {
      _id: 'smile',
    };

    const tree = renderer
      .create(<EmojiBadge emoji={emoji} />);
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot when emoji passed with count', () => {
    const emoji = {
      _id: 'smile',
      count: 5,
    };

    const tree = renderer
      .create(<EmojiBadge emoji={emoji} />);
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot when emoji passed with count greater than 10', () => {
    const emoji = {
      _id: 'smile',
      count: 15,
    };

    const tree = renderer
      .create(<EmojiBadge emoji={emoji} />);
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot when emoji and index of 0 passed', () => {
    const emoji = {
      _id: 'smile',
    };

    const tree = renderer
      .create(<EmojiBadge emoji={emoji} index={0} />);
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot when emoji and index of 1 passed', () => {
    const emoji = {
      _id: 'smile',
    };

    const tree = renderer
      .create(<EmojiBadge emoji={emoji} index={1} />);
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot when emoji and index of 2 passed', () => {
    const emoji = {
      _id: 'smile',
    };

    const tree = renderer
      .create(<EmojiBadge emoji={emoji} index={2} />);
    expect(tree).toMatchSnapshot();
  });
});
