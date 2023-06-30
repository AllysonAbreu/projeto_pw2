import userIcon from '../../../assets/images/user.png';
import './navbar.css';

interface NavbarProps {
  username: string;
  userId: string;
}

const Navbar: React.FC<NavbarProps> = ({ username, userId }) => {

  const nome = username ? username : 'Nome usuário'
  const imagem = userId ? userId : userIcon;

  return (
    <nav className="navbar">
      <div className="user-profile">
        <img src={imagem} alt="User Icon" className="user-icon" />
        <span className="username">{nome}</span>
      </div>
    </nav>
  );
};

export default Navbar;
