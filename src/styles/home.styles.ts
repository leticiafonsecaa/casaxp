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

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  greeting: {
    fontSize: 15,
    fontWeight: "500",
    color: "#6B7280",
  },

  title: {
    marginTop: 3,
    fontSize: 30,
    fontWeight: "800",
    color: "#17201A",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 19,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  subtitle: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
  },

  xpCard: {
    marginTop: 26,
    padding: 22,
    borderRadius: 24,
    backgroundColor: "#2E7D32",
  },

  xpTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  xpLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#DDEFE0",
  },

  xpValue: {
    marginTop: 3,
    fontSize: 42,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  loading: {
    marginTop: 12,
  },

  starCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  star: {
    fontSize: 25,
  },

  xpMessage: {
    marginTop: 13,
    fontSize: 13,
    lineHeight: 19,
    color: "#E8F5E9",
  },

  sectionHeader: {
    marginTop: 30,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#17201A",
  },

  seeAll: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2E7D32",
  },

  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 17,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },

  taskIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
  },

  taskEmoji: {
    fontSize: 23,
  },

  taskInfo: {
    flex: 1,
    marginLeft: 14,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  taskText: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },

  rewardCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    padding: 17,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },

  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFF7E6",
    alignItems: "center",
    justifyContent: "center",
  },

  rewardEmoji: {
    fontSize: 23,
  },

  rewardInfo: {
    flex: 1,
    marginLeft: 14,
  },

  rewardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  rewardText: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },

  arrow: {
    marginLeft: 8,
    fontSize: 28,
    fontWeight: "300",
    color: "#9CA3AF",
  },
});