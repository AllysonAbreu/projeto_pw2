import React from 'react';
import Navbar from '../../components/Navbar/navbar';


import './about.css'

const username = "Fábio Bala"

const About: React.FC = () => {
  return (
    <div>
      <Navbar username={username}  userId=''/>
      <div className="page">
        <div className="aboutcontainer">
          <h2>Sobre o App</h2>
          <p>
           O nosso aplicativo é focado em cuidados com a saúde, oferecendo uma maneira fácil e prática para os usuários acompanharem as mudanças no seu peso, planejarem metas e seguirem um programa de exercícios.
         </p>
         <p>
           Com o nosso app, você pode definir uma meta de peso desejado e um prazo para alcançá-la. Além disso, pode definir um programa de exercícios personalizado para auxiliar no seu caminho para uma vida mais saudável.
        </p>
        </div>
      </div>
    </div>
  );
}

export default About;