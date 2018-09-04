import React from 'react';
import { connect } from 'react-redux';
import { isPowered, getSlideNumber, evtLogoutRequested } from '../../Model';

const Slides = ({powered=true, number = 1, handleLogout = () => {}}) => {
    return (
        <div>
            {number}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

const ConnectedSlides = connect(
    state => ({
        powered: isPowered(state),
        number: getSlideNumber(state)
    }),
    dispatch => ({
        handleLogout: () => dispatch(evtLogoutRequested())
    })
)(Slides);

export {Slides, ConnectedSlides}
