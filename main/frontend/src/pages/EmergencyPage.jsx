import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/emergency.css"; // Importando o CSS
import logo from "../assets/logo.png"; // Logo da Care Hub

const EmergencyPage = () => {
  const [emergencias, setEmergencias] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [hospitais, setHospitais] = useState([]);
  const [hospitalSelecionado, setHospitalSelecionado] = useState("");
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("user"));

  // Redireciona para login se não estiver logado
  useEffect(() => {
    if (!usuario) {
      navigate("/");
    } else {
      buscarEmergencias();
      buscarHospitais();
    }
  }, [usuario, navigate]);

  // Buscar emergências do usuário logado
  const buscarEmergencias = () => {
    axios
      .get(`http://localhost:5000/api/emergencias/listar?cpf=${usuario.cpf}`)
      .then((response) => setEmergencias(response.data))
      .catch((error) => console.error("Erro ao buscar emergências:", error));
  };

  // Buscar hospitais cadastrados
  const buscarHospitais = () => {
    axios
      .get("http://localhost:5000/api/hospitais/listar")
      .then((response) => setHospitais(response.data))
      .catch((error) => console.error("Erro ao buscar hospitais:", error));
  };

  // Criar nova emergência
  const handleCriarEmergencia = (e) => {
    e.preventDefault();

    if (!hospitalSelecionado) {
      alert("Por favor, selecione um hospital.");
      return;
    }

    axios
      .post("http://localhost:5000/api/emergencias/cadastrar", {
        cpf_usuario: usuario.cpf,
        descricao,
        hospital_id: hospitalSelecionado,
      })
      .then(() => {
        alert("Emergência registrada com sucesso!");
        setDescricao("");
        setHospitalSelecionado("");
        buscarEmergencias();
      })
      .catch((error) => console.error("Erro ao registrar emergência:", error));
  };

  return (
    <div className="emergency-page">
      {/* Cabeçalho */}
      <header className="dashboard-header">
        <img src={logo} alt="Care Hub" className="logo" />
        <nav className="dashboard-nav">
          <a href="/dashboard">Dashboard</a>
          <a href="/emergencias" className="active">Emergências</a>
          <a href="/consultas">Consultas</a>
          <a href="/dicas-saude">Dicas de Saúde</a>
          <a href="/" className="logout" onClick={() => localStorage.removeItem("user")}>Sair</a>
        </nav>
      </header>

      {/* Seção de Emergências */}
      <section className="emergency-section">
        <h1>🚨 Emergências</h1>
        <p>Registre uma emergência e acompanhe o status das suas ocorrências.</p>

        {/* Formulário de emergência */}
        <form className="emergency-form" onSubmit={handleCriarEmergencia}>
          {/* Escolher hospital */}
          <select
            value={hospitalSelecionado}
            onChange={(e) => setHospitalSelecionado(e.target.value)}
            required
          >
            <option value="">Selecione um hospital</option>
            {hospitais.map((hospital) => (
              <option key={hospital.hospital_id} value={hospital.hospital_id}>
                {hospital.nome}
              </option>
            ))}
          </select>

          {/* Descrição da emergência */}
          <textarea
            placeholder="Descreva sua emergência..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>

          <button type="submit">Registrar Emergência</button>
        </form>

        {/* Lista de Emergências */}
        <div className="emergency-list">
          <h2>📋 Suas Emergências Registradas</h2>
          {emergencias.length > 0 ? (
            <ul>
              {emergencias.map((emergencia) => (
                <li key={emergencia.id}>
                  <span>{emergencia.descricao}</span> - 
                  <span>{new Date(emergencia.data_hora).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>⚠️ Nenhuma emergência registrada ainda.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default EmergencyPage;
