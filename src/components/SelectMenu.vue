<template>
<div class="select">
    <select name="slct" id="slct">
      <option>choose skill level</option>
      <option value="1">Beginner</option>
      <option value="2">Intermediate</option>
      <option value="3">Advanced</option>
      <option value="3">Expert</option>
    </select>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>

body {
  background: #f39c12;
}

h1 {
  text-align: center;
}
/* Reset Select */
select {
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #2c3e50;
  background-image: none;
}
/* Custom Select */
option , select{
    font-size:20px;
}
.select {
  font-size:20px;
  position: relative;
  display: block;
  width: 80%;
  height: 3em;
  line-height: 3;
  background: #2c3e50;
  overflow: hidden;
  border-radius: .25em;
}
select {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 0 0 .5em;
  color: #fff;
  cursor: pointer;
}
select::-ms-expand {
  display: none;
}
/* Arrow */
.select::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0 1em;
  background: #34495e;
  pointer-events: none;
}
/* Transition */
.select:hover::after {
  color: #f39c12;
}
.select::after {
  transition: .25s all ease;
}
</style>
