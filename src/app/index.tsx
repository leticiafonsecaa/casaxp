import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { buscarUsuario } from "@/services/api";
import { styles } from "@/styles/home.styles";

export default function Home() {
  const [xp, setXp] = useState(0);
  const [carregando, setCarregando] = useState(true);

  const usuarioId = 1;

  useFocusEffect(
    useCallback(() => {
      carregarUsuario();
    }, [])
  );

  async function carregarUsuario() {
    try {
      setCarregando(true);

      const usuario = await buscarUsuario(usuarioId);

      setXp(usuario.xp);
    } catch (error) {
      console.log("Erro ao carregar usuário:", error);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Olá! 👋
      </Text>

      <Text style={styles.title}>
        CasaXP
      </Text>

      <Text style={styles.subtitle}>
        Organize suas tarefas e conquiste suas recompensas.
      </Text>

      <View style={styles.xpCard}>
        <Text style={styles.xpLabel}>
          Seu XP
        </Text>

        {carregando ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.xpValue}>
            {xp} XP ⭐
          </Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>
        Minhas tarefas
      </Text>

      <View style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>
          Nenhuma tarefa por enquanto
        </Text>

        <Text style={styles.emptyText}>
          Quando novas tarefas forem atribuídas, elas aparecerão aqui.
        </Text>
      </View>
    </View>
  );
}