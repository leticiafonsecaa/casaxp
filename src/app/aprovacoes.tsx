import { useFocusEffect } from "expo-router";
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
  aprovarConclusao,
  buscarConclusoes,
} from "@/services/api";

import { styles } from "@/styles/aprovacoes.styles";

type Conclusao = {
  id: number;
  tarefa_id: number;
  tarefa: string;
  usuario_id: number;
  usuario: string;
  concluida_em: string;
  aprovada: number;
  pontos?: number;
};

export default function Aprovacoes() {
  const { usuario } = useUsuario();

  const [conclusoes, setConclusoes] = useState<Conclusao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [aprovando, setAprovando] = useState<number | null>(null);
  const [erro, setErro] = useState("");

  const isResponsavel = usuario.tipo === "RESPONSAVEL";

  useFocusEffect(
    useCallback(() => {
      carregarConclusoes();
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

  async function carregarConclusoes() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await buscarConclusoes();

      if (isResponsavel) {
        setConclusoes(dados);
      } else {
        const minhasConclusoesHoje = dados.filter(
          (conclusao: Conclusao) =>
            conclusao.usuario_id === usuario.id &&
            conclusaoEhDeHoje(conclusao.concluida_em)
        );

        setConclusoes(minhasConclusoesHoje);
      }
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as conclusões."
      );
    } finally {
      setCarregando(false);
    }
  }

  async function handleAprovar(conclusaoId: number) {
    try {
      setAprovando(conclusaoId);
      setErro("");

      await aprovarConclusao(conclusaoId);

      await carregarConclusoes();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível aprovar a conclusão."
      );
    } finally {
      setAprovando(null);
    }
  }

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Carregando...
        </Text>
      </View>
    );
  }

  const pendentes = conclusoes.filter(
    (conclusao) => conclusao.aprovada === 0
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>
        {isResponsavel
          ? "ÁREA DO RESPONSÁVEL"
          : "MINHAS CONCLUSÕES"}
      </Text>

      <Text style={styles.title}>
        {isResponsavel
          ? "Aprovar tarefas ✅"
          : "Minhas tarefas 📝"}
      </Text>

      <Text style={styles.subtitle}>
        {isResponsavel
          ? "Confira o que foi realizado antes de liberar o XP."
          : "Confira as tarefas que você realizou hoje e o status da aprovação."}
      </Text>

      {erro !== "" && (
        <View style={styles.errorCard}>
          <Text style={styles.error}>
            {erro}
          </Text>
        </View>
      )}

      {conclusoes.length === 0 ? (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIconContainer}>
            <Text style={styles.emptyIcon}>
              {isResponsavel ? "✓" : "📝"}
            </Text>
          </View>

          <Text style={styles.emptyTitle}>
            {isResponsavel
              ? "Tudo em dia!"
              : "Nenhuma tarefa concluída hoje"}
          </Text>

          <Text style={styles.emptyText}>
            {isResponsavel
              ? "Não há tarefas aguardando aprovação no momento."
              : "Quando você concluir uma tarefa hoje, ela aparecerá aqui."}
          </Text>
        </View>
      ) : isResponsavel ? (
        <>
          {pendentes.length > 0 && (
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingText}>
                {pendentes.length}{" "}
                {pendentes.length === 1
                  ? "tarefa aguardando"
                  : "tarefas aguardando"}
              </Text>
            </View>
          )}

          {pendentes.length === 0 ? (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconContainer}>
                <Text style={styles.emptyIcon}>
                  ✓
                </Text>
              </View>

              <Text style={styles.emptyTitle}>
                Tudo em dia!
              </Text>

              <Text style={styles.emptyText}>
                Não há tarefas aguardando aprovação no momento.
              </Text>
            </View>
          ) : (
            pendentes.map((conclusao) => (
              <View
                key={conclusao.id}
                style={styles.approvalCard}
              >
                <View style={styles.cardTop}>
                  <View style={styles.taskIcon}>
                    <Text style={styles.taskEmoji}>
                      ✓
                    </Text>
                  </View>

                  <View style={styles.awaitingBadge}>
                    <Text style={styles.awaitingText}>
                      Aguardando
                    </Text>
                  </View>
                </View>

                <Text style={styles.taskTitle}>
                  {conclusao.tarefa}
                </Text>

                <Text style={styles.userText}>
                  Realizada por{" "}
                  <Text style={styles.userName}>
                    {conclusao.usuario}
                  </Text>
                </Text>

                <Pressable
                  style={[
                    styles.approveButton,
                    aprovando === conclusao.id &&
                      styles.approveButtonDisabled,
                  ]}
                  onPress={() =>
                    handleAprovar(conclusao.id)
                  }
                  disabled={aprovando === conclusao.id}
                >
                  <Text style={styles.approveButtonText}>
                    {aprovando === conclusao.id
                      ? "Aprovando..."
                      : "Aprovar e liberar XP"}
                  </Text>
                </Pressable>
              </View>
            ))
          )}
        </>
      ) : (
        <>
          {pendentes.length > 0 && (
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingText}>
                {/* NOVO: "em análise" no lugar de "aguardando aprovação" */}
                {pendentes.length}{" "}
                {pendentes.length === 1
                  ? "tarefa em análise"
                  : "tarefas em análise"}
              </Text>
            </View>
          )}

          {conclusoes.map((conclusao) => (
            <View
              key={conclusao.id}
              style={styles.approvalCard}
            >
              <View style={styles.cardTop}>
                <View style={styles.taskIcon}>
                  <Text style={styles.taskEmoji}>
                    {conclusao.aprovada === 1
                      ? "✓"
                      : "⏳"}
                  </Text>
                </View>

                <View style={styles.awaitingBadge}>
                  <Text style={styles.awaitingText}>
                    {/* NOVO: "Em análise" no lugar de "Aguardando" */}
                    {conclusao.aprovada === 1
                      ? "Aprovada"
                      : "Em análise"}
                  </Text>
                </View>
              </View>

              <Text style={styles.taskTitle}>
                {conclusao.tarefa}
              </Text>

              <Text style={styles.userText}>
                {conclusao.aprovada === 1
                  ? "✓ XP liberado"
                  : "⏳ Em análise pelo responsável"}
              </Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}