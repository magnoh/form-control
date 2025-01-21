import Header from '../components/Header';
import Formulario from '../components/Formulario';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RelatorioPage from '../pages/RelatorioPage';
// import { Login } from '../pages/Login';

export const Routers = () => {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<Formulario />} />
                    <Route path="/relatorio" element={<RelatorioPage />} />
                    {/* <Route path='/authenticate' element={<Login />}/> */}
                </Routes>
            </div>
        </Router>
    )
}