import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('Modal test', () => {
    const { getByTestId, getByRole } = render(
      <Modal winner={'Lucy'} didYouWin={'You lost'} setPlayer={() => {}} />
    );
    const winner = screen.getByTestId('winner').textContent;
    const didYouWin = screen.getByTestId('didYouWin').textContent;
    expect(winner).toBe('Lucy');
    expect(didYouWin).toBe('You lost');
  });
});
