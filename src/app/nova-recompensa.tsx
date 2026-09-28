import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { criarRecompensa } from "@/services/api";
import { styles } from "@/styles/nova-recompensa.styles";

export default function NovaRecompensa() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [custoXp, setCustoXp] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function handleCadastrar() {
    try {
      setErro("");
      setMensagem("");

      if (!nome.trim()) {
        setErro("Digite o nome da recompensa.");
        return;
      }

      if (!custoXp.trim()) {
        setErro("Digite o custo em XP.");
        return;
      }

      const xp = Number(custoXp);

      if (isNaN(xp) || xp <= 0) {
        setErro("Digite uma quantidade de XP válida.");
        return;
      }

      setSalvando(true);

      await criarRecompensa({
        nome: nome.trim(),
        descricao: descricao.trim(),
        custo_xp: xp,
      });

      setNome("");
      setDescricao("");
      setCustoXp("");

      setMensagem("Recompensa cadastrada com sucesso! 🎉");
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível cadastrar a recompensa."
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
      <Text style={styles.eyebrow}>NOVA RECOMPENSA</Text>

      <Text style={styles.title}>
        Criar uma recompensa 🎁
      </Text>

      <Text style={styles.subtitle}>
        Cadastre algo que seu irmão poderá trocar usando o XP.
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
          Nome da recompensa
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex.: 1 hora de computador"
          placeholderTextColor="#9CA3AF"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>
          Descrição
        </Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ex.: Uma hora extra de computador"
          placeholderTextColor="#9CA3AF"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <Text style={styles.label}>
          Custo em XP
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex.: 100"
          placeholderTextColor="#9CA3AF"
          value={custoXp}
          onChangeText={setCustoXp}
          keyboardType="numeric"
        />

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
              Cadastrar recompensa
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}