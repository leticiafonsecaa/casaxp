import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { criarTarefa } from "@/services/api";
import { styles } from "@/styles/nova-tarefa.styles";

export default function NovaTarefa() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pontos, setPontos] = useState("");
  // NOVO: por padrão a tarefa é diária
  const [diaria, setDiaria] = useState(true);

  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function handleCadastrar() {
    try {
      setErro("");
      setMensagem("");

      if (!titulo.trim()) {
        setErro("Digite o título da tarefa.");
        return;
      }

      if (!pontos.trim()) {
        setErro("Digite a quantidade de XP.");
        return;
      }

      const xp = Number(pontos);

      if (isNaN(xp) || xp <= 0) {
        setErro("Digite uma quantidade de XP válida.");
        return;
      }

      setSalvando(true);

      await criarTarefa({
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        pontos: xp,
        usuario_id: 3,
        diaria,
      });

      setTitulo("");
      setDescricao("");
      setPontos("");
      setDiaria(true);

      setMensagem("Tarefa cadastrada com sucesso! 🎉");
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível cadastrar a tarefa."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>
        NOVA TAREFA
      </Text>

      <Text style={styles.title}>
        Criar uma tarefa 📋
      </Text>

      <Text style={styles.subtitle}>
        Cadastre uma tarefa para o seu irmão realizar e ganhar XP.
      </Text>

      {mensagem !== "" && (
        <View style={styles.successCard}>
          <Text style={styles.successText}>
            {mensagem}
          </Text>
        </View>
      )}

      {erro !== "" && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>
            {erro}
          </Text>
        </View>
      )}

      <View style={styles.form}>
        <Text style={styles.label}>
          Título
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex.: Lavar a louça"
          placeholderTextColor="#9CA3AF"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>
          Descrição
        </Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ex.: Lavar e guardar toda a louça"
          placeholderTextColor="#9CA3AF"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <Text style={styles.label}>
          XP da tarefa
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex.: 20"
          placeholderTextColor="#9CA3AF"
          value={pontos}
          onChangeText={setPontos}
          keyboardType="numeric"
        />

        {/* NOVO: escolha entre tarefa diária e tarefa única */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
            marginBottom: 16,
          }}
        >
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={styles.label}>
              Tarefa diária
            </Text>

            <Text style={{ color: "#6B7280", fontSize: 13 }}>
              {diaria
                ? "Volta todos os dias."
                : "Tarefa única: some depois de concluída."}
            </Text>
          </View>

          <Switch
            value={diaria}
            onValueChange={setDiaria}
            trackColor={{ false: "#D1D5DB", true: "#2E7D32" }}
          />
        </View>

        <Pressable
          style={[
            styles.button,
            salvando && styles.buttonDisabled,
          ]}
          onPress={handleCadastrar}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              Cadastrar tarefa
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}