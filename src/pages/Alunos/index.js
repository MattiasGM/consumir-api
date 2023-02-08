import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';

import { toast } from 'react-toastify';
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

  const handleDeletAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelet = async (e, id, index) => {
    e.persist();

    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status');

      if (status === 401) {
        toast.error('Você precisa fazer login.');
      } else {
        toast.error('Ocorreu um erro ao excluir aluno');
      }
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>

      <AlunoContainer>
        {alunos.map((aluno, index) => {
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

              <Link onClick={handleDeletAsk} to={`/aluno/${aluno.id}/edit`}>
                <FaWindowClose size={22} />
              </Link>

              <FaExclamation
                size={22}
                display="none"
                cursor="pointer"
                onClick={(e) => handleDelet(e, aluno.id, index)}
              />
            </div>
          );
        })}
      </AlunoContainer>
    </Container>
  );
}
