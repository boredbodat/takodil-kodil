// Create a new synth
const synth = new Tone.Synth().toDestination();

// Function to start audio context (required by browsers)
async function startAudio() {
    await Tone.start();
    console.log('Audio context started');
}

// Function to play a note
function playNote() {
    synth.triggerAttackRelease('C4', '8n');
}

// Add event listeners
document.getElementById('start').addEventListener('click', startAudio);
document.getElementById('playNote').addEventListener('click', playNote);

// Log when the script is loaded
console.log('Tone.js script loaded'); 