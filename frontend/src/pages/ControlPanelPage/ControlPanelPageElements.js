import styled from 'styled-components'

export const StyledContainer = styled.section`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 5%;
  background-color: cadetblue;
`

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  /* margin: 1rem 0; */
`

export const StyledButton = styled.button`
  padding: 1em 1em;
  cursor: pointer;
  transition: 0.2s;
  outline: none;
  border: 1px solid #333;

  &:hover {
    background-color: #01d4bf;
    
  }
`

export const StyledHeading = styled.h1`
  color: #333;
  font-size: 3em;
`
export const ButtonControl = styled.button`
font-family: 'poppins';
font-size: .6em;
padding: .5em 1em;
`