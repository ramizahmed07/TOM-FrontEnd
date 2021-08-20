import { message } from "antd";
import _ from "lodash";

export const ErrorServices = (err: any) => {
    if (err.is_validation_error) {
        const errorFields = Object.keys(err.error);
        for (let idx = 0; idx < errorFields.length; idx++) {
            const fieldName = _.capitalize(errorFields[idx].replace('_', ' '));
            const errField = err.error[errorFields[idx]];
            errField.forEach((msg: string) => {
                message.error(`${fieldName}: ${msg}`);
            });
        }
    } else {
        message.error(err.message);
    }
}
