import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Desenvolvedores } from "./pages/desenvolvedores/desenvolvedores";
import { EditDesenvolvedor } from "./pages/desenvolvedores/edit-desenvolvedor";
import { Niveis } from "./pages/nivel/niveis";
import { EditNivel } from "./pages/nivel/edit-nivel";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/desenvolvedores" />} />
        <Route path="/desenvolvedores" element={<Desenvolvedores />} />
        <Route path="/desenvolvedores/:id" element={<EditDesenvolvedor />} />
        <Route path="/niveis" element={<Niveis />} />
        <Route path="/niveis/:id" element={<EditNivel />} />
      </Routes>
    </BrowserRouter>
  );
}
