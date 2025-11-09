// =========================================================================
// 1. FIREBASE IMPORTS (MUST BE THE VERY FIRST EXECUTABLE CODE)
// =========================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
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


// =========================================================================
// 2. CONFIGURATION & INITIALIZATION (EXECUTABLE CODE STARTS HERE)
// =========================================================================

// --- Script Defense: Prevents double-execution of the module ---
if (window.firebaseAppInitialized) {
    console.warn("Script defense activated. Exiting duplicate execution.");
}
window.firebaseAppInitialized = true;

console.log("test"); // This should now appear in the console!

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
const SHARED_LOGIN_EMAIL = 'admin@deltaforce.com'; 

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const db = getDatabase(app);

// =========================================================================
// 3. CONSTANTS
// =========================================================================

// --- Planner Constants ---
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

const OPERATORS = [
    { id: "op_rusher1", color: '#ff33ff', type: 'color', iconUrl: '' }, 
    { id: "op_rusher2", color: '#fcdf03', type: 'color', iconUrl: '' }, 
    { id: "op_flank", color: '#fc0303', type: 'color', iconUrl: '' }, 
    { id: "op_engineer", color: '#03fc41', type: 'color', iconUrl: '' }, 
    { id: "op_scout", color: '#33aaff', type: 'color', iconUrl: '' }, 
    { id: "op_enemy", color: '#fcb103', type: 'color', iconUrl: ''} 
];

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

// == SEQUENCE STATE (Aliased to Database Data) ==
let currentSequenceData = null; 
let currentMapKey = ''; 
let currentSequenceId = 'Seq 1';
let placedIcons = []; 
let placedText = []; 
const MAX_SEQUENCES = 10; 

let firebaseListener = null; 

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
let isLoggedIn = false; 

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
let isDataUpdateFromRemote = false; 

// == DOM ELEMENTS ==
const appWrapper = document.getElementById('app-wrapper'); 
const loginContainer = document.getElementById('login-container');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const loginMessageBox = document.getElementById('login-message-box');
const logoutButton = document.getElementById('logout-button'); 

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
// 4. UTILITY FUNCTIONS
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

// --- LOGIN/LOGOUT HANDLERS ---

function checkLogin(user) {
    if (user) {
        isLoggedIn = true;
        loginContainer.classList.add('hidden');
        appWrapper.classList.remove('hidden');
        if (!mapLoaded) { 
            mapSelect.dispatchEvent(new Event('change')); 
        }
    } else {
        isLoggedIn = false;
        loginContainer.classList.remove('hidden');
        appWrapper.classList.add('hidden');
    }
}

const handleLoginAction = (e) => {
    e.preventDefault();
    clearLoginMessages();
    
    const email = SHARED_LOGIN_EMAIL; 
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            passwordInput.value = ''; 
        })
        .catch((error) => {
            const errorMessage = "Invalid password. Access Denied.";
            displayMessage(errorMessage, true);
        });
};

const handleLogout = () => {
    signOut(auth).then(() => {
        if (firebaseListener) {
            off(firebaseListener); 
            firebaseListener = null;
        }
    }).catch((error) => {
        console.error("Logout error:", error);
    });
};


// --- Asset Loading ---

function preloadUtilityImages() {
    const fallbackImg = new Image();
    fallbackImg.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cline x1='10' y1='50' x2='90' y2='50' stroke='white' stroke-width='10' stroke-linecap='round'/%3E%3Cline x1='50' y1='10' x2='50' y2='90' stroke='white' stroke-width='10' stroke-linecap='round'/%3E%3C/svg%3E";

    const loadIcon = (icon) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            utilityImageCache[icon.iconUrl] = img;
        };
        img.onerror = () => {
            utilityImageCache[icon.iconUrl] = fallbackImg;
        };
        img.src = icon.iconUrl;
    };

    [...UTILITIES, ...VEHICLES].forEach(loadIcon);
    if (!utilityImageCache[fallbackImg.src]) {
        utilityImageCache[fallbackImg.src] = fallbackImg;
    }
}

// --- Animation / Drawing Utilities ---

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateSequence(timestamp) {
    if (!animationStartTime) {
        animationStartTime = timestamp;
    }

    const elapsed = timestamp - animationStartTime;
    const progress = Math.min(1, elapsed / ANIMATION_DURATION);
    const easedProgress = easeInOutCubic(progress);
    
    const targetIcons = currentSequenceData.icons || []; 

    const interpolatedIcons = targetIcons.map((icon) => {
        const start = startIconPositions.find(startIcon => startIcon.id === icon.id);
        const end = icon; 

        if (start) {
            return {
                ...icon,
                x: start.x + (end.x - start.x) * easedProgress,
                y: start.y + (end.y - start.y) * easedProgress
            };
        }
        return icon;
    }).filter(icon => icon !== undefined);

    drawFrame(currentSequenceId, interpolatedIcons, currentSequenceData.textData);

    if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateSequence);
    } else {
        isAnimating = false;
        animationStartTime = 0;
        animationFrameId = null;
        drawFrame(currentSequenceId, currentSequenceData.icons || [], currentSequenceData.textData || []); 
    }
}

function drawSingleIcon(icon) {
    const radius = icon.type === 'color' ? OPERATOR_DOT_RADIUS : UTILITY_IMAGE_DIAMETER / 2;
    const size = icon.type === 'color' ? OPERATOR_DOT_RADIUS * 2 : UTILITY_IMAGE_DIAMETER;
    const drawX = icon.x - radius;
    const drawY = icon.y - radius;

    ctx.globalCompositeOperation = 'source-over';
    
    ctx.beginPath();
    ctx.arc(icon.x, icon.y, radius + 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'; 
    ctx.fill();

    if (icon.type === 'color') {
        ctx.beginPath();
        ctx.arc(icon.x, icon.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = icon.color;
        ctx.fill();
    } else if (icon.type === 'image') {
        ctx.beginPath();
        ctx.arc(icon.x, icon.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = icon.color || '#ffffff';
        ctx.fill();
        
        const img = utilityImageCache[icon.iconUrl];

        if (img) {
            const isFallback = img.src.startsWith("data:image/svg+xml");
            
            if (!isFallback) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(icon.x, icon.y, radius, 0, Math.PI * 2);
                ctx.clip(); 
            }

            ctx.drawImage(img, drawX, drawY, size, size);

            if (!isFallback) {
                ctx.restore(); 
            }
        }
    }
}

function drawSingleText(textObj) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = textObj.color;
    ctx.font = `${textObj.size}px 'Inter', sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillText(textObj.text, textObj.x, textObj.y);

    ctx.shadowColor = 'transparent'; 
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

function redrawIcons(icons) {
    icons.forEach(drawSingleIcon);
}

function redrawText(textList) {
    textList.forEach(drawSingleText);
}

function drawFrame(sequenceId, iconList, textList) {
    if (!mapLoaded) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(lineBuffer, 0, 0);

    redrawIcons(iconList);
    redrawText(textList);
}

function synchronousRedraw() {
    if (!mapLoaded || !currentSequenceData) return;
    
    if (isAnimating) {
        return; 
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(lineBuffer, 0, 0);

    redrawIcons(placedIcons);
    redrawText(placedText);
}

// =========================================================================
// 5. DATA/HISTORY/SYNC FUNCTIONS
// =========================================================================

function generateMapKey(mapIndex, sectorName) {
    const mapName = MAPS[mapIndex]?.name || 'Unknown Map';
    return `${mapName.replace(/\./g, '_')}_${sectorName.replace(/\./g, '_')}`; 
}

function saveToDatabase(updateIcons = false, updateText = false, updateLines = false) {
    if (!currentSequenceData || !currentMapKey || !currentSequenceId) return;

    const dataToWrite = {};

    if (updateLines) {
        dataToWrite.lineData = lineBuffer.toDataURL();
    }
    if (updateIcons) {
        dataToWrite.icons = placedIcons;
    }
    if (updateText) {
        dataToWrite.textData = placedText;
    }
    
    if (Object.keys(dataToWrite).length === 0) return;

    isDataUpdateFromRemote = true; 
    
    const path = `plans/${currentMapKey}/${currentSequenceId}`;
    set(ref(db, path), {
        ...currentSequenceData,
        ...dataToWrite
    })
    .catch(error => {
        console.error("Firebase write failed:", error);
    });
}

function startRealtimeSync() {
    if (!isLoggedIn || !currentMapKey) return;
    
    if (firebaseListener) {
        off(firebaseListener);
    }

    const path = `plans/${currentMapKey}`;
    const mapRef = ref(db, path);
    
    firebaseListener = onValue(mapRef, (snapshot) => {
        const allMapData = snapshot.val() || {};
        
        const remoteData = allMapData[currentSequenceId] || { icons: [], lineData: '', textData: [] }; 

        if (isDataUpdateFromRemote) {
            isDataUpdateFromRemote = false; 
        } else {
            console.log(`Remote update received for ${currentMapKey} ${currentSequenceId}.`);
        }
        
        currentSequenceData = remoteData;
        
        // Update aliases to point to the new remote data
        placedIcons.length = 0;
        placedIcons.push(...(currentSequenceData.icons || []));
        placedText.length = 0;
        placedText.push(...(currentSequenceData.textData || []));

        const newLineData = currentSequenceData.lineData || '';
        
        if (newLineData) {
            const lineSnapshot = new Image();
            lineSnapshot.onload = () => {
                lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
                lineBufferCtx.drawImage(lineSnapshot, 0, 0);
                synchronousRedraw();
            };
            lineSnapshot.onerror = () => {
                lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
                synchronousRedraw();
            }
            lineSnapshot.src = newLineData;
        } else {
            lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
            synchronousRedraw();
        }
    });
}

function switchSequence(newSequenceId) {
    if (currentSequenceId === newSequenceId || isAnimating) {
        return;
    }
    
    const oldIcons = placedIcons || [];
    startIconPositions = oldIcons.map(icon => ({ x: icon.x, y: icon.y, id: icon.id }));
    
    if (firebaseListener) {
        off(firebaseListener);
    }
    
    currentSequenceId = newSequenceId;
    sequenceSelect.value = newSequenceId;

    startRealtimeSync();

    isAnimating = true;
    animationStartTime = 0;
    
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(animateSequence);
}

function saveState() {
    if (!mapLoaded) return;
    
    if (currentTool !== 'pen' && currentTool !== 'eraser') return; 

    if (history.length >= MAX_HISTORY_SIZE) {
        history.shift();
        historyIndex--; 
    }

    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    
    const newState = {
        lineData: lineBuffer.toDataURL(),
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
    
    const lineSnapshot = new Image();
    lineSnapshot.onload = () => {
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
        lineBufferCtx.drawImage(lineSnapshot, 0, 0);

        synchronousRedraw(); 
    }
    lineSnapshot.src = state.lineData;
    
    updateUndoRedoButtons();
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        restoreState();
        // Since lines changed, sync to DB
        saveToDatabase(false, false, true);
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        restoreState();
        // Since lines changed, sync to DB
        saveToDatabase(false, false, true);
    }
}


// =========================================================================
// 6. DRAWING/PLACEMENT LOGIC
// =========================================================================

function getIconAtCoords(x, y) {
    for (let i = 0; i < placedIcons.length; i++) {
        const icon = placedIcons[i];
        const radius = icon.type === 'color' ? OPERATOR_DOT_RADIUS : UTILITY_IMAGE_DIAMETER / 2;
        const distance = Math.sqrt(Math.pow(x - icon.x, 2) + Math.pow(y - icon.y, 2));
        if (distance < radius + ICON_HIT_AREA) {
            return { index: i, type: 'icon', data: icon };
        }
    }
    
    for (let i = 0; i < placedText.length; i++) {
        const textObj = placedText[i];
        ctx.font = `${textObj.size}px 'Inter', sans-serif`;
        const textMetrics = ctx.measureText(textObj.text);
        
        const width = textMetrics.width;
        const height = textObj.size * 1.5; 
        
        if (x >= textObj.x - TEXT_HIT_AREA && x <= textObj.x + width + TEXT_HIT_AREA &&
            y >= textObj.y - TEXT_HIT_AREA && y <= textObj.y + height + TEXT_HIT_AREA) {
            return { index: i, type: 'text', data: textObj };
        }
    }

    return null; 
}

function updateBrushPreview(clientX, clientY, size, color, isEraser, visible) {
    if (visible && mapLoaded && (currentTool === 'pen' || currentTool === 'eraser')) {
        const halfSize = size / 2;
        brushPreview.style.width = `${size}px`;
        brushPreview.style.height = `${size}px`;
        brushPreview.style.transform = `translate(${clientX - halfSize}px, ${clientY - halfSize}px)`;
        brushPreview.style.opacity = '1';
        
        if (isEraser) {
            brushPreview.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            brushPreview.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        } else {
            brushPreview.style.borderColor = color;
            brushPreview.style.backgroundColor = 'transparent';
        }
        brushPreview.classList.remove('hidden');
    } else {
        brushPreview.classList.add('hidden');
        brushPreview.style.opacity = '0';
    }
}

function handleGlobalDraw(e) {
    const { x: currentX, y: currentY, clientX, clientY } = getCanvasCoords(e);
    
    if (currentTool === 'move') {
        if (!isMovingIcon || movingIconIndex === -1) return;

        const trashRect = trashCan.getBoundingClientRect();
        const trashCanHover = (
            clientX >= trashRect.left && clientX <= trashRect.right &&
            clientY >= trashRect.top && clientY <= trashRect.bottom
        );

        if (trashCanHover) {
            trashCan.classList.add('opacity-100', 'bg-red-500/90');
            trashCan.classList.remove('bg-red-700/80', 'opacity-0');
        } else {
            trashCan.classList.remove('opacity-100', 'bg-red-500/90');
            trashCan.classList.add('opacity-100', 'bg-red-700/80'); 
        }

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

        synchronousRedraw(); 
        e.preventDefault();
        return;
    }
    
    if (!isDrawing || currentTool !== 'pen' && currentTool !== 'eraser') return;
    
    lineBufferCtx.beginPath();
    lineBufferCtx.lineJoin = 'round';
    lineBufferCtx.lineCap = 'round';
    lineBufferCtx.lineWidth = currentLineWidth;

    const isEraser = currentTool === 'eraser';
    if (isEraser) {
        lineBufferCtx.strokeStyle = 'rgba(0,0,0,1)'; 
        lineBufferCtx.globalCompositeOperation = 'destination-out';
    } else {
        lineBufferCtx.strokeStyle = currentColor;
        lineBufferCtx.globalCompositeOperation = 'source-over';
    }

    lineBufferCtx.moveTo(lastX, lastY);
    lineBufferCtx.lineTo(currentX, currentY);
    lineBufferCtx.stroke();

    [lastX, lastY] = [currentX, currentY];
    e.preventDefault();
    
    synchronousRedraw();
    
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
            window.addEventListener('mousemove', handleGlobalDraw); 
            window.addEventListener('mouseup', stopInteraction);
            window.addEventListener('touchmove', handleGlobalDraw);
            window.addEventListener('touchend', stopInteraction);

            [lastX, lastY] = [x, y];
            mapContainer.style.cursor = 'grabbing';
            
            trashCan.classList.remove('hidden', 'opacity-0');
            trashCan.classList.add('opacity-100');
        }
        return;
    }

    if (currentTool === 'pen' || currentTool === 'eraser') {
        isDrawing = true;
        [lastX, lastY] = [x, y];
        window.addEventListener('mousemove', handleGlobalDraw);
        window.addEventListener('mouseup', stopInteraction);
        window.addEventListener('touchmove', handleGlobalDraw);
        window.addEventListener('touchend', stopInteraction);
    }
}

function stopInteraction(e) {
    window.removeEventListener('mousemove', handleGlobalDraw);
    window.removeEventListener('mouseup', stopInteraction);
    window.removeEventListener('touchmove', handleGlobalDraw);
    window.removeEventListener('touchend', stopInteraction);

    if (isDrawing) {
        isDrawing = false;
        saveState();
        saveToDatabase(false, false, true);
    }
    
    if (isMovingIcon) {
        let droppedInTrash = false;
        const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
        const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);

        if (clientX !== undefined && clientY !== undefined) { 
            const trashRect = trashCan.getBoundingClientRect();
            droppedInTrash = (
                clientX >= trashRect.left && clientX <= trashRect.right &&
                clientY >= trashRect.top && clientY <= trashCan.getBoundingClientRect().bottom
            );
        }

        if (droppedInTrash && movingIconIndex !== -1) {
            if (movingType === 'icon') {
                placedIcons.splice(movingIconIndex, 1);
                saveToDatabase(true, false, false); 
            } else if (movingType === 'text') {
                placedText.splice(movingIconIndex, 1);
                saveToDatabase(false, true, false);
            }
            synchronousRedraw();
        } else if (isMovingIcon && movingIconIndex !== -1) {
            if (movingType === 'icon') {
                 saveToDatabase(true, false, false);
            } else if (movingType === 'text') {
                 saveToDatabase(false, true, false);
            }
        }

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

function placeIcon(e) {
    if (!mapLoaded || !currentSequenceData || !selectedIcon && currentTool === 'place' || currentTool === 'text' && textInput.value.trim() === '') return;

    const { x, y } = getCanvasCoords(e);
    
    if (currentTool === 'place') {
        const baseId = selectedIcon.id;
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
        saveToDatabase(true, false, false); 

    } else if (currentTool === 'text') {
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
        saveToDatabase(false, true, false); 
    }
}

function clearLines() {
    showConfirm("Are you sure you want to clear all drawing lines? All placed icons and labels will remain.", (confirmed) => {
        if (confirmed) {
            lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
            saveToDatabase(false, false, true);
            synchronousRedraw();
        }
    }, "Clear Lines");
}

function clearDrawing(confirm = true, isMapChange = false) {
    const clearAction = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height); 
        placedIcons.length = 0; 
        placedText.length = 0; 
        
        if (currentSequenceData) {
            currentSequenceData.lineData = ''; 
            currentSequenceData.icons = []; 
            currentSequenceData.textData = []; 
            
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
// 7. MAP/UI/EXPORT FUNCTIONS
// =========================================================================

function updateHeaderDisplay() {
    const map = MAPS[currentMapIndex];
    currentMapDisplay.textContent = map ? map.name : "N/A";
    currentSectorDisplay.textContent = currentSectorName || "N/A";
}

function updateUndoRedoButtons() {
    undoButton.disabled = historyIndex <= 0;
    redoButton.disabled = history.length === 0 || historyIndex >= history.length - 1;
}

function updateCursor() {
    mapContainer.style.cursor = 'crosshair'; 
    
    placementHintOperator.classList.add('hidden');
    placementHintUtility.classList.add('hidden');
    placementHintVehicle.classList.add('hidden');
    placementHintText.classList.add('hidden');

    if (currentTool === 'move') {
        mapContainer.style.cursor = 'pointer';
    } else if (currentTool === 'place') {
        mapContainer.style.cursor = 'pointer';
        const isUtilitySelected = selectedIcon && (selectedIcon.id.startsWith('utility'));
        const isVehicleSelected = selectedIcon && (selectedIcon.id.startsWith('vehicle'));
        const isOperatorSelected = selectedIcon && (selectedIcon.id.startsWith('op'));
        
        if (isOperatorSelected) placementHintOperator.classList.remove('hidden');
        if (isUtilitySelected) placementHintUtility.classList.remove('hidden');
        if (isVehicleSelected) placementHintVehicle.classList.remove('hidden');

        trashCan.classList.add('hidden');
    } else if (currentTool === 'text') {
        mapContainer.style.cursor = 'crosshair';
        if (textInput.value.trim() !== '') {
            placementHintText.classList.remove('hidden');
        }
        trashCan.classList.add('hidden');
    } else if (currentTool === 'pen' || currentTool === 'eraser') {
        mapContainer.style.cursor = 'none'; 
        trashCan.classList.add('hidden');
    } else {
        mapContainer.style.cursor = 'crosshair';
        trashCan.classList.add('hidden');
    }
    
    if (!isMovingIcon) {
        trashCan.classList.remove('opacity-100');
        trashCan.classList.add('opacity-0', 'hidden');
    }
}

function resizeCanvas() {
    const fallbackAspectRatio = 16 / 9;
    const finalAspectRatio = (mapNaturalWidth === 0 || mapNaturalHeight === 0) 
                                                                             ? fallbackAspectRatio 
                                                                             : (mapNaturalHeight / mapNaturalWidth);
                                                                             
    const aspectRatioPercent = finalAspectRatio * 100;
    mapCardWrapper.style.paddingBottom = `${aspectRatioPercent}%`;

    const mapRect = mapContainer.getBoundingClientRect();
    const newWidth = mapRect.width;
    const newHeight = mapRect.height; 

    canvas.width = newWidth;
    canvas.height = newHeight;
    lineBuffer.width = newWidth;
    lineBuffer.height = newHeight;

    if (mapLoaded) {
        synchronousRedraw();
    }
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
    currentMapImage.crossOrigin = "Anonymous";

    currentMapImage.onload = () => {
        mapLoaded = true;
        mapNaturalWidth = currentMapImage.naturalWidth;
        mapNaturalHeight = currentMapImage.naturalHeight;
        resizeCanvas();
        
        const selectedMap = MAPS[mapSelect.value];
        const selectedSector = sectorSelect.options[sectorSelect.selectedIndex]?.text || 'A';
        currentMapKey = generateMapKey(mapSelect.value, selectedSector);
        
        startRealtimeSync();
        
        history = [];
        historyIndex = -1;
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height); 
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        
        const emptyState = { lineData: '', icons: [], textData: [] }; 
        history.push(emptyState);
        historyIndex = 0;
        updateUndoRedoButtons();
        
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

function populateMapSelector() {
    mapSelect.innerHTML = MAPS.map((map, index) => 
        `<option value="${index}">${map.name}</option>`
    ).join('');
    mapSelect.value = 0;
    currentMapIndex = 0;
    populateSectorSelector(currentMapIndex);
}

function handleIconSelection(e) {
    const iconId = e.currentTarget.dataset.iconId;
    const icon = SELECTABLE_ICONS.find(i => i.id === iconId);
    
    if (icon) {
        selectedIcon = icon;
        
        document.querySelectorAll('.icon-selector-item').forEach(dot => dot.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        
        document.getElementById('tool-place').click(); 
    }
}

function populateOperatorSelector() {
    operatorIconsContainer.innerHTML = OPERATORS.map(op => 
        `<div data-icon-id="${op.id}" class="icon-selector-item ${op.id === selectedIcon.id ? 'selected' : ''}" style="background-color: ${op.color};" title="${op.id}"></div>`
    ).join('');

    document.querySelectorAll('#operator-icons .icon-selector-item').forEach(icon => {
        icon.addEventListener('click', handleIconSelection);
    });
}

function populateUtilitySelector() {
    utilityIconsContainer.innerHTML = UTILITIES.map(ut => 
        `<div data-icon-id="${ut.id}" class="icon-selector-item ${ut.id === selectedIcon.id ? 'selected' : ''}" style="border-radius: 50%; border: 3px solid transparent; overflow: hidden;" title="${ut.id}">
            <img src="${ut.iconUrl}" alt="${ut.id}" style="width: 30px; height: 30px; object-fit: cover; border-radius: 50%;">
        </div>`
    ).join('');

    document.querySelectorAll('#utility-icons .icon-selector-item').forEach(icon => {
        icon.addEventListener('click', handleIconSelection);
    });
}

function populateVehicleSelector() {
    vehicleIconsContainer.innerHTML = VEHICLES.map(v => 
        `<div data-icon-id="${v.id}" class="icon-selector-item ${v.id === selectedIcon.id ? 'selected' : ''}" style="background-color: ${v.color};" title="${v.id}">
            <img src="${v.iconUrl}" alt="${v.id}" style="width: 30px; height: 30px; object-fit: cover; border-radius: 50%;">
        </div>`
    ).join('');

    document.querySelectorAll('#vehicle-icons .icon-selector-item').forEach(icon => {
        icon.addEventListener('click', handleIconSelection);
    });
}

function exportPlan() {
    const path = `plans/${currentMapKey}`;
    const mapRef = ref(db, path);
    
    onValue(mapRef, (snapshot) => {
        const planningDataExport = snapshot.val() || {};
        
        const exportState = {
            version: 1.3,
            mapIndex: currentMapIndex,
            sectorUrl: mapBackground.src,
            sectorName: currentSectorName,
            currentSequenceId: currentSequenceId, 
            currentTool: currentTool,
            currentLineWidth: currentLineWidth,
            currentColor: colorPicker.value,
            planningData: planningDataExport
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
        }
    }, { onlyOnce: true });
}

function importPlan() {
    importFileInput.value = null;
    importModalActionButton.disabled = true;
    importModal.classList.remove('hidden');
    importModal.classList.add('flex');
}

function handleFileSelection() {
    if (importFileInput.files.length > 0) {
        importModalActionButton.disabled = false;
    } else {
        importModalActionButton.disabled = true;
    }
}

function handleImportAction() {
    const file = importFileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const jsonString = e.target.result;
        try {
            const importState = JSON.parse(jsonString);
            restoreImportedState(importState);
            importModal.classList.add('hidden');
            importModal.classList.remove('flex');
        } catch (e) {
            console.error('Import failed during parsing:', e);
        }
    };
    
    reader.onerror = () => {
        console.error('Error reading file.');
    };

    reader.readAsText(file);
}

function restoreImportedState(importState) {
    if (!importState.planningData) return;

    const newMapIndex = importState.mapIndex;
    const newSectorUrl = importState.sectorUrl;
    const newSectorName = importState.sectorName;

    const mapPath = `plans/${generateMapKey(newMapIndex, newSectorName)}`;
    update(ref(db, mapPath), importState.planningData)
    .catch(error => {
        console.error('Failed to write imported data to Firebase:', error);
    });
    
    mapSelect.value = newMapIndex;
    currentMapIndex = newMapIndex;
    populateSectorSelector(currentMapIndex); 
    
    const sectorOption = Array.from(sectorSelect.options).find(opt => opt.value === newSectorUrl);
    if (sectorOption) {
        sectorSelect.value = newSectorUrl;
    } else {
        sectorSelect.value = MAPS[newMapIndex].sectors[0].url;
    }
    
    currentTool = importState.currentTool || 'pen';
    currentLineWidth = importState.currentLineWidth || 8;
    currentColor = hexToRgba(importState.currentColor || '#ff0000', 0.8);
    
    lineWidthInput.value = currentLineWidth;
    widthDisplay.textContent = `${currentLineWidth}px`;
    colorPicker.value = importState.currentColor || '#ff0000';
    const toolButton = document.getElementById(`tool-${currentTool}`);
    if(toolButton) toolButton.click();
    else document.getElementById('tool-pen').click();

    currentSectorName = newSectorName;
    currentSequenceId = importState.currentSequenceId || 'Seq 1';
    
    sectorSelect.dispatchEvent(new Event('change'));
}


// =========================================================================
// 8. EVENT LISTENERS & INITIALIZATION
// =========================================================================

const initializeDelta = () => {
    
    loginForm.addEventListener('submit', handleLoginAction);
    logoutButton.addEventListener('click', handleLogout); 
    
    onAuthStateChanged(auth, (user) => {
        checkLogin(user);
        if (user) {
            console.log("User logged in via Firebase.");
        } else {
            if (firebaseListener) {
                off(firebaseListener);
                firebaseListener = null;
            }
        }
    });
};

// --- Attach DOM Listeners ---
mapSelect.addEventListener('change', (e) => {
    currentMapIndex = parseInt(e.target.value);
    populateSectorSelector(currentMapIndex);
});

sectorSelect.addEventListener('change', (e) => {
    const newSectorUrl = e.target.value;
    const newSectorName = e.target.options[e.target.selectedIndex].text;
    currentSectorName = newSectorName;
    loadMap(newSectorUrl);
    updateHeaderDisplay();
});

sequenceSelect.addEventListener('change', (e) => {
    switchSequence(e.target.value);
});

undoButton.addEventListener('click', undo);
redoButton.addEventListener('click', redo);

canvas.addEventListener('mousedown', startInteraction);
canvas.addEventListener('touchstart', startInteraction);

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing && !isMovingIcon && (currentTool === 'pen' || currentTool === 'eraser')) {
        const { clientX, clientY } = e;
        const isEraser = currentTool === 'eraser';
        updateBrushPreview(clientX, clientY, currentLineWidth, currentColor, isEraser, true);
    }
});

canvas.addEventListener('mouseout', (e) => {
    if (!isMovingIcon && !isDrawing) {
        updateBrushPreview(0, 0, 0, null, false, false);
    }
});

canvas.addEventListener('click', (e) => {
    if (currentTool === 'place' && !isDrawing && !isMovingIcon) {
        placeIcon(e);
    } else if (currentTool === 'text' && !isDrawing && !isMovingIcon) {
        placeIcon(e);
    }
}); 

textInput.addEventListener('input', updateCursor);

toolButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const newTool = e.currentTarget.dataset.tool;
        currentTool = newTool;

        toolButtons.forEach(btn => btn.classList.remove('bg-primary', 'bg-red-500'));
        toolButtons.forEach(btn => btn.classList.add('bg-gray-600'));

        e.currentTarget.classList.remove('bg-gray-600');
        if (newTool === 'pen' || newTool === 'place' || newTool === 'move' || newTool === 'text') {
            e.currentTarget.classList.add('bg-primary');
        } else if (newTool === 'eraser') {
            e.currentTarget.classList.add('bg-red-500');
        }

        updateCursor();
        
        if (newTool !== 'pen' && newTool !== 'eraser') {
            updateBrushPreview(0, 0, 0, null, false, false);
        }
    });
});

lineWidthInput.addEventListener('input', (e) => {
    currentLineWidth = parseInt(e.target.value);
    widthDisplay.textContent = `${currentLineWidth}px`;
});

colorPicker.addEventListener('input', (e) => {
    currentColor = hexToRgba(e.target.value, 0.8);
});

clearButton.addEventListener('click', () => clearDrawing(true));
clearLinesButton.addEventListener('click', clearLines);

saveButton.addEventListener('click', () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    currentMapImage.crossOrigin = "Anonymous";

    const performDrawAndDownload = () => {
        if (currentMapImage.complete && currentMapImage.naturalWidth > 0) {
            try {
                tempCtx.drawImage(currentMapImage, 0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.drawImage(canvas, 0, 0);

                const link = document.createElement('a');
                const filename = `df_plan_image_${MAPS[currentMapIndex].name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${currentSectorName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
                
                link.download = filename;
                link.href = tempCanvas.toDataURL('image/png');
                link.click();
            } catch (e) {
                 console.error("Error during canvas export (Tainted Canvas). Please run using a local web server (e.g., Live Server) or host assets online.", e);
                 synchronousRedraw();
            }
        } else {
             console.warn("Map image not ready. Cannot save.");
             synchronousRedraw();
        }
    };

    if (currentMapImage.complete && currentMapImage.naturalWidth > 0) {
        performDrawAndDownload();
    } else {
        currentMapImage.onload = performDrawAndDownload;
        currentMapImage.src = currentMapImage.src; 
    }
});

exportButton.addEventListener('click', exportPlan);
importButton.addEventListener('click', importPlan);
importFileInput.addEventListener('change', handleFileSelection);
importModalActionButton.addEventListener('click', handleImportAction);
importModalCancelButton.addEventListener('click', () => {
    importModal.classList.add('hidden');
    importModal.classList.remove('flex');
});

// --- Initial Setup Calls ---
document.addEventListener('DOMContentLoaded', () => {
    currentColor = hexToRgba(colorPicker.value, 0.8);
    preloadUtilityImages(); 
    populateVehicleSelector();  
    populateMapSelector();
    populateOperatorSelector();
    populateUtilitySelector();  
    
    initializeDelta();
});

window.addEventListener('load', () => { resizeCanvas(); });
window.addEventListener('resize', () => { 
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(resizeCanvas, 100);
});


