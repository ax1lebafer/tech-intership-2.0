import './App.css';
import { Header } from './components/Header';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes.ts';
import { ListPage } from './pages/ListPage';
import { FormPage } from './pages/FormPage';
import { ItemPage } from './pages/ItemPage';
import { Footer } from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.list} replace />} />
        <Route path={ROUTES.list} element={<ListPage />} />
        <Route path={ROUTES.form} element={<FormPage />} />
        <Route path={ROUTES.item} element={<ItemPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
