<template>
  <div>
    <ul>
      <li v-for="i in list">{{i.name}}
        <button>选中</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SystemConfig',
  data () {
    return {
      list: [
        {
          name: 'll',
          age: 23
        }, {
          name: 'aa',
          age: 23
        },
        {
          name: 'bb',
          age: 23
        },
        {
          name: 'cc',
          age: 23
        }

      ]
    }
  }
}
</script>

<style scoped>

</style>
