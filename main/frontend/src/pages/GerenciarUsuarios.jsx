import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/gerenciarUsuarios.css";
import logo from "../assets/logo.png";

const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cargo, setCargo] = useState("usuario");
  const [mensagemErro, setMensagemErro] = useState("");
  const [edicoes, setEdicoes] = useState({});
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!admin || admin.cargo !== "admin") {
      navigate("/");
    } else {
      listarUsuarios();
    }
  }, []);

  const listarUsuarios = () => {
    axios
      .get("http://localhost:5000/api/users/listar")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  };

  const formatarCPF = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);
    return numeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  };

  const handleCadastroUsuario = (e) => {
    e.preventDefault();
    setMensagemErro("");
    const cpfLimpo = cpf.replace(/\D/g, "");
    const telefoneLimpo = telefone.replace(/\D/g, "");

    axios
      .post("http://localhost:5000/api/users/cadastrar", {
        cpf: cpfLimpo,
        nome,
        email,
        senha,
        telefone: telefoneLimpo,
        endereco,
        cargo,
      })
      .then(() => {
        alert("✅ Usuário cadastrado com sucesso!");
        setCpf(""); setNome(""); setEmail(""); setSenha(""); setTelefone(""); setEndereco(""); setCargo("usuario");
        listarUsuarios();
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          setMensagemErro(`⚠️ ${err.response.data.message}`);
        } else {
          setMensagemErro("❌ Erro ao cadastrar usuário. Tente novamente.");
        }
      });
  };

  const handleAlterarCargo = (email, novoCargo) => {
    setEdicoes((prev) => ({ ...prev, [email]: { cargo: novoCargo, alterado: true } }));
  };

  const handleSalvarCargo = (email) => {
    const novoCargo = edicoes[email]?.cargo;
    if (!novoCargo) return;

    axios
      .put("http://localhost:5000/api/users/atualizarCargo", {
        email,
        novoCargo,
        adminEmail: admin.email,
      })
      .then(() => {
        alert("✅ Cargo atualizado com sucesso!");
        setEdicoes((prev) => ({ ...prev, [email]: { cargo: novoCargo, alterado: false } }));
        listarUsuarios();
      })
      .catch((err) => {
        console.error("Erro ao atualizar cargo:", err);
        alert("Erro ao atualizar cargo");
      });
  };

  const handleExcluirUsuario = (email) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      axios
        .delete(`http://localhost:5000/api/users/deletar?email=${email}`)
        .then(() => {
          alert("Usuário excluído com sucesso!");
          listarUsuarios();
        })
        .catch((err) => {
          console.error("Erro ao excluir usuário:", err);
          alert("Erro ao excluir usuário");
        });
    }
  };

  return (
    <div className="gerenciar-usuarios-page">
      <header className="dashboard-header">
        <img src={logo} alt="Care Hub" className="logo" />
        <nav className="dashboard-nav">
          <a href="/dashboard-admin">Dashboard</a>
          <a href="/gerenciar-usuarios" className="active">Gerenciar Usuários</a>
          <a href="/visualizar-consultas">Consultas</a>
          <a href="/visualizar-emergencias">Emergências</a>
          <a href="/cadastro-dicas">Cadastrar Dicas</a>
          <a href="/cadastro-hospitais">Cadastrar Hospitais</a>
          <a href="/" className="logout" onClick={() => localStorage.removeItem("user")}>Sair</a>
        </nav>
      </header>

      <section className="usuarios-section">
        <h1>👥 Gerenciar Usuários</h1>
        <form className="form-cadastro" onSubmit={handleCadastroUsuario}>
          <h3>Cadastrar Novo Usuário</h3>
          {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}
          <input type="text" placeholder="CPF (000.000.000-00)" value={cpf} onChange={(e) => setCpf(formatarCPF(e.target.value))} maxLength={14} required />
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          <input type="text" placeholder="Telefone (ex: (11) 99999-9999)" value={telefone} onChange={(e) => setTelefone(formatarTelefone(e.target.value))} maxLength={15} required />
          <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
          <select value={cargo} onChange={(e) => setCargo(e.target.value)} required>
            <option value="usuario">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit">Cadastrar</button>
        </form>

        <div className="usuarios-lista">
          <h3>Lista de Usuários Cadastrados</h3>
          <ul>
            {usuarios.map((user) => (
              <li key={user.cpf} className="usuario-item">
                <div>
                  <strong>{user.nome}</strong> - {user.email}
                </div>
                <div className="user-cargo">
                  <select
                    value={edicoes[user.email]?.cargo || user.cargo}
                    onChange={(e) => handleAlterarCargo(user.email, e.target.value)}
                  >
                    <option value="usuario">Usuário</option>
                    <option value="admin">Administrador</option>
                  </select>

                  {edicoes[user.email]?.alterado && (
                    <button className="btn-salvar" onClick={() => handleSalvarCargo(user.email)}>Salvar</button>
                  )}

                  <button className="btn-excluir" onClick={() => handleExcluirUsuario(user.email)}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default GerenciarUsuarios;
