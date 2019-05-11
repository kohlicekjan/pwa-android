import * as React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import { SvgIconProps } from '@material-ui/core/SvgIcon';

interface FeatureItemProps {
    icon: React.ReactNode,
    children?: React.ReactNode
}

export class FeatureItem extends React.Component<FeatureItemProps>  {
    render() {
        const { icon, children } = this.props;
        return (
            <Paper>
                <Grid container wrap="nowrap">
                    <Grid item>
                        <Avatar>{icon}</Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {children}
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}