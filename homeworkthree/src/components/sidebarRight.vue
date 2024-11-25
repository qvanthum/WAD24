<template>
    <div class="sidebar-right">
    
    </div>
  </template>
  
  <script>
  export default {
    name: 'sidebarRight',
  }
  </script>
  
  <style>
  .sidebar-right {
    background-color: #bfbfbf;
    width: 20%;
    padding: 20px;
    border-radius: 10px;
    margin: 40px 20px;
    flex-grow: 0;
    order: 3;
  }
  @media(max-width: 800px) {
    .sidebar-right {
        display: none;
      }
  }
  </style>
  