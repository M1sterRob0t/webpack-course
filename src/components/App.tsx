import { useState } from "react"
import './App.scss';

export default function App() {
    const [counter, setCounter] = useState(0);

    return (
        <div style={{width: '300px', margin: '0 auto', textAlign: 'center'}}>
            <h1>Welcome to <span>my</span> app</h1>
            <h2>{counter}</h2>
            <button onClick={() => setCounter(prev => ++prev)}>increase</button>
        </div>
    )
}