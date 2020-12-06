import moment from "moment";
export default {
  actions: {
    async fetchNotes(ctx) {
      try {
        ctx.commit("runLoading");
        const res = await fetch(`http://localhost:3080`);
        const data = await res.json();
        ctx.commit("updateNotes", data);
        ctx.commit("stopLoading");
      } catch (err) {
        console.log(err);
      }
    },
    async addNoteToDb(ctx, newNote) {
      try {
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
    async updateStatus(ctx, id) {
      try {
        await fetch(`http://localhost:3080/update-notification/${id}`, {
          method: "PUT",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        });
      } catch (err) {
        console.log(err);
      }
    },
    async dateNoteFromDb(ctx, id) {
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
    runLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      // Просто показать что  есть загрузка
      setTimeout(() => (state.isLoading = false), 1000);
    },
    updateNotes(state, notes) {
      state.notes = notes;
    },
    createNote(state, newNote) {
      state.notes.unshift(newNote);
    },
    removeNote(state, id) {
      state.notes = state.notes.filter((note) => {
        return note._id !== id;
      });
    },
    setTime: (state) => {
      state.time = Date.now();
    },
  },
  state: {
    notes: [],
    isLoading: false,
    time: Date.now(),
  },
  getters: {
    validDate: (state) => (id) => {
      const note = state.notes.find((note) => note._id === id);
      const now = moment(state.time);
      const end = moment(note.date);
      const duration = moment.duration(end.diff(now));
      const d = duration._data;
      console.log(duration);
      const date =
        (d.days > 0 ? `${d.days}д` : "") +
        " " +
        (d.hours > 0 ? `${d.hours}ч` : "") +
        " " +
        (d.minutes > 0 ? `${d.minutes}мин` : "");

      if (date.trim() === "" && d.seconds <= 0) {
        return "Событие началось";
      } else if (d.seconds > 0 && date.trim() === "") {
        return "Событие скоро начнется";
      } else {
        return date;
      }
    },
    allNotes: (state) => {
      return state.notes;
    },
    getLoading: (state) => {
      return state.isLoading;
    },
    getTime: (state) => {
      return state.time;
    },
  },
};
