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
    checkLogin();
};


// =========================================================================
// 1. MODAL / UI FUNCTIONS
// =========================================================================

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
            console.log(`Preloaded: ${ut.iconUrl}`);
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
            console.log(`Preloaded: ${v.iconUrl}`);
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

// Main Animation Loop (NEW)
function animateSequence(timestamp) {
    if (!animationStartTime) {
        animationStartTime = timestamp;
    }

    const elapsed = timestamp - animationStartTime;
    const progress = Math.min(1, elapsed / ANIMATION_DURATION);
    const easedProgress = easeInOutCubic(progress);
    
    const targetIcons = placedIcons; 

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

    // Draw the interpolated frame (Text is NOT interpolated, drawn at final position)
    drawFrame(currentSequenceId, interpolatedIcons, placedText);

    if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateSequence);
    } else {
        // Animation finished: ensure the final state is drawn and update state
        isAnimating = false;
        animationStartTime = 0;
        animationFrameId = null;
        // Draw the final state from the actual placedIcons array
        drawFrame(currentSequenceId, placedIcons, placedText); 
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
// 2. SEQUENCE MANAGEMENT
// =========================================================================

function generateMapKey(mapIndex, sectorName) {
    const mapName = MAPS[mapIndex]?.name || 'Unknown Map';
    return `${mapName}_${sectorName}`;
}

// Function to copy lines, icons, and text from Seq 1 to all others upon first placement
function performInitialSequenceCopy(mapKey) {
    const seq1Data = planningData[mapKey]['Seq 1'];
    
    if (seq1Data && (seq1Data.icons.length > 0 || seq1Data.textData.length > 0)) {
        for (let i = 2; i <= MAX_SEQUENCES; i++) {
            const seqId = `Seq ${i}`;
            // Deep copy Seq 1's content into Seq 2-10
            planningData[mapKey][seqId].icons = JSON.parse(JSON.stringify(seq1Data.icons));
            planningData[mapKey][seqId].lineData = seq1Data.lineData;
            planningData[mapKey][seqId].textData = JSON.parse(JSON.stringify(seq1Data.textData)); // NEW: Copy text
        }
        console.log('Initial layout copied to all sequences.');
    }
}


function initializeSequenceData(mapKey) {
    let newlyInitialized = false;
    if (!planningData[mapKey]) {
        planningData[mapKey] = {};
        newlyInitialized = true;
    }
    
    // 1. Initialize all 10 slots
    for (let i = 1; i <= MAX_SEQUENCES; i++) {
        const seqId = `Seq ${i}`;
        
        // If this slot is completely new OR if the whole map was just initialized
        if (newlyInitialized || !planningData[mapKey][seqId]) {
            // CRITICAL: Each sequence now stores an object with separate icon and line data AND textData
            planningData[mapKey][seqId] = {
                icons: [],
                lineData: '', // Base64 snapshot of the line buffer
                textData: [] // NEW: Array for text markers
            };
        }
    }
    
    // 2. Set the current alias
    currentSequenceId = 'Seq 1';
    // ALIAS placedIcons/placedText to the current sequence arrays
    placedIcons = planningData[mapKey][currentSequenceId].icons;
    placedText = planningData[mapKey][currentSequenceId].textData; // NEW: Alias for text
    
    // 3. Restore line data for the initial sequence
    const initialLineData = planningData[mapKey][currentSequenceId].lineData;
    if (initialLineData) {
        const lineSnapshot = new Image();
        lineSnapshot.onload = () => {
            lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
            lineBufferCtx.drawImage(lineSnapshot, 0, 0);
            synchronousRedraw();
        };
        lineSnapshot.src = initialLineData;
    } else {
        // If no initial data, clear both buffers
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    // Re-populate selector and set default to Seq 1
    populateSequenceSelector();
    sequenceSelect.value = currentSequenceId;
}


function populateSequenceSelector() {
    const mapData = planningData[currentMapKey];
    if (!mapData) return;

    sequenceSelect.innerHTML = '';
    for (let i = 1; i <= MAX_SEQUENCES; i++) {
        const seqId = `Seq ${i}`;
        // Ensure sequence exists in data structure before populating selector
        if (mapData[seqId]) {
            sequenceSelect.innerHTML += `<option value="${seqId}">${seqId}</option>`;
        }
    }
    
    // Restore current selection
    sequenceSelect.value = currentSequenceId;
}


function switchSequence(newSequenceId) {
    if (currentSequenceId === newSequenceId || isAnimating || !planningData[currentMapKey]) {
        return;
    }
    
    const mapData = planningData[currentMapKey];
    const oldSequenceId = currentSequenceId;
    const newSeqData = mapData[newSequenceId];
    
    if (!newSeqData) return;
    
    // 1. SAVE the current state (lines + icons + text) into the OLD sequence slot
    mapData[oldSequenceId].icons = JSON.parse(JSON.stringify(placedIcons));
    mapData[oldSequenceId].lineData = lineBuffer.toDataURL(); // SAVE LINE DATA
    mapData[oldSequenceId].textData = JSON.parse(JSON.stringify(placedText)); // NEW: Save text
    saveState(); 

    // --- COPY ICONS/LINES/TEXT LOGIC ---
    const oldIcons = mapData[oldSequenceId].icons || [];
    const oldText = mapData[oldSequenceId].textData || [];
    
    if (newSeqData.icons.length === 0 && newSeqData.textData.length === 0 && (oldIcons.length > 0 || oldText.length > 0)) {
        // If the target is empty, copy the contents of the previous sequence
        newSeqData.icons.push(...JSON.parse(JSON.stringify(oldIcons)));
        newSeqData.lineData = mapData[oldSequenceId].lineData; // COPY LINE DATA
        newSeqData.textData.push(...JSON.parse(JSON.stringify(oldText))); // NEW: Copy text
    }

    // 2. Setup Animation
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    isAnimating = true;
    animationStartTime = 0;
    
    // Snapshot the starting positions for interpolation
    startIconPositions = oldIcons.map(icon => ({ x: icon.x, y: icon.y, id: icon.id }));
    
    // 3. RESTORE line data for the NEW sequence
    const newLineData = newSeqData.lineData;
    
    lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height); // CLEAR old lines
    
    if (newLineData) {
        const lineSnapshot = new Image();
        lineSnapshot.onload = () => {
            lineBufferCtx.drawImage(lineSnapshot, 0, 0);
            // Force a synchronous redraw after restoring lines and before starting animation
            synchronousRedraw();
        };
        lineSnapshot.src = newLineData;
    }
    
    // 4. Update global state pointers to the new sequence
    currentSequenceId = newSequenceId;
    placedIcons = newSeqData.icons; // ALIAS switch
    placedText = newSeqData.textData; // NEW: ALIAS switch
    
    // 5. Start animation
    animationFrameId = requestAnimationFrame(animateSequence);
    
    // 6. Update UI immediately
    sequenceSelect.value = newSequenceId;
}

// =========================================================================
// 3. INITIALIZATION & RESIZING
// =========================================================================

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
        
        // CRITICAL: Initialize sequence data and set placedIcons/placedText alias
        initializeSequenceData(currentMapKey);
        
        // --- Reset drawing history (lines only) ---
        history = [];
        historyIndex = -1;
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height); 
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        
        // Manually inject a clean, empty line/icon/text state as history[0]
        const emptyState = { 
            lineData: '', 
            icons: placedIcons.map(icon => ({ x: icon.x, y: icon.y, type: icon.type, color: icon.color, iconUrl: icon.iconUrl, id: icon.id })),
            textData: placedText.map(text => ({ ...text })) // NEW: Include text state
        }; 
        history.push(emptyState);
        historyIndex = 0;
        updateUndoRedoButtons();
        
        // Draw the icons and text for the initial sequence
        synchronousRedraw();
        console.log('New sector map loaded and sequences ready.');
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

// The JS now sets the aspect ratio via CSS padding-bottom
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


function populateMapSelector() {
    mapSelect.innerHTML = MAPS.map((map, index) => 
        `<option value="${index}">${map.name}</option>`
    ).join('');
    mapSelect.value = 0;
    currentMapIndex = 0;
    // Initial map load is handled by checkLogin() after successful login
    // but the selectors need the default data now:
    populateSectorSelector(currentMapIndex);
}

function handleIconSelection(e) {
    const iconId = e.currentTarget.dataset.iconId;
    const icon = SELECTABLE_ICONS.find(i => i.id === iconId);
    
    if (icon) {
        selectedIcon = icon;
        
        // Remove selected class from all icons
        document.querySelectorAll('.icon-selector-item').forEach(dot => dot.classList.remove('selected'));
        // Add selected class to the clicked icon
        e.currentTarget.classList.add('selected');
        
        // Automatically switch to placement tool
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

// NEW: Populate utility bar
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

// NEW: Populate vehicle selector
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


// =========================================================================
// 4. HISTORY (UNDO/REDO)
// =========================================================================

// Draws a single icon (color dot or image)
function drawSingleIcon(icon) {
    const radius = icon.type === 'color' ? OPERATOR_DOT_RADIUS : UTILITY_IMAGE_DIAMETER / 2;
    const size = icon.type === 'color' ? OPERATOR_DOT_RADIUS * 2 : UTILITY_IMAGE_DIAMETER;
    const drawX = icon.x - radius;
    const drawY = icon.y - radius;

    ctx.globalCompositeOperation = 'source-over';
    
    // 1. Draw border/shadow
    ctx.beginPath();
    ctx.arc(icon.x, icon.y, radius + 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'; 
    ctx.fill();

    if (icon.type === 'color') {
        // 2. Draw the colored dot
        ctx.beginPath();
        ctx.arc(icon.x, icon.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = icon.color;
        ctx.fill();
    } else if (icon.type === 'image') {
        // 2. Draw the background circle for the image
        ctx.beginPath();
        ctx.arc(icon.x, icon.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = icon.color || '#ffffff'; // Fallback circle color
        ctx.fill();
        
        // 3. Draw the image (synchronously using the cache)
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
        } else {
            const fallbackImg = utilityImageCache["data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cline x1='10' y1='50' x2='90' y2='50' stroke='white' stroke-width='10' stroke-linecap='round'/%3E%3Cline x1='50' y1='10' x2='50' y2='90' stroke='white' stroke-width='10' stroke-linecap='round'/%3E%3C/svg%3E"]; 
            if (fallbackImg) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(icon.x, icon.y, radius, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(fallbackImg, drawX, drawY, size, size);
                ctx.restore();
            }
        }
    }
}

// NEW: Draws a single text label
function drawSingleText(textObj) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = textObj.color;
    ctx.font = `${textObj.size}px 'Inter', sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Optional: Add a subtle text shadow/outline for contrast against the map
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillText(textObj.text, textObj.x, textObj.y);

    ctx.shadowColor = 'transparent'; // Reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}


// Redraws all icons onto the main visible canvas
function redrawIcons(icons) {
    icons.forEach(drawSingleIcon);
}

// NEW: Redraws all text onto the main visible canvas
function redrawText(textList) {
    textList.forEach(drawSingleText);
}

// Synchronous redraw: draws current lines from buffer + icons from placedIcons + placedText (UPDATED)
function synchronousRedraw() {
    if (!mapLoaded) return;
    
    if (isAnimating) {
        // Do nothing if animating, the animation loop handles drawing
        return; 
    }
    
    // 1. Clear the visible canvas immediately
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw lines from the off-screen line buffer immediately
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(lineBuffer, 0, 0);

    // 3. Draw icons immediately (using the current placedIcons)
    redrawIcons(placedIcons);

    // 4. Draw text immediately (using the current placedText)
    redrawText(placedText);
}

function saveState() {
    if (!mapLoaded) return;

    // FIX 1: Correctly handle array shift without corrupting the index
    if (history.length >= MAX_HISTORY_SIZE) {
        history.shift();
        // CRITICAL FIX: historyIndex only needs to be DECREMENTED by 1
        historyIndex--; 
    }

    // CRITICAL FIX 2: Check if undo path exists and trim forward history before saving
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    
    // The state saves a snapshot of the pure line layer and the current icon/text positions (vector data)
    const newState = {
        lineData: lineBuffer.toDataURL(), // Save only the lines/strokes
        icons: JSON.parse(JSON.stringify(placedIcons)), // Deep copy of vector data for the current sequence
        textData: JSON.parse(JSON.stringify(placedText)) // NEW: Deep copy of text data
    };
    
    history.push(newState);
    historyIndex = history.length - 1;


    updateUndoRedoButtons();
}

function restoreState() {
    if (!mapLoaded || historyIndex < 0 || historyIndex >= history.length) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height); 
        // CRITICAL: PlacedIcons/Text is reset/empty for invalid history states
        placedIcons.length = 0;
        placedText.length = 0; // NEW: Clear text array
        updateUndoRedoButtons();
        return;
    }

    const state = history[historyIndex];
    
    // 1. Restore the icon and text arrays
    // Since placedIcons/placedText are aliases, we must modify their contents, not reassign them.
    placedIcons.length = 0; // Clear the icon array contents
    placedIcons.push(...state.icons);

    placedText.length = 0; // NEW: Clear the text array contents
    placedText.push(...state.textData);
    
    // --- CRITICAL FIX START: Explicitly check for history[0] ---
    if (historyIndex === 0) {
        // The first state MUST be empty: clear icons and lines aggressively.
        placedIcons.length = 0;
        placedText.length = 0;
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height); 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    // Draw the icon/text layer immediately so the user sees the markers disappear/change instantly.
    synchronousRedraw(); 
    // --- CRITICAL FIX END ---
    
    // 2. Restore the off-screen line buffer (asynchronous due to Image load)
    const lineSnapshot = new Image();
    lineSnapshot.onload = () => {
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
        lineBufferCtx.drawImage(lineSnapshot, 0, 0);

        // 3. Render the full composite state (lines + icons + text) to the visible canvas
        synchronousRedraw(); 
    }
    lineSnapshot.src = state.lineData;
    
    updateUndoRedoButtons();
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        restoreState();
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        restoreState();
    }
}

// =========================================================================
// 5. DRAWING / PLACEMENT / MOVEMENT LOGIC
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


// NEW: Brush Preview Utility
function updateBrushPreview(clientX, clientY, size, color, isEraser, visible) {
    if (visible && mapLoaded && (currentTool === 'pen' || currentTool === 'eraser')) {
        const halfSize = size / 2;
        brushPreview.style.width = `${size}px`;
        brushPreview.style.height = `${size}px`;
        // Position relative to the window
        brushPreview.style.transform = `translate(${clientX - halfSize}px, ${clientY - halfSize}px)`;
        brushPreview.style.opacity = '1';
        
        if (isEraser) {
            brushPreview.style.borderColor = 'rgba(255, 255, 255, 0.8)'; // White border for contrast
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

        // --- TRASH CAN HOVER LOGIC (Uses ClientX/Y for screen coordinates) ---
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
            trashCan.classList.add('opacity-100', 'bg-red-700/80'); // Keep visible but normal color
        }
        // --- END TRASH CAN HOVER LOGIC ---

        // Update the icon/text position in the vector array
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
            
            // CRITICAL: Before moving, sync the current state so the position is tracked in the current sequence
            const currentMapData = planningData[currentMapKey];
            currentMapData[currentSequenceId].icons = JSON.parse(JSON.stringify(placedIcons)); 
            currentMapData[currentSequenceId].textData = JSON.parse(JSON.stringify(placedText)); // NEW: Sync text
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


    if (isDrawing) {
        isDrawing = false;
        // Since lines are drawn, save the line data for the current sequence
        const currentMapData = planningData[currentMapKey];
        currentMapData[currentSequenceId].lineData = lineBuffer.toDataURL();
        saveState(); 
    }
    
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
            const currentArray = movingType === 'icon' ? placedIcons : placedText;
            const markerIdToDelete = currentArray[movingIconIndex].id;
            
            // Remove from current sequence (using filter for robustness)
            if (movingType === 'icon') {
                placedIcons = placedIcons.filter(icon => icon.id !== markerIdToDelete);
            } else if (movingType === 'text') {
                placedText = placedText.filter(text => text.id !== markerIdToDelete);
            }
            
            // Update the array alias back to the new filtered array
            const currentMapData = planningData[currentMapKey];
            currentMapData[currentSequenceId][movingType === 'icon' ? 'icons' : 'textData'] = currentArray;
            
            // Remove from all SUBSEQUENT sequences
            const currentSeqNum = parseInt(currentSequenceId.split(' ')[1]);
            for (let i = currentSeqNum; i <= MAX_SEQUENCES; i++) { // Start checking from current sequence!
                const nextSeqId = `Seq ${i}`;
                let nextSeqData = planningData[currentMapKey][nextSeqId];
                if (nextSeqData) {
                    if (movingType === 'icon') {
                        nextSeqData.icons = nextSeqData.icons.filter(icon => icon.id !== markerIdToDelete);
                    } else if (movingType === 'text') {
                        nextSeqData.textData = nextSeqData.textData.filter(text => text.id !== markerIdToDelete);
                    }
                }
            }

            console.log(`${movingType} deleted!`);
            synchronousRedraw();
        } else if (isMovingIcon && movingIconIndex !== -1) {
            // If marker was MOVED (not deleted), sync the new position to ALL future sequences
            const currentMapData = planningData[currentMapKey];
            const movedMarker = movingType === 'icon' ? placedIcons[movingIconIndex] : placedText[movingIconIndex];
            const currentSeqNum = parseInt(currentSequenceId.split(' ')[1]);
            const targetKey = movingType === 'icon' ? 'icons' : 'textData';

            for (let i = currentSeqNum + 1; i <= MAX_SEQUENCES; i++) {
                const nextSeqId = `Seq ${i}`;
                let nextSeqMarkers = planningData[currentMapKey][nextSeqId][targetKey];
                
                const targetIndex = nextSeqMarkers.findIndex(marker => marker.id === movedMarker.id);

                if (targetIndex !== -1) {
                    // If the marker exists, update its position to the new coordinates
                    nextSeqMarkers[targetIndex].x = movedMarker.x;
                    nextSeqMarkers[targetIndex].y = movedMarker.y;
                } else {
                    // If the marker exists in the current seq, but is missing from a subsequent seq, add it.
                    const currentMarkers = movingType === 'icon' ? placedIcons : placedText;
                    const currentMarkerInPlaced = currentMarkers.find(marker => marker.id === movedMarker.id);
                    if (currentMarkerInPlaced) {
                        nextSeqMarkers.push(JSON.parse(JSON.stringify(currentMarkerInPlaced)));
                    }
                }
            }
            
            // CRITICAL: Sync the final position in the current sequence before saving history
            currentMapData[currentSequenceId][targetKey] = JSON.parse(JSON.stringify(movingType === 'icon' ? placedIcons : placedText));
        }

        // Cleanup: Ensure trash can opacity is reset and hidden if tool is not 'move'
        trashCan.classList.remove('opacity-100', 'bg-red-500/90');
        trashCan.classList.add('opacity-0', 'bg-red-700/80');
        
        if(currentTool === 'move') {
            trashCan.classList.add('hidden');
        }


        isMovingIcon = false;
        movingIconIndex = -1;
        movingType = null;
        saveState(); // Save state after marker movement or deletion
        updateCursor();
    }
    
    updateBrushPreview(0, 0, 0, null, false, false); 
}

// UPDATED to handle both icons and text
function placeIcon(e) {
    if (!mapLoaded || !selectedIcon && currentTool === 'place' || currentTool === 'text' && textInput.value.trim() === '') return;

    const { x, y } = getCanvasCoords(e);
    const currentMapData = planningData[currentMapKey];

    if (isDrawing) { 
        // Save drawn line if present before placing icon/text
        currentMapData[currentSequenceId].lineData = lineBuffer.toDataURL();
        saveState();
    }

    if (currentTool === 'place') {
            // --- Icon Placement Logic (Existing) ---
        const baseId = selectedIcon.id;
        let count = placedIcons.filter(icon => icon.id.startsWith(baseId)).length;
        const uniqueId = `${baseId}_${count + 1}`;
        
        const newIcon = {
            id: uniqueId, 
            x: x, 
            y: y, 
            color: selectedIcon.color, 
            type: selectedIcon.type,
            iconUrl: selectedIcon.iconUrl || null 
        };

        placedIcons.push(newIcon);

        // Copy icon to ALL subsequent sequences on placement
        const currentSeqNum = parseInt(currentSequenceId.split(' ')[1]);
        for (let i = currentSeqNum; i <= MAX_SEQUENCES; i++) { 
            const nextSeqId = `Seq ${i}`;
            const nextSeqIcons = currentMapData[nextSeqId].icons;
            const existingIconIndex = nextSeqIcons.findIndex(icon => icon.id === newIcon.id);

            if (existingIconIndex === -1) {
                nextSeqIcons.push(JSON.parse(JSON.stringify(newIcon)));
            } else if (nextSeqId === currentSequenceId) {
                nextSeqIcons[existingIconIndex] = JSON.parse(JSON.stringify(newIcon));
            }
        }
        
        // Sync the current placedIcons array back to the active sequence structure
        currentMapData[currentSequenceId].icons = placedIcons; 

    } else if (currentTool === 'text') {
            // --- Text Placement Logic (NEW) ---
        const baseId = 'text_label';
        let count = placedText.filter(text => text.id.startsWith(baseId)).length;
        const uniqueId = `${baseId}_${count + 1}`;
        
        const newText = {
            id: uniqueId,
            text: textInput.value.trim().toUpperCase(),
            x: x,
            y: y,
            color: colorPicker.value,
            size: currentLineWidth * 2 // Use 2x line width for a readable font size
        };

        placedText.push(newText);
        
        // Copy text to ALL subsequent sequences on placement
        const currentSeqNum = parseInt(currentSequenceId.split(' ')[1]);
        for (let i = currentSeqNum; i <= MAX_SEQUENCES; i++) { 
            const nextSeqId = `Seq ${i}`;
            const nextSeqText = currentMapData[nextSeqId].textData;
            const existingTextIndex = nextSeqText.findIndex(text => text.id === newText.id);

            if (existingTextIndex === -1) {
                nextSeqText.push(JSON.parse(JSON.stringify(newText)));
            } else if (nextSeqId === currentSequenceId) {
                nextSeqText[existingTextIndex] = JSON.parse(JSON.stringify(newText));
            }
        }
        
        // Sync the current placedText array back to the active sequence structure
        currentMapData[currentSequenceId].textData = placedText;
        
        // Optional: Clear input after placement
        // textInput.value = '';
    }

    synchronousRedraw(); 
    saveState(); 
}

// Clears only the lines/strokes, preserves icons and text (UPDATED)
function clearLines() {
    showConfirm("Are you sure you want to clear all drawing lines? All placed icons and labels will remain.", (confirmed) => {
        if (confirmed) {
            lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height);
            
            // CRITICAL: Save the empty state back to the current sequence line data
            planningData[currentMapKey][currentSequenceId].lineData = lineBuffer.toDataURL();

            synchronousRedraw();
            saveState(); 
        }
    }, "Clear Lines");
}

// Clears everything (lines, icons, and text) (UPDATED)
function clearDrawing(confirm = true, isMapChange = false) {
    const clearAction = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lineBufferCtx.clearRect(0, 0, lineBuffer.width, lineBuffer.height); 
        placedIcons.length = 0; // Clear the icon array using its alias
        placedText.length = 0; // NEW: Clear the text array using its alias
        
        // CRITICAL: Clear line, icon, and text data for the current sequence
        if (planningData[currentMapKey] && planningData[currentMapKey][currentSequenceId]) {
            planningData[currentMapKey][currentSequenceId].lineData = '';
            planningData[currentMapKey][currentSequenceId].icons.length = 0; // Clear the actual data structure
            planningData[currentMapKey][currentSequenceId].textData.length = 0; // NEW: Clear the actual text structure
        }

        if (!isMapChange) {
            history = [];
            historyIndex = -1;
            saveState(); 
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
// 6. EXPORT / IMPORT LOGIC (File I/O) (UPDATED & REPAIRED)
// =========================================================================

function exportPlan() {
    // 1. First, ensure the current sequence state (lines, icons, & text) is saved before export
    if (planningData[currentMapKey] && planningData[currentMapKey][currentSequenceId]) {
        planningData[currentMapKey][currentSequenceId].icons = JSON.parse(JSON.stringify(placedIcons));
        planningData[currentMapKey][currentSequenceId].lineData = lineBuffer.toDataURL();
        planningData[currentMapKey][currentSequenceId].textData = JSON.parse(JSON.stringify(placedText)); // NEW: Save text
    } 
    
    // 2. Collect all state data needed for a full restoration
    const exportState = {
        version: 1.2, // Updated version
        mapIndex: currentMapIndex,
        sectorUrl: mapBackground.src,
        sectorName: currentSectorName,
        currentSequenceId: currentSequenceId, // Save active sequence
        currentTool: currentTool,
        currentLineWidth: currentLineWidth,
        currentColor: colorPicker.value,
        planningData: planningData
    };

    try {
        const jsonString = JSON.stringify(exportState, null, 2); // Prettier JSON
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
        // Cannot use alert(), so log error and suggest action
        console.error('EXPORT FAILED. Please check console for details.');
    }
}

// REPAIRED: Function to initiate the import process
function importPlan() {
    // Reset file input and show modal
    importFileInput.value = null;
    importModalActionButton.disabled = true;
    importModal.classList.remove('hidden');
    importModal.classList.add('flex');
}

// REPAIRED: Function to enable/disable the import button based on file selection
function handleFileSelection() {
    if (importFileInput.files.length > 0) {
        importModalActionButton.disabled = false;
    } else {
        importModalActionButton.disabled = true;
    }
}

// REPAIRED: Function to handle the actual import button click
function handleImportAction() {
    const file = importFileInput.files[0];
    if (!file) {
        console.error('Please select a file to load.');
        return;
    }

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
            console.error(`Failed to import plan. The file is corrupted or not a valid JSON plan: ${e.message}`);
        }
    };
    
    reader.onerror = () => {
        console.error('Error reading file.');
    };

    reader.readAsText(file);
}

function restoreImportedState(importState) {
    if (!importState.planningData) {
        console.error('Invalid plan data structure in file.');
        return;
    }

    // 1. Restore the ENTIRE planning data structure
    planningData = importState.planningData;
    
    // 2. Restore core map and sector data
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
    
    // Force the map change event to load the image, update display, and re-init sequence data
    // We set the currentSequenceId *before* loadMap so initializeSequenceData picks it up.
    currentSequenceId = importState.currentSequenceId || 'Seq 1';
    
    // Trigger loadMap via sectorSelect change event to handle UI update and image loading
    sectorSelect.dispatchEvent(new Event('change'));

    console.log('Strategy plan imported successfully! Loading selected map and sequence.');
}


// =========================================================================
// 7. EVENT LISTENERS
// =========================================================================

function updateCursor() {
    mapContainer.style.cursor = 'crosshair'; 
    
    // Hide all hints first
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
        mapContainer.style.cursor = 'none'; // Custom brush preview handles this
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

// --- Global Keyboard Shortcuts (Ctrl+Z / Ctrl+Y) ---
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) { // MetaKey is for Cmd on Mac
        if (e.key === 'z' || e.key === 'Z') {
            e.preventDefault();
            undo();
        } else if (e.key === 'y' || e.key === 'Y') {
            e.preventDefault();
            redo();
        }
    }
});

// --- Map Selection ---
mapSelect.addEventListener('change', (e) => {
    currentMapIndex = parseInt(e.target.value);
    populateSectorSelector(currentMapIndex);
});

// --- Sector Selection ---
sectorSelect.addEventListener('change', (e) => {
    const newSectorUrl = e.target.value;
    const newSectorName = e.target.options[e.target.selectedIndex].text;
    currentSectorName = newSectorName;
    loadMap(newSectorUrl);
    updateHeaderDisplay();
});

// --- Sequence Selection ---
sequenceSelect.addEventListener('change', (e) => {
    switchSequence(e.target.value);
});

// --- Undo / Redo Buttons ---
undoButton.addEventListener('click', undo);
redoButton.addEventListener('click', redo);

// --- Canvas Interactions (Mouse & Touch) ---
canvas.addEventListener('mousedown', startInteraction);
canvas.addEventListener('touchstart', startInteraction);

// Note: mousemove/mouseup/touchmove/touchend are now attached to 'window' when dragging starts!

// Handle standalone mousemove event when not drawing (to show/update preview)
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing && !isMovingIcon && (currentTool === 'pen' || currentTool === 'eraser')) {
        const { clientX, clientY } = e;
        const isEraser = currentTool === 'eraser';
        updateBrushPreview(clientX, clientY, currentLineWidth, currentColor, isEraser, true);
    }
});

// Hide preview on mouseleave from canvas (only required if not moving/drawing)
canvas.addEventListener('mouseout', (e) => {
    if (!isMovingIcon && !isDrawing) {
        updateBrushPreview(0, 0, 0, null, false, false);
    }
});

// Use separate click handler for placing icons AND text
canvas.addEventListener('click', (e) => {
    if (currentTool === 'place' && !isDrawing && !isMovingIcon) {
        placeIcon(e);
    } else if (currentTool === 'text' && !isDrawing && !isMovingIcon) {
        placeIcon(e); // placeIcon now handles both 'place' and 'text'
    }
}); 

// --- Text Input Listener (NEW) ---
textInput.addEventListener('input', updateCursor);
textInput.value = defaultText;

// --- Tool Selection ---
toolButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const newTool = e.currentTarget.dataset.tool;
        currentTool = newTool;

        // Update visual state
        toolButtons.forEach(btn => btn.classList.remove('bg-primary', 'bg-red-500'));
        toolButtons.forEach(btn => btn.classList.add('bg-gray-600'));

        e.currentTarget.classList.remove('bg-gray-600');
        if (newTool === 'pen' || newTool === 'place' || newTool === 'move' || newTool === 'text') {
            e.currentTarget.classList.add('bg-primary');
        } else if (newTool === 'eraser') {
            e.currentTarget.classList.add('bg-red-500');
        }

        updateCursor();
        
        // Explicitly hide preview if switching away from drawing/erasing
        if (newTool !== 'pen' && newTool !== 'eraser') {
            updateBrushPreview(0, 0, 0, null, false, false);
        }
    });
});

// --- Settings Updates ---
lineWidthInput.addEventListener('input', (e) => {
    currentLineWidth = parseInt(e.target.value);
    widthDisplay.textContent = `${currentLineWidth}px`;
});

// UPDATED: Convert hex color to RGBA for drawing opacity
colorPicker.addEventListener('input', (e) => {
    // Defaulting to 80% opacity for the drawing line, but full opacity for text
    currentColor = hexToRgba(e.target.value, 0.8); 
});

// --- Clear Map & Clear Lines ---
clearButton.addEventListener('click', () => clearDrawing(true));
clearLinesButton.addEventListener('click', clearLines);

// --- Save Map Image ---
saveButton.addEventListener('click', () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Set crossOrigin attribute on the map image for safe drawing/export
    currentMapImage.crossOrigin = "Anonymous";

    const performDrawAndDownload = () => {
        if (currentMapImage.complete && currentMapImage.naturalWidth > 0) {
            try {
                // Draw the map image first
                tempCtx.drawImage(currentMapImage, 0, 0, tempCanvas.width, tempCanvas.height);
                
                // Draw the existing canvas content (lines/icons/text) on top
                tempCtx.drawImage(canvas, 0, 0);

                const link = document.createElement('a');
                link.download = `df_plan_image_${MAPS[currentMapIndex].name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${currentSectorName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
                link.href = tempCanvas.toDataURL('image/png');
                link.click(); 
            } catch (e) {
                 // This catches the SecurityError (Tainted Canvas)
                 console.error("Error during canvas export (Tainted Canvas). Please run using a local web server (e.g., Live Server) or host assets online.", e);
                 synchronousRedraw();
            }
        } else {
             console.warn("Map image not ready. Cannot save.");
             synchronousRedraw();
        }
    };

    // Use an onload callback to ensure the map image is fully loaded before drawing
    if (currentMapImage.complete && currentMapImage.naturalWidth > 0) {
        performDrawAndDownload();
    } else {
        currentMapImage.onload = performDrawAndDownload;
        currentMapImage.src = currentMapImage.src; 
    }
});

// --- Export / Import Buttons (File I/O) ---
exportButton.addEventListener('click', exportPlan);
importButton.addEventListener('click', importPlan);

importFileInput.addEventListener('change', handleFileSelection);

importModalActionButton.addEventListener('click', handleImportAction);

importModalCancelButton.addEventListener('click', () => {
    importModal.classList.add('hidden');
    importModal.classList.remove('flex');
});

// =========================================================================
// 8. FINAL INITIALIZATION
// =========================================================================

const initializeApp = () => {
    
    // --- Attach Login/Logout Listeners (New) ---
    loginForm.addEventListener('submit', handleLoginAction);
    logoutButton.addEventListener('click', handleLogout); 
    // The "Save Plan" button is non-functional as it previously relied on Firebase
    // savePlanBtn.addEventListener('click', () => { displayMessage("Cloud save disabled.", true); });

    // --- Attach Planner Event Listeners (All integrated above) ---
    // All specific listeners for mapSelect, sectorSelect, sequenceSelect, toolButtons, canvas, etc. 
    // are now properly defined and attached in section 7.
    
    // Initial check: if isLoggedIn is false, the login screen will show.
    checkLogin(); 
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

// window.initFirebaseApp = initFirebase; // REMOVED
