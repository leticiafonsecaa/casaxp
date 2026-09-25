import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Carregando tarefas...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>
        MINHAS TAREFAS
      </Text>

      <Text style={styles.title}>
        Bora cumprir as tarefas? 🚀
      </Text>

      <Text style={styles.subtitle}>
        Complete suas tarefas e acumule XP.
      </Text>

      {erro !== "" && (
        <View style={styles.errorCard}>
          <Text style={styles.error}>
            {erro}
          </Text>
        </View>
      )}

      {tarefas.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>
            📋
          </Text>

          <Text style={styles.emptyTitle}>
            Nenhuma tarefa por enquanto
          </Text>

          <Text style={styles.emptyText}>
            Quando uma tarefa for cadastrada,
            ela aparecerá aqui.
          </Text>
        </View>
      ) : (
        tarefas.map((tarefa) => (
          <View
            key={tarefa.id}
            style={styles.taskCard}
          >
            <View style={styles.taskHeader}>
              <View style={styles.taskIcon}>
                <Text style={styles.taskEmoji}>
                  🧹
                </Text>
              </View>

              <View style={styles.pointsBadge}>
                <Text style={styles.pointsText}>
                  +{tarefa.pontos} XP
                </Text>
              </View>
            </View>

            <Text style={styles.taskTitle}>
              {tarefa.titulo}
            </Text>

            {tarefa.descricao && (
              <Text style={styles.taskDescription}>
                {tarefa.descricao}
              </Text>
            )}

            <Pressable
              style={[
                styles.completeButton,
                concluindo === tarefa.id &&
                  styles.completeButtonDisabled,
              ]}
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
    </ScrollView>
  );
}