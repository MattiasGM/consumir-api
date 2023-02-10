import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  margin: 30px 0 0;

  input {
    width: 100%;
    height: 40px;
    font-size: 1.1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
    margin: 10px 0;

    :focus {
      border: 1px solid ${colors.primaryColor};
    }
  }

  button {
    margin: 20px 0 0;
    width: 100%;
  }

  .input {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  .btn {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
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

export const EditFoto = styled.label`
  display: flex;
  width: 225px;
  cursor: pointer;
  filter: brightness(1.2);
  margin: 15px 20px 0 0;

  input {
    display: none;
  }

  img {
    width: 100%;
    border-radius: 50%;
  }
  .faUserCircle {
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 0.9);
    background: #fff;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.9);
  }

  .faEdit,
  .faEditBackground {
    display: none;
  }

  :hover {
    .faEdit {
      position: absolute;
      display: block;
      color: #fff;
      width: 24px;
      height: 24px;
      right: calc(50% - 14px);
      top: calc(50% - 14px);
    }
    .faEditBackground {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
    }
  }

  @media (max-width: 1000px) {
    width: 175px;
    margin: 0 0 20px 0;
  }
`;
