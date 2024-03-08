import { createGlobalStyle } from 'styled-components';
import RobotoCondensedTTF from '../assets/fonts/roboto/RobotoCondensed-Regular.ttf';
import RobotoRegularTTF from '../assets/fonts/roboto/Roboto-Regular.ttf';
import RobotoItalicTTF from '../assets/fonts/roboto/Roboto-Italic.ttf';
import RobotoBoldTTF from '../assets/fonts/roboto/Roboto-Bold.ttf';
import RobotoBoldItalicTTF from '../assets/fonts/roboto/Roboto-BoldItalic.ttf';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
  }
  body, button {
    color: ${({ theme }) => theme.text};
  }
  @font-face {
    font-family: "Roboto", sans-serif;
    src: url(${RobotoRegularTTF}) format("truetype");
    font-style: normal;
    font-weight: normal;
  }
  @font-face {
    font-family: "Roboto", sans-serif;
    src: url(${RobotoItalicTTF}) format("truetype");
    font-style: italic;
    font-weight: normal;
  }
  @font-face {
    font-family: "Roboto", sans-serif;
    src: url(${RobotoBoldTTF}) format("truetype");
    font-style: normal;
    font-weight: bold;
  }
  @font-face {
    font-family: "Roboto", sans-serif;
    src: url(${RobotoBoldItalicTTF}) format("truetype");
    font-style: italic;
    font-weight: bold;
  }
  @font-face {
    font-family: "Roboto Condensed", sans-serif;
    src: url(${RobotoCondensedTTF}) format("truetype");
  }
`;

export default GlobalStyle;
