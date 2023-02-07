import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 20px 0 0;

  label {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: baseline;
    margin: 0 0 20px;
  }

  input {
    width: 100%;
    height: 40px;
    font-size: 1.1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
    margin: 5px 0 0;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }

  button {
    width: 100%;
  }
`;
