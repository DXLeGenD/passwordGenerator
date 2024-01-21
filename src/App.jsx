import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [password, setPassword] = useState("")
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [length, setLength] = useState(10)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%^&*(){}[]<>~`"

    for (let index = 1; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [numberAllowed, charAllowed, length, setPassword])

  let passwordRef = useRef(null)

  const copyToClipboard = () => {

    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  }


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])



  return (
    <div className=' flex justify-center items-center h-screen text-orange-600'>
      <div className='w-full max-w-lg my-8 px-4 py-2 shadow-lg rounded-lg bg-orange-500'>
        <h1 className='text-2xl text-white text-center'>Password Generator</h1>
        <div className='bg-white my-5 rounded-md px-4 py-2 shadow-lg'>
          <div className='my-1 flex  border-2 border-solid border-black rounded-md pl-2'>
            <input className='w-full px-4 py-2 outline-none' type="text" ref={passwordRef} value={password} readOnly placeholder='Password' />
            <button className='active:p-2 active:bg-blue-900 w-20 px-4 py-2 bg-blue-700 text-white' onClick={copyToClipboard}>Copy</button>
          </div>
          <div className='flex gap-2 justify-around flex-wrap'>
            <div className='flex gap-2'>
              <input className='accent-orange-600 cursor-grabbing' type="range" onChange={(e) => setLength(e.target.value)} value={length} min={10} max={99} />
              <label htmlFor="length">Length:{length}</label>
            </div>
            <div className='flex gap-2 '>
              <input className='accent-orange-600' type="checkbox" checked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} />
              <label htmlFor="number">Number</label>
            </div>
            <div className='flex gap-2 '>
              <input className='accent-orange-600' type="checkbox" checked={charAllowed} onChange={() => setCharAllowed((prev) => !prev)} />
              <label htmlFor="Char">Special Symbol</label>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default App
