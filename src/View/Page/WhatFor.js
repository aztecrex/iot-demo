import React from 'react';
import { Ring0, Ring1 } from '../Wheel';
import { Column, Outer, FixedColumn, InnerTop,
         InnerCenter, Ul, Li, Title, P} from './SlideStyle'
import CokeMachineImg from '../../images/internet-coke-machine.png'
import CokeTerminalImg from '../../images/coke-terminal.png';
import PDP10Img from '../../images/dec-pdp-10.jpg';
import { ConnectedLanyardButton } from '../LanyardButton';
import { Dim } from '../Dim';

const Image = ({src, alt, hp}) => {
    hp = hp || 30;
    const h = (hp / 100) * window.innerHeight;
    return <img width="auto" height={h} src={src} alt={alt} />
};


const CokeMachine = () => {
    return <Image hp={30} alt="CMU Internet Coke Machine" src={CokeMachineImg} />;
};

const CokeTerminal = () => {
    return <Image hp={20} alt="finger coke@cmua" src={CokeTerminalImg} />;
};

const PDP10 = () => {
    return <Image hp={30} alt="DEC PDP-5" src={PDP10Img} />;
};


const WhatForSlide1 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <Title>1982 - Internet Coke Machine</Title>
                    <P>
                        Remotely determine if Coke in the machine is cold and what
                        button to press to get the coldest Coke.
                    </P>
                </InnerTop>
            </FixedColumn>
            <Column>
                <InnerCenter>
                    <CokeMachine />
                </InnerCenter>
                <InnerCenter>
                    <CokeTerminal />
                </InnerCenter>
                <InnerCenter>
                    <PDP10 />
                </InnerCenter>
            </Column>
        </Outer>
    );
};





const WhatForSlide2 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <Title>Devices That Sense and Communicate</Title>
                    <Ul>
                        <Li>Health Care - Telehealth</Li>
                        <Li>Health Care - Hospital Bed Monitoring</Li>
                        <Li>Aviation - Engine Diagnostics</Li>
                        <Li>Safety - Chemical Leaks</Li>
                        <Li>Automotive - Congestion Monitoring</Li>
                        <Li>Automotive - Diagnostics</Li>
                        <Li>Security - Asset Location</Li>
                        <Li>Convenience - NFC Payments</Li>
                    </Ul>
                </InnerTop>
            </FixedColumn>
            <Column>
                <InnerCenter>
                    <Dim>
                        <ConnectedLanyardButton />
                    </Dim>
                </InnerCenter>
                <InnerCenter>
                    <Dim >
                        <Ring1 />
                    </Dim>
                </InnerCenter>
            </Column>
        </Outer>
    );
};

const WhatForSlide3 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <Title>Devices That Take Action</Title>
                    <Ul>
                        <Li>Security - Perimiter Access Control</Li>
                        <Li>Energy - Smart Environment</Li>
                        <Li>Home - Remote Appliance Control</Li>
                    </Ul>
                </InnerTop>
            </FixedColumn>
            <Column>
            <InnerCenter>
                    <Dim><Ring0 /></Dim>
                </InnerCenter>
                <InnerCenter>
                    <Dim><Ring1/></Dim>
                </InnerCenter>
            </Column>
        </Outer>
    );
};

const WhatForSlide4 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <Title>Future</Title>
                    <Ul>
                        <Li>Health - Ingestibles</Li>
                        <Li>What Would You Build?</Li>
                    </Ul>
                </InnerTop>
            </FixedColumn>
            <Column>
            <InnerCenter>
                    <Dim><Ring0 /></Dim>
                </InnerCenter>
                <InnerCenter>
                    <Dim><Ring1/></Dim>
                </InnerCenter>
            </Column>
        </Outer>
    );
};





export { WhatForSlide1, WhatForSlide2, WhatForSlide3, WhatForSlide4 };
