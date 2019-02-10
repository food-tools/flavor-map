import * as React from "react";
import { Grid } from "semantic-ui-react";
import { Controls } from "../containers/Controls";
import { Map } from "../containers/Map";
import * as Styles from "../assets/CustomStyles";

export const View = () => (
    <Grid celled="internally" className={Styles.View}>
        <Grid.Row>
            <Grid.Column width={12}>
                <Map />
            </Grid.Column>
            <Grid.Column width={4}>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);
