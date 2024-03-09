import styled from 'styled-components';

export const IconWrapper = styled.div`
  display: grid;
  place-items: center;
  padding: 0.7rem;
`;

export const Img = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: inherit;
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const Button = styled.button`
  width: fit-content;
  height: fit-content;
  display: grid;
  place-items: center;
  padding: 0;
  background: ${({ theme }) => theme.main};
  border: 0.1rem solid rgba(0, 0, 0, 0);
  border-radius: 10rem;
  transition: background 0.4s ease;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.hover};
    transition: none;
  }
  &:active {
    background: ${({ theme }) => theme.stroke};
    border: 0.1rem solid ${({ theme }) => theme.stroke};
    transition: none;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: absolute;
  top: 115%;
  right: 15%;
  border-radius: 1rem;
  padding: 0.5rem;
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
  border-radius: 0.5rem;
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
