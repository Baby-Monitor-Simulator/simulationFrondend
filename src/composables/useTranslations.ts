import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

/**
 * Composable function that provides typed and reactive access to translations
 * Organizes translations by component/feature for better organization and reuse
 */
export function useTranslations() {
  const { t } = useI18n();
  
  // Common translations used across multiple components
  const common = computed(() => ({
    submit: t('common.submit'),
    cancel: t('common.cancel'),
    clear: t('common.clear'),
    reset: t('common.reset'),
    loading: t('common.loading'),
    error: t('common.error'),
    save: t('common.save'),
    delete: t('common.delete'),
    edit: t('common.edit'),
    close: t('common.close'),
  }));

  // Form-related translations
  const form = computed(() => ({
    fileInput: t('form.fileInput'),
    fileExport: t('form.fileExport'),
    manual: t('form.manual'),
    selectedScenario: t('form.selectedScenario'),
    selectedTemplate: t('form.selectedTemplate'),
    submit: t('form.submit'),
    clear: t('form.clear'),
    reset: t('form.reset'),
    
    // Error messages
    fileInputErrorText: t('form.fileInputErrorText'),
    scenario: t('form.scenario'),
    template: t('form.template'),
    maxAmplitude: t('form.maxAmplitude'),
    contractionDuration: t('form.contractionDuration'),
    timeBetweenContractions: t('form.timeBetweenContractions'),
    
    // Field labels
    maxAmplitudeLabel: t('form.maxAmplitudeLabel'),
    contractionDurationLabel: t('form.contractionDurationLabel'),
    timeBetweenContractionsLabel: t('form.timeBetweenContractionsLabel'),
    mmHg: t('form.mmHg'),
    seconds: t('form.seconds'),
  }));

  // Header component translations
  const header = computed(() => ({
    title: t('header.title'),
    showGraph: t('header.showGraph'),
    manualTitle: t('header.manualTitle'),
    languageSelector: t('header.languageSelector'),
    hoverExplanation: t('header.hoverExplanation'),
    languageChangeTitle: t('header.languageChangeTitle'),
    languageChangeDescription: t('header.languageChangeDescription'),
    dataExportTitle: t('header.dataExportTitle'),
    dataExportDescription: t('header.dataExportDescription'),
    dataImportTitle: t('header.dataImportTitle'),
    dataImportDescription: t('header.dataImportDescription'),
    submitTitle: t('header.submitTitle'),
    submitDescription: t('header.submitDescription'),
  }));

  // Navbar component translations
  const navbar = computed(() => ({
    home: t('navbar.home'),
    results: t('navbar.results'),
    scenario: t('navbar.scenario'),
    dashboard: t('navbar.dashboard'),
    rolemap: t('navbar.roleMap'),
    createLobby: t('navbar.createLobby'),
    joinLobby: t('navbar.joinLobby'),
    logout: t('navbar.logout'),
  }));
  
  // Home page translations
  const home = computed(() => ({
    welcome: t('home.welcome'),
    yourRoles: t('home.yourRoles'),
  }));

  // Login page translations
  const login = computed(() => ({
    title: t('login.title'),
    email: t('login.email'),
    emailPlaceholder: t('login.emailPlaceholder'),
    password: t('login.password'),
    passwordPlaceholder: t('login.passwordPlaceholder'),
    loginButton: t('login.loginButton'),
    noAccount: t('login.noAccount'),
    register: t('login.register'),
    tempUsers: t('login.tempUsers'),
    tempAdmin: t('login.tempAdmin'),
    tempDeelnemer: t('login.tempDeelnemer'),
    tempInstructeur: t('login.tempInstructeur'),
    errors: {
      noToken: t('login.errors.noToken'),
      general: t('login.errors.general'),
    }
  }));

  // Register page translations
  const register = computed(() => ({
    title: t('register.title'),
    username: t('register.username'),
    usernamePlaceholder: t('register.usernamePlaceholder'), 
    email: t('register.email'),
    emailPlaceholder: t('register.emailPlaceholder'),
    password: t('register.password'),
    passwordPlaceholder: t('register.passwordPlaceholder'),
    confirmPassword: t('register.confirmPassword'),
    confirmPasswordPlaceholder: t('register.confirmPasswordPlaceholder'),
    registerButton: t('register.registerButton'),
    alreadyAccount: t('register.alreadyAccount'),
    login: t('register.login'),
    errors: {
      passwordMismatch: t('register.errors.passwordMismatch'),
      general: t('register.errors.general'),
    }
  }));

  // Manual component translations
  const manual = computed(() => ({
    manualTitle: t('manual.manualTitle'),
    hoverExplanation: t('manual.hoverExplanation'),
    languageChangeTitle: t('manual.languageChangeTitle'),
    languageChangeDescription: t('manual.languageChangeDescription'),
    dataExportTitle: t('manual.dataExportTitle'),
    dataExportDescription: t('manual.dataExportDescription'),
    dataImportTitle: t('manual.dataImportTitle'),
    dataImportDescription: t('manual.dataImportDescription'),
    submitTitle: t('manual.submitTitle'),
    submitDescription: t('manual.submitDescription'),
  }));

  // Import component translations
  const importTranslations = computed(() => ({
    title: t('import.title'),
    selectFile: t('import.selectFile'),
    uploadButton: t('import.uploadButton'),
    fileTypes: t('import.fileTypes'),
    errors: {
      invalidFile: t('import.errors.invalidFile'),
      uploadFailed: t('import.errors.uploadFailed'),
    }
  }));

  // Export component translations
  const exportTranslations = computed(() => ({
    exportData: t('export.exportData'),
    downloadCsv: t('export.downloadCsv'),
    exportComplete: t('export.exportComplete'),
    noDataToExport: t('export.noDataToExport'),
  }));

  // Lobby-related translations
  const lobby = computed(() => ({
    joinTitle: t('lobby.joinTitle'),
    joinLobby: t('lobby.joinLobby'),
    waitingForLobby: t('lobby.waitingForLobby'),
    lobbyStarted: t('lobby.lobbyStarted'),
    simulationStarting: t('lobby.simulationStarting'),
    activeParticipants: t('lobby.activeParticipants'),
    startLobby: t('lobby.startLobby'),
    create: {
      title: t('lobby.create.title'),
      lobbyName: t('lobby.create.lobbyName'),
      lobbyNamePlaceholder: t('lobby.create.lobbyNamePlaceholder'),
      scenarioSelect: t('lobby.create.scenarioSelect'),
      createButton: t('lobby.create.createButton'),
      lobbyCode: t('lobby.create.lobbyCode'),
      copyCode: t('lobby.create.copyCode'),
      startLobby: t('lobby.create.startLobby'),
      errors: {
        nameRequired: t('lobby.create.errors.nameRequired'),
        scenarioRequired: t('lobby.create.errors.scenarioRequired'),
      }
    }
  }));

  // Dashboard-related translations
  const dashboard = computed(() => ({
    title: t('dashboard.title'),
    welcome: t('dashboard.welcome'),
    statistics: t('dashboard.statistics'),
    recentActivity: t('dashboard.recentActivity'),
    noActivity: t('dashboard.noActivity'),
    leaveButton: t('dashboard.leaveButton'),
    stopButton: t('dashboard.stopButton'),
    toast: {
      lobbyStopSuccess: t('dashboard.toast.lobbyStopSuccess'),
      lobbyStopError: t('dashboard.toast.lobbyStopError'),
    }
  }));

  // Graph component translations
  const graph = computed(() => ({
    title: t('graph.title'),
    yAxis: t('graph.yAxis'),
    xAxis: t('graph.xAxis'),
    legend: t('graph.legend'),
    zoomIn: t('graph.zoomIn'),
    zoomOut: t('graph.zoomOut'),
    resetZoom: t('graph.resetZoom'),
    noData: t('graph.noData'),
    loading: t('graph.loading'),
    charts: {
      fetalHeartRate: t('graph.charts.fetalHeartRate'),
      fetalBloodPressure: t('graph.charts.fetalBloodPressure'),
      uterineContractions: t('graph.charts.uterineContractions'),
      fetalBlood: t('graph.charts.fetalBlood')
    }
  }));

  // Scenario translations
  const scenario = computed(() => ({
    title: t('scenario.title'),
    createNew: t('scenario.createNew'),
    noScenarios: t('scenario.noScenarios'),
    edit: t('scenario.edit'),
    delete: t('scenario.delete'),
    view: t('scenario.view'),
    errors: {
      loadFailed: t('scenario.errors.loadFailed'),
    },
    create: {
      title: t('scenario.create.title'),
      name: t('scenario.create.name'),
      description: t('scenario.create.description'),
      parameters: t('scenario.create.parameters'),
      saveButton: t('scenario.create.saveButton'),
    },
    detail: {
      title: t('scenario.detail.title'),
      edit: t('scenario.detail.edit'),
      delete: t('scenario.detail.delete'),
      back: t('scenario.detail.back'),
    }
  }));

  // Results translations
  const results = computed(() => ({
    title: t('results.title'),
    noResults: t('results.noResults'),
    date: t('results.date'),
    scenario: t('results.scenario'),
    user: t('results.user'),
    score: t('results.score'),
    session: t('results.session'),
    actions: t('results.actions'),
    view: t('results.view'),
    export: t('results.export'),
    errors: {
      loadFailed: t('results.errors.loadFailed'),
    },
    detail: {
      title: t('results.detail.title'),
      back: t('results.detail.back'),
      exportPdf: t('results.detail.exportPdf'),
    }
  }));

  // Error page translations
  const errors = computed(() => ({
    unauthorized: {
      title: t('errors.unauthorized.title'),
      message: t('errors.unauthorized.message'),
      backToHome: t('errors.unauthorized.backToHome'),
    },
    notFound: {
      title: t('errors.notFound.title'),
      message: t('errors.notFound.message'),
      backToHome: t('errors.notFound.backToHome'),
    },
    serverError: {
      title: t('errors.serverError.title'),
      message: t('errors.serverError.message'),
      tryAgain: t('errors.serverError.tryAgain'),
    }
  }));
  
  // Roles translations
  const roles = computed(() => ({
    title: t('roles.title'),
    roleList: t('roles.roleList'),
    userList: t('roles.userList'),
    addUser: t('roles.addUser'),
    removeUser: t('roles.removeUser'),
    roleName: t('roles.roleName'),
    userName: t('roles.userName'),
    email: t('roles.email'),
    currentRoles: t('roles.currentRoles'),
    saveChanges: t('roles.saveChanges'),
  }));

  return {  
    common,
    form,
    header,
    navbar,
    manual,
    import: importTranslations,
    export: exportTranslations,
    lobby,
    dashboard,
    graph,
    home,
    login,
    register,
    scenario,
    results,
    errors,
    roles,
  };
} 