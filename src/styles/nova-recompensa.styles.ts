import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 54,
    paddingBottom: 100,
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#2E7D32",
  },

  title: {
    marginTop: 7,
    fontSize: 29,
    lineHeight: 35,
    fontWeight: "800",
    color: "#17201A",
  },

  subtitle: {
    marginTop: 9,
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
  },

  successCard: {
    marginTop: 20,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#E8F5E9",
  },

  successText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E7D32",
  },

  errorCard: {
    marginTop: 20,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#FEECEC",
  },

  errorText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#B91C1C",
  },

  form: {
    marginTop: 28,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },

  input: {
    marginBottom: 20,
    paddingHorizontal: 16,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    fontSize: 15,
    color: "#1F2937",
  },

  textArea: {
    height: 110,
    paddingTop: 15,
    textAlignVertical: "top",
  },

  button: {
    marginTop: 4,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
