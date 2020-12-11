import React from 'react'
import { cleanup, fireEvent, getByLabelText, getByTestId, render, screen } from '@testing-library/react'
import App from './App'
import Form from './components/form/form'

afterEach(() => cleanup())

//switched to getAllByText because the labels are added to the dom twice with the library used.  (only added to screen once)
test('Displays form with required fields', () => {
    render(<App />)

    expect(screen.getByTestId('form')).toBeTruthy()
    expect(screen.getAllByText('Ticket Name:'))
    expect(screen.getAllByText('Description:'))
    expect(screen.getAllByText('Date:'))
    expect(screen.getAllByText('Start Time:'))
    expect(screen.getAllByText('End Time:'))
})


test('Ticket Name cannot exceed more than 10 characters', () => {

    render(<App />)
    const exceedCharValue = 'AMP-4561234'

    fireEvent.change(screen.getByTestId(/ticket-input/i), { target: { value: exceedCharValue } })

    expect(screen.queryByText(exceedCharValue)).not.toBeInTheDocument()
})
test('Description cannot exceed more than 100 characters', () => {

    render(<App />)
    //added one character to make test string 101 characters and break the limit.
    const exceedCharValue = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mm'

    fireEvent.change(screen.getByTestId(/description-input/i), { target: { value: exceedCharValue } })

    expect(screen.queryByText(exceedCharValue)).not.toBeInTheDocument()
})
test('Date cannot exceed more than 10 characters', () => {

    render(<App />)
    const exceedCharValue = '100/20/2020'

    fireEvent.change(screen.getByTestId(/date-input/i), { target: { value: exceedCharValue } })

    expect(screen.queryByText(exceedCharValue)).not.toBeInTheDocument()
})
test('Start Time cannot exceed more than 7 characters', () => {

    render(<App />)
    const exceedCharValue = '12:00:00am'

    fireEvent.change(screen.getByTestId(/startTime-input/i), { target: { value: exceedCharValue } })

    expect(screen.queryByText(exceedCharValue)).not.toBeInTheDocument()
})
test('End Time cannot exceed more than 7 characters', () => {

    render(<App />)
    const exceedCharValue = '11:00:00pm'

    fireEvent.change(screen.getByTestId(/endTime-input/i), { target: { value: exceedCharValue } })

    expect(screen.queryByText(exceedCharValue)).not.toBeInTheDocument()
})

test('Description counter works', () => {

    render(<App />)
    const test = 'test counter'
    fireEvent.change(screen.getByTestId(/description/i), { target: { value: test } })
    expect(screen.getAllByText('12/100'))

})
