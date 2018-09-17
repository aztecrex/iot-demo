import React from 'react';

/*
adds "dim" attribute to child, scaling it
to the minimum of screen height and width. "factor"
attribute sets the scale.
*/
class Dim extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sdim: 0 };
        this.updateSDim = this.updateSDim.bind(this);
    }

    updateSDim() {
        this.setState({ sdim: Math.min(window.innerHeight, window.innerWidth) });
    }

    componentDidMount() {
        this.updateSDim();
        window.addEventListener('resize', this.updateSDim);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSDim);
    }

    render() {
        const {children, factor=.4} = this.props;
        const dim = this.state.sdim * factor;
        return (
            <React.Fragment>
                {React.cloneElement(children,{ dim })}
            </React.Fragment>
        );
    }
}

export {Dim};
