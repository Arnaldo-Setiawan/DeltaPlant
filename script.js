if (window.firebaseAppInitialized) {
    console.warn("Script defense activated. Exiting duplicate execution.");
    // This will stop the file from running a second time
    // if the browser is erroneously loading it twice.
    throw new Error("Duplicate script execution prevented."); 
}
window.firebaseAppInitialized = true;

console.log("test");
// --- IMPORTANT: Replace this config with your actual Firebase project config ---
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDx7EopChu9ChjvY-XHq52Zry0thXJ5aMo",
  authDomain: "deltaplant-14bbb.firebaseapp.com",
  databaseURL: "https://deltaplant-14bbb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "deltaplant-14bbb",
  storageBucket: "deltaplant-14bbb.firebasestorage.app",
  messagingSenderId: "1086316459831",
  appId: "1:1086316459831:web:175f5aa4630b3f161a8cb2"
};

// =========================================================================
// FIREBASE IMPORTS
// =========================================================================

// (function() { // REMOVE THE IIFE for module compatibility

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
console.log("Firebase Config Loaded:", !!FIREBASE_CONFIG.apiKey);
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
    getDatabase, 
    ref, 
    onValue, 
    set, 
    update, 
    off 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getDatabase(app);

// =========================================================================
// REMOVED: HARDCODED LOGIN CONFIGURATION
// const ADMIN_USERNAME = 'admin';
// const ADMIN_PASSWORD = '12321'; 
// =========================================================================

// --- Planner Constants (Copied from your provided code) ---
const ANIMATION_DURATION = 500; // ms
const PLACEHOLDER_MAP_IMAGE = "https://placehold.co/1280x720/161b22/c9d1d9?text=Map+Image+Goes+Here";

const MAPS = [
    // ... (Your MAPS array is unchanged)
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

// NEW CONFIGURATION FOR UTILITY ICONS (Using placeholder public URLs for stability)
const UTILITY_PLACEHOLDER_URL = 'https://i.imgur.com/0jj5Jtg.png'; 
const UTILITIES = [
    { id: "utility_beacon", color: '#ffffff', type: 'image', iconUrl: UTILITY_PLACEHOLDER_URL }, 
    { id: "utility_mine", color: '#ffffff', type: 'image', iconUrl: 'https://i.imgur.com/ZlSQOQD.png' }, 
    { id: "utility_ads", color: '#ffffff', type: 'image', iconUrl: 'https://i.imgur.com/cURoWsM.png' } 
];

const VEHICLE_PLACEHOLDER_URL = 'https://static.wikia.nocookie.net/delta-force/images/9/9d/Tank.png/revision/latest/scale-to-width-down/180?cb=20250215045840';
const VEHICLES = [
    { id: "vehicle_tank", color: '#ffffff', type: 'image', iconUrl: VEHICLE_PLACEHOLDER_URL }, 
    { id: "vehicle_lav_aa", color: '#ffffff', type: 'image', iconUrl: 'https://static.wikia.nocookie.net/delta-force/images/4/4b/LAV_AA.png/revision/latest/scale-to-width-down/180?cb=20250215045350' }, 
    { id: "vehicle_lav_g1", color: '#ffffff', type: 'image', iconUrl: 'https://static.wikia.nocookie.net/delta-force/images/6/65/LAV_G1.png/revision/latest/scale-to-width-down/180?cb=20250215045800' }, 
    { id: "vehicle_assault_veh", color: '#ffffff', type: 'image', iconUrl: 'https://static.wikia.nocookie.net/delta-force/images/d/da/VEHICULOS_DE_ASALTO.png/revision/latest/scale-to-width-down/180?cb=20250215045118' }, 
    { id: "vehicle_atv", color: '#ffffff', type: 'image', iconUrl: 'https://static.wikia.nocookie.net/delta-force/images/d/db/ATV.png/revision/latest/scale-to-width-down/180?cb=20250215045302' }, 
    { id: "vehicle_fsv", color: '#ffffff', type: 'image', iconUrl: 'https://static.wikia.nocookie.net/delta-force/images/0/0f/DESTRUCTOR_DE_TANKES.png/revision/latest/scale-to-width-down/180?cb=20250215050129' }, 
    { id: "vehicle_light_tank", color: '#ffffff', type: 'image', iconUrl: 'https://placehold.co/30/000000/ffffff?text=LT' }, 
    { id: "vehicle_assault_boat", color: '#ffffff', type: 'image', iconUrl: 'https://placehold.co/30/000000/ffffff?text=B' }, 
    { id: "vehicle_jet_ski", color: '#ffffff', type: 'image', iconUrl: 'https://placehold.co/30/000000/ffffff?text=S' }, 
    { id: "vehicle_assault_heli", color: '#ffffff', type: 'image', iconUrl: 'https://static.wikia.nocookie.net/delta-force/images/1/11/Ah-1035D.png/revision/latest/scale-to-width-down/181?cb=20250215045005' }, 
    { id: "vehicle_recon_heli", color: '#ffffff', type: 'image', iconUrl: 'https://placehold.co/30/000000/ffffff?text=RH' }, 
    { id: "vehicle_jet", color: '#ffffff', type: 'image', iconUrl: 'https://placehold.co/30/000000/ffffff?text=J' }
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
const utilityImageCache = {}; // Used for caching utility/vehicle images

// == HISTORY STATE (UNDO/REDO) ==
// History will now only manage local drawing/text operations that haven't been synced.
// For simplicity and multi-user sync, we will only use history for local drawing lines (pen/eraser)
let history = []; 
let historyIndex = -1;
const MAX_HISTORY_SIZE = 100;

// == SEQUENCE STATE (Aliased to Database Data) ==
// This array will hold the current state fetched from the database for the active sequence
let currentSequenceData = null; // Holds the live object for the current sequence: {icons: [], lineData: '', textData: []}
let currentMapKey = ''; 
let currentSequenceId = 'Seq 1';
let placedIcons = []; // ALIAS: points to currentSequenceData.icons
let placedText = []; // ALIAS: points to currentSequenceData.textData
const MAX_SEQUENCES = 10; 

let firebaseListener = null; // Holds the reference to the active Firebase listener

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
let isDataUpdateFromRemote = false; // Flag to prevent remote updates from triggering local saveState/undo/redo logic

// == DOM ELEMENTS (Updated for new login UI) ==
const appWrapper = document.getElementById('app-wrapper'); // New main app wrapper
const loginContainer = document.getElementById('login-container');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const loginMessageBox = document.getElementById('login-message-box');
const logoutButton = document.getElementById('logout-button'); // Added to sidebar

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
// 0. UTILITY FUNCTIONS (INCLUDING LOGIN/LOGOUT - UPDATED FOR FIREBASE)
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

// --- LOGIN/LOGOUT HANDLERS (UPDATED for Firebase Auth) ---

/**
 * Toggles the visibility of the login screen vs. the main app.
 */
function checkLogin(user) {
    if (user) {
        isLoggedIn = true;
        loginContainer.classList.add('hidden');
        appWrapper.classList.remove('hidden');
        // Initial map load upon successful login
        if (!mapLoaded) { 
            mapSelect.dispatchEvent(new Event('change')); 
        }
    } else {
        isLoggedIn = false;
        loginContainer.classList.remove('hidden');
        appWrapper.classList.add('hidden');
    }
}

/**
 * Handles the submission of the login form using Firebase.
 */
const handleLoginAction = (e) => {
    e.preventDefault();
    clearLoginMessages();
    
    // NOTE: Hardcoded admin is replaced by Firebase user
    const email = 'admin@deltaforce.com'; 
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully, onAuthStateChanged will handle UI change
            passwordInput.value = ''; 
        })
        .catch((error) => {
            const errorMessage = "Invalid password. Access Denied.";
            displayMessage(errorMessage, true);
        });
};

/**
 * Logs the user out.
 */
const handleLogout = () => {
    signOut(auth).then(() => {
        // Sign-out successful. onAuthStateChanged handles UI change.
        if (firebaseListener) {
            off(firebaseListener); // Detach listener
            firebaseListener = null;
        }
    }).catch((error) => {
        console.error("Logout error:", error);
    });
};


// =========================================================================
// 1. MODAL / UI FUNCTIONS
// =========================================================================
// ... (Your Modal/UI functions are largely unchanged)

function preloadUtilityImages() {
    // Create a robust fallback image (White Cross SVG)
    const fallbackImg = new Image();
    // Simple white cross SVG
    fallbackImg.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cline x1='10' y1='50' x2='90' y2='50' stroke='white' stroke-width='10' stroke-linecap='round'/%3E%3Cline x1='50' y1='10' x2='50' y2='90' stroke='white' stroke-width='10' stroke-linecap='round'/%3E%3C/svg%3E";


    UTILITIES.forEach(ut => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Set crossOrigin for hosted assets
        img.onload = () => {
            utilityImageCache[ut.iconUrl] = img;
            // console.log(`Preloaded: ${ut.iconUrl}`);
        };
        img.onerror = () => {
            console.error(`Error loading utility image: ${ut.iconUrl}. Falling back to SVG.`);
            utilityImageCache[ut.iconUrl] = fallbackImg;
        };
        img.src = ut.iconUrl;
    });

    VEHICLES.forEach(v => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            utilityImageCache[v.iconUrl] = img;
            // console.log(`Preloaded: ${v.iconUrl}`);
        };
        img.onerror = () => {
            console.error(`Error loading vehicle image: ${v.iconUrl}. Falling back to SVG.`);
            utilityImageCache[v.iconUrl] = fallbackImg;
        };
        img.src = v.iconUrl;
    });
    
    // Ensure the SVG is loaded immediately for use as a fallback if the local file fails.
    if (!utilityImageCache[fallbackImg.src]) {
        utilityImageCache[fallbackImg.src] = fallbackImg;
    }
}

// Easing function (EaseInOutCubic)
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Main Animation Loop (NEW) - Now uses currentSequenceData.icons as the target
function animateSequence(timestamp) {
    if (!animationStartTime) {
        animationStartTime = timestamp;
    }

    const elapsed = timestamp - animationStartTime;
    const progress = Math.min(1, elapsed / ANIMATION_DURATION);
    const easedProgress = easeInOutCubic(progress);
    
    // Target Icons from the current sequence data (which is live from Firebase)
    const targetIcons = currentSequenceData.icons || []; 

    // Interpolate based on stored start positions and current sequence end positions
    const interpolatedIcons = targetIcons.map((icon) => {
        // Find the starting position of this specific icon (by its unique ID)
        const start = startIconPositions.find(startIcon => startIcon.id === icon.id);
        const end = icon; 

        // If icon exists in the previous sequence snapshot
        if (start) {
            return {
                ...icon,
                x: start.x + (end.x - start.x) * easedProgress,
                y: start.y + (end.y - start.y) * easedProgress
            };
        }
        // If icon is new (or not in the previous sequence), it appears instantly at the end point.
        return icon;
    }).filter(icon => icon !== undefined);

    // Draw the interpolated frame
    drawFrame(currentSequenceId, interpolatedIcons, currentSequenceData.textData);

    if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateSequence);
    } else {
        // Animation finished: ensure the final state is drawn and update state
        isAnimating = false;
        animationStartTime = 0;
        animationFrameId = null;
        // Draw the final state from the actual currentSequenceData arrays
        drawFrame(currentSequenceId, currentSequenceData.icons || [], currentSequenceData.textData || []); 
    }
}

// Draws the current line data + the provided icon list + the provided text list (UPDATED)
function drawFrame(sequenceId, iconList, textList) {
    if (!mapLoaded) return;
    
    // 1. Clear the visible canvas immediately
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw lines from the off-screen line buffer immediately
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(lineBuffer, 0, 0);

    // 3. Draw icons from the provided list
    redrawIcons(iconList);

    // 4. Draw text from the provided list (NEW)
    redrawText(textList);
}

function updateUndoRedoButtons() {
    undoButton.disabled = historyIndex <= 0;
    redoButton.disabled = history.length === 0 || historyIndex >= history.length - 1;
}

function showConfirm(message, callback, confirmText = "Clear") {
    modalMessage.textContent = message;
    modalConfirmButton.textContent = confirmText;
    currentModalCallback = callback;
    customModal.classList.add('flex');
    customModal.classList.remove('hidden');
}

// Attach event listeners for the confirmation modal
modalConfirmButton.addEventListener('click', () => {
    if (currentModalCallback) {
        currentModalCallback(true);
    }
    customModal.classList.add('hidden');
    customModal.classList.remove('flex');
    currentModalCallback = null;
});

modalCancelButton.addEventListener('click', () => {
    if (currentModalCallback) {
        currentModalCallback(false);
    }
    customModal.classList.add('hidden');
    customModal.classList.remove('flex');
    currentModalCallback = null;
});

function updateHeaderDisplay() {
    const map = MAPS[currentMapIndex];
    currentMapDisplay.textContent = map ? map.name : "N/A";
    currentSectorDisplay.textContent = currentSectorName || "N/A";
}

// =========================================================================
// 2. REALTIME SYNCHRONIZATION (Replaces Sequence Management)
// =========================================================================

function generateMapKey(mapIndex, sectorName) {
    const mapName = MAPS[mapIndex]?.name || 'Unknown Map';
    // Firebase paths cannot contain '.', '#', '$', '[', or ']'
    return `${mapName.replace(/\./g, '_')}_${sectorName.replace(/\./g, '_')}`; 
}

/**
 * CRITICAL: Synchronizes local state with Firebase and attaches listener.
 * Called once after map load and on every sequence switch.
 */
function startRealtimeSync() {
    if (!isLoggedIn || !currentMapKey) return;
    
    // 1. Detach any existing listener to prevent memory leaks/incorrect data stream
    if (firebaseListener) {
        off(firebaseListener);
    }

    const path = `plans/${currentMapKey}`;
    const mapRef = ref(db, path);
    
    // 2. Set up a single listener for the entire map's data
    firebaseListener = onValue(mapRef, (snapshot) => {
        const allMapData = snapshot.val() || {};
        
        // This is the incoming state for ALL sequences on this map
        const remoteData = allMapData[currentSequenceId] || { icons: [], lineData: '', textData: [] }; 

        // Check if the update is from this user's write operation
        if (isDataUpdateFromRemote) {
            isDataUpdateFromRemote = false; // Reset the flag
            // Continue processing the remote data for other elements (like the lines/icons from others)
        } else {
            console.log(`Remote update received for ${currentMapKey} ${currentSequenceId}.`);
        }
        
        // 3. Update the global state alias pointers
        // The entire map data structure is now stored locally for context switching
        // but only the current sequence data is 'live'.
        currentSequenceData = remoteData;
        placedIcons = currentSequenceData.icons || [];
        placedText = currentSequenceData.textData || [];

        // 4. Restore Line Data (Asynchronous)
        const newLineData = currentSequenceData.lineData || '';
        
        if (newLineData) {
            const lineSnapshot = new Image();
            lineSnapshot.onload = () => {
                lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
                lineBufferCtx.drawImage(lineSnapshot, 0, 0);
                synchronousRedraw(); // Draw the lines and the new icons/text
            };
            lineSnapshot.onerror = () => {
                // Handle corrupted base64 data by clearing lines
                lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
                synchronousRedraw();
            }
            lineSnapshot.src = newLineData;
        } else {
            lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
            synchronousRedraw();
        }

        // 5. Update the history array with the final state for line-only undo/redo
        // saveState(); // We don't save state on remote updates, only on local actions.
    });
}

/**
 * Saves the current line, icon, and text state to the active Firebase path.
 * This is the ONLY function that should write to the database.
 */
function saveToDatabase(updateIcons = false, updateText = false, updateLines = false) {
    if (!currentSequenceData || !currentMapKey || !currentSequenceId) return;

    // 1. Snapshot the required data
    const dataToWrite = {};

    if (updateLines) {
        dataToWrite.lineData = lineBuffer.toDataURL(); // BASE64 for lines
    }
    if (updateIcons) {
        dataToWrite.icons = placedIcons; // Array of icon objects
    }
    if (updateText) {
        dataToWrite.textData = placedText; // Array of text objects
    }
    
    if (Object.keys(dataToWrite).length === 0) return;

    // 2. Update the Firebase flag to avoid unnecessary redraw/sync on the client that initiated the write.
    isDataUpdateFromRemote = true; // Set flag right before writing
    
    // 3. Perform the update to the specific sequence path
    const path = `plans/${currentMapKey}/${currentSequenceId}`;
    set(ref(db, path), {
        ...currentSequenceData, // Spread the existing data to ensure no fields are overwritten if not updated
        ...dataToWrite
    })
    .then(() => {
        // console.log("State updated to Firebase:", currentSequenceId);
        // Note: isDataUpdateFromRemote is reset inside the onValue listener.
    })
    .catch(error => {
        console.error("Firebase write failed:", error);
    });
}


function populateSequenceSelector() {
    sequenceSelect.innerHTML = '';
    for (let i = 1; i <= MAX_SEQUENCES; i++) {
        const seqId = `Seq ${i}`;
        // Since we don't hold all map data locally anymore, we rely on the maximum sequence count
        sequenceSelect.innerHTML += `<option value="${seqId}">${seqId}</option>`;
    }
    // Restore current selection
    sequenceSelect.value = currentSequenceId;
}


function switchSequence(newSequenceId) {
    if (currentSequenceId === newSequenceId || isAnimating) {
        return;
    }
    
    const oldSequenceId = currentSequenceId;
    
    // 1. Detach old listener
    if (firebaseListener) {
        off(firebaseListener);
    }
    
    // 2. Snapshot the current sequence data for animation start positions
    const oldIcons = placedIcons || [];
    startIconPositions = oldIcons.map(icon => ({ x: icon.x, y: icon.y, id: icon.id }));
    
    // 3. Update the sequence ID and UI immediately
    currentSequenceId = newSequenceId;
    sequenceSelect.value = newSequenceId;

    // 4. Attach new listener for the new sequence
    startRealtimeSync();

    // The remote listener callback will handle fetching the new data, 
    // updating local aliases, and starting the animation on successful load.
    
    // --- Start Animation (Placeholder, actual animation starts once remote data arrives) ---
    isAnimating = true;
    animationStartTime = 0;
    
    // Get the target state (which will be the newly fetched currentSequenceData)
    // The animation loop is started in the listener's callback, but we can call it now
    // to start the fade from the old positions.
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(animateSequence);
}

// =========================================================================
// 3. INITIALIZATION & RESIZING
// =========================================================================
// ... (loadMap and resizeCanvas are updated to use startRealtimeSync)

let currentMapImage = new Image();
currentMapImage.crossOrigin = "Anonymous"; // Set crossOrigin for the main map image

function populateSectorSelector(mapIndex) {
    const map = MAPS[mapIndex];
    if (map && map.sectors && map.sectors.length > 0) {
        sectorSelect.innerHTML = map.sectors.map((sector) => 
            `<option value="${sector.url}">${sector.name}</option>`
        ).join('');
        sectorSelect.disabled = false;
        
        const firstSector = map.sectors[0];
        sectorSelect.value = firstSector.url; 
        currentSectorName = firstSector.name;
        loadMap(firstSector.url); 

    } else {
        sectorSelect.innerHTML = '<option value="">No sectors defined</option>';
        sectorSelect.disabled = true;
        currentSectorName = "N/A";
        loadMap(''); 
    }
    updateHeaderDisplay();
}

function loadMap(url) {
    mapLoaded = false;
    if (!url) {
        mapBackground.src = '';
        canvas.width = 0;
        canvas.height = 0;
        mapLoaded = true;
        clearDrawing(false, true); 
        return;
    }

    mapBackground.src = url;
    currentMapImage.src = url;
    currentMapImage.crossOrigin = "Anonymous"; // Set CORS for Canvas to draw map

    currentMapImage.onload = () => {
        mapLoaded = true;
        mapNaturalWidth = currentMapImage.naturalWidth;
        mapNaturalHeight = currentMapImage.naturalHeight;
        resizeCanvas();
        
        // Determine map key and initialize sequence data
        const selectedMap = MAPS[mapSelect.value];
        const selectedSector = sectorSelect.options[sectorSelect.selectedIndex]?.text || 'A';
        currentMapKey = generateMapKey(mapSelect.value, selectedSector);
        
        // CRITICAL: Start the Realtime Sync (fetches data and sets up listeners)
        startRealtimeSync();
        
        // --- Reset drawing history (lines only) ---
        history = [];
        historyIndex = -1;
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height); 
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        
        // Manually inject a clean, empty line state as history[0]
        const emptyState = { 
            lineData: '', 
            icons: [], // Icons/Text are not managed by local history anymore
            textData: [] 
        }; 
        history.push(emptyState);
        historyIndex = 0;
        updateUndoRedoButtons();
        
        // Draw the icons and text for the initial sequence (will be done by the listener)
        // synchronousRedraw();
        console.log('New sector map loaded and Realtime Sync started.');
    };
    currentMapImage.onerror = () => {
        console.error("Error loading sector image. Check the URL.");
        mapLoaded = true;
        mapNaturalWidth = 800; 
        mapNaturalHeight = 800;
        resizeCanvas();
        clearDrawing(false, true);
    };
}

// ... (resizeCanvas is unchanged)
function resizeCanvas() {
    // Use fallback aspect ratio if natural dimensions are zero (direct file open/loading error)
    const fallbackAspectRatio = 16 / 9;
    const finalAspectRatio = (mapNaturalWidth === 0 || mapNaturalHeight === 0) 
                                                                             ? fallbackAspectRatio 
                                                                             : (mapNaturalHeight / mapNaturalWidth);
                                                                             
    // 1. Calculate the Aspect Ratio percentage (Height / Width)
    const aspectRatioPercent = finalAspectRatio * 100;

    // 2. Apply it to the CSS padding hack wrapper
    mapCardWrapper.style.paddingBottom = `${aspectRatioPercent}%`;

    // 3. Get the final rendered dimensions (which now respects the aspect ratio)
    const mapRect = mapContainer.getBoundingClientRect();
    const newWidth = mapRect.width;
    const newHeight = mapRect.height; 

    // 4. Set canvas and buffer sizes to match the container
    canvas.width = newWidth;
    canvas.height = newHeight;
    lineBuffer.width = newWidth;
    lineBuffer.height = newHeight;

    // Don't call restoreState() on resize, call synchronousRedraw() after map load is complete
    if (mapLoaded) {
        synchronousRedraw();
    }
}
// ... (populateMapSelector, populateOperatorSelector, populateUtilitySelector, populateVehicleSelector are unchanged)

// =========================================================================
// 4. HISTORY (UNDO/REDO) - Only for Lines Now
// =========================================================================

// Synchronous redraw: draws current lines from buffer + icons from placedIcons + placedText (UPDATED)
function synchronousRedraw() {
    if (!mapLoaded || !currentSequenceData) return;
    
    if (isAnimating) {
        // Do nothing if animating, the animation loop handles drawing
        return; 
    }
    
    // 1. Clear the visible canvas immediately
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw lines from the off-screen line buffer immediately
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(lineBuffer, 0, 0);

    // 3. Draw icons immediately (using the current placedIcons alias)
    redrawIcons(placedIcons);

    // 4. Draw text immediately (using the current placedText alias)
    redrawText(placedText);
}

// Save ONLY line buffer to history. Icon/Text changes are NOT undone/redone locally, they rely on DB state.
function saveState() {
    if (!mapLoaded) return;
    
    // Only save state if the action was a local line draw/erase, not an icon/text placement/move.
    if (currentTool !== 'pen' && currentTool !== 'eraser') return; 

    if (history.length >= MAX_HISTORY_SIZE) {
        history.shift();
        historyIndex--; 
    }

    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    
    const newState = {
        lineData: lineBuffer.toDataURL(), // Save only the lines/strokes
        // Icons/Text are not stored in the local history array
    };
    
    history.push(newState);
    historyIndex = history.length - 1;

    updateUndoRedoButtons();
}

function restoreState() {
    if (!mapLoaded || historyIndex < 0 || historyIndex >= history.length) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height); 
        updateUndoRedoButtons();
        return;
    }

    const state = history[historyIndex];
    
    // 1. Restore the off-screen line buffer (asynchronous due to Image load)
    const lineSnapshot = new Image();
    lineSnapshot.onload = () => {
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
        lineBufferCtx.drawImage(lineSnapshot, 0, 0);

        // 2. Render the full composite state (lines + icons + text) to the visible canvas
        synchronousRedraw(); 
    }
    lineSnapshot.src = state.lineData;
    
    updateUndoRedoButtons();
}
// ... (undo and redo are unchanged)

// =========================================================================
// 5. DRAWING / PLACEMENT / MOVEMENT LOGIC (UPDATED for Firebase)
// =========================================================================

// Helper function to check if coordinates are near an icon or text label (UPDATED)
function getIconAtCoords(x, y) {
    // Check Icons first
    for (let i = 0; i < placedIcons.length; i++) {
        const icon = placedIcons[i];
        const radius = icon.type === 'color' ? OPERATOR_DOT_RADIUS : UTILITY_IMAGE_DIAMETER / 2;
        const distance = Math.sqrt(Math.pow(x - icon.x, 2) + Math.pow(y - icon.y, 2));
        if (distance < radius + ICON_HIT_AREA) {
            return { index: i, type: 'icon', data: icon };
        }
    }
    
    // Check Text labels next (NEW)
    for (let i = 0; i < placedText.length; i++) {
        const textObj = placedText[i];
        ctx.font = `${textObj.size}px 'Inter', sans-serif`;
        const textMetrics = ctx.measureText(textObj.text);
        
        // Calculate rough bounding box (since textAlign is 'left', textBaseline is 'top')
        const width = textMetrics.width;
        const height = textObj.size * 1.5; // Estimate height
        
        if (x >= textObj.x - TEXT_HIT_AREA && x <= textObj.x + width + TEXT_HIT_AREA &&
            y >= textObj.y - TEXT_HIT_AREA && y <= textObj.y + height + TEXT_HIT_AREA) {
            return { index: i, type: 'text', data: textObj };
        }
    }

    return null; // Not found
}

function handleGlobalDraw(e) {
    const { x: currentX, y: currentY, clientX, clientY } = getCanvasCoords(e);
    
    if (currentTool === 'move') {
        if (!isMovingIcon || movingIconIndex === -1) return;

        // --- TRASH CAN HOVER LOGIC ---
        const trashRect = trashCan.getBoundingClientRect();
        const trashCanHover = (
            clientX >= trashRect.left &&
            clientX <= trashRect.right &&
            clientY >= trashRect.top &&
            clientY <= trashRect.bottom
        );

        if (trashCanHover) {
            trashCan.classList.add('opacity-100', 'bg-red-500/90');
            trashCan.classList.remove('bg-red-700/80', 'opacity-0');
        } else {
            trashCan.classList.remove('opacity-100', 'bg-red-500/90');
            trashCan.classList.add('opacity-100', 'bg-red-700/80'); 
        }
        // --- END TRASH CAN HOVER LOGIC ---

        // Update the icon/text position in the local vector array (placedIcons/placedText alias)
        const canvasRect = canvas.getBoundingClientRect();
        const newX = clientX - canvasRect.left;
        const newY = clientY - canvasRect.top;
        
        if (movingType === 'icon') {
            placedIcons[movingIconIndex].x = newX;
            placedIcons[movingIconIndex].y = newY;
        } else if (movingType === 'text') {
            placedText[movingIconIndex].x = newX;
            placedText[movingIconIndex].y = newY;
        }

        // Use synchronous redraw during drag for flicker-free movement.
        synchronousRedraw(); 
        e.preventDefault();
        return;
    }
    
    // --- DRAWING/ERASER LOGIC (Only runs if drawing started on canvas) ---
    if (!isDrawing || currentTool !== 'pen' && currentTool !== 'eraser') return;
    
    // Handle drawing/erasing logic on the off-screen buffer
    lineBufferCtx.beginPath();
    lineBufferCtx.lineJoin = 'round';
    lineBufferCtx.lineCap = 'round';
    lineBufferCtx.lineWidth = currentLineWidth;

    const isEraser = currentTool === 'eraser';
    if (isEraser) {
        lineBufferCtx.strokeStyle = 'rgba(0,0,0,1)'; 
        lineBufferCtx.globalCompositeOperation = 'destination-out';
    } else {
        // Use the currentColor (which is RGBA)
        lineBufferCtx.strokeStyle = currentColor;
        lineBufferCtx.globalCompositeOperation = 'source-over';
    }

    lineBufferCtx.moveTo(lastX, lastY);
    lineBufferCtx.lineTo(currentX, currentY);
    lineBufferCtx.stroke();

    [lastX, lastY] = [currentX, currentY];
    e.preventDefault();
    
    // Render the full state (lines from buffer + icons/text) to the visible canvas synchronously
    synchronousRedraw();
    
    // Update brush preview
    updateBrushPreview(clientX, clientY, currentLineWidth, currentColor, isEraser, true);
}

function startInteraction(e) {
    const { x, y } = getCanvasCoords(e);
    
    if (currentTool === 'move') {
        const hit = getIconAtCoords(x, y);
        if (hit) {
            movingIconIndex = hit.index;
            movingType = hit.type;
            isMovingIcon = true;
            // Attach global listeners for continuous dragging
            window.addEventListener('mousemove', handleGlobalDraw); 
            window.addEventListener('mouseup', stopInteraction);
            window.addEventListener('touchmove', handleGlobalDraw);
            window.addEventListener('touchend', stopInteraction);


            [lastX, lastY] = [x, y];
            mapContainer.style.cursor = 'grabbing';
            
            // Show trash can on start drag
            trashCan.classList.remove('hidden', 'opacity-0');
            trashCan.classList.add('opacity-100');
            
            // CRITICAL: No need to sync with FB here, we modify the local array 
            // and only save/sync on stopInteraction.
        }
        return;
    }

    if (currentTool === 'pen' || currentTool === 'eraser') {
        isDrawing = true;
        [lastX, lastY] = [x, y];
        // Attach global listeners for continuous drawing
        window.addEventListener('mousemove', handleGlobalDraw);
        window.addEventListener('mouseup', stopInteraction);
        window.addEventListener('touchmove', handleGlobalDraw);
        window.addEventListener('touchend', stopInteraction);
    }
}

function stopInteraction(e) {
    // Remove global listeners regardless of the outcome
    window.removeEventListener('mousemove', handleGlobalDraw);
    window.removeEventListener('mouseup', stopInteraction);
    window.removeEventListener('touchmove', handleGlobalDraw);
    window.removeEventListener('touchend', stopInteraction);

    // --- LINE DRAWING SYNC ---
    if (isDrawing) {
        isDrawing = false;
        // Save line data to local history for undo/redo
        saveState(); 
        // Save line data to Firebase for collaboration
        saveToDatabase(false, false, true);
    }
    
    // --- ICON/TEXT MOVEMENT/DELETION SYNC ---
    if (isMovingIcon) {
        
        // --- DELETION CHECK ---
        let droppedInTrash = false;
        // Use the stop event's client coordinates
        const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
        const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);

        if (clientX !== undefined && clientY !== undefined) { 
            const trashRect = trashCan.getBoundingClientRect();
            droppedInTrash = (
                clientX >= trashRect.left &&
                clientX <= trashRect.right &&
                clientY >= trashRect.top &&
                clientY <= trashCan.getBoundingClientRect().bottom
            );
        }

        if (droppedInTrash && movingIconIndex !== -1) {
            // DELETE THE MARKER (Icon or Text)
            if (movingType === 'icon') {
                placedIcons.splice(movingIconIndex, 1);
                saveToDatabase(true, false, false); // Save new icon array
            } else if (movingType === 'text') {
                placedText.splice(movingIconIndex, 1);
                saveToDatabase(false, true, false); // Save new text array
            }
            console.log(`${movingType} deleted and synced!`);
            synchronousRedraw();
        } else if (isMovingIcon && movingIconIndex !== -1) {
            // MOVED: The local array is already updated in handleGlobalDraw, just sync it
            if (movingType === 'icon') {
                 saveToDatabase(true, false, false); // Save new icon array
            } else if (movingType === 'text') {
                 saveToDatabase(false, true, false); // Save new text array
            }
        }

        // Cleanup: Ensure trash can opacity is reset and hidden
        trashCan.classList.remove('opacity-100', 'bg-red-500/90');
        trashCan.classList.add('opacity-0', 'bg-red-700/80');
        
        if(currentTool === 'move') {
            trashCan.classList.add('hidden');
        }

        isMovingIcon = false;
        movingIconIndex = -1;
        movingType = null;
        updateCursor();
    }
    
    updateBrushPreview(0, 0, 0, null, false, false); 
}

// UPDATED to handle both icons and text and sync to Firebase
function placeIcon(e) {
    if (!mapLoaded || !currentSequenceData || !selectedIcon && currentTool === 'place' || currentTool === 'text' && textInput.value.trim() === '') return;

    const { x, y } = getCanvasCoords(e);
    
    // If placing a new icon/text, no need to save line state first as it's not a line operation.

    if (currentTool === 'place') {
        // --- Icon Placement Logic (Existing) ---
        const baseId = selectedIcon.id;
        // Use a timestamp/random ID for uniqueness across users/sequences
        const uniqueId = `${baseId}_${Date.now()}`; 
        
        const newIcon = {
            id: uniqueId, 
            x: x, 
            y: y, 
            color: selectedIcon.color, 
            type: selectedIcon.type,
            iconUrl: selectedIcon.iconUrl || null 
        };

        placedIcons.push(newIcon);
        synchronousRedraw(); 
        saveToDatabase(true, false, false); // Sync the new icon array

    } else if (currentTool === 'text') {
        // --- Text Placement Logic (NEW) ---
        const baseId = 'text_label';
        const uniqueId = `${baseId}_${Date.now()}`; 
        
        const newText = {
            id: uniqueId,
            text: textInput.value.trim().toUpperCase(),
            x: x,
            y: y,
            color: colorPicker.value,
            size: currentLineWidth * 2 
        };

        placedText.push(newText);
        synchronousRedraw(); 
        saveToDatabase(false, true, false); // Sync the new text array
    }
}

// Clears only the lines/strokes, preserves icons and text (UPDATED for Firebase)
function clearLines() {
    showConfirm("Are you sure you want to clear all drawing lines? All placed icons and labels will remain.", (confirmed) => {
        if (confirmed) {
            lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
            
            // CRITICAL: Save the empty state back to Firebase line data
            saveToDatabase(false, false, true);

            synchronousRedraw();
            // No local history save needed as this only affects the live line layer
        }
    }, "Clear Lines");
}

// Clears everything (lines, icons, and text) (UPDATED for Firebase)
function clearDrawing(confirm = true, isMapChange = false) {
    const clearAction = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height); 
        placedIcons.length = 0; // Clear the icon array using its alias
        placedText.length = 0; // NEW: Clear the text array using its alias
        
        // CRITICAL: Clear line, icon, and text data for the current sequence in Firebase
        if (currentSequenceData) {
            currentSequenceData.lineData = ''; // Set line data to empty string
            currentSequenceData.icons = []; // Set icons to empty array
            currentSequenceData.textData = []; // Set text to empty array
            
            // Save the newly cleared state to Firebase
            saveToDatabase(true, true, true);
        }

        if (!isMapChange) {
            history = [];
            historyIndex = -1;
            updateUndoRedoButtons();
        }
    };

    if (confirm) {
        showConfirm("Are you sure you want to clear ALL drawings, icons, and labels? This cannot be undone.", (confirmed) => {
            if (confirmed) {
                clearAction();
            }
        }, "Clear ALL");
    } else {
        clearAction();
    }
}


// =========================================================================
// 6. EXPORT / IMPORT LOGIC (File I/O) (UPDATED for Firebase data structure)
// =========================================================================

function exportPlan() {
    // The entire planning data is now available in the Firebase listener closure, 
    // but we need to fetch it first since we only listen to the active map/sector.
    // To export the whole plan (all sequences), we need to fetch all children of 'plans/currentMapKey'.
    
    const path = `plans/${currentMapKey}`;
    const mapRef = ref(db, path);
    
    // Temporarily read the data for the full export
    onValue(mapRef, (snapshot) => {
        const planningDataExport = snapshot.val() || {};
        
        // 1. Snapshot the required data
        const exportState = {
            version: 1.3, // Updated version
            mapIndex: currentMapIndex,
            sectorUrl: mapBackground.src,
            sectorName: currentSectorName,
            currentSequenceId: currentSequenceId, 
            currentTool: currentTool,
            currentLineWidth: currentLineWidth,
            currentColor: colorPicker.value,
            planningData: planningDataExport // Export all sequences for the current map key
        };

        try {
            const jsonString = JSON.stringify(exportState, null, 2); 
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            const filename = `df_plan_${MAPS[currentMapIndex].name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${currentSectorName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
            
            link.download = filename;
            link.href = url;
            link.click();
            
            URL.revokeObjectURL(url);
            
        } catch (e) {
            console.error('Export failed:', e);
            console.error('EXPORT FAILED. Please check console for details.');
        }
    }, { onlyOnce: true }); // Use onlyOnce: true to only read the data once
}


// ... (importPlan, handleFileSelection, handleImportAction are the same)

function restoreImportedState(importState) {
    if (!importState.planningData) {
        console.error('Invalid plan data structure in file.');
        return;
    }

    // 1. Write the ENTIRE map's sequence data back to Firebase
    const mapPath = `plans/${currentMapKey}`;
    update(ref(db, mapPath), importState.planningData)
    .then(() => {
        console.log('Successfully wrote imported data to Firebase.');
    })
    .catch(error => {
        console.error('Failed to write imported data to Firebase:', error);
    });
    
    // 2. Restore core map and sector data (which triggers map load)
    const newMapIndex = importState.mapIndex;
    const newSectorUrl = importState.sectorUrl;
    const newSectorName = importState.sectorName;

    // Set the correct map index and populate sectors
    mapSelect.value = newMapIndex;
    currentMapIndex = newMapIndex;
    populateSectorSelector(currentMapIndex); 
    
    // Set the correct sector selection value (which triggers loadMap)
    const sectorOption = Array.from(sectorSelect.options).find(opt => opt.value === newSectorUrl);
    if (sectorOption) {
        sectorSelect.value = newSectorUrl;
    } else {
        console.warn('Imported sector URL not found in current map definition. Using first sector.');
        sectorSelect.value = MAPS[newMapIndex].sectors[0].url;
    }
    
    // 3. Restore tool settings
    currentTool = importState.currentTool || 'pen';
    currentLineWidth = importState.currentLineWidth || 8;
    currentColor = hexToRgba(importState.currentColor || '#ff0000', 0.8);
    
    // Update UI controls
    lineWidthInput.value = currentLineWidth;
    widthDisplay.textContent = `${currentLineWidth}px`;
    colorPicker.value = importState.currentColor || '#ff0000';
    const toolButton = document.getElementById(`tool-${currentTool}`);
    if(toolButton) toolButton.click();
    else document.getElementById('tool-pen').click(); // Fallback

    // 4. Restore current sequence ID and trigger map reload/state sync
    currentSectorName = newSectorName;
    
    // We set the currentSequenceId *before* loadMap so the listener picks it up.
    currentSequenceId = importState.currentSequenceId || 'Seq 1';
    
    // Trigger loadMap via sectorSelect change event to handle UI update and image loading
    // The loadMap function will call startRealtimeSync which will immediately pull the new data.
    sectorSelect.dispatchEvent(new Event('change'));

    console.log('Strategy plan imported successfully! Loading selected map and sequence.');
}

// =========================================================================
// 7. EVENT LISTENERS
// =========================================================================
// ... (All event listeners are the same, except for clear lines/clear all which call updated logic)


// --- Clear Map & Clear Lines ---
clearButton.addEventListener('click', () => clearDrawing(true));
clearLinesButton.addEventListener('click', clearLines);

// ... (Other event listeners are unchanged)

// =========================================================================
// 8. FINAL INITIALIZATION (UPDATED)
// =========================================================================

const initializeApp = () => {
    
    // --- Attach Login/Logout Listeners ---
    loginForm.addEventListener('submit', handleLoginAction);
    logoutButton.addEventListener('click', handleLogout); 
    
    // --- Attach Authentication Listener (Firebase Standard) ---
    onAuthStateChanged(auth, (user) => {
        checkLogin(user);
        if (user) {
            // User is signed in, perform application setup that needs auth context
            console.log("User logged in via Firebase.");
        } else {
            // User is signed out, tear down listeners
            if (firebaseListener) {
                off(firebaseListener);
                firebaseListener = null;
            }
        }
    });
};

// --- Initial Setup Calls ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup functions
    currentColor = hexToRgba(colorPicker.value, 0.8);
    preloadUtilityImages(); 
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

// The remaining functions (drawSingleIcon, redrawIcons, redrawText, etc.) 
// are unchanged from your original script.






