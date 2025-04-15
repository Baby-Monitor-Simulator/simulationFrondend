import HoverItem from "@/enums/hoverItems";
import { useRoute } from 'vue-router';


export interface ManualItem {
    id: HoverItem;
    icon: string;
    titleKey: string;
    descriptionKey: string;
}

/**
 * Get the correct manual items based on the users current url.
 * @returns {ManualItem[]} - The manual items that should be displayed in the manual for the current page.
 */
export function GetManualItems() {
    const currentRoute = useRoute().path;
    
    switch (currentRoute) {
        case '/':
            return HomeItems;
        case '/results':
            return ResultsItems;
        default:
            return HomeItems;    
    }
}

const HomeItems: ManualItem[] = [
    {
        id: HoverItem.Scenario,
        icon: 'mdi-web',
        titleKey: 'manual.home.languageChangeTitle',
        descriptionKey: 'manual.home.languageChangeDescription'
    },
    {
        id: HoverItem.Export,
        icon: 'mdi-download',
        titleKey: 'manual.home.dataExportTitle',
        descriptionKey: 'manual.home.dataExportDescription'
    },
    {
        id: HoverItem.Import,
        icon: 'mdi-upload',
        titleKey: 'manual.home.dataImportTitle',
        descriptionKey: 'manual.home.dataImportDescription'
    },
    {
        id: HoverItem.Submit,
        icon: 'mdi-send',
        titleKey: 'manual.home.submitTitle',
        descriptionKey: 'manual.home.submitDescription'
    },
];

const ResultsItems: ManualItem[] = [
    {
        id: HoverItem.Scenario,
        icon: 'mdi-web',
        titleKey: 'manual.results.exampleTitle',
        descriptionKey: 'manual.results.exampleDescription'
    },
    {
        id: HoverItem.Export,
        icon: 'mdi-chart-line',
        titleKey: 'manual.results.graphTitle',
        descriptionKey: 'manual.results.graphDescription'
    },
];
