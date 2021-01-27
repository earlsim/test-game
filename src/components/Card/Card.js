import React from 'react';
import styles from './Card.module.css';
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {clickCard} from "../../store/actions";


const Card = ({id, index, color, flipped}) => {
    const dispatch = useDispatch();
    const cards = useSelector(state => state.cards);
    const flippedTmp = useSelector(state => state.flippedTmp);

    const onCardClick = () => {
        if(!flipped) {
            dispatch(clickCard(id, index, cards, flippedTmp))
        }
    }
    return (
        <div className={styles.cardContainer} onClick={onCardClick}>
            <div className={clsx(styles.card, flipped && styles.cardRotated)} style={{background: color}}/>
            <div className={clsx(styles.cardBack, flipped && styles.cardBackActive)}/>
        </div>

    );
};

export default React.memo(Card);
