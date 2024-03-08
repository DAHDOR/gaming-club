import styled from 'styled-components';
import MoreLight from '../assets/icons/MoreLight.svg';
import MoreDark from '../assets/icons/MoreDark.svg';
import { FC, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Img = styled.img`
  margin: 0;
  height: 100%;
  width: 100%;
`;

export const MoreIcon: FC = () => {
  const { theme } = useContext(ThemeContext);

  return <Img src={theme.name === 'light' ? MoreLight : MoreDark} alt="" />;
};
