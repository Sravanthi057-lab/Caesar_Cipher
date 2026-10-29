# Caesar Cipher Encryption Tool

## How to run locally
1. Keep `index.html`, `style.css` and `script.js` in the same folder.
2. Double-click `index.html` to open it in Chrome, Firefox or Edge. No internet or server needed.
3. (Optional) Run `python -m http.server 8000` in the folder and open http://localhost:8000.
   Note: Copy Result works best over localhost or https.

## Test results
| Input | Shift | Encrypted | Decrypts back? |
|---|---|---|---|
| Hello, World! 123 | 3 | Khoor, Zruog! 123 | Yes |
| Abc xyz | 0 | Abc xyz | Yes |
| ABC abc | 25 | ZAB zab | Yes |
| The Quick Fox, 42! | 0–25 | (all keys) | Yes |

## JavaScript explained step by step
1. **shiftChar(ch, k)** – Gets the character code. `A–Z` are 65–90, `a–z` are 97–122. Subtract 65 (or 97) to get x = 0–25, add k, take `% 26` so Z wraps to A, then add 65 (or 97) back. Other characters return unchanged.
2. **encrypt(text, k)** – Loops through every character and joins the shifted characters. This is E(x) = (x + k) mod 26.
3. **decrypt(text, k)** – Shifting back by k equals shifting forward by 26 − k, so D(x) = (x − k + 26) mod 26. The +26 avoids negative numbers.
4. **getElementById** – Connects JavaScript to the textarea, key box, result panel and status line.
5. **getShift()** – Accepts only whole numbers 0–25, otherwise shows an error.
6. **run(mode)** – Called by Encrypt/Decrypt buttons; checks input and shows the result.
7. **Copy** – Uses `navigator.clipboard.writeText`.
8. **Clear** – Empties the input and result.
9. **Samples** – Clicking a sample puts it in the input box.

Everything runs in the browser; no data leaves your computer. Caesar cipher is for learning only — not secure.
