import React from "react";
import { EvdesignServiceConsumer } from "../evdesign-service-context";

const withEvdesignService = mapMethodsToProps => Wrapped => {
    return props => {
        return (
            <EvdesignServiceConsumer>
                {
                    evdesignService => {
                        return <Wrapped {...props} evdesignService={evdesignService} />;
                    }
                }
            </EvdesignServiceConsumer>
        );
    };
};

export default withEvdesignService;
