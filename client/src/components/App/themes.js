import { createGlobalStyle } from "styled-components"

export const lightTheme = {
    body: "#fff",
    text: "#363E45",
    border: "1px solid rgb(52, 73, 94)"
}

export const darkTheme = {
    body: "#212F3C",
    text: "#fff",
    border: "1px solid #fff"
}

export const GlobalStyles = createGlobalStyle`

body {
   background: ${(props) => props.theme.body};
   color: ${(props) => props.theme.text};
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
