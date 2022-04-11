<template>
  <div class="menu-edit">
    <create-or-edit :is-edit="true"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit'
export default {
  name: 'MenuEdit',
  components: {
    CreateOrEdit
  }
}
</script>

<style lang="scss" scoped></style>
