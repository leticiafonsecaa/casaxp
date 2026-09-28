import { router } from "expo-router";
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
  excluirRecompensa,
} from "@/services/api";

import { styles } from "@/styles/gerenciar-recompensas.styles";

type Recompensa = {
  id: number;
  nome: string;
  descricao: string | null;
  custo_xp: number;
};

export default function GerenciarRecompensas() {
  const [recompensas, setRecompensas] = useState<Recompensa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarRecompensas();
  }, []);

  async function carregarRecompensas() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await buscarRecompensas();

      setRecompensas(dados);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as recompensas."
      );
    } finally {
      setCarregando(false);
    }
  }

  async function handleExcluirRecompensa(recompensaId: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta recompensa?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      await excluirRecompensa(recompensaId);

      await carregarRecompensas();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir a recompensa."
      );
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
        ADMINISTRAÇÃO
      </Text>

      <Text style={styles.title}>
        Gerenciar recompensas 🎁
      </Text>

      <Text style={styles.subtitle}>
        Crie e organize as recompensas disponíveis para troca.
      </Text>

      <Pressable
        style={styles.newRewardButton}
        onPress={() => router.push("/nova-recompensa")}
      >
        <Text style={styles.newRewardButtonText}>
          + Nova recompensa
        </Text>
      </Pressable>

      {erro !== "" && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>
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
            Nenhuma recompensa cadastrada
          </Text>

          <Text style={styles.emptyText}>
            Cadastre uma recompensa para ela aparecer aqui.
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
              style={styles.deleteButton}
              onPress={() =>
                handleExcluirRecompensa(recompensa.id)
              }
            >
              <Text style={styles.deleteButtonText}>
                Excluir recompensa
              </Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
  );
}