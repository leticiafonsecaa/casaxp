import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "@/styles/perfil.styles";

export default function Perfil() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>
        MEU PERFIL
      </Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            L
          </Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            Letícia
          </Text>

          <Text style={styles.role}>
            Responsável
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Administração
      </Text>

      <Text style={styles.sectionSubtitle}>
        Gerencie as tarefas e recompensas do CasaXP.
      </Text>

      <Pressable
        style={styles.optionCard}
        onPress={() => router.push("/aprovacoes")}
      >
        <View style={styles.optionIcon}>
          <Text style={styles.optionEmoji}>
            📋
          </Text>
        </View>

        <View style={styles.optionInfo}>
          <Text style={styles.optionTitle}>
            Gerenciar tarefas
          </Text>

          <Text style={styles.optionText}>
            Crie tarefas e aprove as concluídas.
          </Text>
        </View>

        <Text style={styles.arrow}>
          ›
        </Text>
      </Pressable>

      <Pressable
        style={styles.optionCard}
        onPress={() => router.push("/gerenciar-recompensas")}
      >
        <View style={styles.optionIcon}>
          <Text style={styles.optionEmoji}>
            🎁
          </Text>
        </View>

        <View style={styles.optionInfo}>
          <Text style={styles.optionTitle}>
            Gerenciar recompensas
          </Text>

          <Text style={styles.optionText}>
            Crie e organize as recompensas.
          </Text>
        </View>

        <Text style={styles.arrow}>
          ›
        </Text>
      </Pressable>

      <View style={styles.infoCard}>
        <Text style={styles.infoIcon}>
          ⭐
        </Text>

        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>
            CasaXP
          </Text>

          <Text style={styles.infoText}>
            Transformando as tarefas de casa
            em uma pequena competição.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}