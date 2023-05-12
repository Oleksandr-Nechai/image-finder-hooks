import styled from 'styled-components';

export const Gallery = styled.div`
  padding-top: ${props => props.theme.spacings.upperPrimary};
  padding-bottom: 20px;
  overflow-x: hidden;
`;

export const GalleryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacings.gapGallery};
  padding: 8px;
`;

export const GalleryFooter = styled.div`
  height: 54px;
  padding: 10px 0;
`;
