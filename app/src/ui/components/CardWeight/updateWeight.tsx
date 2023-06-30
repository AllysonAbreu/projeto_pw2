import React, { useContext, useState } from 'react';
import Button from '../Button/button';
import { CREDENCIAIS_INICIAIS_ERRO_STATE } from '../../../constants/initialError/initialError';
import { ToastifyContext } from '../../../contexts/toastify/toastify.context';
import { useRegistroPesoApi } from '../../../hooks/api/registroPeso/use-registroPeso-api.hooks';
import { TOASTIFY_STATE } from '../../../constants/toastify/toastify.constants';
import { INITIAL_WEIGHT } from '../../../constants/initialUser/initialUser';
import InputField from '../InputField/inputfield';

import './cardWeight.css'
import { useLocation, useNavigate } from 'react-router';
import { ROUTE_PATHS } from '../../../constants/routesPaths/routePaths';


const UpdateCardWeight: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const cardData = location.state?.cardData; // Verificando se o state está definido
  console.log(cardData)
  const id = cardData?.id;
  console.log(id)
  const peso = cardData?.peso;
  
  const [erro, setErro] = useState(
    CREDENCIAIS_INICIAIS_ERRO_STATE
  );
  const [novosRegistrosPeso, setNovosRegistrosPeso] = useState(INITIAL_WEIGHT);
  const { addToast } = useContext(ToastifyContext);
  const { updateRegister } = useRegistroPesoApi();

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
            id,
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

  const handleBack = () => {
    navigate(ROUTE_PATHS.WEIGHT);
  };

  return (
    <div className='update-registro__container'>
        <div className="input-container__update_registro">
            <form className= "form-update_registro" onSubmit={handleUpdateRegistro}>
                    <div className="input-row__update-registro">
                        <div className="signup-gray-text">Novo registro peso</div>
                            <InputField
                                type='number'
                                defaultValue={peso}
                                name='peso'
                                value={novosRegistrosPeso.peso}
                                onChange={handleInputChange}
                            />
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
        <div className="button-container">
        <div className="button-voltar">
          <Button
          buttonColor="#03045E"
          textColor="white"
          buttonText="VOLTAR"
          width="320px"
          height="35px"
          fontSize="14px"
          onClick={handleBack}
          type='button'
          />
        </div>
    </div>
  </div>
  );
};

export default UpdateCardWeight;
