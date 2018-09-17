import React from 'react';
import { Ring0, Ring1 } from '../Wheel';
import { Column, Outer, FixedColumn, InnerTop,
         InnerCenter, Ul, Li, Title, Section, Green} from './SlideStyle'
import { ConnectedLanyardButton } from '../LanyardButton';
import { Dim } from '../Dim';
import { GravityMatrix } from '../Matrix';


const General = () => <Section>IoT</Section>;


const BracketSlide10 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <General />
                    <Title>Definition of <Green>Awesome</Green></Title>
                    <Ul>
                        <Li>What IoT Is</Li>
                        <Li>What IoT Is For</Li>
                        <Li>How IoT Works</Li>
                        <Li>Building Your Own</Li>
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
                        <GravityMatrix />
                    </Dim>
                </InnerCenter>
            </Column>
        </Outer>
    );
};

const BracketSlide20 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <General />
                    <Title>Links</Title>
                    <Ul>
                    <   Li>This Presentation Source Code - http://bit.ly/iot-demo-source</Li>
                        <Li>Alexa + Raspberry PI - http://bit.ly/iot-demo-alexa-pi</Li>
                        <Li>DIY Plant Monitor using Particle and IFTTT - http://bit.ly/iot-demo-plant-monitor</Li>
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

const BracketSlide30 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <General />
                    <Title>Did We Cover It All?</Title>
                    <Ul>
                        <Li>What IoT Is</Li>
                        <Li>What IoT Is For</Li>
                        <Li>How IoT Works</Li>
                        <Li>Building Your Own</Li>
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
                        <GravityMatrix />
                    </Dim>
                </InnerCenter>
            </Column>
        </Outer>
    );
};





export { BracketSlide10, BracketSlide20, BracketSlide30};
