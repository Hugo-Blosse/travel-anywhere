import React, {useState} from "react";
import {useCookies} from "react-cookie";
import axios from "axios";
import {Form, Button} from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function LoginPanel(props: any) {
    const [useATK, setUseATK] = useState(true);
    const [,setCookie] = useCookies(["atkCookie"]);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        if (useATK) {
            const atkToken = formData.get("atk") as string;
            setCookie("atkCookie",decodeURIComponent(atkToken), {path: "/"});
            router.push("/");
            return
        }
        const credentials = getEncodedCredentials(formData.get("login") as string, formData.get("password") as string);
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        try {
            const response = await axios.post("https://api-crt.cert.havail.sabre.com/v2/auth/token", params,
                {
                    headers: {
                        "Authorization": `Basic ${credentials}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                        "accept": "application/json"
                    }
                });
            setCookie("atkCookie", response.data.access_token, {path: "/"});
            router.push("/");
        } catch (exception) {
            console.log(`Error: ${exception}`);
            props.setAlert(true);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
                <Form.Check onChange={(e) => setUseATK(e.target.checked)}
                            defaultChecked={useATK}
                            type="switch"
                            id="loginType"
                            label="use ATK"
                />
                {useATK ? (
                    <Form.Group className="mb-3" controlId="formATK">
                        <Form.Label>ATK Token</Form.Label>
                        <Form.Control name="atk" placeholder="Enter token"/>
                    </Form.Group>
                ) : (
                    <>
                        <Form.Group className="mb-3" controlId="formLogin">
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="login" placeholder="Enter username"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password"/>
                        </Form.Group>
                    </>
                )
                }
                <Button variant="primary" type="submit">
                    Login
                </Button>
        </Form>
    );
}

function getEncodedCredentials(login: string, password: string): string {
    const usernameEncoded = btoa(`V1:${login}:DEVCENTER:EXT`);
    const passwordEncoded = btoa(password);
    return btoa(`${usernameEncoded}:${passwordEncoded}`);
}