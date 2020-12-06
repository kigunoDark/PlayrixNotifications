<template>
  <Loading v-if="getLoading" />
  <div v-else>
    <AddMenu />
    <div v-if="allNotes.length > 0">
      <NoteCard v-for="(note, index) in allNotes"
                :key="index"
                :note="note"/>
    </div>
    <div class="empty_card" v-else> У вас нет мероприятий!</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NoteCard from "./NoteCard/NoteCard";
import AddMenu from "./AddMenu/AddMenu";
import Loading from "./Loading/Loading";

export default {
  name: "NotesMenu",
  components: { NoteCard, AddMenu, Loading },
  computed: mapGetters(["allNotes", "getLoading"]),
  methods: { ...mapActions(["fetchNotes"]) },
  async mounted() {
    this.fetchNotes();
  },
};
</script>

<style scoped>
.empty_card {
  max-width: 1400px;
  width: 90%;
  margin: 0 auto ;
  margin-top: 3%;
  padding: 15% 20px;
  border: 1px solid #056175;
  border-radius: 10px;
  color: #056175;
  text-transform: uppercase;
  font-weight: bold;
  box-sizing: border-box;
}
</style>
