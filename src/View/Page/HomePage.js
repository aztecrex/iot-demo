import React from 'react';
import { Grid, Paper, withStyles, Typography } from '@material-ui/core';
import { Ring0 } from '../Wheel';
import { ConnectedMatrix } from '../Matrix';
import { Blue, Green, Red } from './SlideStyle';
import styled from 'styled-components';

const styles = theme => ({
    root: {
      flexGrow: 1,
      margin: theme.spacing.unit * 4
    },
    paper: {
      margin: theme.spacing.unit * 4,
      padding: theme.spacing.unit * 6,
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    device: {
        paddingTop: 125,
        paddingBottom: 125,
        textAlign: "center"
    },
    font: {
               fontFamily: ["Permanent Marker"]
    }
  });

const UL = styled.ul`
    list-style: none;
`
const LI = styled.li`
    text-indent: -1em;
    &:before {
        content: '- ';
    }
`

const Left_ = ({classes}) => {
    return (
        <Grid item sm={6}>
            <Paper  className={classes.paper}>
                <Typography variant="display3" className={classes.font}>
                    What <Blue>Is</Blue> IoT?
                </Typography>
                <Typography variant="display1" className={classes.font}>
                    <UL>
                        <LI>Device makers use the Internet to connect
                    everything</LI>
                        <LI>The difference (and not difference) between IoT devices
                            and your own computer</LI>
                    </UL>
                </Typography>
            </Paper>
            <Paper  className={classes.paper}>
                <Typography variant="display3" className={classes.font}>
                    What Is IoT <Green>For?</Green>
                </Typography>
                <Typography variant="display1" className={classes.font}>
                    <UL>
                        <LI>Uses include health, safety, industry, recreation,
                        and convenience</LI>
                        <LI>What's next?</LI>
                    </UL>
                </Typography>
            </Paper>
            <Paper  className={classes.paper}>
                <Typography variant="display3" className={classes.font}>
                    How does IoT <Red>Work?</Red>
                </Typography>
                <Typography variant="display1" className={classes.font}>
                    <UL>
                        <LI>The technical bits and how they fit together</LI>
                        <LI>How to build your own IoT apps</LI>
                    </UL>
                </Typography>
            </Paper>
        </Grid>
    );
};
const Left = withStyles(styles)(Left_);

const Right_ = ({classes}) => {
    return (
        <Grid item sm>
            <Paper className={classes.device + ' ' + classes.paper}>
                <Ring0 />
            </Paper>
            <Paper className={classes.device + ' ' + classes.paper}>
                <ConnectedMatrix dim="250" device="matrix_0" />
            </Paper>
        </Grid>
    );
};
const Right = withStyles(styles)(Right_);

const HomePage_ = ({classes, pagenumber}) => {

    return (
        <div className={classes.root} >
            <Grid container spacing={0}>
                <Left />
                <Right />
            </Grid>
        </div>
    );

};

const HomePage = withStyles(styles)(HomePage_);

export {HomePage};
