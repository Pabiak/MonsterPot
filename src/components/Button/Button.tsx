import { IButtonProps } from '@/types/components/Button';

import './Button.scss';

const Button = ({ text, onClick }: IButtonProps) => (
  <button
    type="button"
    aria-label="button"
    onClick={onClick}
    className="button"
  >
    <span className="button__text">{text}</span>
  </button>
);

export default Button;
