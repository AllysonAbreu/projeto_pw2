import React, { useContext, useState } from 'react';
import Button from '../Button/button';
import { CREDENCIAIS_INICIAIS_ERRO_STATE } from '../../../constants/initialError/initialError';
import { ToastifyContext } from '../../../contexts/toastify/toastify.context';
import { useRegistroPesoApi } from '../../../hooks/api/registroPeso/use-registroPeso-api.hooks';
import { TOASTIFY_STATE } from '../../../constants/toastify/toastify.constants';
import { INITIAL_WEIGHT } from '../../../constants/initialUser/initialUser';
import InputField from '../InputField/inputfield';

import './cardWeight.css'

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
  
  const [erro, setErro] = useState(
    CREDENCIAIS_INICIAIS_ERRO_STATE
  );
  const [novosRegistrosPeso, setNovosRegistrosPeso] = useState(INITIAL_WEIGHT);
  const { addToast } = useContext(ToastifyContext);
  const { removeRegister, updateRegister } = useRegistroPesoApi();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if(value) {
      setErro((currentState) => ({ ...currentState, [name]: '' }));
    };
    setNovosRegistrosPeso({...novosRegistrosPeso, [name]: value});
  };

  const handleUpdateRegistro = async (event:React.FormEvent) => {
    event.preventDefault();
    
    const inputCredenciaisAtualizadas = Object.entries(novosRegistrosPeso);
    const validateForm = inputCredenciaisAtualizadas.every(([_, value]) => value);

    inputCredenciaisAtualizadas.forEach(([key, value]) => {
      if (!value) {
        setErro((currentState) => ({
          ...currentState,
          [key]: 'Campo obrigatório',
        }));
      };
      return value;
    });

    if(validateForm) {
      try {
          await updateRegister(
            userId,
            novosRegistrosPeso.peso
          );
          addToast({
            title: 'Registro atualizado',
            message: `Registro atualizado com sucesso!`,
            type: TOASTIFY_STATE.SUCESSO,
            duration: 3000,
            show: true,
        });
      } catch (error:any) {
        setErro(error.response.data.message);
        addToast({
          title: 'Erro ao atualizar dados',
          message: `Verifique suas credenciais e tente novamente. Erro: ${erro}`,
          type: TOASTIFY_STATE.ERROR,
          duration: 10000,
          show: true,
        });
      };
    };
  };

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

  function renderUpdateRegistro() {
    return (
        <>
            <div className="input-container">
                <form className= "form-singup" onSubmit={handleUpdateRegistro}>
                    <div className="input-row">
                        <div className="input-row">
                            <div className="signup-gray-text">Novo registro peso</div>
                                <InputField
                                    type='number'
                                    placeholder="75.00"
                                    name='peso'
                                    value={novosRegistrosPeso.peso}
                                    onChange={handleInputChange}
                                />
                            </div>
                    </div>
                    <div className="button">
                        <Button
                        buttonColor="#03045E"
                        textColor="white"
                        buttonText="Atualizar"
                        width="320px"
                        height="35px"
                        fontSize="14px"
                        type='submit'
                        />
                    </div>
                </form>
            </div>
        </>
    );
  };

  return (
    <div className="card-weight" >
        <div className='text-content_weight'>
            <span className='card-weight__id'>{`Massa: ${cardData.peso}kg`}</span>
            <span className='card-weight__data_criacao'>{`Data inserção: ${cardData.dataCriacao}`}</span>
            <span className='card-weight__data_modificacao'>{`Data modificação${cardData.dataModificacao}`}</span>
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
                onClick={renderUpdateRegistro}
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
