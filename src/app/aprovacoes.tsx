import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

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
  const [conclusoes, setConclusoes] = useState<Conclusao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [aprovando, setAprovando] = useState<number | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarConclusoes();
  }, []);

  async function carregarConclusoes() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await buscarConclusoes();

      setConclusoes(dados);
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
          Carregando aprovações...
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
        ÁREA DO RESPONSÁVEL
      </Text>

      <Text style={styles.title}>
        Aprovar tarefas ✅
      </Text>

      <Text style={styles.subtitle}>
        Confira o que foi realizado antes de liberar o XP.
      </Text>

      {erro !== "" && (
        <View style={styles.errorCard}>
          <Text style={styles.error}>
            {erro}
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
        <>
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>
              {pendentes.length}{" "}
              {pendentes.length === 1
                ? "tarefa aguardando"
                : "tarefas aguardando"}
            </Text>
          </View>

          {pendentes.map((conclusao) => (
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
                onPress={() => handleAprovar(conclusao.id)}
                disabled={aprovando === conclusao.id}
              >
                <Text style={styles.approveButtonText}>
                  {aprovando === conclusao.id
                    ? "Aprovando..."
                    : "Aprovar e liberar XP"}
                </Text>
              </Pressable>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}