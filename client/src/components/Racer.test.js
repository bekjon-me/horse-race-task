import { render, screen, fireEvent } from '@testing-library/react';
import Racer from './Racer';

describe('Racer', () => {
  it('Racer test', () => {
    const { getByTestId, getByRole } = render(<Racer opacity={1} />);
    const opacity = Number(screen.getByTestId('opacity').style.opacity);
    expect(opacity).toBe(1);
  });
});
