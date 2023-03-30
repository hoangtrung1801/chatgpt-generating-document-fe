import * as _ from "lodash";
const removeEmptyStrings = (obj) => {
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
        if (value && typeof value === "object") {
            value = removeEmptyStrings(value);
            if (!_.isEmpty(value)) {
                result[key] = value;
            }
        } else if (value !== "") {
            result[key] = value;
        }
    });
    return result;
};

export default removeEmptyStrings;
