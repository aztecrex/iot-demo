import React from 'react';
import {connect} from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { evtLanyardPressed } from '../Model';


const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const animation = rotating => {
    if (rotating) {
        return rotate360 + ' .75s';
    } else return 'none';
}

const SvgRot = styled.svg`
  animation: ${props => animation(props.rotating)};
`;

const ClickablePolyline = styled.polyline`
    cursor: pointer;
`;

class LanyardButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rotating: false};
        this.doneRotating = this.doneRotating.bind(this);
    }

    componentDidMount() {
        this.pic.addEventListener("animationend", this.doneRotating);
    }

    componentWillUnmount() {
        this.pic.removeEventListener("animationend", this.doneRotating);
    }

    doneRotating() {
        this.setState({rotating: false});
    }

    render() {
        const {handlePress = () => {}} = this.props;
        const clicker = () => {
            this.setState({rotating: true});
            handlePress();
        };
        return (
            <SvgRot
                rotating = {this.state.rotating}
                innerRef={ elem => {this.pic = elem;} }
                version="1.1" width="100%" height="100%" viewBox="0 0 174 200" >
                    <ClickablePolyline
                        fill="gold"
                        points=" 87,0  174,50 174,150 87,200 0,150  0,50  87,0"
                        onClick={clicker}/>
                    <ClickablePolyline
                    fill="#0000C0"
                    points="87,20 157,60 157,140 87,180 17,140 17,60 87,20"
                    onClick={clicker}
                    />
            </SvgRot>
        );

    }

};


const ConnectedLanyardButton = connect(
    null,
    dispatch => ({
        handlePress: () => {dispatch(evtLanyardPressed());}
    })
    )(LanyardButton);


export {LanyardButton, ConnectedLanyardButton};
