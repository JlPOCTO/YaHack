import { reverse } from "dns"
import { createGlobalStyle } from "styled-components"

export const lightTheme = {
    body: "#fff",
    reverseBody: "#212F3C",
    reverseText: "#fff",
    text: "#363E45",
    border: "1px solid rgb(52, 73, 94)"
}

export const darkTheme = {
    body: "#212F3C",
    text: "#fff",
    reverseBody: "#fff",
    reverseText: "#363E45",
    border: "1px solid #fff"
}

export const GlobalStyles = createGlobalStyle`

body {
   background: ${(props) => props.theme.body};
   color: ${(props) => props.theme.text};
}

.emojiPopup {
    background: ${(props) => props.theme.reverseBody};
    color: ${(props) => props.theme.reverseText};
    border: ${(props) => props.theme.border};
}

.profile {
    background: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
 }

.userPhoto {
   border: ${(props) => props.theme.border};
}

.switchButton {
    border: ${(props) => props.theme.border};
}
`
