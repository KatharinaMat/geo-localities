<template>
  <div class="app">
    <header class="header">
      <h1 class="title">Geological Localities</h1>
      <p class="subtitle">
        Browse geological localities from the public API.
      </p>
    </header>

    <main class="main">
      <p>App is running. Next: fetch localities.</p>
    </main>
  </div>
</template>

<style scoped>
.app {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
}
.header {
  margin-bottom: 16px;
}
.title {
  margin: 0;
  font-size: 28px;
}
.subtitle {
  margin: 8px 0 0;
  opacity: 0.8;
}
.main {
  padding: 16px;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
}
</style>
