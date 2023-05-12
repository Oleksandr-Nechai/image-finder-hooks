import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';

import { validationRequest } from 'services/notifications';

import {
  FormStyled,
  Container,
  Input,
  ButtonStyled,
} from './Searchbar.styled.js';

function Searchbar({ onSubmitForm, visible }) {
  const handleFormSubmit = ({ nameImage }, { resetForm }) => {
    if (!nameImage.trim()) {
      return;
    }
    onSubmitForm(nameImage.toLowerCase());
    resetForm();
  };

  const initialValues = {
    nameImage: '',
  };

  const SignupSchema = Yup.object({
    nameImage: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={SignupSchema}
      >
        <FormStyled>
          <Container>
            <label>
              <Input type="text" name="nameImage" placeholder="Spring" />
            </label>

            <ButtonStyled
              type="submit"
              disabled={visible}
              aria-label="find images"
            >
              <FcSearch />
            </ButtonStyled>
          </Container>
          <ErrorMessage
            name="nameImage"
            render={msg => validationRequest(msg)}
          />
        </FormStyled>
      </Formik>
    </>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
