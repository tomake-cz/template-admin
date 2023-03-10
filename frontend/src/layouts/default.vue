<template>
  <div class="flex min-h-screen font-sans font-bold">
    <NavMenu />
    <div class="grow">
      <HeaderBar />
      <slot />
    </div>
  </div>
</template>
