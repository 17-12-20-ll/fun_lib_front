<template>
  <div id="fun-app">
    <div class="fun-app-header" v-if="isLogin">
      <Header></Header>
    </div>
    <div class="fun-app-main">
      <div class="fun-app-main-nav" v-if="isLogin">
        <Nav></Nav>
      </div>
      <div class="fun-app-main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Common/Header'
import Nav from '@/components/Common/Nav'

export default {
  components: {
    Header,
    Nav
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    }
  },
}
</script>
<style lang="scss">
  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  em,
  img,
  small,
  strike,
  strong,
  b,
  u,
  i,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section,
  summary,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }

  input,
  button {
    border: none;
    outline: none;
  }

  *[hidden] {
    display: none;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    font-size: 12px;
  }

  .fun-app {
    width: 100%;
    display: flex;
    flex-direction: column;

    &-header {
      z-index: 100000;
      background-color: rgb(255, 255, 255);
      width: 100%;
      height: 80px;
      border-bottom: 1px solid #d3d3d3;
      box-shadow: 0 0 3px 0 #8d8d8dda;
    }

    &-main {
      flex: 1;
      display: flex;

      &-nav {
        height: 100px;
      }

      &-content {
        width: 100%;
        height: 80px;
      }
    }
  }

</style>
