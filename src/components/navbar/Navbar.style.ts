import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 6rem;
  background-color: ${({ theme }) => theme.main};
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.stroke};
  transition: background 0.4s ease;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  padding: 1.2rem;
  padding-left: 1.5rem;
  font-size: 2rem;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 300;
`;

export const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1.5rem;
  gap: 1rem;
  font-size: 2rem;
`;
