import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';

import { evtLampPressed, wheelCoord, colors } from '../Model';

import {Dot} from './Dot';

const generatePoints = (count, dim, colors, clockwise) => {

    const innerDim = dim * .70;
    const theta = (2 * Math.PI) / count;
    const radius = (Math.PI * innerDim * .9) / (count * 2)
    const cidx = idx => idx+"_";
    const combine = (m,{index,color}) => ({...m, [cidx(index)]:color});
    const colors_ = R.reduce(combine, {}, colors);

    return R.map(i => {
        const pos = clockwise ? i : (count - i - 1);
        const x = Math.cos(i * theta) * (innerDim/2) + (dim/2);
        const y = Math.sin(i * theta) * (innerDim/2) + (dim/2);
        const color = colors_[cidx(pos)] || "off";
        const coord = {index: pos};
        return {x,y,radius,color,coord}
    }, R.range(0, count));
};

const Wheel = ( {device, dim = 100,
                count = 16, colors = [],
                handleDotClicked},
                clockwise=true) => {
    const points = generatePoints(count, dim, colors, clockwise);
    const hclick = coord => handleDotClicked(wheelCoord(device, coord.index));
    return (
        <div>
            <svg width={dim} height={dim} >
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
            {R.map(p => <Dot
                key={p.x + "_" + p.y}
                x={p.x} y={p.y} color={p.color} radius={p.radius}
                handleClick={() => hclick(p.coord)}
                />, points)}

            </svg>
        </div>
    );
};

const ConnectedWheel = connect(
    (state,{device}) => {
        const props = {colors: colors(state, device)};
        return props;
    },
    dispatch => ({handleDotClicked: coord => dispatch(evtLampPressed(coord))})
)(Wheel);


const Ring0 = ({dim}) => <ConnectedWheel dim={dim} device="Ring0" count={12} />;
const Ring1 = ({dim}) => <ConnectedWheel dim={dim} device="Ring1" count={16} clockwise={false} />;

export {Wheel, Ring0, Ring1};

