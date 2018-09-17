import React from 'react';
import styled, { keyframes } from 'styled-components';


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
        console.log("done rotating");
        this.setState({rotating: false});
    }

    render() {
        const {handlePress = () => {console.log("lanyard");}} = this.props;
        const clicker = () => {
            console.log("rotating");
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
                    fill="brown"
                    points="87,20 157,60 157,140 87,180 17,140 17,60 87,20"
                    onClick={clicker}
                    />
            </SvgRot>
        );

    }

};

// const LanyardButton = ({handlePress = () => {console.log("lanyard");}}) => {
// };

// const RotatableLanyardButton = styled(LanyardButton)`
//     animation: ${props => props.rotating ? }
// `



// componentDidMount() {
//     const elm = this.image;
//     elm.addEventListener("animationend", this.rotatingDone);
//   }
//   componentWillUnmount() {
//     const elm = this.image;
//     elm.removeEventListener("animationend", this.rotatingDone);
//   }

//   rotatingDone() {
//     this.setState(function(state) {
//       return {
//         toggle: !state.toggle,
//         rotate: false
//       };
//     });
//   }
//   render() {
//     const { rotate, toggle } = this.state;

//     return (
//       <img
//         src={
//           toggle
//             ? "https://video-react.js.org/assets/logo.png"
//             : "https://www.shareicon.net/data/128x128/2016/08/01/640324_logo_512x512.png"
//         }
//         ref={elm => {
//           this.image = elm;
//         }}
//         onClick={() => this.setState({ rotate: true })}
//         className={rotate ? "rotate" : ""}
//       />
//     );
//   }
// }





export {LanyardButton};
