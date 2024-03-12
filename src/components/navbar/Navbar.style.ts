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
  align-items: center;
  padding: 1.2rem;
  padding-left: 1.5rem;
  font-size: 2rem;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 300;
`;

export const HomeRedirect = styled.button`
  padding: 0;
  display: flex;
  flex: none;
  background: transparent;
  border: none;
  height: 100%;
  min-width: 10rem;
  cursor: pointer;
`;

export const Redirect = styled.button`
  margin: 0 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  width: fit-content;
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1.5rem;
  gap: 1rem;
  font-size: 2rem;
`;
