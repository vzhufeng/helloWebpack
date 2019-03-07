<template>
  <div class="contain">{{text}}</div>
</template>

<script>
export default {
  data() {
    return {
      text: "a vue component"
    };
  }
};
</script>

<style lang="scss">
.contain {
  color: #e50000;
}
</style>
