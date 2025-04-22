import HoverItem from "@/enums/hoverItems";
import { useRoute } from "vue-router";

export interface ManualItem {
  id: HoverItem;
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

/**
 * Get the correct manual items based on the users current url.
 * @returns The manual items that should be displayed in the manual for the current page.
 */
export function GetManualItems(): ManualItem[] {
  const currentRoute = useRoute().path;

  switch (currentRoute) {
    case "/":
      return HomeItems;
    case "/results":
      return ResultsItems;
    case "/scenario":
      return ScenarioItems;
    case "/Dashboard":
      return DashboardItems;
    case "/role":
      return AdminItems;
    case "/lobby/Create":
      return NewLobbyItems;
    case "/lobby/join":
      return JoinLobbItems;
    default:
      return NotFoundItems;
  }
}

const HomeItems: ManualItem[] = [
  {
    id: HoverItem.Scenario,
    icon: "mdi-web",
    titleKey: "manual.home.languageChangeTitle",
    descriptionKey: "manual.home.languageChangeDescription",
  },
  {
    id: HoverItem.Export,
    icon: "mdi-download",
    titleKey: "manual.home.dataExportTitle",
    descriptionKey: "manual.home.dataExportDescription",
  },
  {
    id: HoverItem.Import,
    icon: "mdi-upload",
    titleKey: "manual.home.dataImportTitle",
    descriptionKey: "manual.home.dataImportDescription",
  },
  {
    id: HoverItem.Submit,
    icon: "mdi-send",
    titleKey: "manual.home.submitTitle",
    descriptionKey: "manual.home.submitDescription",
  },
];

const ResultsItems: ManualItem[] = [
  {
    id: HoverItem.Scenario,
    icon: "mdi-web",
    titleKey: "manual.results.title",
    descriptionKey: "manual.results.description",
  },
  {
    id: HoverItem.Export,
    icon: "mdi-chart-line",
    titleKey: "manual.results.graphTitle",
    descriptionKey: "manual.results.graphDescription",
  },
];

const ScenarioItems: ManualItem[] = [
  {
    id: HoverItem.Scenario,
    icon: "mdi-movie-roll",
    titleKey: "manual.scenario.title",
    descriptionKey: "manual.scenario.description",
  },
];

const DashboardItems: ManualItem[] = [
  {
    id: HoverItem.Scenario,
    icon: "mdi-monitor-dashboard",
    titleKey: "manual.dashboard.title",
    descriptionKey: "manual.dashboard.description",
  },
];

const AdminItems: ManualItem[] = [
  {
    id: HoverItem.Scenario,
    icon: "mdi-security",
    titleKey: "manual.admin.title",
    descriptionKey: "manual.admin.description",
  },
];

const NewLobbyItems: ManualItem[] = [
  {
    id: HoverItem.Scenario,
    icon: "mdi-account-group",
    titleKey: "manual.newLobby.title",
    descriptionKey: "manual.newLobby.description",
  },
];

const JoinLobbItems: ManualItem[] = [
  {
    id: HoverItem.Scenario,
    icon: "mdi-door",
    titleKey: "manual.joinLobby.title",
    descriptionKey: "manual.joinLobby.description",
  },
  {
    id: HoverItem.Scenario,
    icon: "mdi-door-open",
    titleKey: "manual.joinLobby.leaveTitle",
    descriptionKey: "manual.joinLobby.leaveDescription",
  },
];

const NotFoundItems: ManualItem[] = [
  {
    id: HoverItem.Scenario,
    icon: "mdi-alert-circle",
    titleKey: "manual.notFound.title",
    descriptionKey: "manual.notFound.description",
  },
];
