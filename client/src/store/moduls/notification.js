import {
  GET_ALL_NOTES,
  ADD_NOTE,
  UPDATE_STATUS,
  DELETE_NOTE,
} from "./actions.type";

import {
  UPDATE_NOTES,
  CREATE_NOTE,
  STOP_LOADING,
  RUN_LOADING,
  REMOVE_NOTE,
  UPDATE_NOTE,
} from "./mutations.type";

export default {
  actions: {
    async [GET_ALL_NOTES](ctx) {
      try {
        ctx.commit(RUN_LOADING);
        const res = await fetch(`http://localhost:3080`);
        const data = await res.json();
        ctx.commit(UPDATE_NOTES, data);
        ctx.commit(STOP_LOADING);
      } catch (err) {
        console.log(err);
      }
    },
    async [ADD_NOTE](ctx, newNote) {
      try {
        console.log(newNote);
        await fetch("http://localhost:3080/new-notification", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(newNote),
        });
      } catch (err) {
        console.log(err);
      }
    },
    async [UPDATE_STATUS](ctx, id) {
      try {
        await fetch(`http://localhost:3080/update-notification/${id}`, {
          method: "PUT",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        });
      } catch (err) {
        console.log(err);
      }
    },
    async [DELETE_NOTE](ctx, id) {
      try {
        await fetch(`http://localhost:3080/delete-notification/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });
      } catch (err) {
        console.lo(err);
      }
    },
  },
  mutations: {
    [RUN_LOADING](state) {
      state.isLoading = true;
    },
    [STOP_LOADING](state) {
      // Просто показать что  есть загрузка
      setTimeout(() => (state.isLoading = false), 1000);
    },
    [UPDATE_NOTE](state, id) {
      let index = state.notes.findIndex((note) => note.noteId === id);
      state.notes[index].status = true;
    },
    [UPDATE_NOTES](state, notes) {
      state.notes = notes;
    },
    [CREATE_NOTE](state, newNote) {
      state.notes.unshift(newNote);
    },
    [REMOVE_NOTE](state, id) {
      console.log(id);
      state.notes = state.notes.filter((note) => {
        return note.noteId !== id;
      });
    },
  },
  state: {
    notes: [],
    isLoading: false,
    time: Date.now(),
  },
  getters: {
    allNotes(state) {
      return state.notes;
    },
    getLoading(state) {
      return state.isLoading;
    },
  },
};
