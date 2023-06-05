import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vitest } from 'vitest'
import { useImportStore } from '@/stores/import'
import FileReader from '@/components/FileReader.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { useI18n } from 'vue-i18n'

describe('FileReader', () => {
    beforeEach(() => {
        const wrapper = mount(FileReader, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vitest.fn
                })],
            },
        })
        setActivePinia(createPinia())
    })

    test('that the fileContent starts with an empty array', () => {
        const store = useImportStore()
        const { t } = useI18n() // call `useI18n`, and spread `t` from  `useI18n` returning

        expect(store.graphData).toStrictEqual([])
    })
})