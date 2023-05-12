import { Component } from 'react';

import Section from 'components/Section';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { validationRequest } from 'services/notifications';

class App extends Component {
  state = {
    nameImage: '',
    visible: false,
  };

  componentDidMount() {
    try {
      const savedQuery = JSON.parse(localStorage.getItem('nameImage'));
      if (savedQuery) {
        this.setState({ nameImage: savedQuery });
      }
    } catch ({ message }) {
      console.error('Set state error: ', message);
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.nameImage !== this.state.nameImage) {
      try {
        localStorage.setItem('nameImage', JSON.stringify(this.state.nameImage));
      } catch ({ message }) {
        console.error('Set state error: ', message);
      }
    }
  }

  onSubmitForm = nameImage => {
    if (this.state.nameImage === nameImage) {
      validationRequest();
      return;
    }
    this.setState({ nameImage: nameImage });
  };

  toggleVisibleLoader = () => {
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  };

  render() {
    const { nameImage, visible } = this.state;
    return (
      <>
        <Section>
          <Searchbar onSubmitForm={this.onSubmitForm} visible={visible} />
        </Section>
        <Section>
          {nameImage && (
            <ImageGallery
              nameImage={nameImage}
              visible={visible}
              toggleVisible={this.toggleVisibleLoader}
            />
          )}
        </Section>
      </>
    );
  }
}

export default App;
