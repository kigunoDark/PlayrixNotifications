<template>
  <div v-if="!note.status" class="container note_card">
    <div class="row">
        <div> {{ dateToString }}</div>
        <div> {{ note.event }}</div>
        <div>
          <button class="btn danger" v-on:click="remove(note.noteId)"> Удалить </button>
          <button v-if="dateToString ==='Событие началось'"
                  class="btn update"
                  v-on:click="changeState(note.noteId)">
                  Начать </button>
        </div>
    </div>
  </div>
  <div v-else class="container note_card-desabled">
    <div class="row">
        <div> {{ dateToString }}</div>
        <div> {{ note.event }}</div>
        <div> <button class="btn danger" v-on:click="remove(note.noteId)"> Удалить </button></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { formatStringToDate } from '../../lib/dateValidation';

export default {
  data() {
    return {
      time: Date.now(),
      isActive: true,
    };
  },
  name: "NoteCard",
  props: {
    note: {
      type: Object,
    },
  },
  computed: {
    dateToString() {
      const now = this.$moment(this.time);
      const end = this.$moment(this.note.date);
      const duration = this.$moment.duration(end.diff(now));
      return formatStringToDate(duration);
    }
  },
  watch: {
    dateToString(val) {
      if(val === 'Событие началось') {
        new Notification(this.note.event, {
          body: 'Событие началось, поспешите!' ,
        })
      }
      this.timer();
    }
  },
  methods: {
    ...mapActions(['deleteNoteFromDb', 'updateStatus']),
    ...mapMutations(['removeNote', 'updateNote']),
    remove(id) {
      this.removeNote(id);
      this.deleteNoteFromDb(id);
    },
    changeState(id) {
      this.updateNote(id)
      this.updateStatus(id);
    },
    timer() {
      if (this.$moment(this.note.date) >= this.$moment(this.time)) {
        return setTimeout(() => {
          console.log('timer')
          this.time = Date.now();
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
  max-width: 1400px;
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem auto;
}

.row div {
  text-align: left;
  width: 30%;
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
  background: #28d223;
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
  float: right;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  outline: none;
}

.danger {
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

.update {
  transition: 0.3s;
  background: rgb(243, 200, 10);
  border: 1px solid white;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.update:hover {
  background: rgb(235, 202, 14);
  border: 1px solid rgb(243, 200, 10);
}



@media screen and (max-width: 900px) {

.row {
  flex-direction: column;
}

.row div {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  text-transform: uppercase;
  width: 95%;
}
  .btn {
    float: none;
    width: 90%;
    margin: 0 auto !important;
  }
}
</style>