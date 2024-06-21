"use strict";

/***********************************************************
  WHAT IS A SECRET?
------------------------------------------------------------
  a `Secret` is an object like the following TypeScript interface.

  ```ts
  interface Secret {
    base: number;
    code: Record<string, Array<string>>;
  }
  ```

  because this is plain JavaScript, the goal here is to emulate the `Secret` interface with
  `SecretInterface` and by providing `validateSecret` for runtime validation.
***********************************************************/

export const SecretInterface = {
  base: (x) => typeof x === "number" && Number.isInteger(x),
  code: (o) =>
    typeof o === "object" &&
    Object.keys(o).every((ok) => typeof ok === "string") &&
    Object.values(o).every(
      (ov) => Array.isArray(ov) && ov.every((ovv) => typeof ovv === "string")
    ),
};

export function validateSecret(maybeSecret/*: Secret?*/)/*: boolean*/ {
  return Object.entries(SecretInterface).every(([ik, iv]) =>
    iv(maybeSecret[ik])
  );
}

/***********************************************************
  ENCODE SECRET
------------------------------------------------------------
  ### EXAMPLE ###
  let encodedMessage = "keep it secret, keep it safe";
  let secret = encodeSecret(encodedMessage, 16);
  >>>
  secret = {
    base: 16,
    code: {
      "2c": ["e"],
      "6b": ["0", "10"],
      "20": ["4", "7", "f", "14", "17"],
      "61": ["19"],
      "63": ["a"],
      "65": ["1", "2", "9", "c", "11", "12", "1b"],
      "66": ["1a"],
      "69": ["5", "15"],
      "70": ["3", "13"],
      "72": ["b"],
      "73": ["8", "18"],
      "74": ["6", "d", "16"],
    }
  }
***********************************************************/

export function encodeSecret(message/*: string*/, base/*: number*/)/*: Secret*/ {
  function encodeItem(x/*: number*/)/*: string*/ {
    return x.toString(base);
  }
  /* convert `message` to a list of code points. */
  const codeList/*: [number]*/ = Array.from(message, (x) => x.codePointAt(0));
  /* convert code points to a dictionary like `{ [secretCode]: [secretIndex, ...], ... }`. */
  const secretCodeDict/*: { string: [string] }*/ = {};
  for (const [index, code]/*: [number, number]*/ of codeList.entries()) {
    /* encode secret index, code. */
    const secretIndex/*: string*/ = encodeItem(index);
    const secretCode/*: string*/ = encodeItem(code);
    /* if needed, add new key `secretCode` to `secretCodeDict`. */
    if (!(secretCode in secretCodeDict)) {
      secretCodeDict[secretCode] = [];
    }
    /* append secret index. */
    secretCodeDict[secretCode].push(secretIndex);
  }
  /* make the secret object; return it. */
  return { base: base, code: secretCodeDict };
}

/***********************************************************
  DECODE SECRET
------------------------------------------------------------
  ### EXAMPLE ###
  let encodedMessage = "keep it secret, keep it safe";
  let secret = encodeSecret(encodedMessage, 16);
  let decodedMessage = decodeSecret(secret);
  >>>
  decodedMessage = "keep it secret, keep it safe"
***********************************************************/

export function decodeSecret(secret/*: Secret*/)/*: string*/ {
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

/**********************************************************/

export default {
  SecretInterface,
  validateSecret,
  encodeSecret,
  decodeSecret,
};
