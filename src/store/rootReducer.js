const initState = {
    finished: null,
    cards:[],
    colors: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4','#ff9f1c', '#2ec4b6', '#002855', '#ffacc5'],
    flippedCards: [],
    flippedTmp: [],
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'CLICKED':
            return {
                ...state,
                cards: action.payload.newCards,
                flippedTmp: [...state.flippedTmp, action.payload.index]
            }
        case 'MATCH':
            return {
                ...state,
                cards: action.payload.newCards,
                flippedCards: [ ...state.flippedCards, action.payload.index],
                flippedTmp: [],
                finished: action.payload.finished,
            }
        case 'START_GAME':
            return {
                finished: null,
                cards: action.payload,
                flippedCards: [],
                colors: state.colors,
                flippedTmp: [],
            }
        case 'RESET_FLIPPED_TMP':
            return {
                ...state,
                cards: action.payload.resetCards,
                flippedTmp: [],
            }
        default:
            return state
    }
}

export default reducer