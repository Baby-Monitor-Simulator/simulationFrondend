import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vitest } from 'vitest'
import { useImportStore } from '@/stores/import'
import FileReader from '@/components/FileReader.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import messages from '@/i18n/index'

describe('FileReader', () => {
    beforeEach(() => {
        const i18n = createI18n({
            legacy: false, // you must set `false`, to use Composition API
            locale: 'en', // set locale
            fallbackLocale: 'en', // set fallback locale
            messages, // set locale messages
            globalInjection: true,
        })

        const wrapper = mount(FileReader, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn
                }), i18n],
            },
        })
        setActivePinia(createPinia())
    })

    test('that the fileContent starts with an empty array', () => {
        const store = useImportStore()
        // const { t } = useI18n() // call `useI18n`, and spread `t` from  `useI18n` returning

        expect(store.graphData).toStrictEqual([])
    })
})