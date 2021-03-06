import React from 'react';
import { Ring0, Ring1 } from '../Wheel';
import { Column, Outer, FixedColumn, InnerTop,
         InnerCenter, Ul, Li, Title, P, Section, Green, SpaceAge} from './SlideStyle'
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


const WhatFor = () => <Section>What IoT Is For</Section>;

const WhatForSlide1 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <WhatFor />
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
                    <WhatFor />
                    <Title>Devices That <Green>Sense and Communicate</Green></Title>
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
                    <Dim factor={.3}>
                        <Ring0 />
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
                    <WhatFor />
                    <Title>Devices That <Green>Take Action</Green></Title>
                    <Ul>
                        <Li>Energy - Smart Environment</Li>
                        <Li>Home - Remote Appliance Control</Li>
                        <Li>Security - Perimiter Access Control</Li>
                        <Li>Security - Remote Disable</Li>
                        <Li>Safety - Emergency Shutoff</Li>
                        <Li>Health Care - Medicine Dosage</Li>
                        <Li>Agriculture - Irrigation</Li>
                        <Li>Entertainment - Aerial Displays</Li>
                    </Ul>
                </InnerTop>
            </FixedColumn>
            <Column>
                <InnerCenter>
                    <Dim><ConnectedLanyardButton /></Dim>
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
                    <WhatFor />
                    <Title>IoT In <SpaceAge>The Future</SpaceAge></Title>
                    <Ul>
                        <Li>Agriculture - Smart Farms/Greenhouses/Hydroponics</Li>
                        <Li>Health - Ingestibles</Li>
                        <Li>Logistics - Smart Trash Cans</Li>
                        <Li>Safety - Structural Health</Li>
                        <Li>Energy - Smart Street Lamps</Li>
                        <Li>Convenience - Parking Lot Occupancy</Li>
                        <Li><Green>What Would You Build?</Green></Li>
                    </Ul>
                </InnerTop>
            </FixedColumn>
            <Column>
            <InnerCenter>
                    <Dim factor={.3}><Ring0 /></Dim>
                </InnerCenter>
                <InnerCenter>
                    <Dim><Ring1/></Dim>
                </InnerCenter>
            </Column>
        </Outer>
    );
};





export { WhatForSlide1, WhatForSlide2, WhatForSlide3, WhatForSlide4 };
