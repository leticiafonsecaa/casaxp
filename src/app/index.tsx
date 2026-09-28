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
import { buscarUsuario } from "@/services/api";
import { styles } from "@/styles/home.styles";

export default function Home() {
  const { usuario } = useUsuario();

  const [xp, setXp] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregarUsuario();
    }, [usuario.id])
  );

  async function carregarUsuario() {
    try {
      setCarregando(true);

      const dadosUsuario = await buscarUsuario(usuario.id);

      setXp(dadosUsuario.xp);
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
            Olá, {usuario.nome} 👋
          </Text>

          <Text style={styles.title}>
            Vamos nessa!
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {usuario.nome.charAt(0)}
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

        <Pressable
          onPress={() => router.push("/tarefas")}
        >
          <Text style={styles.seeAll}>
            Ver todas
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.taskCard}
        onPress={() => router.push("/tarefas")}
      >
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
      </Pressable>

      <Pressable
        style={styles.rewardCard}
        onPress={() => router.push("/recompensas")}
      >
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
      </Pressable>
    </ScrollView>
  );
}