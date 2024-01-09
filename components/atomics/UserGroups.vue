<template>
  <span
    v-for="(item, index) in users"
    :style="montedStyleUserGroup(index)"
    class="d-inline-flex align-items-center justify-content-center avatar badge-secondary rounded-circle"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :data-bs-title="item.user.name"
  >
    <p class="mb-0 text-white">{{ firstLetter(item.user.name) }}</p>
    <span
      :class="`avatar avatar-badge ${classApprovals(item)}`"
      style="top: 0px;right: 0px; position:absolute;"
    ></span>
  </span>
</template>

<script setup>
defineProps({
  users: Array,
});

function randomBgColor() {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  return "rgb(" + x + "," + y + "," + z + ")";
}

function montedStyleUserGroup(index) {
  let result = {
    left: "-10px",
    position: "relative",
    "z-index": 1,
    "background-color": "blue",
  };
  if (index) {
    result["z-index"] = 1;
    result["left"] = "-10px";
    result["background-color"] = randomBgColor();
  } else {
    result["z-index"] = 999;
    result["left"] = "0px";
    result["background-color"] = randomBgColor();
  }
  return result;
}

function firstLetter(name) {
  return name.substr(0, 1);
}

function classApprovals({ approved }) {
  if (approved == null) return "badge-secondary";
  return approved == 1 ? "badge-success" : "badge-danger";
}
</script>

<style>
.avatar .avatar-badge {
  position: absolute;
  max-height: 1em;
  max-width: 1em;
  padding: 0.25em;
  line-height: 1;
  border-radius: 10em;
  font-size: 70%;
  font-weight: 700;
  z-index: 1;
}

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  font-size: inherit;
  font-weight: 400;
  line-height: 1;
  max-width: 100%;
  max-height: auto;
  text-align: center;
  overflow: visible;
  position: relative;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
</style>
