<template>
  <picker-root
    :type="type"
    :text="input"
    :hide-elements="hideElements"
    @select="$emit('select', $event)"
    @update:text="onChangeText"
  />
</template>

<script lang="ts">
/**
 * External dependencies
 */
import { defineComponent, provide, ref, PropType, toRaw } from 'vue'

/**
 * Internal dependencies
 */
import { COLOR_THEMES, GROUP_NAMES, STATIC_TEXTS } from '../constant'
import Store from '../store'
import PickerRoot from './Root.vue'
import { ColorTheme, EmojiExt } from '../types'

export default defineComponent({
  name: 'Picker',
  components: {
    PickerRoot,
  },
  props: {
    native: {
      type: Boolean,
      default: false,
    },
    hideGroupIcons: {
      type: Boolean,
      default: false,
    },
    hideGroupNames: {
      type: Boolean,
      default: false,
    },
    staticTexts: {
      type: Object,
      default: () => ({}),
    },
    disableStickyGroupNames: {
      type: Boolean,
      default: false,
    },
    hideElements: {
      type: Array,
      default: () => [],
    },
    disabledGroups: {
      type: Array,
      default: () => [],
    },
    groupNames: {
      type: Object,
      default: () => ({}),
    },
    disableSkinTones: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'insert', // or append, prepend
    },
    offset: {
      type: Number,
      default: 6,
    },
    iconsSrc: {
      type: String,
      default: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/',
    },
    iconType: {
      type: String,
      default: 'svg',
    },
    locale: {
      type: String,
      default: 'en',
    },
    additionalGroups: {
      type: Object,
      default: () => ({}),
    },
    groupOrder: {
      type: Array,
      default: () => [],
    },
    groupIcons: {
      type: Object,
      default: () => ({}),
    },
    pickerType: {
      type: String,
      default: '',
    },
    displayRecent: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String as PropType<ColorTheme>,
      default: 'light',
    },
  },
  emits: {
    'update:text': (text: string) => true,
    select: (emoji: EmojiExt) => true,
  },
  setup(props, { emit }) {
    const input = ref(props.text)

    /**
     * Handle text change event
     * @param text - text value
     */
    function onChangeText(text: string | undefined) {
      input.value = text || ''
      emit('update:text', input.value)
    }

    /**
     * Create a brand new store and
     */
    const store = Store()

    /**
     * Initializing initial props
     */
    store.updateOptions({
      native: props.native,
      iconsSrc: props.iconsSrc,
      iconType: props.iconType,
      locale: props.locale,
      staticTexts: { ...STATIC_TEXTS, ...props.staticTexts },
      disableStickyGroupNames: props.disableStickyGroupNames,
      hideElements: props.hideElements,
      disabledGroups: props.disabledGroups,
      groupNames: { ...GROUP_NAMES, ...props.groupNames },
      disableSkinTones: props.disableSkinTones,
      displayRecent: props.displayRecent,
      additionalGroups: props.additionalGroups,
      mode: props.mode,
      offset: props.offset,
      groupOrder: props.groupOrder,
      groupIcons: props.groupIcons,
      colorTheme: COLOR_THEMES.includes(props.theme) ? props.theme : 'light',
    })

    /**
     * (provide) make available for entire app.
     */
    provide('store', store)

    /**
     * Return vars
     */

    return {
      type: props.pickerType,
      input,
      onChangeText,
    }
  },
})
</script>
