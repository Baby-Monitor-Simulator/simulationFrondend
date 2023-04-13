import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test, vitest } from 'vitest'
import { useImportStore } from '@/stores/import'
import FileReader from '@/components/FileReader.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'

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

        expect(store.graphData).toStrictEqual([])
    })
})