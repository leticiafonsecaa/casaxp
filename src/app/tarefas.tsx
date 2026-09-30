import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useUsuario } from "@/context/usuario";

import {
  buscarConclusoes,
  buscarTarefas,
  concluirTarefa,
  excluirTarefa,
} from "@/services/api";

import { styles } from "@/styles/tarefas.styles";
// NOVO: reaproveita o estilo do botão "+ Nova tarefa"
import { styles as aprovacoesStyles } from "@/styles/aprovacoes.styles";

type Tarefa = {
  id: number;
  titulo: string;
  descricao: string | null;
  pontos: number;
  usuario_id: number | null;
  usuario: string | null;
  diaria: number; // 1 = diária, 0 = única
};

type Conclusao = {
  id: number;
  tarefa_id: number;
  usuario_id: number;
  concluida_em: string;
  aprovada: number;
};

export default function Tarefas() {
  const { usuario } = useUsuario();

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [concluindo, setConcluindo] = useState<number | null>(null);

  const isResponsavel = usuario.tipo === "RESPONSAVEL";

  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [usuario.id])
  );

  function conclusaoEhDeHoje(dataConclusao: string) {
    const data = new Date(
      dataConclusao.replace(" ", "T") + "Z"
    );

    const hoje = new Date();

    return (
      data.getFullYear() === hoje.getFullYear() &&
      data.getMonth() === hoje.getMonth() &&
      data.getDate() === hoje.getDate()
    );
  }

  async function carregarTarefas() {
    try {
      setCarregando(true);
      setErro("");

      const dadosTarefas = await buscarTarefas();
      const dadosConclusoes = await buscarConclusoes();

      const tarefasVisiveis = dadosTarefas.filter(
        (tarefa: Tarefa) => {
          const conclusoesDaTarefa = dadosConclusoes.filter(
            (conclusao: Conclusao) =>
              conclusao.tarefa_id === tarefa.id
          );

          // Tarefa única já concluída: some para todo mundo
          if (tarefa.diaria === 0 && conclusoesDaTarefa.length > 0) {
            return false;
          }

          if (usuario.tipo === "ADOLESCENTE") {
            // Arthur vê somente as tarefas dele
            if (tarefa.usuario_id !== usuario.id) {
              return false;
            }

            // Tarefa diária já concluída hoje: some até amanhã
            const concluiuHoje = conclusoesDaTarefa.some(
              (conclusao: Conclusao) =>
                conclusao.usuario_id === usuario.id &&
                conclusaoEhDeHoje(conclusao.concluida_em)
            );

            if (concluiuHoje) {
              return false;
            }
          }

          return true;
        }
      );

      setTarefas(tarefasVisiveis);
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

      await concluirTarefa(tarefaId, usuario.id);

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

  async function handleExcluirTarefa(tarefaId: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      await excluirTarefa(tarefaId);

      await carregarTarefas();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir a tarefa."
      );
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
        {isResponsavel
          ? "GERENCIAR TAREFAS"
          : "MINHAS TAREFAS"}
      </Text>

      <Text style={styles.title}>
        {isResponsavel
          ? "Tarefas da casa 📋"
          : "Bora cumprir as tarefas? 🚀"}
      </Text>

      <Text style={styles.subtitle}>
        {isResponsavel
          ? "Crie, acompanhe e exclua as tarefas cadastradas."
          : "Complete suas tarefas e acumule XP."}
      </Text>

      {isResponsavel && (
        <Pressable
          style={aprovacoesStyles.newTaskButton}
          onPress={() => router.push("/nova-tarefa")}
        >
          <Text style={aprovacoesStyles.newTaskButtonText}>
            + Nova tarefa
          </Text>
        </Pressable>
      )}

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
            {isResponsavel ? "📋" : "🎉"}
          </Text>

          <Text style={styles.emptyTitle}>
            {isResponsavel
              ? "Nenhuma tarefa cadastrada"
              : "Tudo certo por hoje!"}
          </Text>

          <Text style={styles.emptyText}>
            {isResponsavel
              ? "Toque em + Nova tarefa para cadastrar a primeira."
              : "Você já concluiu todas as suas tarefas de hoje."}
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

            {isResponsavel && tarefa.usuario && (
              <Text style={styles.taskDescription}>
                Responsável pela tarefa: {tarefa.usuario}
              </Text>
            )}

            {!isResponsavel && (
              <Pressable
                style={[
                  styles.completeButton,
                  concluindo === tarefa.id &&
                    styles.completeButtonDisabled,
                ]}
                onPress={() =>
                  handleConcluirTarefa(tarefa.id)
                }
                disabled={concluindo === tarefa.id}
              >
                <Text style={styles.completeButtonText}>
                  {concluindo === tarefa.id
                    ? "Enviando..."
                    : "Concluir tarefa"}
                </Text>
              </Pressable>
            )}

            {isResponsavel && (
              <Pressable
                style={styles.deleteButton}
                onPress={() =>
                  handleExcluirTarefa(tarefa.id)
                }
              >
                <Text style={styles.deleteButtonText}>
                  Excluir tarefa
                </Text>
              </Pressable>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}