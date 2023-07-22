import * as Yup from "yup";

export const schema_confirm_password = Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], "passwords_must_match");

export const schema_confirm_new_password = Yup.string()
    .trim()
    .oneOf([Yup.ref("new_password"), null], "passwords_must_match");

export const schema_textarea_required = Yup.string()
    .trim()
    .required("field_is_a_required_field")
    .nullable();

export const schema_string_no_length_required = Yup.string()
    .trim()
    .required("field_is_a_required_field")
    .nullable(true);

export const schema_string = Yup.string()
    .trim()
    .min(1, "field is a required field")
    .max(256, "maximum character is256");

export const schema_number_required = Yup.number()
    .required("field_is_a_required_field")
    .typeError("field_is_a_required_field")
    .min(0, "field_must_be_greater_than_or_equal_to_0")
    .nullable(true)
    .transform((_, val: number) => {
        return val === Number(val) ? val : null;
    });

export const schema_number = Yup.number()
    .typeError("field_is_a_required_field")
    .min(0, "field_must_be_greater_than_or_equal_to_0")
    .nullable(true)
    .transform((_, val: number) => {
        return val === Number(val) ? val : null;
    });

export const schema_last_name_required = Yup.string()
    .trim()
    .required("field_is_a_required_field")
    .max(256, "maximum_character_is256");

export const schema_first_name_required = Yup.string()
    .trim()
    .max(256, "maximum_character_is256")
    .required("field_is_a_required_field");

export const schema_pin_required = Yup.string()
    .trim()
    .max(256, "maximum_character_is256")
    .required("field_is_a_required_field")
    .test(
        "len",
        "the_verification_code_is_not_correct",
        (val) => val?.length === 6
    );

export const schema_array_select_option_required = Yup.array()
    .min(1, "field_is_a_required_field")
    .of(
        Yup.object().shape({
            label: Yup.string().required("field_is_a_required_field"),
            value: Yup.string().required("field_is_a_required_field"),
        })
    );

export const schema_array_string_required = Yup.array()
    .min(1, "field is a required field")
    .of(
        Yup.string()
            .required("field is a required field")
            .min(1, "field is a required field")
    );
