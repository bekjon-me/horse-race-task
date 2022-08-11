import { render, screen, fireEvent } from '@testing-library/react';
import Racer from './Racer';

describe('Racer', () => {
  it('Racer test', () => {
    const { getByTestId, getByRole } = render(
      <Racer
        opacity={1}
        name="Ginger"
        number={1}
        isPlayer={''}
        distance={450}
      />
    );
    const opacity = Number(screen.getByTestId('opacity').style.opacity);
    const nameAndNum = screen.getByTestId('nameNum').textContent;
    const isPlayer = screen.getByTestId('isPlayer').textContent;
    const distance = screen.getByTestId('distance').style.left;
    expect(opacity).toBe(1);
    expect(nameAndNum).toBe('Ginger 1');
    expect(isPlayer).toBe('');
    expect(distance).toBe('45%');
  });
});
