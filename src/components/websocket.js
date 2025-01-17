import { Client as StompJsClient } from "@stomp/stompjs";
import eventBusGraphData from "./eventBusGraphData.js";

let client = null;

function setConnected(connected) {
  /*
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
  */
}

export function connectGraph(userId) {
  const webSocketUrl = import.meta.env.VITE_APP_WEBSOCKET_MATLAB;
  const subscribeTag = import.meta.env.VITE_APP_WEBSOCKET_SIMULATION;

  connect(userId, webSocketUrl, subscribeTag);
}

export function connectLobby(lobbyId) {
  const webSocketUrl = import.meta.env.VITE_APP_WEBSOCKET_LOBBY;
  const subscribeTag = import.meta.env.VITE_APP_WEBSOCKET_LOBBIES;

  connect(lobbyId, webSocketUrl, subscribeTag);
}

function connect(id, webSocketUrl, subscribeTag) {

  client = new StompJsClient({
    brokerURL: webSocketUrl,
    reconnectDelay: 5000,
    isTrusted: false,
  });

  client.onConnect = (frame) => {
    setConnected(true);
    console.log("Lobby Connected: " + frame);
    client.subscribe(`${subscribeTag}/${id}`, (lobby) => {
      checkMessage(JSON.parse(lobby.body));
      checkCoordinates(JSON.parse(lobby.body));
    });
  };

  client.onWebSocketError = (error) => {
    console.error("Lobby WebSocket error", error);
  };

  client.onStompError = (frame) => {
    console.error("Lobby Stomp error: " + frame.headers["message"]);
    console.error("Details: " + frame.body);
  };

  client.activate();
}

export function disconnect() {
  if (client !== null) {
    client.deactivate();
  }
  setConnected(false);
  console.log("All connections disconnected");
}

export function sendUserId(userId, lobbyId) {
  if (client !== null && client.connected) {
    client.publish({
      destination: "/app/simulation",
      body: JSON.stringify({ userId }),
    });
  } else if (graphClient !== null && graphClient.connected) {
    graphClient.publish({
      destination: "/app/simulation",
      body: JSON.stringify({ userId }),
    });
  } else {
    console.error("No active connection available to send message");
  }
}

export let websocketCoordinates = [];

function checkCoordinates(body) {
  if (body.message != undefined) return;
  // if (body.x && body.y) 
  // {
  //   const x = body.x;
  //   const y = body.y + 100;

    
  //   websocketCoordinates.push({ x, y });
    
  //   eventBusGraphData.emit('arrayUpdated', websocketCoordinates);
  // } 
  console.log(body);
  websocketCoordinates.push(body);
    
  eventBusGraphData.emit('arrayUpdated', websocketCoordinates);
  console.log("MessageBus triggered");
}

export function desperation()
{
  return websocketCoordinates;
}

function checkMessage(body) {
  if (body.message) 
  {
    console.log("Message: " + body.message);
    //showLobbies(body.message);
  } 
  else if (body.x && body.y) 
  {
   // console.log("Coords: " + body);
    //showCoords(body);

    

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

export function sendLobbyMessage(type, lobbyId, payload = {}) {
  if (client !== null && client.connected) {
    console.log(`Sending WebSocket message: ${type}`, { lobbyId, ...payload }); // Log het verzonden bericht
    client.publish({
      destination: `/app/lobby/${lobbyId}`,
      body: JSON.stringify({ type, lobbyId, ...payload }),
    });
  } else {
    console.error("No active WebSocket connection to send message");
  }
}