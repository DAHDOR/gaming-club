import styled from 'styled-components';

export const Button = styled.button`
  width: fit-content;
  height: 3rem;
  display: grid;
  place-items: center;
  padding: 0 1rem 0 1rem;
  background: ${({ theme }) => theme.main};
  border: 0.1rem solid ${({ theme }) => theme.emphasis};
  border-radius: 10rem;
  transition: all 0.4s ease;
  color: ${({ theme }) => theme.emphasis};
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.hover};
    transition: none;
  }
  &:active {
    background: ${({ theme }) => theme.stroke};
    transition: none;
  }
`;
