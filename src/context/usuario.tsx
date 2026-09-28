import { createContext, useContext, useState } from "react";

type TipoUsuario = "RESPONSAVEL" | "ADOLESCENTE";

type Usuario = {
  id: number;
  nome: string;
  tipo: TipoUsuario;
};

type UsuarioContextType = {
  usuario: Usuario;
  trocarUsuario: (usuario: Usuario) => void;
};

const UsuarioContext = createContext<UsuarioContextType | undefined>(
  undefined
);

const usuarioInicial: Usuario = {
  id: 1,
  nome: "Letícia",
  tipo: "RESPONSAVEL",
};

export function UsuarioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [usuario, setUsuario] = useState<Usuario>(usuarioInicial);

  function trocarUsuario(novoUsuario: Usuario) {
    setUsuario(novoUsuario);
  }

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        trocarUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const context = useContext(UsuarioContext);

  if (!context) {
    throw new Error(
      "useUsuario deve ser usado dentro de UsuarioProvider."
    );
  }

  return context;
}