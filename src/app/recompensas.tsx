import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  buscarRecompensas,
  resgatarRecompensa,
} from "@/services/api";

import { styles } from "@/styles/recompensas.styles";

type Recompensa = {
  id: number;
  nome: string;
  descricao: string | null;
  custo_xp: number;
};

export default function Recompensas() {
  const [recompensas, setRecompensas] = useState<Recompensa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [resgatando, setResgatando] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const usuarioId = 1;

  useEffect(() => {
    carregarRecompensas();
  }, []);

  async function carregarRecompensas() {
    try {
      const dados = await buscarRecompensas();

      setRecompensas(dados);
    } catch (error) {
      setErro("Não foi possível carregar as recompensas.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleResgatar(recompensaId: number) {
    try {
      setResgatando(recompensaId);
      setErro("");
      setMensagem("");

      await resgatarRecompensa(recompensaId, usuarioId);

      setMensagem("Recompensa resgatada com sucesso! 🎉");
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível resgatar a recompensa."
      );
    } finally {
      setResgatando(null);
    }
  }

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Carregando recompensas...
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
        LOJA DE RECOMPENSAS
      </Text>

      <Text style={styles.title}>
        Troque seu XP 🎁
      </Text>

      <Text style={styles.subtitle}>
        Use o XP que você conquistou para desbloquear recompensas.
      </Text>

      {mensagem !== "" && (
        <View style={styles.successCard}>
          <Text style={styles.successIcon}>
            ✓
          </Text>

          <Text style={styles.successText}>
            {mensagem}
          </Text>
        </View>
      )}

      {erro !== "" && (
        <View style={styles.errorCard}>
          <Text style={styles.error}>
            {erro}
          </Text>
        </View>
      )}

      {recompensas.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>
            🎁
          </Text>

          <Text style={styles.emptyTitle}>
            Nenhuma recompensa disponível
          </Text>

          <Text style={styles.emptyText}>
            Novas recompensas aparecerão aqui.
          </Text>
        </View>
      ) : (
        recompensas.map((recompensa) => (
          <View
            key={recompensa.id}
            style={styles.rewardCard}
          >
            <View style={styles.rewardHeader}>
              <View style={styles.rewardIcon}>
                <Text style={styles.rewardEmoji}>
                  🎁
                </Text>
              </View>

              <View style={styles.costBadge}>
                <Text style={styles.costText}>
                  ⭐ {recompensa.custo_xp} XP
                </Text>
              </View>
            </View>

            <Text style={styles.rewardTitle}>
              {recompensa.nome}
            </Text>

            {recompensa.descricao && (
              <Text style={styles.rewardDescription}>
                {recompensa.descricao}
              </Text>
            )}

            <Pressable
              style={[
                styles.redeemButton,
                resgatando === recompensa.id &&
                  styles.redeemButtonDisabled,
              ]}
              onPress={() => handleResgatar(recompensa.id)}
              disabled={resgatando === recompensa.id}
            >
              <Text style={styles.redeemButtonText}>
                {resgatando === recompensa.id
                  ? "Resgatando..."
                  : "Resgatar recompensa"}
              </Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
  );
}