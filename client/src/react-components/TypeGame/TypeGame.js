import React, {useEffect, useState} from 'react'
import './TypeGame.css'
import { getHighscore, getTopScores, addScore, getAllWords } from '../../actions/game';


function TypeGame(){
    const state = {
        wordBank: [],
        topUsers: [{displayName: "hah", userName: "user1", score: "1000"},
                    {displayName: "lalal", userName: "user2", score: "900"},
                    {displayName: "hum", userName: "user3", score: "800"},
                    {displayName: "Uhh", userName: "user4", score: "7000"},
                    {displayName: "Ahhh", userName: "user5", score: "6000"},],
        timeLimit: 30
    }

    const [words, setWords] = useState([newWord(), newWord(), newWord(), newWord(), newWord(), newWord(), newWord(), newWord(), newWord()]);
    const [started, setStarted] = useState(null)
    const [time, setTime] = useState(state.timeLimit);
    const [score, setScores] = useState(0);
    const [best, setBest] = useState(50);
    
    function newWord(){
        const index = Math.floor(Math.random() * state.wordBank.length)
        return state.wordBank[index].word
    }

    useEffect(() =>{
        if(started != null){
            var count = 0
            var timer = setInterval(() => {
                count += 1
                updateTime()
                if(count == state.timeLimit){
                    clearInterval(timer)
                }
            }, 1000)
        }
    }, [started])

    useEffect(()=>{
        state.wordBank = getAllWords()
    }, [])

    useEffect(() =>{
        if(score > best){
            setBest(score)
        }
    }, [score])

    useEffect(()=>{
        setBest(getHighscore())
    }, [])

    function startTimer(){
        setStarted(Date.now())
    }

    function updateTime(){
        const timeDiff = +(Date.now()) - +started
        const timeLeft = state.timeLimit - Math.floor(timeDiff / 1000) % 60
        console.log(timeLeft)
        if(started == null){
            setTime(state.timeLimit)
        }else if(timeLeft > 0){
            setTime(timeLeft)
        }else{
            setTime(0)
            addScore(score)
            state.topUsers = getTopScores(5)
            updateLeaderboard()
            const game = document.getElementById("game")
            const over = document.getElementById("gameOver")
            game.style.display = "none"
            over.style.display = "block"
        }

    }

    function handlePlayAgain(){
        setWords([newWord(), newWord(), newWord(), newWord(), newWord(), newWord(), newWord(), newWord(), newWord()])
        setTime(state.timeLimit)
        setScores(0)
        setStarted(null)
        const game = document.getElementById("game")
        const over = document.getElementById("gameOver")
        const input = document.getElementById("gameInput")
        game.style.display = "block"
        over.style.display = "none"
        input.value = ""
    }


    function handleKeyPress(e){
        if(started == null){
            startTimer()
        }
        if(e.key == 'Enter'){
            const input = e.target.value
            const word = String(words[8])
            if(input == word){
                var index = 0
                for(var i = 0; i < state.wordBank.length;i++){
                    if(state.wordBank[i].word = word){
                        break
                    }
                    index += 1
                }
                const difficulty = state.wordBank[index].difficulty
                if(difficulty == 'easy'){
                    setScores(score + 10)
                }else if(difficulty == 'medium'){
                    setScores(score + 20)
                }else if(difficulty == 'hard'){
                    setScores(score + 30)
                }
                var tempWords = words
                tempWords.pop()
                tempWords.splice(0, 0, newWord())
                setWords(tempWords)
            }
            e.target.value = ''
        }
    }

    const [leaderboard, setLeaderboard] = useState([])

    useEffect(()=>{
        state.topUsers = getTopScores(5)
        updateLeaderboard()
    }, [])

    function updateLeaderboard(){
        let count = 0
        setLeaderboard(state.topUsers.map((user) => {
            count += 1
            return(<>
                <div className='grid-item-bold'>{count}</div>
                <div className='grid-item-bold'>{user.userName}</div>
                <div className='grid-item-bold'>{user.displayName}</div>
                <div className='grid-item-bold'>{user.score}</div>
            </>
            )
        }))
    }
    
    return(
        <div>
            <div id='game'>
                <div className='scores'>
                    <h1>Time Left: <span className='red'>{time}</span>s</h1>
                    <h1>Score: {score}</h1>
                    <h1>Best: {best}</h1>
                </div>
                <input id="gameInput" onKeyPress={handleKeyPress}/>
                <div className='wordBox'>
                    {words.map((word) => <p className='word'>{word}</p>)}
                </div>
                <p className='instructions'>Type the word above the box and press enter. 
                If you type it correctly, then you'll get points! Points you accumulate will be added to your wallet. Longer words give more points. Try your best to get on the leaderboard! </p>
            </div>
            
            <div id='gameOver'>
                <h1 className='gameOverScore'>Score: {score}</h1>
                <h2 className='gameOverScore'>Congratulations! You earned {score} better coins!</h2>
                <h1 className='gameOverScore'>Your Best: {best}</h1>
                <div className='leaderBoard'>
                    <div className="grid-item-bold">Rank</div>
                    <div className="grid-item-bold">User Name</div>
                    <div className="grid-item-bold">Display Name</div>  
                    <div className="grid-item-bold">Score</div>

                    {leaderboard}
                </div>
                <button className='playAgain button10' onClick={handlePlayAgain}>Play Again</button>
            </div>
        </div>
    );
}

export default TypeGame;
