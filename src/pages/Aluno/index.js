import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { FaEdit, FaUserCircle } from 'react-icons/fa';
import axios from '../../services/axios';
import history from '../../services/history';
import formValid from './validate';
import Loading from '../../components/Loading';
import { Container } from '../../styles/GlobalStyles';
import { Form, EditFoto } from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', 0);
  const [foto, setFoto] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/alunos/${id}`);

        setFoto(get(data, 'Fotos[0].url', ''));
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const errors = get(err, 'response.data.errors', []);

        if (errors.length > 0) errors.map((error) => toast.error(error));
        history.push('/');
      }
    }

    getData();
  }, [id]);

  const handleChange = async (e) => {
    const newFoto = e.target.files[0];
    const newFotoURL = URL.createObjectURL(newFoto);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', newFoto);

    try {
      setIsLoading(true);

      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFoto(newFotoURL);
      toast.success('Foto atualizada');

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      const { status } = get(err, 'response', '');
      toast.error('Error ao enviar foto');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = formValid(nome, sobrenome, email, idade, peso, altura);
    if (formErrors) return;

    try {
      setIsLoading(true);

      if (id) {
        // editando aluno
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado com sucesso.');
      } else {
        // criando novo aluno
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) criado com sucesso.');
        history.push(`/aluno/${data.id}/edit`);

        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else toast.error('Erro inesperado.');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar Aluno' : 'Novo Aluno'}</h1>

      <Form onSubmit={handleSubmit}>
        <div className="btn">
          {foto ? (
            <EditFoto htmlFor="foto">
              <img crossOrigin="anonymous" src={foto} alt="" />
              <div className="faEditBackground">
                <FaEdit className="faEdit" />
              </div>
              <input type="file" id="foto" onChange={handleChange} />
            </EditFoto>
          ) : (
            <EditFoto htmlFor="foto">
              <FaUserCircle className="faUserCircle" />
              <div className="faEditBackground">
                <FaEdit className="faEdit" />
              </div>
              <input type="file" id="foto" onChange={handleChange} />
            </EditFoto>
          )}

          <div className="input">
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
            />
            <input
              type="text"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              placeholder="Sobrenome"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="text"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              placeholder="Idade"
            />
            <input
              type="text"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Peso"
            />
            <input
              type="text"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              placeholder="Altura"
            />
          </div>
        </div>
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
