import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useref hook

  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordref.current?.select();
    // passwordref.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 overflow-hidden">
      <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-60 blur-xl transform scale-125 z-0" />

      <div className="relative z-10 w-full max-w-md mx-auto shadow-2xl rounded-lg bg-gray-900 text-orange-400 p-8 backdrop-blur-md bg-opacity-90">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Password Generator
        </h1>

        <div className="flex shadow rounded-md overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-3 outline-none bg-gray-800 text-orange-300 placeholder-gray-600"
            placeholder="Generated Password"
            readOnly
            ref={passwordref}
          />
          <button
            onClick={copyPasswordtoClipboard}
            className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-4 py-2"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="flex-1 cursor-pointer accent-orange-500"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="ml-4 text-white">Length: {length}</label>
          </div>

          <div className="flex justify-between">
            <label className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="accent-orange-500"
              />
              <span>Numbers</span>
            </label>

            <label className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="accent-orange-500"
              />
              <span>Characters</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
