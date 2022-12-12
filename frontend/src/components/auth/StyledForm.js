import styled from 'styled-components';

export const StyledForm = styled.form`
  max-width: 22rem;
  width: 100%;
  margin: 8.5rem auto;
  padding: 2rem;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;

  h2 {
    margin-bottom: 1rem;
  }

  button,
  input {
    height: 2.2rem;
    width: 100%;
    padding: 0.5rem;
    outline: none;
    border-radius: 0.5rem;
    border: 1px solid rgb(220, 220, 220);
    margin-bottom: 1rem;

    &:focus {
      border: 1px solid rgb(0, 208, 255);
    }
  }

  button {
    cursor: pointer;

    &:focus {
      border: none;
    }
  }

  p {
    font-size: 1rem;
    color: red;
  }
`;
