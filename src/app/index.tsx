import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from "react-native";

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Olá, Letícia 👋
          </Text>

          <Text style={styles.title}>
            Vamos nessa!
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            L
          </Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        Suas tarefas de hoje estão esperando por você.
      </Text>

      <View style={styles.xpCard}>
        <View style={styles.xpTop}>
          <View>
            <Text style={styles.xpLabel}>
              SEU XP
            </Text>

            {carregando ? (
              <ActivityIndicator style={styles.loading} />
            ) : (
              <Text style={styles.xpValue}>
                {xp}
              </Text>
            )}
          </View>

          <View style={styles.starCircle}>
            <Text style={styles.star}>
              ⭐
            </Text>
          </View>
        </View>

        <Text style={styles.xpMessage}>
          Continue acumulando XP para desbloquear recompensas! 🚀
        </Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Minhas tarefas
        </Text>

        <Text style={styles.seeAll}>
          Ver todas
        </Text>
      </View>

      <View style={styles.taskCard}>
        <View style={styles.taskIcon}>
          <Text style={styles.taskEmoji}>
            🧽
          </Text>
        </View>

        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>
            Tarefas pendentes
          </Text>

          <Text style={styles.taskText}>
            Confira suas tarefas e ganhe XP.
          </Text>
        </View>

        <Text style={styles.arrow}>
          ›
        </Text>
      </View>

      <View style={styles.rewardCard}>
        <View style={styles.rewardIcon}>
          <Text style={styles.rewardEmoji}>
            🎁
          </Text>
        </View>

        <View style={styles.rewardInfo}>
          <Text style={styles.rewardTitle}>
            Recompensas
          </Text>

          <Text style={styles.rewardText}>
            Troque seu XP por prêmios.
          </Text>
        </View>

        <Text style={styles.arrow}>
          ›
        </Text>
      </View>
    </ScrollView>
  );
}