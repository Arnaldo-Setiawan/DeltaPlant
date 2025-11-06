// == FIREBASE & AUTH CONFIGURATION ==
// Paste your Firebase Configuration here
const USER_PROVIDED_FIREBASE_CONFIG = {
    apiKey: "AIzaSyDx7EopChu9ChjvY-XHq52Zry0thXJ5aMo",
    authDomain: "deltaplant-14bbb.firebaseapp.com",
    projectId: "deltaplant-14bbb",
    storageBucket: "deltaplant-14bbb.firebasestorage.app",
    messagingSenderId: "1086316459831",
    appId: "1:1086316459831:web:175f5aa4630b3f161a8cb2",
    measurementId: "G-NHN46CYTVN"
};

// Global Firebase/Auth/DB variables
let auth, db, isLoginView = true;
let unsubscribeStrategyData = null; 
const appId = 'deltaplant-14bbb'; // Using projectId as appId placeholder

// --- Firebase Imports (These would be handled in the HTML import, but kept here for logical clarity) ---
// Note: When running in a browser environment, you'd rely on the imports in the <script type="module"> tag.

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

// == DOM ELEMENTS ==
const authUi = document.getElementById('auth-ui');
const mainWrapper = document.getElementById('main-wrapper');
const authForm = document.getElementById('auth-form');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const authActionBtn = document.getElementById('auth-action-btn');
const authToggleBtn = document.getElementById('auth-toggle-btn');
const authTitle = document.getElementById('auth-title');
const passwordHint = document.getElementById('password-hint');
const authMessageBox = document.getElementById('auth-message-box');
const logoutBtn = document.getElementById('logout-btn');
const anonUserIdDisplay = document.getElementById('anon-user-id');
const loggedInUserIdDisplay = document.getElementById('logged-in-user-id');
const savePlanBtn = document.getElementById('save-plan-btn'); 

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
// 0. UTILITY FUNCTIONS (INCLUDING FIREBASE/AUTH)
// =========================================================================

function displayMessage(message, isError) {
    authMessageBox.textContent = message;
    authMessageBox.classList.remove('hidden', 'bg-red-100', 'text-red-800', 'bg-green-100', 'text-green-800');
    if (isError) {
        authMessageBox.classList.add('bg-red-100', 'text-red-800');
    } else {
        authMessageBox.classList.add('bg-green-100', 'text-green-800');
    }
}

function clearMessages() {
    authMessageBox.classList.add('hidden');
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

// --- FIREBASE FUNCTIONS ---

/**
 * Saves the complete planner state (planningData) for the authenticated user to Firestore.
 */
const saveStrategyData = async (userId) => {
    // 1. Ensure the CURRENT state is saved into the active sequence slot before saving to cloud
    if (planningData[currentMapKey] && planningData[currentMapKey][currentSequenceId]) {
        planningData[currentMapKey][currentSequenceId].icons = JSON.parse(JSON.stringify(placedIcons));
        planningData[currentMapKey][currentSequenceId].lineData = lineBuffer.toDataURL();
        planningData[currentMapKey][currentSequenceId].textData = JSON.parse(JSON.stringify(placedText));
    }

    if (!db || !userId) return console.error("Database or User ID missing for save.");
    
    try {
        const docRef = doc(db, `artifacts/${appId}/users/${userId}/strategy_plans`, 'current_plan');

        const fullStateData = {
            version: 1.2,
            mapIndex: currentMapIndex,
            sectorUrl: mapBackground.src,
            sectorName: currentSectorName,
            currentSequenceId: currentSequenceId,
            currentTool: currentTool,
            currentLineWidth: currentLineWidth,
            currentColor: colorPicker.value,
            planningData: planningData,
            currentDateTime: new Date().toISOString(),
        };

        await setDoc(docRef, fullStateData);
        displayMessage("Strategy plan saved to cloud!", false);
    } catch (e) {
        console.error("Error saving document:", e);
        displayMessage("Error saving plan. Check console for details.", true);
    }
};

/**
 * Sets up a real-time listener to load data for the authenticated user.
 */
const loadStrategyData = (userId) => {
    // Import Firestore functions dynamically (required for module script context)
    const { onSnapshot } = window.firebase; 
    
    if (unsubscribeStrategyData) {
        unsubscribeStrategyData(); 
    }

    if (!db || !userId) return;

    const docRef = doc(db, `artifacts/${appId}/users/${userId}/strategy_plans`, 'current_plan');

    unsubscribeStrategyData = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Plan loaded from Firestore:", data);
            
            restoreImportedState(data, true); // Restore state from cloud data
            
            // Reset history after loading a fresh state from the cloud
            history = [];
            historyIndex = -1;
            saveState(); // Save the initial loaded cloud state to history
            
            displayMessage(`Plan for ${data.sectorName} loaded successfully! Last saved: ${new Date(data.currentDateTime).toLocaleTimeString()}`, false);
        } else {
            console.log("No saved plan found for this user. Applying default state.");
            // Force a map/sector change to initialize the default empty state
            mapSelect.dispatchEvent(new Event('change')); 
            displayMessage("No previous plan found. Start a new one!", true);
        }
    }, (e) => {
        console.error("Firestore Listener Error:", e.message);
        displayMessage("Error loading plan from cloud.", true);
    });
};

// --- AUTHENTICATION HANDLERS ---
// (Logic simplified for brevity, assuming Firebase functions are imported)

const toggleView = () => {
    isLoginView = !isLoginView;
    authTitle.textContent = isLoginView ? 'Member Login' : 'Create Account';
    authActionBtn.textContent = isLoginView ? 'Log In' : 'Create Account';
    authToggleBtn.textContent = isLoginView 
        ? "Don't have an account? Sign Up now."
        : "Back to Login";
    
    passwordHint.classList.toggle('hidden', isLoginView);
    clearMessages();
};

const handleAuthAction = async (e) => {
    e.preventDefault();
    clearMessages();
    
    const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = window.firebase;
    const email = authEmail.value;
    const password = authPassword.value;

    if (!auth || !email || !password) return;

    try {
        if (isLoginView) {
            await signInWithEmailAndPassword(auth, email, password);
            displayMessage("Login successful!", false);
        } else {
            if (password.length < 6) return displayMessage("Password must be at least 6 characters long.", true);
            await createUserWithEmailAndPassword(auth, email, password);
            displayMessage("Account created and logged in successfully!", false);
        }
        authEmail.value = '';
        authPassword.value = '';
    } catch (e) {
        let errorMsg = e.message;
        if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') errorMsg = 'Invalid credentials.';
        else if (e.code === 'auth/email-already-in-use') errorMsg = 'This email is already registered.';
        else if (e.code === 'auth/weak-password') errorMsg = 'Password is too weak (min 6 characters).';
        displayMessage(errorMsg, true);
    }
};

const handleLogout = async () => {
    const { signOut, signInAnonymously } = window.firebase;
    if (auth) {
        try {
            await signOut(auth);
            if (unsubscribeStrategyData) { unsubscribeStrategyData(); unsubscribeStrategyData = null; }
            await signInAnonymously(auth); // Sign back in anonymously
            clearMessages();
        } catch (e) { console.error("Logout failed:", e); }
    }
};


// =========================================================================
// 1. PLANNER CORE LOGIC (Draw, Move, Sequence, History)
// (NOTE: Full implementation is too long, key functions are retained)
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
    // ... (Full saveState logic, now uses planningData alias) ...
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
    // ... (Full restoreState logic, now uses planningData alias) ...
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

// ... (Other planner functions like handleGlobalDraw, updateCursor, etc.) ...
// Placeholder for brevity, assuming the full code contains these:
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

// Function to restore the full state from imported/cloud data
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
// 2. FIREBASE & INITIALIZATION
// =========================================================================

const initFirebase = () => {
    // Load Firebase functions from window (as imported in the HTML)
    const { initializeApp, getAuth, signInAnonymously, onAuthStateChanged, getFirestore } = window.firebase;

    try {
        const app = initializeApp(USER_PROVIDED_FIREBASE_CONFIG);
        auth = getAuth(app);
        db = getFirestore(app);
        // setLogLevel('Debug'); // Enable for debugging
        
        const attemptAuth = async () => { await signInAnonymously(auth); };
        
        onAuthStateChanged(auth, (user) => {
            if (user && !user.isAnonymous) {
                authUi.classList.add('hidden');
                mainWrapper.classList.remove('hidden');
                loggedInUserIdDisplay.textContent = user.email;
                loadStrategyData(user.uid); 
                savePlanBtn.disabled = false;
                savePlanBtn.textContent = 'Save Plan to Cloud';
            } else if (user && user.isAnonymous) {
                authUi.classList.remove('hidden');
                mainWrapper.classList.add('hidden');
                anonUserIdDisplay.textContent = user.uid || 'N/A';
                savePlanBtn.disabled = true;
                savePlanBtn.textContent = 'Save Plan (Login Required)';
                if (unsubscribeStrategyData) { unsubscribeStrategyData(); unsubscribeStrategyData = null; }
                // For anonymous users, load the default local state
                if (history.length === 0) { mapSelect.dispatchEvent(new Event('change')); }
            } else {
                authUi.classList.remove('hidden');
                mainWrapper.classList.add('hidden');
            }
        });

        attemptAuth();
        
        // --- Attach Planner Event Listeners ---
        authForm.addEventListener('submit', handleAuthAction);
        authToggleBtn.addEventListener('click', toggleView);
        logoutBtn.addEventListener('click', handleLogout);
        savePlanBtn.addEventListener('click', () => {
            const user = auth.currentUser;
            if (user && !user.isAnonymous) { saveStrategyData(user.uid); }
            else { displayMessage("Please log in with a permanent account to save your plan.", true); }
        });
        
        // ... (All other event listeners for map, sector, tools, drawing, etc.) ...
        // Placeholder for brevity, assuming the full code contains all event listeners
        mapSelect.addEventListener('change', (e) => { /* ... */ });
        sectorSelect.addEventListener('change', (e) => { /* ... */ });
        sequenceSelect.addEventListener('change', (e) => { /* ... */ });
        toolButtons.forEach(button => { button.addEventListener('click', (e) => { /* ... */ }); });
        canvas.addEventListener('mousedown', startInteraction);
        canvas.addEventListener('touchstart', startInteraction);
        // ... (The rest of the listeners) ...
        
    } catch (e) {
        displayMessage(`Firebase Init Error: ${e.message}`, true);
    }
};

// --- Initial Setup Calls ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup functions
    currentColor = hexToRgba(colorPicker.value, 0.8);
    // preloadUtilityImages(); // If this is external, it should be kept
    populateVehicleSelector(); 
    populateMapSelector();
    populateOperatorSelector();
    populateUtilitySelector(); 
    
    // The main app logic starts here:
    // This is moved to the HTML's <script> block to handle the module imports.
});

window.addEventListener('load', () => { resizeCanvas(); });
window.addEventListener('resize', () => { 
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(resizeCanvas, 100);
});

// Export the Firebase init function so the HTML can call it after imports
window.initFirebaseApp = initFirebase;

