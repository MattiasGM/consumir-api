import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  margin: 50px 0 0;

  .input {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  .btn {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  input {
    width: 100%;
    height: 40px;
    font-size: 1.1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
    margin: 5px 0;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }

  button {
    width: 100%;
  }

  @media (max-width: 1000px) {
    .btn {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
    }
  }
`;

export const UserCircle = styled(FaUserCircle)`
  width: 256px;
  height: 200px;
  margin: 0 25px 0 0;
  cursor: pointer;
  filter: brightness(1.5);

  @media (max-width: 1000px) {
    width: 128px;
    height: 128px;
    display: flex;
    flex-flow: column wrap;
  }
`;
