<template>
  <div v-if="!note.status" class="container note_card">
    <div class="row">
        <div> {{ validDate(note._id) }}</div>
        <div> {{note.event}}</div>
        <div> <button class="btn danger" v-on:click="remove(note._id)"> Удалить </button></div>
    </div>
  </div>
  <div v-else class="container note_card-desabled">
    <div class="row">
        <div> {{ validDate(note._id) }}</div>
        <div> {{note.event}}</div>
        <div> <button class="btn danger" v-on:click="remove(note._id)"> Удалить </button></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import moment from "moment";
export default {
  data() {
    return {
      time: Date.now(),
    };
  },
  name: "NoteCard",
  props: {
    note: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(['validDate', 'getTime']),
    // countEndDate() {
    //   const now = moment(this.time);
    //   const end = moment(this.note.date);
    //   const duration = moment.duration(end.diff(now));
    //   const d = duration._data;
    //   const date = (d.days > 0 ? `${d.days}д` : "") + " " + (d.hours > 0 ? `${d.hours}ч` : "") + " " + (d.minutes > 0 ? `${d.minutes}мин` : "");
    //   if ( date.trim() === "" && d.seconds <= 0 ) {
    //     return "Событие началось";
    //   } else if (d.seconds > 0 && date.trim() === "") {
    //     return "Событие скоро начнется"
    //   }
    //   else {
    //     return date
    //   }

    // },
  },
  methods: {
    ...mapActions(['dateNoteFromDb', 'updateStatus']),
    ...mapMutations(['removeNote', 'setTime']),
    remove(id) {
      this.removeNote(id);
      this.dateNoteFromDb(id);
    },
    timer() {
      if (moment(this.note.date) >= moment(this.getTime)) {
        return setTimeout(() => {
          console.log('One minute')
          this.setTime;
          this.timer();
        }, 1000);
      }
    },
  },

  mounted() {
    this.timer();
    if (window.Notification && Notification.permission === "denied") {
      Notification.requestPermission()
    }
  },
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem auto;
}
.note_card-desabled,
.note_card {
  margin-top: 20px !important;
  border: 1px solid;
  border-radius: 8px;
  padding: 0.5rem 2rem;
  transition: 0.2s;
}

.note_card-desabled {
  background: #a5a5a7;
  color: white;
  border: 1px solid black;
}

.note_card-desabled .btn {
  border: 1px solid black;
  color: black;
  background: white;
}

.note_card-desabled .btn:hover {
  background: rgb(245, 232, 232);
  border: 1px solid black;
}

.note_card:hover {
  border: 1px solid #0ec4ed;
}

.btn {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
}

.danger {
  outline: none;
  transition: 0.3s;
  background: darkred;
  border: 1px solid white;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.danger:hover {
  background: rgb(223, 6, 6);
  border: 1px solid darkred;
}
</style>