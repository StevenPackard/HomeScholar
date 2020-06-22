import io from "socket.io-client";

let socket = {};

export default {
  actions: {
    initalizeSocket({ commit, dispatch }) {
      //establish connection with socket
      socket = io("//localhost:3000");
      //   socket = io("//localhost:3000/posts/" + id);

      //Handle any on connection events
      socket.on("CONNECTED", (data) => {
        console.log("Connected to socket let the posting commence");
      });
      //register all listeners
      socket.on("delete", (data) => {
        commit("deleteProduct", data);
      });
      socket.on("addPost", (data) => {
        dispatch("getAllPosts");
        // commit("addPost", data);
      });
      socket.on("addComment", (postId) => {
        dispatch("getCommentsById", postId);
        console.log("comment was added");
      });
    },

    addPost(data) {
      socket.emit("addPost", data);
      // commit('addPost', data)
    },

    addComment(data) {
      socket.emit("addComment", data);
    },

    joinRoom({ commit, dispatch }, postId) {
      socket.emit("join", { postId });
    },

    leaveRoom({ commit, dispatch }, postId) {
      socket.emit("leave", { postId });
    },
  },
};
