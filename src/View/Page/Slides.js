import React from 'react';
import { connect } from 'react-redux';
import { isPowered, getSlideNumber, evtLogoutRequested } from '../../Model';
import styled from 'styled-components';
import { ConnectedWheel } from '../Wheel';


const Outer = styled.div`
    display: flex;
    flex-direction: row;
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex-grow: 2;
`
const Right = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex-grow: 1;
`

const Inner = styled.div`
    display: inline-block;
    margin: auto;
`

const Title = styled.h1`
    font-size: 2.9vw;
`
const Li = styled.li`
    font-size: 1.5vw;
`


const Slides = ({powered=true, number = 1, handleLogout = () => {}}) => {
    return (
        // {number}
        // <button onClick={handleLogout}>Logout</button>
        <Outer>
            <Left>
                <Inner>
                    <Title>This should be in the center</Title>
                    <ol>
                        <Li>Line 1</Li>
                        <Li>Line 2 is a bit longer</Li>
                        <Li>Line 3 is like a paragraph of stuff how can this be even possible?Line 3 is like a paragraph of stuff how can this be even possible?Line 3 is like a paragraph of stuff how can this be even possible?Line 3 is like a paragraph of stuff how can this be even possible?Line 3 is like a paragraph of stuff how can this be even possible?Line 3 is like a paragraph of stuff how can this be even possible?Line 3 is like a paragraph of stuff how can this be even possible?</Li>
                        <Li>Line 1</Li>
                        <Li>Line 2 is a bit longer</Li>
                        <Li>Line 3 is like a paragraph of stuff how can this be even possible?</Li>
                        <Li>Line 1</Li>
                        <Li>Line 2 is a bit longer</Li>
                        <Li>Line 3 is like a paragraph of stuff how can this be even possible?</Li>
                        <Li>Line 1</Li>
                        <Li>Line 2 is a bit longer</Li>
                        <Li>Line 3 is like a paragraph of stuff how can this be even possible?</Li>
                    </ol>
                </Inner>
            </Left>
            <Right>
                <Inner>
                    <ConnectedWheel device="colorwheel_9" />
                </Inner>
                <Inner>
                    <ConnectedWheel device="colorwheel_9" />
                </Inner>
            </Right>
        </Outer>

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
