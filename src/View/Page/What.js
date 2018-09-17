import React from 'react';
import { Ring0, Ring1 } from '../Wheel';
import { Column, Outer, FixedColumn, InnerTop,
         InnerCenter, Ul, Li, Title, Red, Section} from './SlideStyle'
import { Dim } from '../Dim';

const What = () => <Section>What IoT Is</Section>

const WhatSlide1 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <What />
                    <Title>Independent Inter-related <Red>Computing</Red> Machines</Title>
                    <Ul>
                        <Li>Network Connected</Li>
                        <Li>Uniquely Identified and Addressable</Li>
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

const WhatSlide2 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <What />
                    <Title>Specialized</Title>
                    <Ul>
                        <Li>Simple User Interface or <Red>No User Interface At All</Red></Li>
                        <Li><Red>Just Enough</Red> Computing Power</Li>
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

const WhatSlide3 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <What />
                    <Title>Infrastructure</Title>
                    <Ul>
                        <Li>Communication</Li>
                        <Li>Storage</Li>
                        <Li><Red>Security</Red></Li>
                        <Li>Management</Li>
                        <Li>Insights</Li>
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

const WhatSlide4 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <What />
                    <Title>Concerns</Title>
                    <Ul>
                        <Li><Red>Privacy</Red></Li>
                        <Li>Security</Li>
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



export { WhatSlide1, WhatSlide2, WhatSlide3, WhatSlide4 };
