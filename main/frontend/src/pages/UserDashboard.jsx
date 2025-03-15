import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/userDashboard.css";
import logo from "../assets/logo.png";
import dashUserImage from "../assets/dashuser.png"; // ✅ Importação da imagem

const UserDashboard = () => {
  const [consultas, setConsultas] = useState([]);
  const [emergencias, setEmergencias] = useState([]);
  const [dicas, setDicas] = useState([]);
  const [dicaAtual, setDicaAtual] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!usuario) {
      navigate("/");
      return;
    }

    axios
      .get(`http://localhost:5000/api/consultas/listar?cpf=${usuario.cpf}`)
      .then((res) => setConsultas(res.data))
      .catch((err) => console.error("Erro ao buscar consultas:", err));

    axios
      .get(`http://localhost:5000/api/emergencias/listar?cpf=${usuario.cpf}`)
      .then((res) => setEmergencias(res.data))
      .catch((err) => console.error("Erro ao buscar emergências:", err));

    axios
      .get("http://localhost:5000/api/dicas-saude/listar")
      .then((res) => {
        setDicas(res.data);
        if (res.data.length > 0) {
          setDicaAtual(res.data[0]);
        }
      })
      .catch((err) => console.error("Erro ao buscar dicas:", err));
  }, [usuario, navigate]);

  useEffect(() => {
    if (dicas.length > 0) {
      const interval = setInterval(() => {
        const indice = Math.floor(Math.random() * dicas.length);
        setDicaAtual(dicas[indice]);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [dicas]);

  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <img src={logo} alt="Care Hub" className="logo" />
        <nav className="dashboard-nav">
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
          <Link to="/emergencias" className={location.pathname === "/emergencias" ? "active" : ""}>Emergências</Link>
          <Link to="/consultas" className={location.pathname === "/consultas" ? "active" : ""}>Consultas</Link>
          <Link to="/dicas-saude" className={location.pathname === "/dicas-saude" ? "active" : ""}>Dicas de Saúde</Link>
          <Link to="/" onClick={() => localStorage.removeItem("user")}>Sair</Link>
        </nav>
      </header>

      {/* Seção de Boas-Vindas com Imagem */}
      <section className="welcome-section">
        <div className="welcome-text">
          <h1>👋 Bem-vindo, {usuario?.nome || "Usuário"}!</h1>
          <p>Acompanhe suas consultas, emergências e aproveite nossas dicas de saúde para uma vida melhor!</p>
        </div>
        <div className="welcome-image">
          <img src={dashUserImage} alt="Dashboard User" className="welcome-img" />
        </div>
      </section>

      {/* Resumo com 3 cards: Consultas, Dicas Aleatórias e Emergências */}
      <section className="summary-section">
        <div className="summary-card">
          <h2>📅 Consultas Agendadas</h2>
          {consultas.length > 0 ? (
            <ul>
              {consultas.map((consulta) => (
                <li key={consulta.id}>
                  <strong>{consulta.especialidade}</strong> - {new Date(consulta.data_hora).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>Você não tem consultas agendadas.</p>
          )}
        </div>

        <div className="summary-card dica-card">
          <h2>💡 Dica de Saúde</h2>
          {dicaAtual ? (
            <>
              <h4>{dicaAtual.titulo}</h4>
              <p>{dicaAtual.descricao}</p>
              <span><em>{dicaAtual.especialidade}</em></span>
            </>
          ) : (
            <p>Carregando dicas...</p>
          )}
        </div>

        <div className="summary-card">
          <h2>🚨 Emergências</h2>
          {emergencias.length > 0 ? (
            <ul>
              {emergencias.map((emergencia) => (
                <li key={emergencia.id}>
                  <strong>{emergencia.descricao}</strong> - {new Date(emergencia.data_hora).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>Você não tem emergências registradas.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
