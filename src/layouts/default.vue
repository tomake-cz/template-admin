<template>
  <div class="flex min-h-screen overflow-hidden font-sans font-bold">
    <NavMenu />
    <div class="w-[calc(100%-240px)]">
      <HeaderBar />
      <slot />
    </div>
    <NotificationOverlay />
  </div>
</template>
