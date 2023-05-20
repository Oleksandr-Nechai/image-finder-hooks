import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.styled';

function Button({ children, handleBtnLoadMore }) {
  return (
    <ButtonStyled type="button" onClick={handleBtnLoadMore}>
      {children}
    </ButtonStyled>
  );
}

export default Button;

Button.propTypes = {
  handleBtnLoadMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
