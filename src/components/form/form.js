import {React, useState} from 'react'
import './form.css';
import { TextField, Grid, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';



function Form() {
  //hooks
  const [selectedTicket, setSelectedTicket] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [selectedStartTime, setSelectedStartTime] = useState(new Date('2020-01-01T12:00:00'));
  const [selectedEndTime, setSelectedEndTime] = useState(new Date('2020-01-01T12:00:00'));

  //onChange Functions
  const handleTicketChange = (event) => {
    setSelectedTicket(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setSelectedDescription(event.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleStartTimeChange = (time) => {
    setSelectedStartTime(time);
  };
  const handleEndTimeChange = (time) => {
    setSelectedEndTime(time);
  };
  return (
    <div className="Form">
      <form data-testid='form' className='form-group'>

        

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid id="formGrid" container >
                <TextField 
                value={selectedTicket} 
                onChange={handleTicketChange}
                className="formField" 
                data-testid='ticket-input' 
                id="ticket" 
                label="Ticket Name" 
                variant="outlined" />

                <TextField 
                value={selectedDescription}
                onChange={handleDescriptionChange}
                multiline
                rowsMax={4}
                className="formField" 
                data-testid='description-input' 
                id="description" 
                label="Description" v
                ariant="outlined" />

                <KeyboardDatePicker
                className="formField"
                data-testid='date-input'
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="Date"
                label="Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />

                <KeyboardTimePicker
                className="formField"
                data-testid='startTime-input'
                margin="normal"
                id="startTime"
                label="Start Time"
                value={selectedStartTime}
                onChange={handleStartTimeChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />

                <KeyboardTimePicker
                className="formField"
                data-testid='endTime-input'
                margin="normal"
                id="endTime"
                label="End Time"
                value={selectedEndTime}
                onChange={handleEndTimeChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />
                <Button variant="contained" color="primary">Submit</Button>
         </Grid>
        </MuiPickersUtilsProvider>

        
      </form>
    </div>
  );
}

export default Form;
