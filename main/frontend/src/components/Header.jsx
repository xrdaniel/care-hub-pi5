
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="header-home">
      <div className="header-container-home">
        <img src={logo} alt="CareHub Logo" className="header-logo-home" />
      </div>
    </header>
  );
};

export default Header;
