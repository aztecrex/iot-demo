import React from 'react';
import { Ring1 } from '../Wheel';
import { Column, Outer, FixedColumn, InnerTop,
         InnerCenter, Ul, Li, Title, Section, Green, Blue, Red, P} from './SlideStyle'
import { ConnectedLanyardButton } from '../LanyardButton';
import { Dim } from '../Dim';
import { GravityMatrix } from '../Matrix';


const How = () => <Section>How IoT Works</Section>;

const HowSlide1 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <How />
                    <Title><Blue>Sensors</Blue> & <Blue>Actuators</Blue></Title>
                    <Ul>
                        <Li>Sensors - Monitor the environment</Li>
                        <Li>Actuators - Change the environment</Li>
                        <Li>This Presentation:
                            <Ul>
                                <Li>Sensors - light switch, accelerometer, game pad</Li>
                                <Li>Actuators - RGB lights</Li>
                            </Ul>
                        </Li>
                        <Li>Most anything electrical can be used as a sensor or
                            actuator - let your imagination run free
                        </Li>
                        <Li>
                            Check out Adafruit, SparkFun and other electronics maker stores for
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

const HowSlide3 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <How />
                    <Title><Red>Computer</Red></Title>
                    <Ul>
                        <Li>Microcontroller or Microprocessor</Li>
                        <Li>This Presentation:
                            <Ul>
                                <Li>ESP32 MCU</Li>
                                <Li>Raspberry Pi</Li>
                            </Ul>
                        </Li>
                        <Li>
                            Raspberry Pi is easy to program and works great for IoT projects
                        </Li>
                        <Li>
                            Arduino is also easy to use
                        </Li>
                        <Li>
                            ESP32 is maybe a little harder to use but can be put into very small projects
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

const HowSlide5 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <How />
                    <Title><Green>Power</Green></Title>
                    <P>Can use battery or commercial power</P>
                    <Ul>
                        <Li>This Presentation:
                            <Ul>
                                <Li>Rechargable and Alkaline Batteries</Li>
                                <Li>USB Connector</Li>
                            </Ul>
                        </Li>
                        <Li>Don't use battery unless it has to be portable</Li>
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

const HowSlide7 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <How />
                    <Title><Green>Network</Green></Title>
                    <Ul>
                        <Li>Direct, Proxy/Mesh, or Store & Forward</Li>
                        <Li>This Presentation:
                            <Ul>
                                <Li>Direct using WiFi built-in to
                                    ESP32 and Raspberry Pi
                                </Li>
                                <Li>Game controller proxy
                                </Li>
                            </Ul>
                        </Li>
                        <Li>Computer with built-in networking is good first choice</Li>
                        <Li>Arduino and other maker platforms have networking
                            accessories
                        </Li>
                        <Li>
                            Proxy is often easiest
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

const HowSlide9 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <How />
                    <Title>AWS IoT Button</Title>
                    <P>
                        Completely self-contained device with battery,
                        button sensor, and network. Send clicks, double-clicks,
                        and long-clicks over WiFi. What could be simpler?
                    </P>
                    <Ul>
                        <Li>Just configure and go</Li>
                        <Li>Comes with built-in behaviors or make your own</Li>
                        <Li>LTE version available</Li>
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


const HowSlide10 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <How />
                    <Title>Communication</Title>
                    <P>Route messages between devices and
                        centralized coordination systems</P>
                    <Ul>
                        <Li>This presentation:
                            <Ul>
                                <Li>MQTT & MQTT over WebSocket</Li>
                                <Li>REST</Li>
                            </Ul>
                        </Li>
                        <Li>All major cloud providers have offerings
                            for IoT; e.g. AWS:
                            <Ul>
                                <Li>IoT Core - MQTT Publish/Subscribe Topics</Li>
                                <Li>IoT Core - REST API</Li>
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

const HowSlide13 = () => {
    return (
        <Outer>
            <FixedColumn>
                <InnerTop>
                    <How />
                    <Title><Red>Orchestration</Red></Title>
                    <P>
                    Coordinate related devices to produce complex
                    behaviors.
                    </P>
                    <Ul>
                        <Li>This presentation:
                            <Ul>
                                <Li>AWS Lambda - ephemeral computing</Li>
                                <Li>AWS Thing Shadows - keep track of device status</Li>
                            </Ul>
                        </Li>
                        <Li>All major cloud providers have offerings
                            for IoT and ephemeral computing; e.g. AWS:
                            <Ul>
                                <Li>IoT Core - Thing Shadows</Li>
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
                    <Title>Monitoring, <Blue>Control</Blue>, and Analysis</Title>
                    <Ul>
                        <Li>Monitoring - Realtime dashboards summarizing the status of devices</Li>
                        <Li>Control - Initiate device behaviors</Li>
                        <Li>Analysis - Reports and graphs over
                            time; training data for machine learning
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


export { HowSlide1, HowSlide3,HowSlide5,HowSlide7, HowSlide9, HowSlide10, HowSlide13, HowSlide20};
