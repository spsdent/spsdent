import styled from 'styled-components'

export const AddVisitContainer = styled.div`
/* background-color: cadetblue; */
width: 90%;
height: fit-content;
`
export const TitleContainer = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
gap: 1em;
padding: 1.5em 0 .5em 3em;
`
export const Title = styled.h1`
font-size: 3.5em;
font-family: 'bebas neue', 'sans-serif';
letter-spacing: .05em;
color: ${props => props.primary ? "#01d4bf" : "#333"};
`