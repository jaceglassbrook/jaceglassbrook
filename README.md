<!--
**jaceglassbrook/jaceglassbrook** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.
-->

### About Me

Hi there — I'm Jace 👋

I'm a full-stack web developer with a background in teaching and mechanical engineering. I'm an experienced programmer who focuses on usability and writing clean, reusable code. I love solving challenging problems and figuring out complex systems.

I develop with JavaScript/TypeScript and Python, but I enjoy learning new languages. I've developed front-end apps with React and back-end apps with Django and Node+Express. I've even developed a mobile app (Android/iOS) with React Native + Expo. Before I entered web development, I programmed with MATLAB/Simulink, C/C++, Fortran, and Java for research and school. I also taught MATLAB to engineering students.

Outside of work, I enjoy singing, cooking, gardening, and going for walks/hikes with my partner. I also enjoy learning new programming and markup languages on my own — because I'm a nerd 🤓

### Get In Touch

-   [github.com/jaceglassbrook](https://github.com/jaceglassbrook/) (you're already here)
-   [linkedin.com/in/jaceglassbrook](https://www.linkedin.com/in/jaceglassbrook/)
-   To email me, run the following code in your browser's console.

> NOTE: If you're using a Chromium-based browser (Google Chrome, Microsoft Edge, Opera, Vivaldi, Brave, etc.), then you may need to type and enter `allow pasting` before your browser will allow you to paste the following code into your browser's console.

```js
if (window.confirm('If you click "OK", you will be redirected to email Jace.')) {
  /* can you figure out the secret code? */
  const secret/*: Secret*/ = {
    base: 36,
    code: { "17": ["c"], "30": ["3"], "31": ["r"], "32": ["p"], "33": ["9", "a", "m", "o"],
            "34": ["k"], "36": ["8", "g", "l"], "37": ["5", "6", "d"], "38": ["i", "n"],
            "2y": ["0"], "2n": ["1"], "2v": ["2"], "2p": ["4"], "2q": ["7"], "2z": ["b"],
            "2t": ["e", "h", "s"], "2r": ["f"], "1s": ["j"], "1a": ["q"] }
  };

  function decodeSecret(secret/*: Secret*/)/*: string*/ {
    function decodeItem(x/*: string*/)/*: number*/ {
      return parseInt(x, secret.base);
    }
    /* reconstruct code points from the secret. */
    const codeList/*: [number]*/ = [];
    for (const [secretCode, secretIndexList]/*: [string, [string]]*/ of Object.entries(secret.code)) {
      /* decode secret code to a real code point. */
      const code/*: number*/ = decodeItem(secretCode);

      for (const secretIndex of secretIndexList) {
        /* decode secret index to a real index. */
        const index/*: number*/ = decodeItem(secretIndex);
        /* if needed, grow the list of code points. */
        const missingLength/*: number*/ = index + 1 - codeList.length;
        if (missingLength > 0) {
          codeList.push(...Array(missingLength));
        }
        /* put the code point in the list. */
        codeList[index] = code;
      }
    }
    /* convert the code points to a string; return it. */
    return String.fromCodePoint(...codeList);
  }

  /* recover email address from secret. */
  const address/*: string*/ = decodeSecret(secret);
  const [addressBeforeAt, addressAfterAt]/*: [string, string]*/ = email.split("@");
  const addressWithTimestamp/*: string*/ = `${addressBeforeAt}+${Date.now().toString()}@${addressAfterAt}`;

  /* redirect user to send an email. */
  window.location.assign(`mailto:${addressWithTimestamp}`);
}
```
