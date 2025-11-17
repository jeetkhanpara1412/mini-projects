import React, { useEffect, useState } from 'react'
import './PasswordMaker.css'

let sy = "!@#$%^&*()."
let up = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let lo = "abcdefghijklmnopqrstuvwxyz"
let nu = "0123456789"


export default function PasswordMaker() {

    let [pass, setPass] = useState("")
    let [passwordLenth, setPasswordLenth] = useState(4)
    let [uppercase, setUppercase] = useState(true)
    let [lowercase, setLowercase] = useState(false)
    let [number, setNumber] = useState(false)
    let [symbols, setSymbols] = useState(false)


    let generatePassword = () => {
        let finalPssword = "";
        let makePassword = "";
        if (uppercase || lowercase || number || symbols) {
            if (uppercase) { makePassword += up }
            if (lowercase) { makePassword += lo }
            if (number) { makePassword += nu }
            if (symbols) { makePassword += sy }
            for (let i = 0; i < passwordLenth; i++) {
                finalPssword += makePassword.charAt(Math.floor(Math.random() * makePassword.length))
            }
            setPass(finalPssword)
        } else {

        }
    }

    useEffect(() => {
        generatePassword();
    }, [passwordLenth, uppercase, lowercase, number, symbols]);


    let colypass = () => {
        navigator.clipboard.writeText(pass)
    }

    return (
        <div className='container'>
            <div className='box'>
                <div className='passwodBox' >
                    <input type='' value={pass} readOnly />
                </div>

                <div className='select'>
                    <label>Password Lenth</label>
                    <input type='number' max={25} min={4} value={passwordLenth} onChange={(event) => { setPasswordLenth(event.target.value) }} />
                </div>


                <div className='select'>
                    <label>Uppercase Letters</label>
                    <input type='checkbox' checked={uppercase} onChange={() => setUppercase(!uppercase)} />
                </div>

                <div className='select'>
                    <label>Lowercase Letters</label>
                    <input type='checkbox' checked={lowercase} onChange={() => setLowercase(!lowercase)} />
                </div>

                <div className='select'>
                    <label>Numbers</label>
                    <input type='checkbox' checked={number} onChange={() => setNumber(!number)} />
                </div>

                <div className='select'>
                    <label>Symbols</label>
                    <input type='checkbox' checked={symbols} onChange={() => setSymbols(!symbols)} />
                </div>

                <div className='passwodBox'>
                    <button onClick={colypass}>Copy</button>
                    <button onClick={generatePassword}>refres</button>
                </div>

            </div>
        </div>
    )
}
