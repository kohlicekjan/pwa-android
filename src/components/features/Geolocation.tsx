import * as React from "react";

import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import { FeatureItem } from "./FeatureItem";

export class Geoloacation extends React.Component {
    render() {
        return (
            <FeatureItem icon={<GpsNotFixedIcon/>}>

            </FeatureItem>
        );
    }
}