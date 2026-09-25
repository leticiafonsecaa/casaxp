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

  error: {
    fontSize: 14,
    lineHeight: 20,
    color: "#B91C1C",
  },

  pendingBadge: {
    alignSelf: "flex-start",
    marginTop: 24,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFF7E6",
  },

  pendingText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#D97706",
  },

  approvalCard: {
    marginTop: 14,
    padding: 20,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  taskIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
  },

  taskEmoji: {
    fontSize: 25,
    fontWeight: "700",
    color: "#2E7D32",
  },

  awaitingBadge: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
  },

  awaitingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },

  taskTitle: {
    marginTop: 17,
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
  },

  userText: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
  },

  userName: {
    fontWeight: "700",
    color: "#374151",
  },

  approveButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: "#2E7D32",
    alignItems: "center",
  },

  approveButtonDisabled: {
    opacity: 0.6,
  },

  approveButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  emptyCard: {
    marginTop: 28,
    padding: 28,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  emptyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2E7D32",
  },

  emptyTitle: {
    marginTop: 16,
    fontSize: 19,
    fontWeight: "800",
    color: "#1F2937",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
    textAlign: "center",
  },
});