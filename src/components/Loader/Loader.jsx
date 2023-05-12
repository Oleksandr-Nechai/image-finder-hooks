import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';

function Loader({ visible }) {
  return (
    <ThreeDots
      height="34"
      width="100"
      radius="9"
      color="rgb(0,96,255)"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        justifyContent: 'center',
      }}
      visible={visible}
    />
  );
}

export default Loader;

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};
