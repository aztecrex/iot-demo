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
    const gradId = "grad" + color
    const glowId = "glow" + color
    if (color === "off") {
        return (
            <circle cx={x} cy={y}
                r={radius}
                fill={defaultColor} stroke={defaultColor} filter="url(#glow)"
                onClick={handleClick}
                className="DotClickable" />
        );

    } else {
        return (
            <React.Fragment>
                <defs>
                    <filter id={glowId} height="400%" width="400%" x="-75%" y="-75%">
                        <feMorphology operator="dilate" radius="4" in="SourceAlpha" result="thicken" />
                        <feGaussianBlur in="thicken" stdDeviation="10" result="blurred" />
                        <feFlood floodColor={color} result="glowColor" />
                        <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
                        <feMerge>
                            <feMergeNode in="softGlow_colored"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <radialGradient id={gradId}>
                        <stop offset="43%" stopColor={color} />
                        <stop offset="100%" stopColor={colorOutside} />
                    </radialGradient>

                </defs>
                <circle cx={x} cy={y}
                    r={radius}
                    fill={"url(#" + gradId + ")"} stroke="#333" filter={"url(#" + glowId +")"}
                    onClick={handleClick}
                    className="DotClickable" />
            </React.Fragment>
        );

    }

};

export { Dot };
