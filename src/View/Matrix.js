import React from 'react';
import * as R from 'ramda';

// luminance function originally developed by Craig Buckler
// https://www.sitepoint.com/javascript-generate-lighter-darker-color/
const luminance = (hex, lum) => {
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
};

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

const Dot = ({x, y, color, radius}) => {
    const colorOutside = luminance(color,-.5);
    const gid = x+"_"+y
    const fill = (color === "off") ? "#666" : "url(#" + gid + ")"
    return (
        <React.Fragment>
        <defs>
            <radialGradient id={gid}>
                <stop offset="43%" stopColor={color}/>
                <stop offset="100%" stopColor={colorOutside}/>
            </radialGradient>

        </defs>
        <circle cx={x} cy={y} r={radius} fill={fill} stroke="#666" filter="url(#glow)"/>
    </React.Fragment>
    );


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
