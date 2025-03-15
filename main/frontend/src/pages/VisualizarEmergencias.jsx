import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/visualizarEmergencias.css";
import logo from "../assets/logo.png";

const VisualizarEmergencias = () => {
  const [emergencias, setEmergencias] = useState([]);
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!admin || admin.cargo !== "admin") {
      navigate("/");
      return;
    }

    axios.get("http://localhost:5000/api/emergencias/listar")
      .then((res) => setEmergencias(res.data))
      .catch((err) => console.error("Erro ao buscar emergências:", err));
  }, [navigate]);

  return (
    <div className="visualizar-emergencias">
      <header className="dashboard-header">
        <img src={logo} alt="Care Hub" className="logo" />
        <nav className="dashboard-nav">
          <a href="/dashboard-admin">Dashboard</a>
          <a href="/gerenciar-usuarios">Gerenciar Usuários</a>
          <a href="/visualizar-consultas">Consultas</a>
          <a href="/visualizar-emergencias" className="active">Emergências</a>
          <a href="/cadastro-dicas">Cadastrar Dicas</a>
          <a href="/cadastro-hospitais">Cadastrar Hospitais</a>
          <a href="/" className="logout" onClick={() => localStorage.removeItem("user")}>Sair</a>
        </nav>
      </header>

      <section className="emergencias-section">
        <h1>🚨 Emergências Registradas</h1>
        {emergencias.length > 0 ? (
          <table className="emergencias-table">
            <thead>
              <tr>
                <th>CPF</th>
                <th>Descrição</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {emergencias.map((e) => (
                <tr key={e.id}>
                  <td>{e.cpf_usuario}</td>
                  <td>{e.descricao}</td>
                  <td>{new Date(e.data_hora).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma emergência registrada.</p>
        )}
      </section>
    </div>
  );
};

export default VisualizarEmergencias;
