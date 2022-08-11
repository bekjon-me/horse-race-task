import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('Modal test', () => {
    const { getByTestId, getByRole } = render(<Modal winner={'Lucy'} />);
    const winner = screen.getByTestId('winner').textContent;
    const setPlayerBtn = screen.getByRole('button', { name: '1' });
    expect(winner).toBe('Lucy');
  });
});
