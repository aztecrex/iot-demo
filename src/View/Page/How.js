import React from 'react';
import { Ring0, Ring1 } from '../Wheel';
import { Column, Outer, FixedColumn, InnerTop,
         InnerCenter, Ul, Li, Title, Section, Green, Blue} from './SlideStyle'
import { ConnectedLanyardButton } from '../LanyardButton';
import { Dim } from '../Dim';
import { GravityMatrix } from '../Matrix';


const How = () => <Section>What IoT Is For</Section>;

const HowSlide1 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <How />
                    <Title><Blue>Sensors</Blue>, <Blue>Actuators</Blue>, And <Blue>Computer</Blue> + <Green>Power</Green> And <Green>Network</Green></Title>
                    <Ul>
                        <Li>Sensors - Monitor the environment</Li>
                        <Li>Actuators - Change the environment</Li>
                        <Li>Computer - Microcontroller or Microprocessor</Li>
                        <Li>Power - Battery or Commercial</Li>
                        <Li>Network - Direct, Proxy/Mesh, or Store & Forward</Li>
                        <Li>This Presentation:
                            <Ul>
                                <Li>Sensors - light switch, accelerometer, game pad</Li>
                                <Li>Actuators - RGB lights</Li>
                                <Li>Computer - ESP32 MCU, Raspberry Pi</Li>
                                <Li>Power - Rechargable and Alkaline Batteries, USB connector</Li>
                                <Li>Network - Direct using WiFi</Li>
                            </Ul>
                        </Li>
                        <Li>
                            Raspberry Pi is easy to program and works great for IoT projects
                        </Li>
                        <Li>
                            Arduino with a networking shield is also easy to use
                        </Li>
                        <Li>
                            ESP32 is maybe a little harder to use but can be put into very small projects
                        </Li>
                        <Li>Most anything electrical can be used as a sensor or
                            actuator - let your imagination run free
                        </Li>
                        <Li>
                            AWS IoT Button - Just a button that sends messages over
                            WiFi, what could be simpler?
                        </Li>
                        <Li>
                            Check out Adafruit and other electronics hobbyist stores for
                            kits and components
                        </Li>
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

const HowSlide2 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <How />
                    <Title>Communication and Orchestration</Title>
                    <Ul>
                        <Li>Communication - Route messages between devices and
                        centralized coordination systems</Li>
                        <Li>Orchestration - Coordinate related devices to produce
                            complex behaviors
                        </Li>
                        <Li>This presentation:
                            <Ul>
                                <Li>Communication - AWS IoT MQTT</Li>
                                <Li>Orchestration - AWS Lambda and AWS IoT Thing Shadows</Li>
                            </Ul>
                        </Li>
                        <Li>All major cloud providers have offerings
                            for IoT and ephemeral computing; e.g. AWS:
                            <Ul>
                                <Li>IoT Core - Thing Shadows and Publish/Subscribe Topics</Li>
                                <Li>Lambda Functions - Run Javascript/Python/Java/Go in the
                                    cloud without servers
                                </Li>
                            </Ul>
                        </Li>
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

const HowSlide20 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <How />
                    <Title>Monitoring, Control, and Analysis</Title>
                    <Ul>
                        <Li>Monitoring - Realtime dashboards summarizing the status of devices</Li>
                        <Li>Control - Initiate device behaviors</Li>
                        <Li>Analysis - Process device data to provide reports and graphs over
                            time; and to use as training data for machine learning
                        </Li>
                        <Li>This presentation:
                            <Ul>
                                <Li>Monitoring - Web app views</Li>
                                <Li>Control - Web app buttons</Li>
                            </Ul>
                        </Li>
                        <Li>Devices can monitor other devices</Li>
                        <Li>What could you do with If-this-then-that?</Li>
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


const HowSlide30 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <How />
                    <Title>Make Your Own</Title>
                    <Ul>
                        <Li>Raspberry Pi is really flexible and easy to program</Li>
                        <Li>A Network MCU module like the ESP32 has lots of great features,
                            WiFi built in. Developer kits easy to find.
                        </Li>
                        <Li>AWS IoT Button - A button with wifi, what could be simpler?</Li>
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

const HowSlide40 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <How />
                    <Title>Links</Title>
                    <Ul>
                        <Li>Alexa + Raspberry PI - https://www.youtube.com/watch?v=-rB4b7DbRlk</Li>
                        <Li>This Presentation Source Code - https://github.com/aztecrex/iot-demo</Li>
                        <Li>DIY Plant Monitor using Particle and IFTTT - https://www.youtube.com/watch?v=URv7bfEuxDg</Li>
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





export { HowSlide1, HowSlide2, HowSlide20, HowSlide30, HowSlide40};
