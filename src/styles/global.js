import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif
  }

  body {
    height: 100%;
    width: 100%;
    background-color: #aeadad;
  }
`;

export default GlobalStyle;