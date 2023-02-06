import styled from 'styled-components';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    flex-flow: row, nowrap;
    align-items: center;
    justify-content: space-around;
    padding: 5px 0;
  }
  div + div {
    border-top: 1px solid #eee;
  }
`;
export const ProfilePicture = styled.div`
  img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }
`;
