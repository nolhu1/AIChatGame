import { io } from "socket.io-client";
require("dotenv").config();
export const socket = io(process.env.SERVER_URL, {
      transports: ["websocket"],
});
