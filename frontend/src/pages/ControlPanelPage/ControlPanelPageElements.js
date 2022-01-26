import styled from 'styled-components'

export const StyledContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
  padding: 0 5%;
`

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 1rem 0;
`

export const StyledButton = styled.button`
  padding: 0.35rem 1rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #01d4bf;
    border: none;
  }
`

export const StyledHeading = styled.h1`
  color: #333;
  font-size: 3em;
`
