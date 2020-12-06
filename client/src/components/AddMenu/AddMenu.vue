<template>
    <form @submit.prevent="onSubmit" class="container note_menu">
      <div class="row">
          <div>
            <label> Событие </label>
            <input  type="text"
                    placeholder="Событие"
                    v-model="event"/>
          </div>
          <div>
            <label> Время </label>
            <v-date-picker v-model="date"
                          mode="dateTime"
                          :timezone="timezone"
                          @input="onChange"
                          is24hr>

              <template v-slot="{ inputValue, inputEvents }">
                <input
                  class="Input"
                  :placeholder="date"
                  :value="date === null ? date : inputValue"
                  v-on="inputEvents"
                />
              </template>
            </v-date-picker>
          </div>
          <div>
            <button class="btn add" type="submit">
              Добавить
            </button>
          </div>
      </div>
  </form>
</template>

<script>

import { mapActions, mapMutations } from 'vuex'
export default {
  name: "AddMenu",
  data() {
    return {
      event: "",
      date: Date.now(),
      timezone: null,
    };
  },
  props: {
    notes: {
      type: Array,
    },
  },
  methods: {
    ...mapActions(['addNoteToDb']),
    ...mapMutations(['createNote']),
    onSubmit() {
      if (this.date && this.event) {
        const newEvent = {
          noteId: this.$uuid.v4(),
          event: this.event,
          date: this.date,
          status: false
        };
        this.createNote(newEvent)
        this.addNoteToDb(newEvent)
        this.event = "";
        this.date = Date.now();
      } else {
        alert("Вы должны заполнить все поля");
      }
    },
    onChange(evt) {
      const dateNow = new Date(Date.now());
      const dateInput = new Date(evt);

      // Немного страшно, но быстро и достаточно понятно, и не доставляет никаких проблем
      if (dateNow > dateInput && dateNow.getDay() !== dateInput.getDay()) {
        this.date = null;
        window.alert("Пожалуйста укажите настоящие или будующие дату и время");
        return false;
      } else if (
        dateNow > dateInput &&
        dateInput.getDay() === dateInput.getDay()
      ) {
        if (
          dateNow.getHours() > dateInput.getHours() ||
          (dateNow.getHours() === dateInput.getHours() &&
            dateNow.getMinutes() > dateInput.getMinutes())
        )
          this.date = null;
        window.alert("Пожалуйста укажите настоящие или будующие дату и время");
      }
    },
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

.note_menu {
  background: #0ec4ed;
  border: 1px solid #056175;
  border-radius: 8px;
  padding: 0.5rem 2rem;
}

.btn {
  float: right;
  outline: none;
  padding: 10px 20px;
  border-radius: 8px;
}


.add {
  cursor: pointer;
  background: rgb(255, 255, 255);
  border: 1px solid #056175;
  color: #056175;
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.3s;
}

.add:hover {
  background: #056175;
  color: white;
}

.note_menu label {
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 10px;
}

.note_menu input {
  border-radius: 5px;
  border: 1px solid #056175;
  outline: none;
  padding: 5px;
  width: 90%
}

@media screen and (max-width: 900px) {
.row {
  flex-direction: column;
}
.row div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  margin-top: 20px;
  font-weight: bold;
  text-transform: uppercase;
  width: 95%;
}
}
</style>