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

const radiusFactor = .077;

const point = (count, dim) => {
    const innerDim = dim - dim * radiusFactor * 2.1
    console.log(dim, innerDim)
    const theta = (2 * Math.PI) / count;
    return i => {
        const x = Math.cos(i * theta) * (innerDim/2) + (dim/2);
        const y = Math.sin(i * theta) * (innerDim/2) + (dim/2);
      return  ({x,y});
    };

};

const generatePoints = (colors, dim) => {

    const coordOf = point(colors.length, dim)
    const coords = R.map(coordOf, R.range(0,colors.length));
    return R.zipWith ((color,coord) => ({...coord, color}), colors, coords);


};

const Dot = ({x,y,r = 30,color}) =>  {
    const colorOutside = luminance(color,-.5);

    const gid = x+"_"+y
    return (
        <React.Fragment>
        <defs>
            <radialGradient id={gid}>
                <stop offset="43%" stopColor={color}/>
                <stop offset="100%" stopColor={colorOutside}/>
            </radialGradient>

        </defs>
        <circle cx={x} cy={y} r={r} fill={"url(#" + gid + ")"} stroke="#cccccc" filter="url(#glow)"/>
        </React.Fragment>
    );

};

const ColorWheel = ( {dim = 300, colors = ["#000000", "#CC0000", "#0000DD", "#00EE00", "#FF0000", "#000000", "#CC0000", "#0000DD", "#00EE00", "#FF0000", "#000000", "#CC0000", "#0000DD", "#00EE00", "#FF0000", "#FF2299"]}) =>
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
       {R.map(p => <Dot key ={p.x + "" + p.y} x={p.x} y={p.y} color={p.color} r={radiusFactor*dim} />, generatePoints(colors, dim))}

    </svg>
</div>


export {ColorWheel};

