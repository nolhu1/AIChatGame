import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { socket } from "../socket/socket";

export default function HomeScreen() {
  const router = useRouter();
  const [lobbyName, setLobbyName] = useState("");
  const [lobbies, setLobbies] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("getLobbies"); // optional
    socket.on("lobbies", setLobbies);
    return () => {
      socket.off("lobbies");
    };
  }, []);

  const createLobby = () => {
    socket.emit("createLobby", lobbyName);
    setLobbyName("");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Lobbies</Text>
      <FlatList
        data={lobbies}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Button
            title={item}
            onPress={() => router.push({ pathname: "/LobbyScreen", params: { lobbyId: item } })}
          />
        )}
      />
      <TextInput
        value={lobbyName}
        onChangeText={setLobbyName}
        placeholder="Enter lobby name"
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />
      <Button title="Create Lobby" onPress={createLobby} />
    </View>
  );
}
