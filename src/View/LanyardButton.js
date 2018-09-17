import React from 'react';
import {connect} from 'react-redux';
import * as R from 'ramda';
import styled, { keyframes } from 'styled-components';
import { evtLanyardPressed } from '../Model';


const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const animation = rotating => {
    if (rotating) {
        return rotate360 + ' .75s';
    } else return 'none';
}

const SvgRot = styled.svg`
  animation: ${props => animation(props.rotating)};
`;

const ClickablePolyline = styled.polyline`
    cursor: pointer;
`;

const pt = (start, theta, radius, cx, cy) => {
    return i => {
        const alpha = start + (i*theta);
        const x = Math.cos(alpha) * radius + cx;
        const y = Math.sin(alpha) * radius + cy;
        return {x, y};
    };
};

const pline = points => {
    const pstrs = R.map(
            ({x,y}) => (`${x},${y}`),points);
    return pstrs.join(' ');

};

class LanyardButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rotating: false};
        this.doneRotating = this.doneRotating.bind(this);
    }

    componentDidMount() {
        this.pic.addEventListener("animationend", this.doneRotating);
    }

    componentWillUnmount() {
        this.pic.removeEventListener("animationend", this.doneRotating);
    }

    doneRotating() {
        this.setState({rotating: false});
    }



    render() {
        const {dim = 24, handlePress = () => {}} = this.props;
        const clicker = () => {
            this.setState({rotating: true});
            handlePress();
        };
        const theta = Math.PI/3;
        const start = Math.PI/2;
        const ro = dim / 2;
        const ri = (dim / 2) * .8;
        const cx = dim / 2;
        const cy = dim / 2;
        const pto = pt(start, theta, ro, cx, cy);
        const pti = pt(start, theta, ri, cx, cy);
        const outer = R.map(pto, R.range(0,6));
        const inner = R.map(pti, R.range(0,6));
        console.log(pline(outer));
        console.log(pline(inner));
        return (
            <SvgRot
                rotating = {this.state.rotating}
                innerRef={ elem => {this.pic = elem;} }
                version="1.1" width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} >
                    <ClickablePolyline
                        fill="gold"
                        points={pline(outer)}
                        onClick={clicker}/>
                    <ClickablePolyline
                    fill="#0000C0"
                    points={pline(inner)}
                    onClick={clicker}
                    />
            </SvgRot>
        );

    }

};


const ConnectedLanyardButton = connect(
    null,
    dispatch => ({
        handlePress: () => {dispatch(evtLanyardPressed());}
    })
    )(LanyardButton);


export {LanyardButton, ConnectedLanyardButton};
