<template>
  <span @click="onClick" class="gcc-lobby-title">{{ label }}</span>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { createApp } from '@vue/runtime-dom'
import { newTippy } from '@/utils/tippy'
import GCCPlayerStatsComparator from './GCCPlayerStatsComparator.vue'
import $ from 'jquery'
import { gcSelectors } from '@/utils/gcSelectors'
import serializer from '@/scripts/lobby/serializer'

@Options({
  components: {
  },

  props: {
    label: String,
  }
})
export default class GCCStats extends Vue {
  label!: string
  playersIds!: string[]
  tippyInstance: any = null

  unmounted(){
    this.tippyInstance?.destroy()
  }

  onClick(){
    this.tippyInstance?.destroy()

    const $lobby = $(this.$el).closest(gcSelectors.lobby)
    const { players } = serializer.serialize($lobby[0])
    const playersIds = players?.map((player) => player.id)

    this.tippyInstance =  newTippy(this.$el, {
      placement: 'top', // TODO: change to bottom after create level component
      onShow(instance: any) {
        const container = document.createElement('div')
        createApp(GCCPlayerStatsComparator, { playersIds }).mount(container)
        instance.setContent(container)
      }
    })
  }
}
</script>

<style lang="scss">
@import '../styles/_variables.scss';

.gcc-lobby-title {
  &:hover {
    cursor: pointer;
    color: $blue;
  }
}
</style>