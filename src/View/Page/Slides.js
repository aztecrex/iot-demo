import React from 'react';
import { connect } from 'react-redux';
import { isPowered, getSlideNumber } from '../../Model';

const Slides = ({powered=true, number = 1}) => {
    return (
        <div>
            {number}
        </div>
    );
};

const ConnectedSlides = connect(
    state => ({
        powered: isPowered(state),
        number: getSlideNumber(state)
    }),
    dispatch => ({})
)(Slides);

export {Slides, ConnectedSlides}
