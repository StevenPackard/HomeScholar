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
      socket.on("updateComments", (data) => {
        console.log("added comment commit.....");

        dispatch("getCommentsByPostId", data.postId);
        console.log("comment was added");
      });
    },

    joinPostRoom({ commit, dispatch }, postId) {
      console.log("joining room client side");
      socket.emit("dispatch", {
        action: "joinRoom",
        data: postId,
      });
    },

    addPost(data) {
      socket.emit("addPost", data);
    },

    addComment(data) {
      socket.emit("addComment", data);
    },

    leaveRoom({ commit, dispatch }, postId) {
      socket.emit("leave", { postId });
    },
  },
};
