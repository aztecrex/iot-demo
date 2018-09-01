import React from 'react';
import * as R from 'ramda';

import {Dot} from './Dot';

const generatePoints = (dim, rows, cols, colors) => {
    const insideDim = dim * .9;
    const pitch = insideDim / (Math.max(rows,cols));
    const radius = (pitch * .9) / 2;
    const offset = (dim - insideDim) / 2 + pitch / 2;
    const cidx = (r,c) => r+"_"+c;
    const upd = (m,{row,col,color}) => ({...m, [cidx(row,col)]: color});
    const colors_ = R.reduce(upd,{},colors);
    return R.flatten(R.map(row => R.map(col => {
        const x = col * pitch + offset;
        const y = row * pitch + offset;
        const color = colors_[cidx(row,col)] || "off";
        return {x, y, color, radius};
    },R.range(0,cols)), R.range(0,rows)));
};

const Matrix = ({dim=300, rows=8, cols=8, colors = [{row:1,col:2,color:"#aaa333"}, {row:6,col:4,color:"#FF5555"}]}) => {
    const points = generatePoints(dim, rows, cols, colors);
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
        {R.map(p => {
            console.log(JSON.stringify(p));
            return <Dot key={p.x + "" + p.y} x={p.x} y={p.y} color={p.color} radius={p.radius} />
            }, points)}
        </svg>
    </div>);
};

export {Matrix};
