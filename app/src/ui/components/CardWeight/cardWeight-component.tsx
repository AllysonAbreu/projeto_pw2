import React, { useContext, useState } from 'react';
import Button from '../Button/button';
import { CREDENCIAIS_INICIAIS_ERRO_STATE } from '../../../constants/initialError/initialError';
import { ToastifyContext } from '../../../contexts/toastify/toastify.context';
import { useRegistroPesoApi } from '../../../hooks/api/registroPeso/use-registroPeso-api.hooks';
import { TOASTIFY_STATE } from '../../../constants/toastify/toastify.constants';
import { INITIAL_WEIGHT } from '../../../constants/initialUser/initialUser';
import InputField from '../InputField/inputfield';

import './cardWeight.css'
import { format, parseISO } from 'date-fns';
import UpdateCardWeight from './updateWeight';
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';
import { useNavigate } from 'react-router';

interface IProps {
  id:string;
  userId: string;
  peso: string;
  dataCriacao:string;
  dataModificacao:string;
};

const CardWeight: React.FC<IProps> = ({
    id,
    userId,
    peso,
    dataCriacao,
    dataModificacao
}) => {
  const cardData = {
    id,
    peso,
    dataCriacao,
    dataModificacao
  };
  const { addToast } = useContext(ToastifyContext);
  const { removeRegister, updateRegister } = useRegistroPesoApi();

  const handleDeleteRegistro = () => {
    removeRegister(parseInt(id))
    addToast({
      title: 'Registro removido',
      message: `Dados do registro foram removidos com sucesso!`,
      type: TOASTIFY_STATE.SUCESSO,
      duration: 3000,
      show: true,
    });
  };

  const navigate = useNavigate();

  const handleUpdateRegistro = () => {
    navigate(ROUTE_PATHS.UPDATE_WEIGHT, {state: {cardData}});
  };

  const formattedDataCriacao = format(parseISO(dataCriacao), 'dd/MM/yyyy HH:mm'); // Converter e formatar a data de criação
  const formattedDataModificacao = format(parseISO(dataModificacao), 'dd/MM/yyyy HH:mm'); // Converter e formatar a data de modificação

  return (
    <div className="card-weight" >
        <div className='text-content_weight'>
            <span className='card-weight__id'>{`Massa: ${cardData.peso}kg`}</span>
            <span className='card-weight__data_criacao'>{`Data inserção: ${formattedDataCriacao}`}</span>
            <span className='card-weight__data_modificacao'>{`Data modificação: ${formattedDataModificacao}`}</span>
        </div>
        <div className="button-group__card-weight">
            <div className='button-group__card-weight_update'>
                <Button
                buttonColor="#03045E"
                textColor="white"
                buttonText="Atualizar registro"
                width="350px"
                height="40px"
                fontSize="16px"
                onClick={handleUpdateRegistro}
                type='button'
                />
            </div>
            <div className='button-group__card-weight_remove'>
                <Button
                buttonColor="#03045E"
                textColor="white"
                buttonText="Remover registro"
                width="350px"
                height="40px"
                fontSize="16px"
                onClick={handleDeleteRegistro}
                type='button'
                />
            </div>

        </div>    
    </div>  
  );
};

export default CardWeight;
