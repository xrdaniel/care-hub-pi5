import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UserDashboard from "../pages/UserDashboard";
import EmergencyPage from "../pages/EmergencyPage";
import ConsultationPage from "../pages/ConsultationPage";
import HealthTipsPage from "../pages/HealthTipsPage";
import DashboardAdmin from "../pages/DashboardAdmin";
import GerenciarUsuarios from "../pages/GerenciarUsuarios";
import VisualizarConsultas from "../pages/VisualizarConsultas";
import VisualizarEmergencias from "../pages/VisualizarEmergencias";
import CadastroDicas from "../pages/CadastroDicas";
import CadastroHospitais from "../pages/CadastroHospitais";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/emergencias" element={<EmergencyPage />} />
        <Route path="/consultas" element={<ConsultationPage />} />
        <Route path="/dicas-saude" element={<HealthTipsPage />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/gerenciar-usuarios" element={<GerenciarUsuarios />} />
        <Route path="/visualizar-consultas" element={<VisualizarConsultas />} />
        <Route path="/visualizar-emergencias" element={<VisualizarEmergencias />} />
        <Route path="/cadastro-dicas" element={<CadastroDicas />} />
        <Route path="/cadastro-hospitais" element={<CadastroHospitais />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
