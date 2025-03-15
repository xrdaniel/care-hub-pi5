import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/loginBox.css";

const LoginBox = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsFlipped(!isFlipped);
    setErro("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, senha });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Salva usuário no localStorage
        setUser(response.data.user); // Atualiza estado
      }
    } catch (error) {
      setErro("Erro ao fazer login. Verifique seus dados.");
    }
  };

  useEffect(() => {
    if (user) {
      if (user.cargo === "admin") {
        navigate("/dashboard-admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (cpf.length !== 11) {
      setErro("CPF deve ter 11 dígitos.");
      return;
    }

    if (telefone.length !== 11) {
      setErro("O telefone deve ter 11 dígitos (DDD + número).");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/cadastrar", {
        cpf,
        nome,
        email: emailCadastro,
        senha: senhaCadastro,
        telefone,
        endereco: "Endereço temporário",
        cargo: "usuario",
      });

      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        setIsFlipped(false);
      }
    } catch (error) {
      setErro("Erro ao cadastrar. Verifique seus dados.");
    }
  };

  return (
    <div className="login-container">
      <div className={`login-box ${isFlipped ? "flipped" : ""}`}>
        {/* Lado do Login */}
        <div className="login-side">
          <h2 className="title">Faça seu login aqui</h2>
          {erro && <p className="error">{erro}</p>}
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            <button type="submit">Entrar</button>
          </form>
          <p className="toggle-text" onClick={toggleForm}>Não tem uma conta? <span>Cadastre-se</span></p>
        </div>

        {/* Lado do Cadastro */}
        <div className="register-side">
          <h2 className="title">Faça seu cadastro aqui</h2>
          {erro && <p className="error">{erro}</p>}
          <form onSubmit={handleCadastro}>
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value.replace(/\D/g, "").slice(0, 11))} required />
            <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value.replace(/\D/g, "").slice(0, 11))} required />
            <input type="email" placeholder="Email" value={emailCadastro} onChange={(e) => setEmailCadastro(e.target.value)} required />
            <input type="password" placeholder="Senha" value={senhaCadastro} onChange={(e) => setSenhaCadastro(e.target.value)} required />
            <button type="submit">Cadastrar</button>
          </form>
          <p className="toggle-text" onClick={toggleForm}>Já tem uma conta? <span>Faça login</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
