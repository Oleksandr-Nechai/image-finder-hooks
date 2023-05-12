import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.styled';

function Button({ children, incrementPage }) {
  return (
    <ButtonStyled type="button" onClick={incrementPage}>
      {children}
    </ButtonStyled>
  );
}

export default Button;

Button.propTypes = {
  incrementPage: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
