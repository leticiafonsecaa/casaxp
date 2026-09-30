import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { useUsuario } from "@/context/usuario";
import { styles } from "@/styles/perfil.styles";

export default function Perfil() {
  const { usuario, trocarUsuario } = useUsuario();

  const isResponsavel = usuario.tipo === "RESPONSAVEL";

  function selecionarLeticia() {
    trocarUsuario({
      id: 1,
      nome: "Letícia",
      tipo: "RESPONSAVEL",
    });
  }

  function selecionarArthur() {
    trocarUsuario({
      id: 3,
      nome: "Arthur",
      tipo: "ADOLESCENTE",
    });
  }

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
            {usuario.nome.charAt(0)}
          </Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            {usuario.nome}
          </Text>

          <Text style={styles.role}>
            {isResponsavel ? "Responsável" : "Adolescente"}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Trocar usuário
      </Text>

      <Text style={styles.sectionSubtitle}>
        Escolha quem está usando o CasaXP.
      </Text>

      <Pressable
        style={[
          styles.optionCard,
          usuario.id === 1 && styles.selectedOptionCard,
        ]}
        onPress={selecionarLeticia}
      >
        <View style={styles.optionIcon}>
          <Text style={styles.optionEmoji}>
            👩
          </Text>
        </View>

        <View style={styles.optionInfo}>
          <Text style={styles.optionTitle}>
            Letícia
          </Text>

          <Text style={styles.optionText}>
            Responsável
          </Text>
        </View>

        {usuario.id === 1 && (
          <Text style={styles.selectedIcon}>
            ✓
          </Text>
        )}
      </Pressable>

      <Pressable
        style={[
          styles.optionCard,
          usuario.id === 3 && styles.selectedOptionCard,
        ]}
        onPress={selecionarArthur}
      >
        <View style={styles.optionIcon}>
          <Text style={styles.optionEmoji}>
            👦
          </Text>
        </View>

        <View style={styles.optionInfo}>
          <Text style={styles.optionTitle}>
            Arthur
          </Text>

          <Text style={styles.optionText}>
            Adolescente
          </Text>
        </View>

        {usuario.id === 3 && (
          <Text style={styles.selectedIcon}>
            ✓
          </Text>
        )}
      </Pressable>

      {isResponsavel && (
        <>
          <Text style={styles.sectionTitle}>
            Administração
          </Text>

          <Text style={styles.sectionSubtitle}>
            Acesso rápido às áreas de gerenciamento do CasaXP.
          </Text>

    <Pressable
            style={styles.optionCard}
            onPress={() => router.push("/recompensas")}
          >
            <View style={styles.optionIcon}>
              <Text style={styles.optionEmoji}>
                🎁
              </Text>
            </View>

            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>
                Recompensas
              </Text>

              <Text style={styles.optionText}>
                {isResponsavel
                  ? "Veja e gerencie as recompensas."
                  : "Troque seu XP por prêmios."}
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </Pressable>

          <Pressable
            style={styles.optionCard}
            onPress={() => router.push("/tarefas")}
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
                Crie, veja e exclua as tarefas.
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </Pressable>

          <Pressable
            style={styles.optionCard}
            onPress={() => router.push("/aprovacoes")}
          >
            <View style={styles.optionIcon}>
              <Text style={styles.optionEmoji}>
                ✅
              </Text>
            </View>

            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>
                Aprovar tarefas
              </Text>

              <Text style={styles.optionText}>
                Aprove as tarefas concluídas e libere o XP.
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>
          </Pressable>

        </>
      )}

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