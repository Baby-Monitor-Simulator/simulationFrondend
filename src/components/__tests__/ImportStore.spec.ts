import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
import { useImportStore } from '@/stores/import'

describe('ImportStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('that the fileContent starts with an empty array', () => {
        const store = useImportStore()

        expect(store.fileContent).toStrictEqual([])
    })

    test('that MatLab .txt file can be read', () => {
        
    })
})