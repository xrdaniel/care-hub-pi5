import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/dashboardAdmin.css";
import logo from "../assets/logo.png";

const DashboardAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [emergencias, setEmergencias] = useState([]);
  const [hospitais, setHospitais] = useState([]); // ✅ NOVO STATE
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!admin || admin.cargo !== "admin") {
      navigate("/");
      return;
    }

    axios.get("http://localhost:5000/api/users/listar")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));

    axios.get("http://localhost:5000/api/consultas/listar")
      .then((res) => setConsultas(res.data))
      .catch((err) => console.error("Erro ao buscar consultas:", err));

    axios.get("http://localhost:5000/api/emergencias/listar")
      .then((res) => setEmergencias(res.data))
      .catch((err) => console.error("Erro ao buscar emergências:", err));

    axios.get("http://localhost:5000/api/hospitais/listar") // ✅ NOVA REQUISIÇÃO
      .then((res) => setHospitais(res.data))
      .catch((err) => console.error("Erro ao buscar hospitais:", err));
  }, [navigate]);

  return (
    <div className="dashboard-admin">
      {/* Cabeçalho do Admin */}
      <header className="dashboard-header">
        <img src={logo} alt="Care Hub" className="logo" />
        <nav className="dashboard-nav">
          <a href="/dashboard-admin" className="active">Dashboard</a>
          <a href="/gerenciar-usuarios">Gerenciar Usuários</a>
          <a href="/visualizar-consultas">Consultas</a>
          <a href="/visualizar-emergencias">Emergências</a>
          <a href="/cadastro-dicas">Cadastrar Dicas</a>
          <a href="/cadastro-hospitais">Cadastrar Hospitais</a>
          <a href="/" className="logout" onClick={() => localStorage.removeItem("user")}>Sair</a>
        </nav>
      </header>

      {/* Conteúdo do Dashboard */}
      <section className="admin-summary">
        <h1>📊 Painel Administrativo</h1>
        <div className="summary-grid">
          <div className="summary-card">
            <h2>👥 Usuários Cadastrados</h2>
            <p>{usuarios.length}</p>
          </div>
          <div className="summary-card">
            <h2>📅 Consultas Marcadas</h2>
            <p>{consultas.length}</p>
          </div>
          <div className="summary-card">
            <h2>🚨 Emergências Registradas</h2>
            <p>{emergencias.length}</p>
          </div>
          <div className="summary-card">
            <h2>🏥 Hospitais Cadastrados</h2> {/*  NOVO CARD */}
            <p>{hospitais.length}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardAdmin;
