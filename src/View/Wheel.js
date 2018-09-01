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

const generatePoints = (count, dim, colors) => {

    const innerDim = dim * .81;
    const theta = (2 * Math.PI) / count;
    const radius = (Math.PI * innerDim * .9) / (count * 2)
    const cidx = idx => idx+"_";
    const combine = (m,{index,color}) => ({...m, [cidx(index)]:color});
    const colors_ = R.reduce(combine, {}, colors);
    return R.map(i => {
        const x = Math.cos(i * theta) * (innerDim/2) + (dim/2);
        const y = Math.sin(i * theta) * (innerDim/2) + (dim/2);
        const color = colors_[cidx(i)] || "off";
        return {x,y,radius,color}
    }, R.range(0, count));
};

const Dot = ({x, y, radius, color}) =>  {
    const colorOutside = luminance(color,-.5);
    const gid = x+"_"+y
    const fill = (color === "off") ? "#666" : "url(#" + gid + ")";
    return (
        <React.Fragment>
        <defs>
            <radialGradient id={gid}>
                <stop offset="43%" stopColor={color}/>
                <stop offset="100%" stopColor={colorOutside}/>
            </radialGradient>

        </defs>
        <circle cx={x} cy={y} r={radius} fill={fill} stroke="#cccccc" filter="url(#glow)"/>
        </React.Fragment>
    );

};

const Wheel = ( {dim = 300, count = 16, colors = [{index: 3, color: "#FF3344"}] }) => {
    const points = generatePoints(count, dim, colors);
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
            {R.map(p => <Dot key ={p.x + "_" + p.y} x={p.x} y={p.y} color={p.color} radius={p.radius} />, points)}

            </svg>
        </div>
    );
};

export {Wheel};

