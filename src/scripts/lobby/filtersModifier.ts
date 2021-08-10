import $ from 'jquery'
import { gcSelectors } from '../../utils/gcSelectors'
import KDRFilterComponent from '../../components/KDRFilter.vue'
import LobbyNameFilterComponent from '../../components/LobbyNameFilter.vue'
import Vue, { createApp } from 'vue'
import { cleanSelector } from '@/utils/StringUtils'
import gcBooster from '@/utils/gcBooster'
import lobbyFilter from './lobbyFilter'

export default class FiltersModifier {

  constructor() {
    this.modifyFilters()
    this.insertLobbyNameFilter()
  }

  modifyFilters(){
    const $filtersContainer = $(gcSelectors.filtersContainer)
    const sections = $filtersContainer.find(gcSelectors.filterSection)
    const sectionModel = sections.get(0)
    const $gccFilterSection = $(sectionModel).clone()
    const cleanContainerClass = cleanSelector(gcSelectors.extension.kdrFilterLabel)

    gcBooster.isInstalled()
      .then(() => {
        $gccFilterSection.addClass(cleanContainerClass)
        $filtersContainer.append($gccFilterSection)
        createApp(KDRFilterComponent, { value: lobbyFilter.filters.kdr || 1.2 }).mount($gccFilterSection.get(0))
      })
      .catch(() => {
        const currentSection = sections.last().addClass(cleanContainerClass).get(0)
        createApp(KDRFilterComponent, { value: lobbyFilter.filters.kdr || 1.2 }).mount(currentSection)
      })

  }

  insertLobbyNameFilter() {
    const $roomsContent = $( gcSelectors.lobbies.content )
    const containerName = `gcc-lobby-player-filter-container`
    const $container = `<div id='${containerName}' class='${cleanSelector(gcSelectors.extension.appContainer)}'></div>`
    const $lobbyFilter = $roomsContent.find(containerName)

    if($lobbyFilter.length === 0){
      $roomsContent.prepend($container)
      createApp(LobbyNameFilterComponent).mount(`#${containerName}`)
    }
  }
}