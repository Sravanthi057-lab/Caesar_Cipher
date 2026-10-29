// ===== Caesar Cipher Encryption Tool =====

// Step 1: Shift ONE character by k positions.
function shiftChar(ch, k) {
  const code = ch.charCodeAt(0);            // ASCII code of the character
  if (code >= 65 && code <= 90) {           // Uppercase A-Z (65-90)
    return String.fromCharCode(((code - 65 + k) % 26) + 65);
  }
  if (code >= 97 && code <= 122) {          // Lowercase a-z (97-122)
    return String.fromCharCode(((code - 97 + k) % 26) + 97);
  }
  return ch;                                // Spaces, digits, punctuation unchanged
}

// Step 2: Encrypt the whole text: E(x) = (x + k) mod 26
function encrypt(text, k) {
  let result = "";
  for (const ch of text) result += shiftChar(ch, k);
  return result;
}

// Step 3: Decrypt: D(x) = (x - k + 26) mod 26  -> same as shifting by (26 - k)
function decrypt(text, k) {
  return encrypt(text, (26 - k) % 26);
}

// Step 4: Get page elements
const inputText = document.getElementById("inputText");
const shiftKey  = document.getElementById("shiftKey");
const resultBox = document.getElementById("result");
const statusMsg = document.getElementById("status");

// Step 5: Read and validate the key (whole number 0-25)
function getShift() {
  const value = shiftKey.value.trim();
  if (!/^\d+$/.test(value) || Number(value) > 25) {
    statusMsg.textContent = "Shift key must be a whole number from 0 to 25.";
    return null;
  }
  return Number(value);
}

// Step 6: Run encrypt or decrypt when a button is clicked
function run(mode) {
  const k = getShift();
  if (k === null) return;
  if (inputText.value === "") { statusMsg.textContent = "Please enter some text first."; return; }
  resultBox.textContent = mode === "encrypt" ? encrypt(inputText.value, k) : decrypt(inputText.value, k);
  statusMsg.textContent = (mode === "encrypt" ? "Encrypted" : "Decrypted") + " with shift " + k + ".";
}
document.getElementById("encryptBtn").addEventListener("click", () => run("encrypt"));
document.getElementById("decryptBtn").addEventListener("click", () => run("decrypt"));

// Step 7: Copy result to clipboard
document.getElementById("copyBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(resultBox.textContent);
    statusMsg.textContent = "Result copied to clipboard.";
  } catch {
    statusMsg.textContent = "Copy failed — select the text and copy manually.";
  }
});

// Step 8: Clear everything
document.getElementById("clearBtn").addEventListener("click", () => {
  inputText.value = "";
  resultBox.textContent = "Output will appear here.";
  statusMsg.textContent = "Cleared.";
});

// Step 9: Sample text buttons fill the input
document.querySelectorAll(".sample").forEach((b) =>
  b.addEventListener("click", () => { inputText.value = b.textContent; })
);
