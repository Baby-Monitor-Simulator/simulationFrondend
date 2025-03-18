export default {
   common: {
      submit: "Submit",
      cancel: "Cancel",
      clear: "Clear",
      reset: "Reset",
      loading: "Loading...",
      error: "An error occurred. Please try again.",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
   },
   home: {
      welcome: "Hello, Welcome to the Home Page!",
      yourRoles: "Your roles",
   },
   navbar: {
      home: "Home",
      results: "Results",
      scenario: "Scenario",
      dashboard: "Dashboard",
      roleMap: "Admin",
      createLobby: "New Lobby",
      joinLobby: "Join Lobby",
      logout: "Logout",
   },
   login: {
      title: "Login",
      email: "Email:",
      emailPlaceholder: "Enter your email",
      password: "Password:",
      passwordPlaceholder: "Enter your password",
      loginButton: "Login",
      noAccount: "Don't have an account?",
      register: "Register here",
      tempUsers: "Tempuser",
      tempAdmin: "Temp login admin",
      tempDeelnemer: "Temp login deelnemer",
      tempInstructeur: "Temp login instructeur",
      errors: {
         noToken: "Login successful, but no token received.",
         general: "An error occurred. Please try again.",
      }
   },
   register: {
      title: "Register",
      username: "Username",
      usernamePlaceholder: "Enter your username",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your password",
      registerButton: "Register",
      alreadyAccount: "Already have an account?",
      login: "Login here",
      errors: {
         passwordMismatch: "Passwords do not match.",
         general: "An error occurred during registration. Please try again.",
      }
   },
   export: {
      exportData: "Export Data",
      downloadCsv: "Download CSV",
      exportComplete: "Export Complete",
      noDataToExport: "No data to export",
   },
   import: {
      title: "Import Data",
      selectFile: "Select File",
      uploadButton: "Upload",
      fileTypes: "Supported file types: .txt",
      errors: {
         invalidFile: "Invalid file format",
         uploadFailed: "File upload failed",
      }
   },
   form: {
      fileInput: "File Input",
      fileExport: "Export data",
      manual: "Manual",
      selectedScenario: "Selected Scenario",
      selectedTemplate: "Selected Template",
      submit: "Submit",
      clear: "Clear Inputs",
      reset: "Reset Graphs",

      //Error messages
      fileInputErrorText: "Invalid file. Please supply a manually exported MatLab file.",
      scenario: "Must select a scenario.", 
      template: "Must select a template.",
      maxAmplitude: "Amplitude must lie between",
      contractionDuration: "Duration must lie between",
      timeBetweenContractions: "Time must lie between",
      
      // Field labels
      maxAmplitudeLabel: "Max Contraction Amplitude",
      contractionDurationLabel: "Contraction Duration",
      timeBetweenContractionsLabel: "Time Between Contractions",
      mmHg: "mmHg",
      seconds: "s",
   },
   header: {
      title: "Babymonitor CTG Simulator",
      showGraph: "Show Graph",
      manualTitle: "Manual",
      languageSelector: "Language",
   },
   message: {
      //Input field
      fileInput: "File Input",
      fileExport: "Export data",
      manual: "Manual",
      selectedScenario: "Selected Scenario",
      selectedTemplate: "Selected Template",
      submit: "Submit",
      clear: "Clear Inputs",
      reset: "Reset Graphs",

      //Error messages
      fileInputErrorText: "Invalid file. Please supply a manually exported MatLab file.",
      scenario: "Scenario invalid",
      template: "Template invalid",
      maxAmplitude: "Amplitude must lie between",
      contractionDuration: "Duration must lie between",
      timeBetweenContractions: "Time must lie between",
   },
   manual: {
      manualTitle: "Manual",
      hoverExplanation: "Hover over items below to learn how this application works.",
      languageChangeTitle: "Changing Language",
      languageChangeDescription: "You can change the language between Dutch and English here.",

      dataExportTitle: "Exporting Data",
      dataExportDescription: "You can export all data to CSV format.",

      dataImportTitle: "Importing Data",
      dataImportDescription: "Import data from CSV file.",

      submitTitle: "Submit data",
      submitDescription: "Submit the change.",
   },
   lobby: {
      joinTitle: "Enter lobby code",
      joinLobby: "Join",
      waitingForLobby: "Waiting for lobby to start...",
      lobbyStarted: "Lobby started",
      simulationStarting: "Simulation starting, one moment please...",
      activeParticipants: "Active participants",
      startLobby: "Start Lobby",
      create: {
         title: "Create Lobby",
         lobbyName: "Lobby Name",
         lobbyNamePlaceholder: "Enter lobby name",
         scenarioSelect: "Select Scenario",
         createButton: "Create Lobby",
         lobbyCode: "Lobby Code:",
         copyCode: "Copy Code",
         errors: {
            nameRequired: "Lobby name is required",
            scenarioRequired: "Scenario selection is required",
         }
      }
   },
   dashboard: {
      title: "Dashboard",
      welcome: "Welcome to your dashboard",
      statistics: "Statistics",
      recentActivity: "Recent Activity",
      noActivity: "No recent activity",
      leaveButton: "Leave Lobby",
      stopButton: "Stop Lobby",
      toast: {
         lobbyStopSuccess: "Lobby successfully stopped",
         lobbyStopError: "Error stopping the lobby"
      }
   },
   scenario: {
      title: "Scenarios",
      createNew: "Create New Scenario",
      noScenarios: "No scenarios available",
      edit: "Edit Scenario",
      delete: "Delete Scenario",
      view: "View Scenario",
      create: {
         title: "Create Scenario",
         name: "Scenario Name",
         description: "Description",
         parameters: "Parameters",
         saveButton: "Save Scenario",
      },
      detail: {
         title: "Scenario Details",
         edit: "Edit",
         delete: "Delete",
         back: "Back to Scenarios",
      },
      errors: {
         loadFailed: "An error occurred while loading scenarios."
      }
   },
   results: {
      title: "Results",
      noResults: "No results available",
      date: "Date",
      scenario: "Scenario",
      user: "User",
      score: "Score",
      session: "Session",
      actions: "Actions",
      view: "View Details",
      export: "Export",
      detail: {
         title: "Result Details",
         back: "Back to Results",
         exportPdf: "Export as PDF",
      },
      errors: {
         loadFailed: "Failed to load results. Please try again."
      }
   },
   roles: {
      title: "Role Management",
      roleList: "Role List",
      userList: "User List",
      addUser: "Add User",
      removeUser: "Remove User",
      roleName: "Role Name",
      userName: "User Name",
      email: "Email",
      currentRoles: "Current Roles",
      saveChanges: "Save Changes",
   },
   errors: {
      unauthorized: {
         title: "Unauthorized",
         message: "You do not have permission to access this page.",
         backToHome: "Back to Home",
      },
      notFound: {
         title: "Page Not Found",
         message: "The page you are looking for does not exist.",
         backToHome: "Back to Home",
      },
      serverError: {
         title: "Server Error",
         message: "An unexpected server error occurred.",
         tryAgain: "Try Again",
      }
   },
   graph: {
      title: "Graph",
      yAxis: "Y Axis",
      xAxis: "Time (s)",
      legend: "Legend",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      resetZoom: "Reset Zoom",
      noData: "No data to display",
      loading: "Loading graph data...",
      charts: {
         fetalHeartRate: "Fetal Heart Rate (FHR)",
         fetalBloodPressure: "Fetal Blood Pressure (MAP)",
         uterineContractions: "Uterine Contractions (UP)",
         fetalBlood: "Fetal Blood (Po2)"
      }
   }
}
