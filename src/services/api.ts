const API_URL = "http://localhost:3000";

export async function buscarTarefas() {
  const resposta = await fetch(`${API_URL}/tarefas`);

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar as tarefas.");
  }

  return resposta.json();
}

export async function concluirTarefa(
  tarefaId: number,
  usuarioId: number
) {
  const resposta = await fetch(`${API_URL}/conclusoes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tarefa_id: tarefaId,
      usuario_id: usuarioId,
    }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.erro || "Não foi possível concluir a tarefa.");
  }

  return dados;
}

export async function buscarConclusoes() {
  const resposta = await fetch(`${API_URL}/conclusoes`);

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar as conclusões.");
  }

  return resposta.json();
}

export async function aprovarConclusao(conclusaoId: number) {
  const resposta = await fetch(
    `${API_URL}/conclusoes/${conclusaoId}/aprovar`,
    {
      method: "PATCH",
    }
  );

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.erro || "Não foi possível aprovar a conclusão.");
  }

  return dados;
}

export async function buscarUsuario(usuarioId: number) {
  const resposta = await fetch(`${API_URL}/usuarios/${usuarioId}`);

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar o usuário.");
  }

  return resposta.json();
}

export async function buscarRecompensas() {
  const resposta = await fetch(`${API_URL}/recompensas`);

  if (!resposta.ok) {
    throw new Error("Não foi possível buscar as recompensas.");
  }

  return resposta.json();
}

export async function resgatarRecompensa(
  recompensaId: number,
  usuarioId: number
) {
  const resposta = await fetch(`${API_URL}/resgates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recompensa_id: recompensaId,
      usuario_id: usuarioId,
    }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      dados.erro || "Não foi possível resgatar a recompensa."
    );
  }

  return dados;
}

export async function criarTarefa(dados: {
  titulo: string;
  descricao: string;
  pontos: number;
  usuario_id: number;
  diaria: boolean;
}) {
  const resposta = await fetch(`${API_URL}/tarefas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      resultado.erro || "Não foi possível cadastrar a tarefa."
    );
  }

  return resultado;
}

export async function excluirTarefa(tarefaId: number) {
  const resposta = await fetch(
    `${API_URL}/tarefas/${tarefaId}`,
    {
      method: "DELETE",
    }
  );

  const texto = await resposta.text();

  console.log("DELETE STATUS:", resposta.status);
  console.log("DELETE RESPOSTA:", texto);

  if (!resposta.ok) {
    throw new Error(
      "Não foi possível excluir a tarefa."
    );
  }

  return true;
}

export async function criarRecompensa(dados: {
  nome: string;
  descricao: string;
  custo_xp: number;
}) {
  const resposta = await fetch(`${API_URL}/recompensas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      resultado.erro || "Não foi possível cadastrar a recompensa."
    );
  }

  return resultado;
}

export async function excluirRecompensa(
  recompensaId: number
) {
  const resposta = await fetch(
    `${API_URL}/recompensas/${recompensaId}`,
    {
      method: "DELETE",
    }
  );

  const texto = await resposta.text();

  if (!resposta.ok) {
    throw new Error(
      "Não foi possível excluir a recompensa."
    );
  }

  return texto;
}