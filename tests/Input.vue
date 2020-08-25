import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'

import Input from '@/components/Input.vue'

describe('Input', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Input)
    expect(wrapper).toBeTruthy()
  })
})