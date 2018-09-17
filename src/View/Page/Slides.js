import React from 'react';
import { connect } from 'react-redux';
import { isPowered, getSlideNumber, evtLogoutRequested } from '../../Model';
import { WhatSlide1, WhatSlide2, WhatSlide3, WhatSlide4 } from './What';
import { WhatForSlide1, WhatForSlide2, WhatForSlide3, WhatForSlide4 } from './WhatFor';
import styled from 'styled-components';
import { HowSlide1, HowSlide20, HowSlide3, HowSlide5, HowSlide10, HowSlide7, HowSlide13, HowSlide9 } from './How';
import { BracketSlide10, BracketSlide20, BracketSlide30 } from './Bracket';


const BlackBack = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 25vmin;
    background: #000;
`


const PowerAlert = () => {
    return <svg version="1.1" width="100%" height="100%" viewBox={"0 0 24 24"}>
    <path
        fill="red"
        d="M13,14H11V9H13M13,18H11V16H13M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z" />
    </svg>
};

const PowerOff = () => {
    return (
        <BlackBack>
            <PowerAlert />
        </BlackBack>
    );
};


const Slides = ({ powered = true, number = 1, handleLogout = () => { } }) => {
    if (!powered) {
        return <PowerOff />
    } else {
        switch (number) {
            case 1: return <BracketSlide10 />
            case 2: return <WhatSlide1 />
            case 3: return <WhatSlide2 />
            case 4: return <WhatSlide3 />
            case 5: return <WhatSlide4 />
            case 6: return <WhatForSlide1 />
            case 7: return <WhatForSlide2 />
            case 8: return <WhatForSlide3 />
            case 9: return <WhatForSlide4 />
            case 10: return <HowSlide1 />
            case 11: return <HowSlide3 />
            case 12: return <HowSlide5 />
            case 13: return <HowSlide7 />
            case 14: return <HowSlide9 />
            case 15: return <HowSlide10 />
            case 16: return <HowSlide13 />
            case 17: return <HowSlide20 />
            case 18: return <BracketSlide20 />
            case 19: return <BracketSlide30 />
            default:
                return number < 1 ? <WhatSlide1 /> : <BracketSlide30 />
    }
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
