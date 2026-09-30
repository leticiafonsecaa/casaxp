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
  buscarRecompensas,
  excluirRecompensa,
  resgatarRecompensa,
} from "@/services/api";

import { styles } from "@/styles/recompensas.styles";
// NOVO: reaproveita os estilos dos botões "Nova recompensa" e "Excluir"
import { styles as gerenciarStyles } from "@/styles/gerenciar-recompensas.styles";

type Recompensa = {
  id: number;
  nome: string;
  descricao: string | null;
  custo_xp: number;
};

export default function Recompensas() {
  const { usuario } = useUsuario();

  const isResponsavel = usuario.tipo === "RESPONSAVEL";

  const [recompensas, setRecompensas] = useState<Recompensa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [resgatando, setResgatando] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useFocusEffect(
    useCallback(() => {
      carregarRecompensas();
    }, [usuario.id])
  );

  async function carregarRecompensas() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await buscarRecompensas();

      setRecompensas(dados);
    } catch (error) {
      setErro("Não foi possível carregar as recompensas.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleResgatar(recompensaId: number) {
    // NOVO: proteção extra, o Responsável nunca resgata
    if (isResponsavel) {
      return;
    }

    try {
      setResgatando(recompensaId);
      setErro("");
      setMensagem("");

      await resgatarRecompensa(
        recompensaId,
        usuario.id
      );

      setMensagem(
        "Recompensa resgatada com sucesso! 🎉"
      );
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

  async function handleExcluirRecompensa(recompensaId: number) {
    if (!isResponsavel) {
      return;
    }

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta recompensa?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");
      setMensagem("");

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
      {/* NOVO: textos diferentes para cada perfil */}
      <Text style={styles.eyebrow}>
        {isResponsavel
          ? "GERENCIAR RECOMPENSAS"
          : "LOJA DE RECOMPENSAS"}
      </Text>

      <Text style={styles.title}>
        {isResponsavel
          ? "Recompensas da casa 🎁"
          : "Troque seu XP 🎁"}
      </Text>

      <Text style={styles.subtitle}>
        {isResponsavel
          ? "Adicione ou exclua as recompensas disponíveis."
          : "Use o XP que você conquistou para desbloquear recompensas."}
      </Text>

      {isResponsavel && (
        <Pressable
          style={gerenciarStyles.newRewardButton}
          onPress={() => router.push("/nova-recompensa")}
        >
          <Text style={gerenciarStyles.newRewardButtonText}>
            + Nova recompensa
          </Text>
        </Pressable>
      )}

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
            {isResponsavel
              ? "Toque em + Nova recompensa para cadastrar a primeira."
              : "Novas recompensas aparecerão aqui."}
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

            {/* NOVO: resgatar só para o Arthur */}
            {!isResponsavel && (
              <Pressable
                style={[
                  styles.redeemButton,
                  resgatando === recompensa.id &&
                    styles.redeemButtonDisabled,
                ]}
                onPress={() =>
                  handleResgatar(recompensa.id)
                }
                disabled={resgatando === recompensa.id}
              >
                <Text style={styles.redeemButtonText}>
                  {resgatando === recompensa.id
                    ? "Resgatando..."
                    : "Resgatar recompensa"}
                </Text>
              </Pressable>
            )}

            {isResponsavel && (
              <Pressable
                style={gerenciarStyles.deleteButton}
                onPress={() =>
                  handleExcluirRecompensa(recompensa.id)
                }
              >
                <Text style={gerenciarStyles.deleteButtonText}>
                  Excluir recompensa
                </Text>
              </Pressable>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}