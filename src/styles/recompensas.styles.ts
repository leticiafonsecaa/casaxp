import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 24,
  },

  title: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: "700",
    color: "#1F2937",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 23,
    color: "#6B7280",
  },

  rewardCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
  },

  rewardTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1F2937",
  },

  rewardDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
  },

  rewardCost: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
  },

  redeemButton: {
    marginTop: 18,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#2E7D32",
    alignItems: "center",
  },

  redeemButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  success: {
    marginTop: 16,
    fontSize: 14,
    color: "#2E7D32",
  },

  error: {
    marginTop: 16,
    fontSize: 14,
    color: "#B91C1C",
  },
});