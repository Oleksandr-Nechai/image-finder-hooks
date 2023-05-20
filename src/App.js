import { useState } from 'react';

import Section from 'components/Section';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

import { validationRequest } from 'services/notifications';
import { useLocalStorage } from 'hooks';
function App() {
  const [nameImage, setNameImage] = useLocalStorage('nameImage', '');
  const [visible, setVisible] = useState(false);

  const onSubmitForm = name => {
    if (nameImage === name) {
      validationRequest();
      return;
    }
    setNameImage(name);
  };

  return (
    <>
      <Section>
        <Searchbar onSubmitForm={onSubmitForm} visible={visible} />
      </Section>
      <Section>
        {nameImage && (
          <ImageGallery
            nameImage={nameImage}
            visible={visible}
            toggleVisible={setVisible}
          />
        )}
      </Section>
    </>
  );
}

export default App;
