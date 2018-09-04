import React from 'react';
import { connect } from 'react-redux';
import { isPowered, getSlideNumber, evtLogoutRequested } from '../../Model';
import { WhatSlide1, WhatSlide2, WhatSlide3, WhatSlide4 } from './What';
import { WhatForSlide1, WhatForSlide2, WhatForSlide3, WhatForSlide4 } from './WhatFor';

const Slides = ({ powered = true, number = 1, handleLogout = () => { } }) => {
    switch (number) {
        case 1: return <WhatSlide1 />
        case 2: return <WhatSlide2 />
        case 3: return <WhatSlide3 />
        case 4: return <WhatSlide4 />
        case 5: return <WhatForSlide1 />
        case 6: return <WhatForSlide2 />
        case 7: return <WhatForSlide3 />
        case 8: return <WhatForSlide4 />
        default:
            return number < 1 ? <WhatSlide1 /> : <WhatForSlide4 />
    }
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

export { Slides, ConnectedSlides }
