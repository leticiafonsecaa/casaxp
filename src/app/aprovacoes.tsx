import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
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
      <View style={styles.container}>
        <ActivityIndicator size="large" />

        <Text style={styles.subtitle}>
          Carregando conclusões...
        </Text>
      </View>
    );
  }

  const pendentes = conclusoes.filter(
    (conclusao) => conclusao.aprovada === 0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Aprovações
      </Text>

      <Text style={styles.subtitle}>
        Confira as tarefas realizadas antes de liberar o XP.
      </Text>

      {erro !== "" && (
        <Text style={styles.error}>
          {erro}
        </Text>
      )}

      {pendentes.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            Nenhuma tarefa pendente
          </Text>

          <Text style={styles.emptyText}>
            Quando uma tarefa for concluída, ela aparecerá aqui para aprovação.
          </Text>
        </View>
      ) : (
        pendentes.map((conclusao) => (
          <View
            key={conclusao.id}
            style={styles.approvalCard}
          >
            <Text style={styles.taskTitle}>
              {conclusao.tarefa}
            </Text>

            <Text style={styles.userText}>
              Realizada por: {conclusao.usuario}
            </Text>

            <Pressable
              style={styles.approveButton}
              onPress={() => handleAprovar(conclusao.id)}
              disabled={aprovando === conclusao.id}
            >
              <Text style={styles.approveButtonText}>
                {aprovando === conclusao.id
                  ? "Aprovando..."
                  : "Aprovar tarefa"}
              </Text>
            </Pressable>
          </View>
        ))
      )}
    </View>
  );
}