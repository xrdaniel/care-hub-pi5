import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/visualizarConsultas.css";
import logo from "../assets/logo.png";

const VisualizarConsultas = () => {
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!admin || admin.cargo !== "admin") {
      navigate("/");
      return;
    }

    axios.get("http://localhost:5000/api/consultas/listar")
      .then((res) => setConsultas(res.data))
      .catch((err) => console.error("Erro ao buscar consultas:", err));
  }, [navigate]);

  return (
    <div className="visualizar-consultas">
      <header className="dashboard-header">
        <img src={logo} alt="Care Hub" className="logo" />
        <nav className="dashboard-nav">
          <a href="/dashboard-admin">Dashboard</a>
          <a href="/gerenciar-usuarios">Gerenciar Usuários</a>
          <a href="/visualizar-consultas" className="active">Consultas</a>
          <a href="/visualizar-emergencias">Emergências</a>
          <a href="/cadastro-dicas">Cadastrar Dicas</a>
          <a href="/cadastro-hospitais">Cadastrar Hospitais</a>
          <a href="/" className="logout" onClick={() => localStorage.removeItem("user")}>Sair</a>
        </nav>
      </header>

      <section className="consultas-section">
        <h1>📅 Consultas Marcadas</h1>
        {consultas.length > 0 ? (
          <table className="consultas-table">
            <thead>
              <tr>
                <th>CPF</th>
                <th>Especialidade</th>
                <th>Hospital</th>
                <th>Data/Hora</th>
                <th>Forma de Pagamento</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((c) => (
                <tr key={c.id}>
                  <td>{c.cpf_usuario}</td>
                  <td>{c.especialidade}</td>
                  <td>{c.hospital_id}</td>
                  <td>{new Date(c.data_hora).toLocaleString()}</td>
                  <td>{c.forma_pagamento}</td>
                  <td>R$ {parseFloat(c.valor).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma consulta registrada.</p>
        )}
      </section>
    </div>
  );
};

export default VisualizarConsultas;
