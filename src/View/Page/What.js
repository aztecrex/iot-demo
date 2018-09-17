import React from 'react';
import { Ring0, Ring1 } from '../Wheel';
import { Column, Outer, FixedColumn, InnerTop,
         InnerCenter, Ul, Li, Title, Red, Section} from './SlideStyle'
import { Dim } from '../Dim';


const WhatSlide1 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <Section>What</Section>
                    <Title>Independent Inter-related <Red>Computing</Red> Machines</Title>
                    <Ul>
                        <Li>Network Connected</Li>
                        <Li>Uniquely Identified and Addressable</Li>
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
                    <Dim><Ring0 /></Dim>
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
                    <Dim><Ring0 /></Dim>
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
                    <Title>Concerns</Title>
                    <Ul>
                        <Li>Privacy</Li>
                        <Li>Security</Li>
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



export { WhatSlide1, WhatSlide2, WhatSlide3, WhatSlide4 };
