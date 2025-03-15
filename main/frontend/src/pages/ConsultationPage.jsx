
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/consultation.css";
import logo from "../assets/logo.png";

const ConsultationPage = () => {
  const [hospitais, setHospitais] = useState([]);
  const [hospitalSelecionado, setHospitalSelecionado] = useState("");
  const [especialidade, setEspecialidade] = useState("GERAL");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [popup, setPopup] = useState(false);
  const [erro, setErro] = useState("");
  const [consultasAgendadas, setConsultasAgendadas] = useState([]);

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("user"));
  const valorConsulta = "279.90";

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    } else {
      buscarHospitais();
      buscarConsultasUsuario();
    }
  }, []);

  const buscarHospitais = () => {
    axios.get("http://localhost:5000/api/hospitais/listar")
      .then((res) => setHospitais(res.data))
      .catch((err) => console.error("Erro ao buscar hospitais:", err));
  };

  const buscarConsultasUsuario = () => {
    axios.get(`http://localhost:5000/api/consultas/listar?cpf=${usuario.cpf}`)
      .then((res) => setConsultasAgendadas(res.data))
      .catch((err) => console.error("Erro ao buscar consultas:", err));
  };

  const validarDataHora = () => {
    const hoje = new Date();
    const dataSelecionada = new Date(data);
    const horaAtual = hoje.getHours();
    const minutosAtuais = hoje.getMinutes();

    if (dataSelecionada < hoje.setHours(0, 0, 0, 0)) {
      setErro("⚠️ A data da consulta deve ser no futuro!");
      return false;
    }

    if (dataSelecionada.getFullYear() !== 2025) {
      setErro("⚠️ O ano da consulta deve ser 2025!");
      return false;
    }

    if (dataSelecionada.toDateString() === hoje.toDateString()) {
      const [horaSelecionada, minutosSelecionados] = hora.split(":").map(Number);
      if (
        horaSelecionada < horaAtual ||
        (horaSelecionada === horaAtual && minutosSelecionados <= minutosAtuais)
      ) {
        setErro("⚠️ Se for hoje, a consulta deve ser pelo menos 1 hora à frente!");
        return false;
      }
    }

    setErro("");
    return true;
  };

  const handleMarcarConsulta = (e) => {
    e.preventDefault();
    if (!hospitalSelecionado) {
      setErro("⚠️ Selecione um hospital!");
      return;
    }

    if (!validarDataHora()) return;

    axios.post("http://localhost:5000/api/consultas/marcar", {
      cpf_usuario: usuario.cpf,
      hospital_id: hospitalSelecionado,
      especialidade,
      data_hora: `${data} ${hora}`,
      forma_pagamento: "PIX",
      valor: valorConsulta,
    })
    .then(() => {
      setPopup(true);
      setHospitalSelecionado("");
      setEspecialidade("GERAL");
      setData("");
      setHora("");
      buscarConsultasUsuario();
    })
    .catch(() => {
      setErro("❌ Erro ao marcar consulta. Tente novamente.");
    });
  };

  const handleCancelarConsulta = (id) => {
    if (window.confirm("Tem certeza que deseja cancelar esta consulta?")) {
      axios.delete(`http://localhost:5000/api/consultas/cancelar/${id}`)
        .then(() => {
          alert("✅ Consulta cancelada com sucesso!");
          buscarConsultasUsuario();
        })
        .catch(() => {
          alert("❌ Erro ao cancelar consulta.");
        });
    }
  };

  const handleFecharPopup = () => {
    setPopup(false);
  };

  return (
    <div className="consultation-page">
      <header className="dashboard-header">
        <img src={logo} alt="Care Hub" className="logo" />
        <nav className="dashboard-nav">
          <a href="/dashboard">Dashboard</a>
          <a href="/emergencias">Emergências</a>
          <a href="/consultas" className="active">Consultas</a>
          <a href="/dicas-saude">Dicas de Saúde</a>
          <a href="/" className="logout" onClick={() => localStorage.removeItem("user")}>Sair</a>
        </nav>
      </header>

      <section className="consultation-section">
        <h1>📅 Agendar Consulta</h1>
        <p>Selecione hospital, especialidade, data e horário.</p>
        {erro && <p className="error-msg">{erro}</p>}

        <form className="consultation-form" onSubmit={handleMarcarConsulta}>
          <select value={hospitalSelecionado} onChange={(e) => setHospitalSelecionado(e.target.value)} required>
            <option value="" disabled>Escolha um hospital</option>
            {hospitais.map((h) => (
              <option key={h.hospital_id} value={h.hospital_id}>{h.nome}</option>
            ))}
          </select>

          <select value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} required>
            <option value="GERAL">GERAL</option>
            <option value="CARDIOLOGIA">CARDIOLOGIA</option>
            <option value="DERMATOLOGIA">DERMATOLOGIA</option>
            <option value="PEDIATRIA">PEDIATRIA</option>
            <option value="ORTOPEDIA">ORTOPEDIA</option>
            <option value="GINECOLOGIA">GINECOLOGIA</option>
          </select>

          <div className="date-time-row">
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
            <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
          </div>

          <div className="consulta-valor">
            💰 Valor da Consulta: <strong>R$ {valorConsulta}</strong>
          </div>

          <button type="submit">Agendar Consulta</button>
        </form>
      </section>

      <section className="agendadas-section">
        <h2>📌 Suas Consultas Agendadas</h2>
        {consultasAgendadas.length > 0 ? (
          <ul className="consultas-list">
            {consultasAgendadas.map((c) => (
              <li key={c.id}>
                <div>
                  <strong>{c.especialidade}</strong> - {new Date(c.data_hora).toLocaleString()}
                </div>
                <button className="cancelar-btn" onClick={() => handleCancelarConsulta(c.id)}>Cancelar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Você ainda não tem consultas marcadas.</p>
        )}
      </section>

      {popup && (
        <div className="popup">
          <p>✅ Consulta agendada com sucesso!</p>
          <p>Pagamento no hospital no dia da consulta.</p>
          <button onClick={handleFecharPopup}>OK</button>
        </div>
      )}
    </div>
  );
};

export default ConsultationPage;
