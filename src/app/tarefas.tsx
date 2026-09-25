import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    Text,
    View,
} from "react-native";

import { buscarTarefas, concluirTarefa } from "@/services/api";
import { styles } from "@/styles/tarefas.styles";

type Tarefa = {
  id: number;
  titulo: string;
  descricao: string | null;
  pontos: number;
  usuario_id: number | null;
  usuario: string | null;
};

export default function Tarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [concluindo, setConcluindo] = useState<number | null>(null);

  const usuarioId = 1;

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      setCarregando(true);

      const dados = await buscarTarefas();

      setTarefas(dados);
    } catch (error) {
      setErro("Não foi possível carregar as tarefas.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleConcluirTarefa(tarefaId: number) {
    try {
      setConcluindo(tarefaId);
      setErro("");

      await concluirTarefa(tarefaId, usuarioId);

      await carregarTarefas();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível concluir a tarefa."
      );
    } finally {
      setConcluindo(null);
    }
  }

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />

        <Text style={styles.subtitle}>
          Carregando tarefas...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Minhas tarefas
      </Text>

      {erro !== "" && (
        <Text style={styles.error}>
          {erro}
        </Text>
      )}

      {tarefas.length === 0 ? (
        <Text style={styles.subtitle}>
          Nenhuma tarefa cadastrada.
        </Text>
      ) : (
        tarefas.map((tarefa) => (
          <View key={tarefa.id} style={styles.taskCard}>
            <Text style={styles.taskTitle}>
              {tarefa.titulo}
            </Text>

            {tarefa.descricao && (
              <Text style={styles.taskDescription}>
                {tarefa.descricao}
              </Text>
            )}

            <Text style={styles.taskPoints}>
              ⭐ {tarefa.pontos} XP
            </Text>

            <Pressable
              style={styles.completeButton}
              onPress={() => handleConcluirTarefa(tarefa.id)}
              disabled={concluindo === tarefa.id}
            >
              <Text style={styles.completeButtonText}>
                {concluindo === tarefa.id
                  ? "Enviando..."
                  : "Concluir tarefa"}
              </Text>
            </Pressable>
          </View>
        ))
      )}
    </View>
  );
}
