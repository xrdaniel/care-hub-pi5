import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/healthTips.css";
import logo from "../assets/logo.png";

const HealthTipsPage = () => {
  const [aguaConsumida, setAguaConsumida] = useState(0);
  const [exercicioFeito, setExercicioFeito] = useState(0);
  const [todasDicas, setTodasDicas] = useState([]);
  const [dicasVisiveis, setDicasVisiveis] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [filtroEspecialidade, setFiltroEspecialidade] = useState("TODAS");
  const [metaAtingida, setMetaAtingida] = useState(null);
  const [popupDica, setPopupDica] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(5);


  const [metaAguaExibida, setMetaAguaExibida] = useState(false);
  const [metaExercicioExibida, setMetaExercicioExibida] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dicas-saude/listar")
      .then((res) => {
        const dicasOrdenadas = res.data.reverse();
        setTodasDicas(dicasOrdenadas);
        setDicasVisiveis(dicasOrdenadas.slice(0, 5));

        const especialidadesUnicas = [
          "TODAS",
          ...new Set(res.data.map((dica) => dica.especialidade)),
        ];
        setEspecialidades(especialidadesUnicas);
      })
      .catch((err) => console.error("Erro ao buscar dicas:", err));
  }, []);

  useEffect(() => {
    if (aguaConsumida >= 2 && !metaAguaExibida) {
      setMetaAtingida("Parabéns! 🎉 Você atingiu sua meta de água diária!");
      setMetaAguaExibida(true);
    }

    if (exercicioFeito >= 30 && !metaExercicioExibida) {
      setMetaAtingida("Ótimo trabalho! 🏆 Você completou seu tempo de exercícios!");
      setMetaExercicioExibida(true);
    }
  }, [aguaConsumida, exercicioFeito]);

  const dicasFiltradas =
    filtroEspecialidade === "TODAS"
      ? dicasVisiveis
      : dicasVisiveis.filter((dica) => dica.especialidade === filtroEspecialidade);

  const carregarMaisDicas = () => {
    const novoIndice = indiceAtual + 5;
    setIndiceAtual(novoIndice);
    setDicasVisiveis(todasDicas.slice(0, novoIndice));
  };

  return (
    <div className="health-tips-page">
      <header className="dashboard-header">
        <img src={logo} alt="Care Hub" className="logo" />
        <nav className="dashboard-nav">
          <a href="/dashboard">Dashboard</a>
          <a href="/emergencias">Emergências</a>
          <a href="/consultas">Consultas</a>
          <a href="/dicas-saude" className="active">Dicas de Saúde</a>
          <a href="/" className="logout" onClick={() => localStorage.removeItem("user")}>Sair</a>
        </nav>
      </header>

      <section className="tips-section">
        <div className="tips-container">
          <div className="tips-header">
            <h2>💡 Dicas de Saúde</h2>
            <select onChange={(e) => setFiltroEspecialidade(e.target.value)}>
              {especialidades.map((esp) => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </select>
          </div>

          <div className="tips-list">
            {dicasFiltradas.map((dica) => (
              <div key={dica.id} className="tip-card">
                <div className="tip-content">
                  <h3>{dica.titulo}</h3>
                  <p>{dica.descricao.length > 60 ? dica.descricao.substring(0, 60) + "..." : dica.descricao}</p>
                  <button onClick={() => setPopupDica(dica)}>Ler mais</button>
                </div>
              </div>
            ))}
          </div>

          {indiceAtual < todasDicas.length && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button onClick={carregarMaisDicas} className="ver-mais-btn">Ver mais</button>
            </div>
          )}
        </div>

        <div className="health-tracker">
          <h2>📊 Seu Progresso Diário</h2>

          <div className="monitor-box">
            <h3>💧 Consumo de Água</h3>
            <p>{aguaConsumida}L / 2L</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.min((aguaConsumida / 2) * 100, 100)}%` }}></div>
            </div>
            <div className="buttons">
              {[0.5, 1, 1.5, 2].map((qtd) => (
                <button key={qtd} onClick={() => setAguaConsumida(aguaConsumida + qtd)}>{qtd}L</button>
              ))}
            </div>
          </div>

          <div className="monitor-box">
            <h3>🏃 Exercícios</h3>
            <p>{exercicioFeito}min / 30min</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.min((exercicioFeito / 30) * 100, 100)}%` }}></div>
            </div>
            <div className="buttons">
              {[10, 20, 30].map((min) => (
                <button key={min} onClick={() => setExercicioFeito(exercicioFeito + min)}>{min}min</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popup de Meta Atingida */}
      {metaAtingida && (
        <div className="popup">
          <div className="popup-content">
            <h3>{metaAtingida}</h3>
            <button onClick={() => setMetaAtingida(null)}>OK</button>
          </div>
        </div>
      )}

      {/* Popup de Dica Completa */}
      {popupDica && (
        <div className="popup">
          <div className="popup-content">
            <h3>{popupDica.titulo}</h3>
            <p>{popupDica.descricao}</p>
            <button onClick={() => setPopupDica(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTipsPage;
