import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Card from "./components/Card/Card";
import {startGame} from "./store/actions";
import styles from './app.module.css';

const App = () => {
    const [isStarted, start] = useState(false);
    const dispatch = useDispatch();
    const cards = useSelector(state => state.cards);
    const colors = useSelector(state => state.colors);
    const finished = useSelector(state => state.finished);

    const play = () => {
        start(true);
        dispatch(startGame(8, colors));
    }

    return (
        <div className={styles.main}>
            {!isStarted &&
            <div className={styles.board}>
                <button className={styles.btn} onClick={play}>
                    Start game
                </button>
            </div>
            }
            {
                isStarted &&
                <div className={styles.board}>
                    {cards.map((el) => (
                        <Card color={el.color} index={el.index} key={el.id} id={el.id} flipped={el.flipped}/>
                    ))}
                </div>
            }
            {finished &&
            <div className={styles.finished}>
                <span className={styles.congrats}>congratulations!!!</span>
                <button className={styles.btn} onClick={play}>
                    New game
                </button>
            </div>
            }
        </div>
    )
}

export default App;
