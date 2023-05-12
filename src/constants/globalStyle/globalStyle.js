import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas,
      'Courier New', monospace;
  }
  
  html {
    box-sizing: border-box;
   
  
  }
  
  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul {
    margin: 0;
    padding: 0;
  }
  
  a {
    text-decoration: none;
  }
  
  ul {
    list-style: none;
  }
  
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  `;
