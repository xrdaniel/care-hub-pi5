import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginBox from "../components/LoginBox";
import "../styles/home.css";
import sectionImage2 from "../assets/section2.png";
import sectionImage3 from "../assets/section3.png";

const Home = () => {
  return (
    <div className="home">
      <Header />

      {/* Primeira Section - Background com imagem */}
      <section className="hero">
        <div className="hero-text">
          <h1>Cuide da sua saúde com facilidade</h1>
          <p>Aqui você pode marcar consultas, emergências e acompanhar sua saúde.</p>
        </div>
        <LoginBox />
      </section>

      {/* Section 2 - Agendamentos rápidos */}
      <section className="info">
        <div className="info-content">
          <div className="text">
            <h2>Agendamentos rápidos</h2>
            <p>Marque consultas de forma simples e prática.</p>
          </div>
          <div className="image-container">
            <img src={sectionImage2} alt="Agendamentos rápidos" className="info-image" />
          </div>
        </div>
      </section>

      {/* Section 3 - Hospitais de confiança */}
      <section className="info2">
        <div className="info-content reverse">
          <div className="text">
            <h2>Hospitais de confiança</h2>
            <p>Escolha entre os melhores hospitais da região.</p>
          </div>
          <div className="image-container">
            <img src={sectionImage3} alt="Hospitais de confiança" className="info-image" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
