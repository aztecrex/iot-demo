import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';

import { evtLampPressed, wheelCoord, colors } from '../Model';

import {Dot} from './Dot';

const generatePoints = (count, dim, colors) => {

    const innerDim = dim * .70;
    const theta = (2 * Math.PI) / count;
    const radius = (Math.PI * innerDim * .9) / (count * 2)
    const cidx = idx => idx+"_";
    const combine = (m,{index,color}) => ({...m, [cidx(index)]:color});
    const colors_ = R.reduce(combine, {}, colors);
    return R.map(i => {
        const x = Math.cos(i * theta) * (innerDim/2) + (dim/2);
        const y = Math.sin(i * theta) * (innerDim/2) + (dim/2);
        const color = colors_[cidx(i)] || "off";
        const coord = {index: i};
        return {x,y,radius,color,coord}
    }, R.range(0, count));
};

const Wheel = ( {device, dim = 300,
                count = 16, colors = [{index: 3, color: "#FF3344"}],
                handleDotClicked}) => {
    const points = generatePoints(count, dim, colors);
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
        if (device === "Ring1") console.log(props);
        return props;
    },
    dispatch => ({handleDotClicked: coord => dispatch(evtLampPressed(coord))})
)(Wheel);


export {Wheel, ConnectedWheel};

