import { Stack } from "expo-router";

export default function RootLayout() {
        <Stack initialRouteName="Index">
        <Stack.Screen name="Index" />
        <Stack.Screen name="LobbyScreen" />
      </Stack>
}
