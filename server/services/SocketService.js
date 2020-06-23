import SocketIO from "socket.io";
import auth0provider from "@bcwdev/auth0provider";
class SocketService {
  io = SocketIO();
  /**
   * @param {SocketIO.Server} io
   */
  setIO(io) {
    try {
      this.io = io;
      this.rooms = {};
      //Server listeners
      io.on("connection", this._onConnect());
      io.on("join", (data) => this.joinRoom(data));
    } catch (e) {
      console.error("[SOCKETSTORE ERROR]", e);
    }
  }

  /**
   * @param {SocketIO.Socket} socket
   */
  async Authenticate(socket, bearerToken) {
    try {
      let user = await auth0provider.getUserInfoFromBearerToken(bearerToken);
      socket["user"] = user;
      socket.join(user.id);
      socket.emit("AUTHENTICATED");
      this.io.emit("UserConnected", user.id);
    } catch (e) {
      socket.emit("error", e);
    }
  }

  /**
   * @param {SocketIO.Socket} socket
   * @param {string} room
   */
  JoinRoom(socket, room) {
    socket.join(room);
  }
  /**
   * @param {SocketIO.Socket} socket
   * @param {string} room
   */
  LeaveRoom(socket, room) {
    socket.leave(room);
  }

  /**
   * Sends a direct message to a user
   * @param {string} userId
   * @param {string} eventName
   * @param {any} payload
   */
  messageUser(userId, eventName, payload) {
    try {
      this.io.to(userId).emit(eventName, payload);
    } catch (e) {}
  }

  messageRoom(room, eventName, payload) {
    this.io.to(room).emit(eventName, payload);
  }

  _onConnect() {
    return (socket) => {
      this._newConnection(socket);

      //STUB Register listeners

      socket.on("dispatch", this._onDispatch(socket));
      socket.on("disconnect", this._onDisconnect(socket));
    };
  }

  _addPost(data) {
    this.io.emit("addPost");
  }

  _addComment(postId) {
    this.io.emit("addComment", postId);
  }

  _onDisconnect(socket) {
    return () => {
      try {
        if (!socket.user) {
          return;
        }
        this.io.emit("UserDisconnected", socket.user.id);
      } catch (e) {}
    };
  }

  _onDispatch(socket) {
    console.log(socket);

    console.log("dispatching recived on the server");

    return (payload = {}) => {
      try {
        var action = this[payload.action];
        if (!action || typeof action != "function") {
          return socket.emit("error", "Unknown Action");
        }
        action.call(this, socket, payload.data);
      } catch (e) {}
    };
  }

  _newConnection(socket) {
    //Handshake / Confirmation of Connection
    socket.emit("CONNECTED", {
      socket: socket.id,
      message: "Successfully Connected",
    });
  }

  //NOTE MAY WORK MAY NOT GUESS WE WILL FIND OUT
  joinRoom(socket, data) {
    console.log("attempting to join the room");
    // NOTE made it to this point at least
    console.log("payload", data);
    socket.join(data);
    console.log("joined room");
  }

  addComment(data) {
    console.log("adding comment");
    console.log("comment postid", data.postId);
    console.log(JSON.stringify(data));
    this.io.in(data.postId).emit("updateComments", data);
  }
}

const socketService = new SocketService();

export default socketService;
