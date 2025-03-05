import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Desenvolvedores } from "./pages/desenvolvedores/desenvolvedores";
import { EditDesenvolvedor } from "./pages/desenvolvedores/edit-desenvolvedor";
import { Niveis } from "./pages/nivel/niveis";
import { EditNivel } from "./pages/nivel/edit-nivel";
import { NewNivel } from "./pages/nivel/new-nivel";
import { NewDesenvolvedor } from "./pages/desenvolvedores/new-desenvolvedor";
import { DesenvolvedoresNivel } from "./pages/desenvolvedores/desenvolvedores-nivel";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/desenvolvedores" />} />
        <Route path="/desenvolvedores" element={<Desenvolvedores />} />
        <Route
          path="/desenvolvedores/nivel/:id"
          element={<DesenvolvedoresNivel />}
        />
        <Route path="/desenvolvedores/new" element={<NewDesenvolvedor />} />
        <Route path="/desenvolvedores/:id" element={<EditDesenvolvedor />} />

        <Route path="/niveis" element={<Niveis />} />
        <Route path="/niveis/:id" element={<EditNivel />} />
        <Route path="/niveis/new" element={<NewNivel />} />
      </Routes>
    </BrowserRouter>
  );
}
