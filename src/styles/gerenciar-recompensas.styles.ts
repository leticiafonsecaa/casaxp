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

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F8FA",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#6B7280",
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

  newRewardButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2E7D32",
    alignItems: "center",
  },

  newRewardButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E7D32",
  },

  rewardCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
  },

  rewardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rewardIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
  },

  rewardEmoji: {
    fontSize: 25,
  },

  costBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#FFF7E6",
  },

  costText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#D97706",
  },

  rewardTitle: {
    marginTop: 17,
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
  },

  rewardDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
  },

  deleteButton: {
    marginTop: 20,
    paddingVertical: 13,
    borderRadius: 15,
    backgroundColor: "#FEECEC",
    alignItems: "center",
  },

  deleteButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#B91C1C",
  },

  emptyCard: {
    marginTop: 28,
    padding: 26,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 34,
  },

  emptyTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
    textAlign: "center",
  },
});