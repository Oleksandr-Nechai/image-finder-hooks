import styled from 'styled-components';

export const ButtonStyled = styled.button`
  margin: 0 auto;
  display: block;
  border: none;
  border-radius: 4px;

  padding: 8px 17px;
  background-color: ${props => props.theme.colors.primaryColor};
  color: ${props => props.theme.colors.mainWhite};
  opacity: 0.7;
  cursor: pointer;

  box-shadow: ${props => props.theme.shadow.mainShadow};
  transition: opacity 250ms ${props => props.theme.timingFunction.base};
  :hover,
  :focus {
    opacity: 1;
  }
`;
