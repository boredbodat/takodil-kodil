// Create a synth with some effects
const synth = new Tone.Synth({
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 1
    }
}).chain(
    new Tone.Filter(800, "lowpass"),
    new Tone.Distortion(0.8),
    Tone.Destination
);

// Create a sequence
const notes = ["C4", "E4", "G4", "C5", "G4", "E4"];
let currentNoteIndex = 0;

// Create a transport for timing
Tone.Transport.bpm.value = 120; // Set initial tempo to 120 BPM

// Function to start audio context (required by browsers)
async function startAudio() {
    await Tone.start();
    console.log('Audio context started');
    // Start the transport
    Tone.Transport.start();
}

// Function to play the sequence
function playSequence() {
    // Schedule the next note
    const time = Tone.now();
    const note = notes[currentNoteIndex];
    synth.triggerAttackRelease(note, "8n", time);
    
    // Move to next note
    currentNoteIndex = (currentNoteIndex + 1) % notes.length;
    
    // Schedule the next note
    Tone.Transport.schedule(() => {
        playSequence();
    }, "+8n");
}

// Function to toggle the sequence
let isPlaying = false;
function toggleSequence() {
    if (!isPlaying) {
        playSequence();
        isPlaying = true;
        document.getElementById('playNote').textContent = 'Stop';
    } else {
        Tone.Transport.stop();
        isPlaying = false;
        document.getElementById('playNote').textContent = 'Play';
    }
}

// Function to change tempo
function changeTempo(value) {
    Tone.Transport.bpm.value = value;
    document.getElementById('tempoValue').textContent = value;
}

// Add event listeners
document.getElementById('start').addEventListener('click', startAudio);
document.getElementById('playNote').addEventListener('click', toggleSequence);
document.getElementById('tempo').addEventListener('input', (e) => changeTempo(e.target.value));

// Log when the script is loaded
console.log('Tone.js script loaded'); 