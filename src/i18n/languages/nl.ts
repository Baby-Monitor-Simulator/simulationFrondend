export default {
   common: {
      submit: "Bevestigen",
      cancel: "Annuleren",
      clear: "Wissen",
      reset: "Herstellen",
      loading: "Laden...",
      error: "Er is een fout opgetreden. Probeer het opnieuw.",
      save: "Opslaan",
      delete: "Verwijderen",
      edit: "Bewerken",
      close: "Sluiten",
   },
   home: {
      welcome: "Hallo, Welkom op de Startpagina!",
      yourRoles: "Je rollen",
   },
   navbar: {
      home: "Hoofdpagina",
      results: "Resultaten",
      scenario: "Scenario",
      dashboard: "Dashboard",
      roleMap: "Admin",
      createLobby: "Nieuwe Lobby",
      joinLobby: "Deelnemen aan Lobby",
      logout: "Uitloggen",
   },
   login: {
      title: "Inloggen",
      email: "E-mail:",
      emailPlaceholder: "Voer je e-mail in",
      password: "Wachtwoord:",
      passwordPlaceholder: "Voer je wachtwoord in",
      loginButton: "Inloggen",
      noAccount: "Nog geen account?",
      register: "Registreer hier",
      tempUsers: "Tijdelijke gebruiker",
      tempAdmin: "Tijdelijk inloggen als admin",
      tempDeelnemer: "Tijdelijk inloggen als deelnemer",
      tempInstructeur: "Tijdelijk inloggen als instructeur",
      errors: {
         noToken: "Inloggen geslaagd, maar geen token ontvangen.",
         general: "Er is een fout opgetreden. Probeer het opnieuw.",
      }
   },
   register: {
      title: "Registreren",
      username: "Gebruikersnaam",
      usernamePlaceholder: "Voer je gebruikersnaam in",
      email: "E-mail",
      emailPlaceholder: "Voer je e-mail in",
      password: "Wachtwoord",
      passwordPlaceholder: "Voer je wachtwoord in",
      confirmPassword: "Bevestig wachtwoord",
      confirmPasswordPlaceholder: "Bevestig je wachtwoord",
      registerButton: "Registreren",
      alreadyAccount: "Heb je al een account?",
      login: "Log hier in",
      errors: {
         passwordMismatch: "Wachtwoorden komen niet overeen.",
         general: "Er is een fout opgetreden tijdens het registreren. Probeer het opnieuw.",
      }
   },
   export: {
      exportData: "Exporteer Data",
      downloadCsv: "Download CSV",
      exportComplete: "Export Voltooid",
      noDataToExport: "Geen data om te exporteren",
   },
   import: {
      title: "Importeer Data",
      selectFile: "Selecteer Bestand",
      uploadButton: "Uploaden",
      fileTypes: "Ondersteunde bestandstypen: .txt",
      errors: {
         invalidFile: "Ongeldig bestandsformaat",
         uploadFailed: "Bestand uploaden mislukt",
      }
   },
   form: {
      fileInput: "Bestand",
      fileExport: "Exporteer data",
      manual: "Handleiding",
      selectedScenario: "Geselecteerd Scenario",
      selectedTemplate: "Geselecteerd Template",
      submit: "Bevestigen",
      clear: "Inputs Herstellen",
      reset: "Grafieken Herstellen",

      //Error messages
      fileInputErrorText: "Ongeldig bestand. Lever een handmatig geëxporteerd MatLab-bestand in.",
      scenario: "Moet een scenario selecteren.", 
      template: "Moet een template selecteren.",
      maxAmplitude: "Amplitude moet tussen",
      contractionDuration: "Contractieduur moet tussen",
      timeBetweenContractions: "Tijd moet tussen",
      
      // Field labels
      maxAmplitudeLabel: "Maximale Contractie Amplitude",
      contractionDurationLabel: "Contractie Duur",
      timeBetweenContractionsLabel: "Tijd Tussen Contracties",
      mmHg: "mmHg",
      seconds: "s",
   },
   header: {
      title: "Babymonitor CTG Simulator",
      showGraph: "Toon Grafiek",
      manualTitle: "Handleiding",
      languageSelector: "Taal",
      hoverExplanation: "Houd muis over de onderdelen hieronder om erachter te komen hoe de applicatie werkt.",
      languageChangeTitle: "Taal veranderen",
      languageChangeDescription: "Je kunt de taal veranderen tussen Nederlands en Engels.",
      dataExportTitle: "Data exporteren",
      dataExportDescription: "Alle data is naar CSV te exporteren.",
      dataImportTitle: "Data importeren",
      dataImportDescription: "Data importeren vanuit een CSV.",
      submitTitle: "Verstuur data",
      submitDescription: "Verstuur de veranderingen.",
   },
   message: {
      //Input field
      fileInput: "Bestand",
      fileExport: "Exporteer data",
      manual: "Handleiding",
      selectedScenario: "Geselecteerd Scenario",
      selectedTemplate: "Geselecteerd Template",
      submit: "Bevestigen",
      clear: "Inputs Herstellen",
      reset: "Grafieken Herstellen",

      //Error messages
      fileInputErrorText: "Ongeldig bestand. Lever een handmatig geëxporteerd MatLab-bestand in.",
      scenario: "Scenario ongeldig",
      template: "Template ongeldig",
      maxAmplitude: "Amplitude moet tussen",
      contractionDuration: "Contractieduur moet tussen",
      timeBetweenContractions: "Tijd moet tussen",
   },
   manual: {
      manualTitle: "Handleiding",
      hoverExplanation: "Houd muis over de onderdelen hieronder om erachter te komen hoe de applicatie werkt.",
      languageChangeTitle: "Taal veranderen",
      languageChangeDescription: "Je kunt de taal veranderen tussen Nederlands en Engels.",

      dataExportTitle: "Data exporteren",
      dataExportDescription: "Alle data is naar CSV te exporteren.",

      dataImportTitle: "Data importeren",
      dataImportDescription: "Data importeren vanuit een CSV.",

      submitTitle: "Verstuur data",
      submitDescription: "Verstuur de veranderingen.",
   },
   lobby: {
      joinTitle: "Vul de lobby code in",
      joinLobby: "Deelnemen",
      waitingForLobby: "Wachten tot lobby opgestart is...",
      lobbyStarted: "Lobby is gestart",
      simulationStarting: "Simulatie wordt opgestart, een moment geduld aub...",
      activeParticipants: "Actieve deelnemers",
      startLobby: "Start Lobby",
      create: {
         title: "Maak Lobby",
         lobbyName: "Lobby Naam",
         lobbyNamePlaceholder: "Voer lobby naam in",
         scenarioSelect: "Selecteer Scenario",
         createButton: "Maak Lobby",
         lobbyCode: "Lobby Code:",
         copyCode: "Kopieer Code",
         errors: {
            nameRequired: "Lobby naam is verplicht",
            scenarioRequired: "Scenario selectie is verplicht",
         }
      }
   },
   dashboard: {
      title: "Dashboard",
      welcome: "Welkom bij je dashboard",
      statistics: "Statistieken",
      recentActivity: "Recente Activiteit",
      noActivity: "Geen recente activiteit",
      leaveButton: "Verlaat Lobby",
      stopButton: "Stop Lobby",
      toast: {
         lobbyStopSuccess: "Lobby succesvol gestopt",
         lobbyStopError: "Fout bij stoppen van de lobby"
      }
   },
   scenario: {
      title: "Scenario's",
      createNew: "Nieuw Scenario Maken",
      noScenarios: "Geen scenario's beschikbaar",
      edit: "Scenario Bewerken",
      delete: "Scenario Verwijderen",
      view: "Scenario Bekijken",
      create: {
         title: "Scenario Maken",
         name: "Scenario Naam",
         description: "Beschrijving",
         parameters: "Parameters",
         saveButton: "Scenario Opslaan",
      },
      detail: {
         title: "Scenario Details",
         edit: "Bewerken",
         delete: "Verwijderen",
         back: "Terug naar Scenario's",
      },
      errors: {
         loadFailed: "Er is een fout opgetreden bij het ophalen van de scenario's."
      }
   },
   results: {
      title: "Resultaten",
      noResults: "Geen resultaten beschikbaar",
      date: "Datum",
      scenario: "Scenario",
      user: "Gebruiker",
      score: "Score",
      session: "Sessie",
      actions: "Acties",
      view: "Details Bekijken",
      export: "Exporteren",
      detail: {
         title: "Resultaat Details",
         back: "Terug naar Resultaten",
         exportPdf: "Exporteren als PDF",
      },
      errors: {
         loadFailed: "Resultaten konden niet worden geladen. Probeer het opnieuw."
      }
   },
   roles: {
      title: "Rollenbeheer",
      roleList: "Rollenlijst",
      userList: "Gebruikerslijst",
      addUser: "Gebruiker Toevoegen",
      removeUser: "Gebruiker Verwijderen",
      roleName: "Rolnaam",
      userName: "Gebruikersnaam",
      email: "E-mail",
      currentRoles: "Huidige Rollen",
      saveChanges: "Wijzigingen Opslaan",
   },
   errors: {
      unauthorized: {
         title: "Niet geautoriseerd",
         message: "Je hebt geen toestemming om deze pagina te bekijken.",
         backToHome: "Terug naar Home",
      },
      notFound: {
         title: "Pagina Niet Gevonden",
         message: "De pagina die je zoekt bestaat niet.",
         backToHome: "Terug naar Home",
      },
      serverError: {
         title: "Server Fout",
         message: "Er is een onverwachte serverfout opgetreden.",
         tryAgain: "Probeer Opnieuw",
      }
   },
   graph: {
      title: "Grafiek",
      yAxis: "Y-as",
      xAxis: "Tijd (s)",
      legend: "Legenda",
      zoomIn: "Inzoomen",
      zoomOut: "Uitzoomen",
      resetZoom: "Zoom Resetten",
      noData: "Geen data om weer te geven",
      loading: "Grafiek data laden...",
      charts: {
         fetalHeartRate: "Foetale Hartslag (FHR)",
         fetalBloodPressure: "Foetale Bloeddruk (MAP)",
         uterineContractions: "Baarmoedercontracties (UP)",
         fetalBlood: "Foetaal Bloed (Po2)"
      }
   }
}
