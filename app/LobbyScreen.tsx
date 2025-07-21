import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { socket } from "../socket/socket";

export default function LobbyScreen() {
  const { lobbyId, username } = useLocalSearchParams<{ lobbyId: string, username: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);

  useEffect(() => {
    if (!lobbyId) return;

    socket.emit("joinLobby", { lobbyId, username });

    socket.on("chat", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat");
    };
  }, [lobbyId]);

  const sendMessage = () => {
    if (!lobbyId) return;
    if (!message.trim()) return;

    socket.emit("sendMessage", { lobbyId, sender: username, message });
    setMessage("");
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text>
            <Text style={{ fontWeight: "bold" }}>{item.sender}: </Text>
            {item.message}
          </Text>
        )}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
