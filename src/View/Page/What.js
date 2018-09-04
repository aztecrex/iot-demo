import React from 'react';
import { ConnectedWheel } from '../Wheel';
import { Column, Outer, FixedColumn, InnerTop,
         InnerCenter, Ul, Li, Title, Red} from './SlideStyle'


const WhatSlide1 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <Title>Independent Inter-related <Red>Computing</Red> Machines</Title>
                    <Ul>
                        <Li>Uniquely Identified and Addressable</Li>
                        <Li>Network Connected</Li>
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

const WhatSlide2 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <Title>Specialized</Title>
                    <Ul>
                        <Li>Simple User Interface or No User Interface At All</Li>
                        <Li>Just Enough Computing Power</Li>
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

const WhatSlide3 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <Title>Infrastructure</Title>
                    <Ul>
                        <Li>Communication</Li>
                        <Li>Storage</Li>
                        <Li>Management</Li>
                        <Li>Insights</Li>
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

const WhatSlide4 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <Title>Concerns</Title>
                    <Ul>
                        <Li>Privacy</Li>
                        <Li>Security</Li>
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



export { WhatSlide1, WhatSlide2, WhatSlide3, WhatSlide4 };
