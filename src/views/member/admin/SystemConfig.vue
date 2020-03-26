<template>
  <!-- 系统配置 -->
  <div>
    系统配置
    <codemirror
      ref="myCm"
      :value="content"
      :options="cmOptions"
      @changes="changes"
      class="code"
    ></codemirror>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'

require('codemirror/mode/python/python.js')
require('codemirror/addon/fold/foldcode.js')
require('codemirror/addon/fold/foldgutter.js')
require('codemirror/addon/fold/brace-fold.js')
require('codemirror/addon/fold/xml-fold.js')
require('codemirror/addon/fold/indent-fold.js')
require('codemirror/addon/fold/markdown-fold.js')
require('codemirror/addon/fold/comment-fold.js')
export default {
  name: 'SystemConfig',
  data () {
    return {
      content: '',
      cmOptions: {
        value: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    changes (e) {
      console.log(e, 'aaaaaa')
    }
  },
  components: {
    codemirror
  }
}
</script>

<style scoped>
</style>
