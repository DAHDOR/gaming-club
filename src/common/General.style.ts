import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1.5rem;
  width: calc(100vw - 3rem);
  height: calc(100vh - 6.1rem);
  overflow: scroll;
  z-index: 0;
`;

export const ItemButton = styled.button`
  padding: 0;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.1s ease;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
  &:active {
    background-color: ${({ theme }) => theme.stroke};
  }
`;

export const ItemContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.stroke};
  padding: 2rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  z-index: 10;
`;

export const FormWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 6.1rem);
  overflow: hidden;
  z-index: 0;
`;

export const FormContainer = styled.div`
  margin: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;
  max-width: 100%;
  max-height: 100%;
  padding: 3rem 4rem;
  background-color: ${({ theme }) => theme.panel};
  border-radius: 1rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export const LogoContainer = styled.div`
  width: 10rem;
`;

export const Form = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
`;

export const Input = styled.input`
  padding: 0.5rem 0.7rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.stroke};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.1s ease;
  outline: none;
  font-size: 1.2rem;
  &:focus {
    border-color: ${({ theme }) => theme.emphasis};
  }
`;

export const SearchInput = styled.input`
  padding: 0.5rem 0.7rem;
  width: calc(100% - 2rem);
  border: 1px solid ${({ theme }) => theme.stroke};
  border-radius: 3rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.1s ease;
  outline: none;
  font-size: 1.2rem;
  &:focus {
    border-color: ${({ theme }) => theme.emphasis};
  }
`;

export const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem 0.6rem 1rem;
  width: fit-content;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.button};
  color: #eeeeee;
  cursor: pointer;
  &:active {
    background-color: ${({ theme }) => theme.clicked};
  }
`;

export const ErrorText = styled.div`
  min-height: 1.3rem;
  margin-top: 0.2rem;
  height: fit-content;
  color: #c10404;
  width: fit-content;
`;

export const ChangeSignButton = styled.button`
  padding: 0;
  margin: 1rem 0rem 1.2rem 0rem;
  border: none;
  background: none;
  color: ${({ theme }) => theme.button};
  cursor: pointer;
`;

export const GoogleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.stroke};
  width: 100%;
`;

export const GoogleButton = styled.button`
  display: flex;
  padding: 0.5rem 0.8rem;
  gap: 0.7rem;
  width: fit-content;
  height: 3rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  &:active {
    background-color: ${({ theme }) => theme.clicked};
  }
`;
export const GoogleButtonContent = styled.div`
  width: fit-content;
  height: 100%;
`;

export const GoogleButtonText = styled(GoogleButtonContent)`
  margin-top: 0.2rem;
  margin-right: 0.2rem;
  color: #eeeeee;
`;
