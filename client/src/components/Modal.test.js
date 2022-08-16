import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('Modal test', () => {
    const { getByTestId, getByRole } = render(
      <Modal winner={'Lucy'} didYouWin={'You lost'} winnerNum={4} />
    );
    const winner = screen.getByTestId('winner').textContent;
    const didYouWin = screen.getByTestId('didYouWin').textContent;
    expect(winner).toBe('Lucy (4)');
    expect(didYouWin).toBe('You lost');
  });
});
