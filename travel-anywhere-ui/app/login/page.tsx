"use client"
import LoginPanel from "@/components/LoginPanel";
import {Alert, Container} from "react-bootstrap";
import React, {useState} from "react";

export default function LoginForm() {
    const [showAlert, setShowAlert] = useState(false);

    return (<Container>
        <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Error! log in failed!</Alert.Heading>
        </Alert>
        <LoginPanel setAlert={setShowAlert}/>
    </Container>);
}
