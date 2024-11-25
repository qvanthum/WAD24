<template>
    <div class="sidebar-left">
    
    </div>
  </template>
  
  <script>
  export default {
    name: 'sidebarLeft',
  }
  </script>
  
  <style>
  .sidebar-left {
    background-color: #bfbfbf;
    width: 20%;
    padding: 20px;
    border-radius: 10px;
    margin: 40px 20px;
    flex-grow: 0;
    order: 1;
  }
  @media(max-width: 800px) {
    .sidebar-left {
        display: none;
    }
  }
  </style>
  