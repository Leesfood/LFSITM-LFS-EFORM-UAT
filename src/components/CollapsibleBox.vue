<template>
    <div>
      <button @click="toggleCollapse">{{ isCollapsed ? 'Show' : 'Hide' }} Content</button>
      
      <div v-if="!isCollapsed" class="box-content">
        <slot></slot> <!-- Allows passing content into the box -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isCollapsed: true,
      };
    },
    methods: {
      toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
      },
    },
  };
  </script>
  
  <style scoped>
  .box-content {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 10px;
  }
  </style>
  