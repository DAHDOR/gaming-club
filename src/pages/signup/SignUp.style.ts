import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-height: 15rem;
  position: absolute;
  top: 115%;
  left: 0%;
  border-radius: 0.5rem;
  overflow: scroll;
  padding: 0.3rem;
  gap: 0.3rem;
  background-color: ${({ theme }) => theme.panel};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  transition: background 0.4s ease;
`;

export const MenuButton = styled.button`
  width: 100%;
  padding: 0.7rem;
  text-align: left;
  background: ${({ theme }) => theme.panel};
  border: none;
  border-radius: 0.2rem;
  white-space: nowrap;
  transition: background 0.4s ease;
  &:hover {
    background: ${({ theme }) => theme.hover};
    transition: none;
  }
  &:active {
    background: ${({ theme }) => theme.stroke};
    transition: none;
  }
`;
