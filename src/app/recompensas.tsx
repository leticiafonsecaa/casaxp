import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
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
      <View style={styles.container}>
        <ActivityIndicator size="large" />

        <Text style={styles.subtitle}>
          Carregando recompensas...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Recompensas 🎁
      </Text>

      <Text style={styles.subtitle}>
        Troque seu XP por recompensas.
      </Text>

      {mensagem !== "" && (
        <Text style={styles.success}>
          {mensagem}
        </Text>
      )}

      {erro !== "" && (
        <Text style={styles.error}>
          {erro}
        </Text>
      )}

      {recompensas.map((recompensa) => (
        <View
          key={recompensa.id}
          style={styles.rewardCard}
        >
          <Text style={styles.rewardTitle}>
            {recompensa.nome}
          </Text>

          {recompensa.descricao && (
            <Text style={styles.rewardDescription}>
              {recompensa.descricao}
            </Text>
          )}

          <Text style={styles.rewardCost}>
            ⭐ {recompensa.custo_xp} XP
          </Text>

          <Pressable
            style={styles.redeemButton}
            onPress={() => handleResgatar(recompensa.id)}
            disabled={resgatando === recompensa.id}
          >
            <Text style={styles.redeemButtonText}>
              {resgatando === recompensa.id
                ? "Resgatando..."
                : "Resgatar"}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}