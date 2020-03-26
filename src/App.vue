<template>
  <div id="app">
    <div id="header">
      <Header />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../src/components/Common/Header";
export default {
  components: {
    Header
  }
};
</script>

<style>
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

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 12px;
  line-height: 24px;
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

/* 表格区域 */
.table_content {
  margin: 20px 0;
}

/* 头部 wrap */
.top-wrap {
  display: flex;
}

/* 头部input */
.head_input {
  display: flex;
  justify-content: space-between;
}

/* 头部按钮 */
.head_btn {
  display: flex;
  justify-content: space-between;
  width: 8%;
  margin-left: 35px;
  font-size: 13px;
}

/* 查看统一样式 */
.select_list {
  padding: 0 20px;
}
.select_list_item {
  width: 50%;
  padding: 10px 0;
  border-bottom:1px solid rgb(242, 242, 242);
}
.select_list_item:hover {
  background-color: rgb(242, 242, 242);
}
.select_list_item span {
  display: inline-block;
  margin-right: 20px;
}
</style>
