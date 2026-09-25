import { Tabs } from "expo-router";
import { Text } from "react-native";

import { styles } from "@/styles/navigation.styles";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#2E7D32",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>
              🏠
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="tarefas"
        options={{
          title: "Tarefas",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>
              📋
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="aprovacoes"
        options={{
          title: "Aprovações",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>
              ✅
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="recompensas"
        options={{
          title: "Recompensas",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>
              🎁
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}