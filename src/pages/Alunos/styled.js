import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  margin-top: 20px;
  background: #eee;
  padding: 0 5px;
  border-radius: 15px;

  div {
    display: flex;
    flex-flow: row, nowrap;
    align-items: center;
    justify-content: space-around;
    padding: 5px 0;
  }
  div + div {
    border-top: 1px solid #bbb;
  }

  @media (max-width: 600px) {
    font-size: 1.5rem;
    span {
      margin: 15px 0;
    }
  }
`;
export const ProfilePicture = styled.div`
  img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }

  @media (max-width: 600px) {
    img,
    .userCircle {
      display: none;
    }
  }
`;

export const NovoAluno = styled(Link)`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
  padding: 10px;
  margin: 10px auto 0;
  border-radius: 20px;
  border: none;
`;
