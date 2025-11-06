// == LOGIN CONFIGURATION (New) ==
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '12321'; // WARNING: This is INSECURE for production use!

// == FIREBASE & AUTH CONFIGURATION (All removed/commented out) ==
// const USER_PROVIDED_FIREBASE_CONFIG = { ... };
// let auth, db, isLoginView = true;
// let unsubscribeStrategyData = null;
// const appId = 'deltaplant-14bbb';

// --- Planner Constants (Copied from your provided code) ---
const ANIMATION_DURATION = 500; // ms
const PLACEHOLDER_MAP_IMAGE = "https://placehold.co/1280x720/161b22/c9d1d9?text=Map+Image+Goes+Here";

const MAPS = [
    { 
        name: "Trenchline", 
        sectors: [
            { name: "A", url: './TrenchlineA.png' }, 
            { name: "B", url: './TrenchlineB.png' }, 
            { name: "C", url: './TrenchlineC.png' }, 
            { name: "D", url: './TrenchlineD.png' },
            { name: "E", url: './TrenchlineE.png' }
        ]
    },
    { 
        name: "Ascension", 
        sectors: [
            { name: "A", url: './ascensiona.png' },
            { name: "B", url: './ascensionb.png' },
            { name: "C", url: './ascensionc.png' },
            { name: "D", url: './ascenciond.png' }
        ]
    },
    { 
        name: "Cracked", 
        sectors: [
            { name: "A", url: './crackeda.png' },
            { name: "B", url: './crackedb.png' },
            { name: "C", url: './crackedc.png' }
        ]
    },
    { 
        name: "Threshold", 
        sectors: [
            { name: "A", url: './thresholda.png' },
            { name: "B", url: './thresholdb.png' },
            { name: "C", url: './thresholdc.png' }
        ]
    },
    { 
        name: "Cyclone", 
        sectors: [
            { name: "A", url: './cyclonea.png' },
            { name: "B", url: './cycloneb.png' },
            { name: "C", url: './cyclonec.png' },
            { name: "D", url: './cycloned.png' },
            { name: "E", url: './cyclonee.png' }
        ]
    },
    { 
        name: "Fault", 
        sectors: [
            { name: "A", url: './faulta.png' },
            { name: "B", url: './faultb.png' },
            { name: "C", url: './faultc.png' }
        ]
    },
    { 
        name: "Trainwreck", 
        sectors: [
            { name: "A", url: './trainwrecka.png' },
            { name: "B", url: './trainwreckb.png' },
            { name: "C", url: './trainwreckc.png' },
            { name: "D", url: './trainwreckd.png' }
        ]
    },
];

// 6 Operators defined by their color only.
const OPERATORS = [
    { id: "op_rusher1", color: '#ff33ff', type: 'color', iconUrl: '' }, 
    { id: "op_rusher2", color: '#fcdf03', type: 'color', iconUrl: '' }, 
    { id: "op_flank", color: '#fc0303', type: 'color', iconUrl: '' }, 
    { id: "op_engineer", color: '#03fc41', type: 'color', iconUrl: '' }, 
    { id: "op_scout", color: '#33aaff', type: 'color', iconUrl: '' }, 
    { id: "op_enemy", color: '#fcb103', type: 'color', iconUrl: ''} 
];

// NOTE: Using a single, publicly accessible image URL for stable demonstration
const UTILITY_PLACEHOLDER_URL = 'https://i.imgur.com/0jj5Jtg.png'; 
const UTILITIES = [
    { id: "utility_beacon", color: '#ffffff', type: 'image', iconUrl: UTILITY_PLACEHOLDER_URL }, 
    { id: "utility_mine", color: '#ffffff', type: 'image', iconUrl: UTILITY_PLACEHOLDER_URL }, 
    { id: "utility_ads", color: '#ffffff', type: 'image', iconUrl: UTILITY_PLACEHOLDER_URL } 
];

const VEHICLE_PLACEHOLDER_URL = 'https://static.wikia.nocookie.net/delta-force/images/9/9d/Tank.png/revision/latest/scale-to-width-down/180?cb=20250215045840';
const VEHICLES = [
    { id: "vehicle_tank", color: '#ffffff', type: 'image', iconUrl: VEHICLE_PLACEHOLDER_URL }, 
    { id: "vehicle_lav_aa", color: '#ffffff', type: 'image', iconUrl: VEHICLE_PLACEHOLDER_URL }, 
    { id: "vehicle_lav_g1", color: '#ffffff', type: 'image', iconUrl: VEHICLE_PLACEHOLDER_URL }, 
    { id: "vehicle_assault_veh", color: '#ffffff', type: 'image', iconUrl: VEHICLE_PLACEHOLDER_URL }, 
    { id: "vehicle_atv", color: '#ffffff', type: 'image', iconUrl: VEHICLE_PLACEHOLDER_URL }, 
    { id: "vehicle_fsv", color: '#ffffff', type: 'image', iconUrl: VEHICLE_PLACEHOLDER_URL }, 
    { id: "vehicle_light_tank", color: '#ffffff', type: 'image', iconUrl: UTILITY_PLACEHOLDER_URL }, 
    { id: "vehicle_assault_boat", color: '#ffffff', type: 'image', iconUrl: UTILITY_PLACEHOLDER_URL }, 
    { id: "vehicle_jet_ski", color: '#ffffff', type: 'image', iconUrl: UTILITY_PLACEHOLDER_URL }, 
    { id: "vehicle_assault_heli", color: '#ffffff', type: 'image', iconUrl: VEHICLE_PLACEHOLDER_URL }, 
    { id: "vehicle_recon_heli", color: '#ffffff', type: 'image', iconUrl: UTILITY_PLACEHOLDER_URL }, 
    { id: "vehicle_jet", color: '#ffffff', type: 'image', iconUrl: UTILITY_PLACEHOLDER_URL }
];

// Combine all selectable icons into one list for centralized logic
const SELECTABLE_ICONS = [...OPERATORS, ...UTILITIES, ...VEHICLES];

// == CANVAS AND CONTEXT SETUP ==
const mapContainer = document.getElementById('map-container');
const mapCardWrapper = document.getElementById('map-card-wrapper');
const mapBackground = document.getElementById('map-background');
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const lineBuffer = document.createElement('canvas');
const lineBufferCtx = lineBuffer.getContext('2d');

const OPERATOR_DOT_RADIUS = 5;
const UTILITY_IMAGE_DIAMETER = 15; 
const ICON_HIT_AREA = 15;
const TEXT_HIT_AREA = 10;
const utilityImageCache = {};

// == HISTORY STATE (UNDO/REDO) ==
let history = [];
let historyIndex = -1;
const MAX_HISTORY_SIZE = 100;

// == SEQUENCE STATE ==
let planningData = {}; 
let currentMapKey = ''; 
let currentSequenceId = 'Seq 1';
let placedIcons = []; 
let placedText = []; 
const MAX_SEQUENCES = 10; 

// == ANIMATION STATE ==
let isAnimating = false;
let animationStartTime = 0;
let animationFrameId = null;
let startIconPositions = [];

// == GLOBAL STATE ==
let currentMapIndex = 0;
let currentSectorName = "";
let mapNaturalWidth = 0;
let mapNaturalHeight = 0;
let isLoggedIn = false; // NEW LOGIN STATE VARIABLE

// == TOOL STATE ==
let isDrawing = false;
let isMovingIcon = false; 
let movingIconIndex = -1; 
let movingType = null;
let currentTool = 'pen';
let currentLineWidth = 8;
let currentColor = '#ff0000';
let lastX = 0;
let lastY = 0;
let mapLoaded = false;
let selectedIcon = SELECTABLE_ICONS[0]; 
let defaultText = 'LABEL'; 

// == DOM ELEMENTS (Updated for new login UI) ==
const appWrapper = document.getElementById('app-wrapper'); // New main app wrapper
const loginContainer = document.getElementById('login-container');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const loginMessageBox = document.getElementById('login-message-box');
const logoutButton = document.getElementById('logout-button'); // Added to sidebar

// Removed old Firebase UI elements: authUi, authForm, authEmail, authPassword, etc.

const mapSelect = document.getElementById('map-select');
const sectorSelect = document.getElementById('sector-select');
const sequenceSelect = document.getElementById('sequence-select'); 
const operatorIconsContainer = document.getElementById('operator-icons');
const utilityIconsContainer = document.getElementById('utility-icons'); 
const vehicleIconsContainer = document.getElementById('vehicle-icons'); 
const placementHintOperator = document.getElementById('placement-hint-operator');
const placementHintUtility = document.getElementById('placement-hint-utility'); 
const placementHintVehicle = document.getElementById('placement-hint-vehicle'); 
const placementHintText = document.getElementById('placement-hint-text'); 
const textInput = document.getElementById('text-input'); 
const toolButtons = document.querySelectorAll('.tool-button');
const lineWidthInput = document.getElementById('line-width');
const widthDisplay = document.getElementById('width-display');
const colorPicker = document.getElementById('color-picker');
const clearButton = document.getElementById('clear-map');
const clearLinesButton = document.getElementById('clear-lines'); 
const saveButton = document.getElementById('save-map');
const undoButton = document.getElementById('undo-button');
const redoButton = document.getElementById('redo-button');
const brushPreview = document.getElementById('brush-preview');
const trashCan = document.getElementById('trash-can'); 

const currentMapDisplay = document.getElementById('current-map-display');
const currentSectorDisplay = document.getElementById('current-sector-display');

const customModal = document.getElementById('custom-modal');
const modalMessage = document.getElementById('modal-message');
const modalConfirmButton = document.getElementById('modal-confirm');
const modalCancelButton = document.getElementById('modal-cancel');
let currentModalCallback = null;

const exportButton = document.getElementById('export-data');
const importButton = document.getElementById('import-data');
const importModal = document.getElementById('import-modal');
const importFileInput = document.getElementById('import-file-input');
const importModalCancelButton = document.getElementById('import-modal-cancel');
const importModalActionButton = document.getElementById('import-modal-action');

// =========================================================================
// 0. UTILITY FUNCTIONS (INCLUDING LOGIN/LOGOUT)
// =========================================================================

function displayMessage(message, isError) {
    loginMessageBox.textContent = message;
    loginMessageBox.classList.remove('hidden', 'bg-red-700', 'bg-green-700');
    if (isError) {
        loginMessageBox.classList.add('bg-red-700');
    } else {
        loginMessageBox.classList.add('bg-green-700');
    }
}

function clearLoginMessages() {
    loginMessageBox.classList.add('hidden');
}

function getCanvasCoords(e) {
    let clientX, clientY;
    const target = e.touches ? e.touches[0] : e;
    clientX = target.clientX;
    clientY = target.clientY;

    const canvasRect = canvas.getBoundingClientRect();
    const x = clientX - canvasRect.left;
    const y = clientY - canvasRect.top;
    return { x, y, clientX, clientY };
}

function hexToRgba(hex, alpha = 1.0) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// --- LOGIN/LOGOUT HANDLERS (Replaces Firebase Auth) ---

/**
 * Toggles the visibility of the login screen vs. the main app.
 */
function checkLogin() {
    if (isLoggedIn) {
        loginContainer.classList.add('hidden');
        appWrapper.classList.remove('hidden');
        // Initial map load upon successful login
        if (!mapLoaded) { 
             mapSelect.dispatchEvent(new Event('change')); 
        }
    } else {
        loginContainer.classList.remove('hidden');
        appWrapper.classList.add('hidden');
    }
}

/**
 * Handles the submission of the login form.
 */
const handleLoginAction = (e) => {
    e.preventDefault();
    clearLoginMessages();
    
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        isLoggedIn = true;
        checkLogin();
        passwordInput.value = ''; 
    } else {
        displayMessage("Invalid username or password. Please use admin/12321.", true);
    }
};

/**
 * Logs the user out and shows the login screen.
 */
const handleLogout = () => {
    isLoggedIn = false;
    // Clear the password field for the next login attempt
    passwordInput.value = '';
    // Optional: clear the session/local storage data if you were using it
    // clearStrategyDataLocally(); 
    checkLogin();
};


// Removed Firebase functions: saveStrategyData, loadStrategyData, initFirebase, etc.

// =========================================================================
// 1. PLANNER CORE LOGIC (Draw, Move, Sequence, History)
// (NOTE: Placeholder functions remain, assuming they are fully implemented 
// in your original script outside the Firebase sections)
// =========================================================================

function drawSingleIcon(icon) {
    // ... (Full drawSingleIcon logic) ...
}
function redrawIcons(icons) { icons.forEach(drawSingleIcon); }
function drawSingleText(textObj) {
    // ... (Full drawSingleText logic) ...
}
function redrawText(textList) { textList.forEach(drawSingleText); }


function synchronousRedraw() {
    if (!mapLoaded) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(lineBuffer, 0, 0);

    redrawIcons(placedIcons);
    redrawText(placedText);
}

function saveState() {
    // ... (Full saveState logic, now relies only on local history) ...
    if (!mapLoaded) return;
    if (history.length >= MAX_HISTORY_SIZE) { history.shift(); historyIndex--; }
    if (historyIndex < history.length - 1) { history = history.slice(0, historyIndex + 1); }
    
    const newState = {
        lineData: lineBuffer.toDataURL(), 
        icons: JSON.parse(JSON.stringify(placedIcons)), 
        textData: JSON.parse(JSON.stringify(placedText))
    };
    
    history.push(newState);
    historyIndex = history.length - 1;
    updateUndoRedoButtons();
}

function restoreState() {
    // ... (Full restoreState logic) ...
    if (!mapLoaded || historyIndex < 0 || historyIndex >= history.length) return;
    const state = history[historyIndex];
    
    placedIcons.length = 0; 
    placedIcons.push(...state.icons);
    placedText.length = 0; 
    placedText.push(...state.textData);
    
    // Restore the off-screen line buffer (asynchronous due to Image load)
    const lineSnapshot = new Image();
    lineSnapshot.onload = () => {
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
        lineBufferCtx.drawImage(lineSnapshot, 0, 0);
        synchronousRedraw();
    }
    lineSnapshot.src = state.lineData;
    
    updateUndoRedoButtons();
}

function undo() { if (historyIndex > 0) { historyIndex--; restoreState(); } }
function redo() { if (historyIndex < history.length - 1) { historyIndex++; restoreState(); } }

// Placeholder functions for the rest of the planner logic (you keep your original implementations here)
function getIconAtCoords(x, y) { /* ... */ return null; }
function updateBrushPreview(x, y, size, color, isEraser, visible) { /* ... */ }
function startInteraction(e) { /* ... */ }
function stopInteraction(e) { /* ... */ }
function placeIcon(e) { /* ... */ }
function clearDrawing(confirm, isMapChange) { /* ... */ }
function clearLines() { /* ... */ }
function exportPlan() { /* ... */ }
function handleFileSelection() { /* ... */ }
function handleImportAction() { /* ... */ }
function updateUndoRedoButtons() { /* ... */ }
function updateHeaderDisplay() { /* ... */ }
function populateSequenceSelector() { /* ... */ }
function switchSequence(newSequenceId) { /* ... */ }
function populateSectorSelector(mapIndex) { /* ... */ }
function loadMap(url) { /* ... */ }
function resizeCanvas() { /* ... */ }
function populateMapSelector() { /* ... */ }
function populateOperatorSelector() { /* ... */ }
function populateUtilitySelector() { /* ... */ }
function populateVehicleSelector() { /* ... */ }
function initializeSequenceData(mapKey) { /* ... */ }

// The restoreImportedState function is modified to only deal with file imports, not cloud loads
function restoreImportedState(importState, isCloudLoad = false) {
    if (!importState.planningData) { console.error('Invalid plan data structure in file.'); return; }

    planningData = importState.planningData;
    
    const newMapIndex = importState.mapIndex;
    const newSectorUrl = importState.sectorUrl;
    const newSectorName = importState.sectorName;

    mapSelect.value = newMapIndex;
    currentMapIndex = newMapIndex;
    populateSectorSelector(currentMapIndex); 
    
    const sectorOption = Array.from(sectorSelect.options).find(opt => opt.value === newSectorUrl);
    if (sectorOption) sectorSelect.value = newSectorUrl;
    
    currentTool = importState.currentTool || 'pen';
    currentLineWidth = importState.currentLineWidth || 8;
    currentColor = hexToRgba(importState.currentColor || '#ff0000', 0.8);
    
    lineWidthInput.value = currentLineWidth;
    widthDisplay.textContent = `${currentLineWidth}px`;
    colorPicker.value = importState.currentColor || '#ff0000';
    document.getElementById(`tool-${currentTool}`)?.click();
    
    currentSectorName = newSectorName;
    currentSequenceId = importState.currentSequenceId || 'Seq 1';
    
    // Trigger map load which will handle image and state sync
    sectorSelect.dispatchEvent(new Event('change'));
}


// =========================================================================
// 2. INITIALIZATION
// =========================================================================

const initializeApp = () => {
    
    // --- Attach Login/Logout Listeners (New) ---
    loginForm.addEventListener('submit', handleLoginAction);
    logoutButton.addEventListener('click', handleLogout); 
    // The "Save Plan" button is now non-functional since Firebase was removed
    // savePlanBtn.addEventListener('click', () => { displayMessage("Cloud save disabled.", true); });

    // --- Attach Planner Event Listeners (Keep all of your original listeners here) ---
    // Placeholder listeners shown below:
    mapSelect.addEventListener('change', (e) => { /* ... map change logic ... */ });
    sectorSelect.addEventListener('change', (e) => { /* ... sector change logic ... */ });
    sequenceSelect.addEventListener('change', (e) => { /* ... sequence change logic ... */ });
    toolButtons.forEach(button => { button.addEventListener('click', (e) => { /* ... tool switch logic ... */ }); });
    canvas.addEventListener('mousedown', startInteraction);
    canvas.addEventListener('touchstart', startInteraction);
    // ... (The rest of the listeners) ...
    
    // Initial check: if isLoggedIn is false, the login screen will show.
    checkLogin(); 
};

// --- Initial Setup Calls ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup functions
    currentColor = hexToRgba(colorPicker.value, 0.8);
    // preloadUtilityImages(); 
    populateVehicleSelector();  
    populateMapSelector();
    populateOperatorSelector();
    populateUtilitySelector();  
    
    // Call the main initialization function
    initializeApp();
});

window.addEventListener('load', () => { resizeCanvas(); });
window.addEventListener('resize', () => { 
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(resizeCanvas, 100);
});

// window.initFirebaseApp = initFirebase; // REMOVED
