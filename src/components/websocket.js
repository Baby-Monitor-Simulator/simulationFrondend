import SockJS from "sockjs-client";
import { Client as StompJsClient } from "@stomp/stompjs";

let stompClient = null;

function setConnected(connected) {
  document.getElementById("connect").disabled = connected;
  document.getElementById("disconnect").disabled = !connected;
  if (connected) {
    document.getElementById("lobbyTraffic").style.display = "block";
    document.getElementById("simCoords").style.display = "block";
  } else {
    document.getElementById("lobbyTraffic").style.display = "none";
    document.getElementById("simCoords").style.display = "none";
  }
  document.getElementById("lobbies").innerHTML = "";
  document.getElementById("coords").innerHTML = "";
}

export function connect(userId) {
  console.log("hiero " + userId);
  const webSocketUrl = "ws://localhost:8080/ws-lobby";

  // Initialize stompClient using the `Client` class, pointing directly to the WebSocket URL.
  stompClient = new StompJsClient({
    brokerURL: webSocketUrl,
    reconnectDelay: 5000, // Auto-reconnect after 5 seconds
    //heartbeatIncoming: 4000, // Heartbeat every 4 seconds
    //heartbeatOutgoing: 4000,
    isTrusted: false,
  });

  stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log("Connected: " + frame);
    stompClient.subscribe(`/lobby/${userId}`, (lobby) => {
      checkMessage(JSON.parse(lobby.body));
    });
  };

  stompClient.onWebSocketError = (error) => {
    console.error("WebSocket error", error);
  };

  stompClient.onStompError = (frame) => {
    console.error("Stomp error: " + frame.headers["message"]);
    console.error("Details: " + frame.body);
  };

  stompClient.activate();
}

export function disconnect() {
  if (stompClient !== null) {
    stompClient.deactivate();
  }
  setConnected(false);
  console.log("Disconnected");
}

export function sendUserId(userId) {
  stompClient.publish({
    destination: "/app/simulation",
    body: JSON.stringify({ userId }),
  });
}

function checkMessage(body) {
  if (body.message) {
    console.log("Message: " + body.message);
    showLobbies(body.message);
  } else if (body.x && body.y) {
    console.log("Coords: " + body);
    showCoords(body);
  } else {
    console.error("Unknown message received");
  }
}

function showLobbies(message) {
  const lobbies = document.getElementById("lobbies");
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.textContent = message;
  row.appendChild(cell);
  lobbies.appendChild(row);
}

function showCoords(body) {
  const coords = document.getElementById("coords");
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.textContent = `X: ${body.x} Y: ${body.y}`;
  row.appendChild(cell);
  coords.appendChild(row);
}