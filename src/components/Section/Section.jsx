import PropTypes from 'prop-types';

import { Container } from './Section.styled';

function Section({ children }) {
  return <Container>{children}</Container>;
}

export default Section;

Section.propTypes = {
  children: PropTypes.node.isRequired,
};
