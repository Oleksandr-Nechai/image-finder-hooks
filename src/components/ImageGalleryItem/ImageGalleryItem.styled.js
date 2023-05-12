import styled from 'styled-components';

export const GalleryItem = styled.li`
  flex-basis: calc(
    (100% - 3 * ${props => props.theme.spacings.gapGallery}) / 4
  );
  height: 18vw;
  border-radius: 8px;
  overflow: hidden;

  transition: transform 250ms ${props => props.theme.timingFunction.base},
    box-shadow 250ms ${props => props.theme.timingFunction.base};
  cursor: zoom-in;

  :hover,
  :focus {
    transform: scale(1.05);
    box-shadow: ${props => props.theme.shadow.mainShadow};
  }
`;

export const Image = styled.img`
  object-fit: cover;
  height: 100%;
`;

export const LargeImage = styled.img`
  position: relative;
  object-fit: cover;
  height: 50vw;
`;

export const ModalButtonStyled = styled.button`
  position: absolute;
  top: 1%;
  right: 1%;
  background-color: transparent;
  border: none;

  svg {
    width: 30px;
    height: 30px;
    color: red;
  }
`;
