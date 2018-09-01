import React from 'react';
import * as R from 'ramda';




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
        const color = colors_[cidx(row,col)] || "#444";
        return {x, y, color, radius};
    },R.range(0,cols)), R.range(0,rows)));
};

const Dot = ({x, y, color, radius}) => {
    return (
        <circle cx={x} cy={y} r={radius} fill={color} stroke="#cccccc" filter="url(#glow)"/>
    );
};

const Matrix = ({dim=600, rows=16, cols=16, colors = [{row:1,col:2,color:"#aaa333"}]}) => {
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
