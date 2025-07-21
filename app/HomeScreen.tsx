import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { socket } from "../socket/socket";

export default function HomeScreen() {
  const router = useRouter();
  const [lobbyName, setLobbyName] = useState("");
  const [lobbies, setLobbies] = useState<
    { id: string; users: number; maxHumans: number; isPrivate: boolean }[]
  >([]);

  const [maxHumans, setMaxHumans] = useState("4");
  const [maxBots, setMaxBots] = useState("1");
  const [isPrivate, setIsPrivate] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {
    socket.emit("getLobbies");
    socket.on("lobbies", setLobbies);
    return () => {
      socket.off("lobbies");
    };
  }, []);

  const createLobby = () => {
    if (!lobbyName.trim() || !usernameInput.trim()) return;

    socket.emit("createLobby", {
      lobbyId: lobbyName.trim(),
      maxHumans: parseInt(maxHumans),
      maxBots: parseInt(maxBots),
      isPrivate,
    });

    setLobbyName("");
    router.push({
      pathname: "/LobbyScreen",
      params: {
        lobbyId: lobbyName.trim(),
        username: usernameInput.trim(),
      },
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Lobbies
      </Text>

      <FlatList
        data={lobbies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={`${item.id} (${item.users}/${item.maxHumans}) ${item.isPrivate ? "[Private]" : ""}`}
            onPress={() => {
              if(usernameInput.trim() === "") {
                alert("Please enter a username before joining a lobby.");
                return;
              }
              // Navigate to LobbyScreen with lobbyId and username
              router.push({
                pathname: "/LobbyScreen",
                params: { lobbyId: item.id, username: usernameInput.trim() },
              })
            }
            }
          />
        )}
        style={{ marginBottom: 20 }}
      />

      <Text style={{ fontSize: 18, marginBottom: 5 }}>Your Username</Text>
      <TextInput
        value={usernameInput}
        onChangeText={setUsernameInput}
        placeholder="Enter your username"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text style={{ fontSize: 18, marginBottom: 5 }}>Create Lobby</Text>
      <TextInput
        value={lobbyName}
        onChangeText={setLobbyName}
        placeholder="Lobby name"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        value={maxHumans}
        onChangeText={setMaxHumans}
        placeholder="Max Humans"
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        value={maxBots}
        onChangeText={setMaxBots}
        placeholder="Max Bots"
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <Text>Private:</Text>
        <Switch value={isPrivate} onValueChange={setIsPrivate} style={{ marginLeft: 10 }} />
      </View>

      <Button title="Create Lobby" onPress={createLobby} />
    </View>
  );
}
