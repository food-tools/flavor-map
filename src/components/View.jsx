import * as React from "react";
import { Grid, Segment, Dimmer, Loader, Divider } from "semantic-ui-react";
//import { FlavorMap } from "../containers/FlavorMap";
import FlavorMapLayout from "../containers/FlavorMapLayout";
import { Title } from "./Title";
import Cuisines from "../containers/Cuisines";
import ColorEncodings from "../containers/ColorEncodings";
import Search from "../containers/Search";
import Ingredient from "../containers/Ingredient"
import * as Styles from "../assets/CustomStyles";
import { setSelectedNode } from "../actions/actions";

const View = ({ isFetchingGraph, isFetchingCuisines, selectedNode }) => (
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
                        <FlavorMapLayout />
                    )
                }
                <Search />
            </Grid.Column>
            <Grid.Column width={4}>
                <Grid.Row>
                    <Title />
                </Grid.Row>
                <Grid.Row>
                    <Segment basic>
                        {
                            isFetchingCuisines ?
                            (
                                  <Loader size="small" active inline="centered"></Loader>
                            )
                            :
                            (
                                <Cuisines />
                            )
                        }
                        <br />
                        {
                            isFetchingGraph ?
                            (
                                  <Loader size="small" active inline="centered"></Loader>
                            )
                            :
                            (
                                <ColorEncodings />
                            )
                        }
                        <br />
                        <Divider />
                        {
                            selectedNode ?
                            (
                                <Ingredient />
                            )
                            :
                            (
                                <span></span>
                            )
                        }
                    </Segment>
                </Grid.Row>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default View;
