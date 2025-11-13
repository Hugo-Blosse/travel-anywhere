import {Alert, Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import React from "react";
import z, {TypeOf, undefined} from "zod";
import {Formik} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(40, "Max 40 characters"),
    lastName: z.string().min(1, "Last name is required").max(40, "Max 40 characters"),
    birthDate: z.preprocess(
        (val) => val ? new Date(val as string) : undefined,
        z.date({invalid_type_error: "invalid date",}).max(new Date(), "Birth date cannot be in the future")),
    email: z.string().email("Invalid email address"),
    startDate: z.preprocess(
        (val) => val ? new Date(val as string) : undefined,
        z.date({invalid_type_error: "invalid date",}).min(new Date(), "Start date cannot be in the past")),
    endDate: z.preprocess(
        (val) => val ? new Date(val as string) : undefined,
        z.date({invalid_type_error: "invalid date",}).min(new Date(), "End date cannot be in the past")),
    numberOfGuests: z.number().min(1, "At least one guest is required").max(10, "Max 10 guests"),
}).superRefine((data, ctx) => {
    if (data.startDate && data.endDate && data.endDate < data.startDate) {
        ctx.addIssue({
            path: ["endDate"],
            message: "End date must be after start date",
            code: z.ZodIssueCode.custom,
        });
    }
});

type formInputs = TypeOf<typeof formSchema>;

export type FormDataType = {
    firstName: string
    lastName: string
    birthDate: Date
    email: string
    startDate: Date
    endDate: Date
    numberOfGuests: number
}

export type Props = {
    error: String | null;
    onSubmit: (dormData: FormDataType) => void;
};

export default function HotelReservationForm(props: Props) {
    return (
        <div>
            {(props.error != null) ?
                <Alert variant="danger" show={true}>
                    <Alert.Heading>Error! {props.error}</Alert.Heading>
                </Alert> : null
            }
            <h2>Make reservation</h2>
            <Formik<formInputs>
                validationSchema={toFormikValidationSchema(formSchema)}
                onSubmit={(values: FormDataType) => {
                    props.onSubmit(values)
                }}
                initialValues={{
                    firstName: "",
                    lastName: "",
                    birthDate: undefined,
                    email: "",
                    startDate: undefined,
                    endDate: undefined,
                    numberOfGuests: 0,
                }}
            >
                {({handleSubmit, handleChange, errors}) => {
                    return (
                        <Form noValidate onSubmit={e => {
                            e.preventDefault();
                            handleSubmit(e)
                        }}>
                            <Row className="mb-3">
                                <Form.Group className="firstNameGroup" as={Col} md="4" controlId="firstName">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        placeholder="First name"
                                        type="text"
                                        name="firstName"
                                        onChange={handleChange}
                                        isInvalid={!!errors.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.firstName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="lastNameGroup" as={Col} md="4" controlId="lasttName">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name"
                                        onChange={handleChange}
                                        isInvalid={!!errors.lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {`${errors.lastName}`}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="birthDateGroup" as={Col} md="4" controlId="birthDate">
                                    <Form.Label>Birth Date</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="date"
                                            name="birthDate"
                                            onChange={handleChange}
                                            isInvalid={!!errors.birthDate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {`${errors.birthDate}`}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className="emailGroup" as={Col} md="4" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"
                                                  name="email"
                                                  onChange={handleChange}
                                                  isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {`${errors.email}`}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="startDateGroup" as={Col} md="3" controlId="startDate">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="date"
                                                  name="startDate"
                                                  onChange={handleChange}
                                                  isInvalid={!!errors.startDate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {`${errors.startDate}`}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="endDateGroup" as={Col} md="3" controlId="endDate">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control type="date"
                                                  name="endDate"
                                                  onChange={handleChange}
                                                  isInvalid={!!errors.endDate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {`${errors.endDate}`}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="numberOfGuestsGroup" as={Col} md="2" controlId="validationCustom03">
                                    <Form.Label>Number Of Guests</Form.Label>
                                    <Form.Control type="number"
                                                  name="numberOfGuests"
                                                  onChange={handleChange}
                                                  isInvalid={!!errors.numberOfGuests}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {`${errors.numberOfGuests}`}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Button type="submit">Submit</Button>
                        </Form>
                    )
                }}
            </Formik>
        </div>);
}