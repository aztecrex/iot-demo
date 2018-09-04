import React from 'react';
import { Grid, Paper, withStyles, Typography } from '@material-ui/core';
import { ConnectedWheel } from '../Wheel';
import { ConnectedMatrix } from '../Matrix';

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


const Left_ = ({classes}) => {
    return (
        <Grid item sm={6}>
            <Paper  className={classes.paper}>
                <Typography variant="display3" className={classes.font}>
                    What is IoT?
                </Typography>
                <Typography variant="display1" className={classes.font}>
                    <ul>
                        <li>Device makers use the Internet to connect
                    everything</li>
                        <li>The difference (and not difference) between IoT devices
                            and your own computer</li>
                    </ul>
                </Typography>
            </Paper>
            <Paper  className={classes.paper}>
                <Typography variant="display3" className={classes.font}>
                    What is IoT for?
                </Typography>
                <Typography variant="display1" className={classes.font}>
                    <ul>
                        <li>Uses include health, safety, industry, recreation,
                        and convenience</li>
                        <li>What's next?</li>
                    </ul>
                </Typography>
            </Paper>
            <Paper  className={classes.paper}>
                <Typography variant="display3" className={classes.font}>
                    How does IoT Work?
                </Typography>
                <Typography variant="display1" className={classes.font}>
                    <ul>
                        <li>The technical bits and how they fit together</li>
                        <li>How to build your own IoT apps</li>
                    </ul>
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
                <ConnectedWheel dim="250" device="colorwheel_0" />
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
