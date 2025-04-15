import HoverItem from "@/enums/hoverItems";


export interface ManualItem {
    id: HoverItem;
    icon: string;
    titleKey: string;
    descriptionKey: string;
}

export const HomeItems: ManualItem[] = [
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
