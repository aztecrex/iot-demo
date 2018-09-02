import React from 'react';
import './Dot.css';

// luminance function originally developed by Craig Buckler
// https://www.sitepoint.com/javascript-generate-lighter-darker-color/
const luminance = (hex, lum) => {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }

    return rgb;
};

const defaultColor = "#CCC";

const Dot = ({ coord, x, y, radius, color, handleClick }) => {
    const colorOutside = luminance(color, -.5);
    const gid = x + "_" + y
    const fill = (color === "off") ? defaultColor : "url(#" + gid + ")";
    return (
        <React.Fragment>
            <defs>
                <radialGradient id={gid}>
                    <stop offset="43%" stopColor={color} />
                    <stop offset="100%" stopColor={colorOutside} />
                </radialGradient>

            </defs>
            <circle cx={x} cy={y}
                r={radius}
                fill={fill} stroke={defaultColor} filter="url(#glow)"
                onClick={handleClick}
                className="DotClickable" />
        </React.Fragment>
    );

};

export { Dot };
