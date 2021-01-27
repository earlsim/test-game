import {shuffle} from "../utils/shuffle";
import store from './configStore';

export const startGame = (qty, colors) => {
    const arr = [];
    for (let i = 0; i < qty; i++) {
        arr.push({
            color: colors[i],
            index: i,
            id: i * 2,
            flipped: false,
        })
    }
    const cardsDoubles = arr.map(el => ({
        color: el.color,
        index: el.index,
        id: el.id + 1,
        flipped: false,
    }));

    const cards = shuffle([...arr, ...cardsDoubles]);

    return {
        type: 'START_GAME',
        payload: cards
    }
}

export const clickCard = (id, index, cards, flippedTmp) => {
    return (dispatch) => {
        let newCards = cards.map(el => {
            if (el.id === id) {
                return {
                    color: el.color,
                    index: el.index,
                    id: el.id,
                    flipped: true
                }
            } else return el
        });
        if (flippedTmp.length === 0) {
            dispatch({
                type: 'CLICKED',
                payload: {newCards, index},
            });
        } else if (flippedTmp.length === 1 && flippedTmp[0] === index) {
            const flippedCards = store.getState().flippedCards;
            const finished = (flippedCards.length + 1) === ( cards.length / 2 );
            dispatch({
                type: 'MATCH',
                payload: {newCards, index, finished},
            });

        } else {
            const flippedCards = store.getState().flippedCards;
            const resetCards = cards.map(el => {
                return {
                    color: el.color,
                    index: el.index,
                    id: el.id,
                    flipped: flippedCards.some((flipped) => flipped === el.index)
                }
            })
            dispatch({
                type: 'CLICKED',
                payload: {newCards, index},
            });
            setTimeout(() => {
                dispatch({
                    type: 'RESET_FLIPPED_TMP',
                    payload: {resetCards},
                });
            }, 500)
        }
    }
}