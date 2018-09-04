import React from 'react';
import { ConnectedWheel } from '../Wheel';
import { Column, Outer, FixedColumn, InnerTop,
         InnerCenter, Ul, Li, Title} from './SlideStyle'


const WhatForSlide1 = () => {
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
                    <ConnectedWheel device="colorwheel_9" />
                </InnerCenter>
                <InnerCenter>
                    <ConnectedWheel device="colorwheel_9" />
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
                    <ConnectedWheel device="colorwheel_9" />
                </InnerCenter>
                <InnerCenter>
                    <ConnectedWheel device="colorwheel_9" />
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
                    <Title>Future</Title>
                    <Ul>
                        <Li>Health - Ingestibles</Li>
                        <Li>WhatFor Would You Build?</Li>
                    </Ul>
                </InnerTop>
            </FixedColumn>
            <Column>
                <InnerCenter>
                    <ConnectedWheel device="colorwheel_9" />
                </InnerCenter>
                <InnerCenter>
                    <ConnectedWheel device="colorwheel_9" />
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
                    <ConnectedWheel device="colorwheel_9" />
                </InnerCenter>
                <InnerCenter>
                    <ConnectedWheel device="colorwheel_9" />
                </InnerCenter>
            </Column>
        </Outer>
    );
};




export { WhatForSlide1, WhatForSlide2, WhatForSlide3, WhatForSlide4 };
