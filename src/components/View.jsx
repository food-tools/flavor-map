import * as React from "react";
import { Grid, Dimmer, Loader } from "semantic-ui-react";
import { FlavorMap } from "../containers/FlavorMap";
import { Title } from "./Title";
import { Cuisines } from "../containers/Cuisines";
import { ColorEncodings } from "../containers/ColorEncodings";
import * as Styles from "../assets/CustomStyles";

export const View = ({ isFetchingGraph, isFetchingCuisines }) => (
    <Grid celled="internally" className={Styles.View}>
        <Grid.Row>
            <Grid.Column width={12} className={Styles.NoPadding}>
                {
                    isFetchingGraph ?
                    (
                        <Dimmer active inverted>
                          <Loader size="large"></Loader>
                        </Dimmer>
                    )
                    :
                    (
                        <FlavorMap />
                    )
                }
            </Grid.Column>
            <Grid.Column width={4}>
                <Grid.Row>
                    <Title />
                </Grid.Row>
                <Grid.Row>
                    {
                        isFetchingCuisines ?
                        (
                              <Loader size="large"></Loader>
                        )
                        :
                        (
                            <div>
                                <Cuisines />
                                <br />
                                <ColorEncodings />
                            </div>
                        )
                    }
                </Grid.Row>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);
