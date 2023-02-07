import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);

      // test com API OFF-LINE
      // const response = [
      //   { id: 1, nome: 'test1', email: 'asdasdasd@asd.com', Fotos: [] },
      //   { id: 2, nome: 'test2', email: 'asdasdasd@asd.com', Fotos: [] },
      // ];
      // setAlunos(response);
    }

    getData();
  }, []);
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>

      <AlunoContainer>
        {alunos.map((aluno) => {
          return (
            <div key={String(aluno.id)}>
              <ProfilePicture>
                {get(aluno, 'Fotos[0].url', false) ? (
                  <img
                    crossOrigin="anonymous"
                    src={aluno.Fotos[0].url}
                    alt=""
                  />
                ) : (
                  <FaUserCircle size={72} />
                )}
              </ProfilePicture>

              <span>{aluno.nome}</span>
              <span>{aluno.email}</span>

              <Link to={`/aluno/${aluno.id}/edit`}>
                <FaEdit size={22} />
              </Link>

              <Link to={`/aluno/${aluno.id}/edit`}>
                <FaWindowClose size={22} />
              </Link>
            </div>
          );
        })}
      </AlunoContainer>
    </Container>
  );
}
