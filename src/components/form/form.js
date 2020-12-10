import {React, useState} from 'react'
import './form.css';
import { TextField, Grid, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { format, add } from 'date-fns'

import 'date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';



function Form(props) {
  //hooks
  const [selectedTicket, setSelectedTicket] = useState('');
  const [ticketError, setTicketError] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(Date()));
  const [selectedStartTime, setSelectedStartTime] = useState(new Date('2020-01-01T12:00:00'));
  const [selectedEndTime, setSelectedEndTime] = useState(new Date('2020-01-01T12:00:00'));

  //misc
  let re = /^[a-zA-Z0-9- ]*$/

  //onChange Functions
  const handleTicketChange = (event) => {
    if (event.target.value.length<=10 && re.test(event.target.value)){
      setTicketError(false)
      setSelectedTicket(event.target.value);
    }else{
      setTicketError(true)
      setSelectedTicket(event.target.value);
    }
    
  };
  const handleDescriptionChange = (event) => {
    if (event.target.value.length<=100 && re.test(event.target.value)){
        setSelectedDescription(event.target.value);
        setDescriptionError(false)
    }else{
        setSelectedDescription(event.target.value);
        setDescriptionError(true)
    }
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

  //submit form
  const handleSubmit = () => {
      if(!ticketError && !descriptionError){
        const formContentObj={
            'Ticket Name':selectedTicket,
            'Description':selectedDescription,
            'Date':format(selectedDate, 'MM/dd/yyyy'),
            'Start Time':format(selectedStartTime,'hh:mma'),
            'End Time':format(selectedEndTime,'hh:mma')
        }
        //setting end time to variable to avoid asynchronous issues
        let newEnd=selectedEndTime
        if (selectedEndTime < selectedStartTime){
            newEnd=add(selectedEndTime,{days:1});
        }
        //calculating difference between 2 times and formatting accordingly
        let diff = (newEnd-selectedStartTime)
        let hrs = Math.floor((diff % 86400000) / 3600000)
        let mins = Math.round(((diff % 86400000) % 3600000) / 60000)
        let diffStr=''
        //logic for pluralizinf hours and minutes
        let hPlural = Math.abs(hrs) === 1 ? ' hour':' hours'
        let mPlural = Math.abs(mins) === 1 ? ' minute':' minutes'
        
        if(hrs === 0 && mins === 0){
            diffStr='0 minutes'
        }else if(hrs === 0 && mins > 0){
            diffStr=mins + mPlural
        }else if(hrs > 0 && mins === 0){
            diffStr=hrs + hPlural
        }else{
            diffStr = hrs + hPlural + ' and ' + mins + mPlural
        }
        props.updateFormContent(formContentObj, diffStr)
    }else{
        alert("Please format the ticket name and description correctly.\n\nTicket Name: max 10 characters, alphanumeric characters and - example APP-120 \nDescription: max 100 characters, alphanumeric characters and - description of the work.")
    }
  }

 

  return (
    <div className="Form">
      <form data-testid='form' className='form-group'>

        

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid id="formGrid" container >
                <div id="ticketContainer">
                    <TextField 
                    error={ticketError}
                    value={selectedTicket}
                    autoComplete='off'  
                    onChange={handleTicketChange}
                    helperText= "(max 10 characters, alphanumeric characters and -) example APP-120"
                    className="formField" 
                    data-testid='ticket-input' 
                    id="ticket" 
                    label="Ticket Name" 
                    variant="outlined" />
                </div>
                <TextField
                error={descriptionError} 
                value={selectedDescription}
                onChange={handleDescriptionChange}
                helperText= "(max 100 characters, alphanumeric characters and -) description of the work."
                autoComplete='off' 
                multiline
                rowsMax={4}
                className="formField" 
                data-testid='description-input' 
                id="description" 
                label="Description" v
                variant="outlined" />
                <div id="dateTimePickers">
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
                </div>
                <Button variant="contained" onClick={handleSubmit} color="primary">Submit</Button>
         </Grid>
        </MuiPickersUtilsProvider>

        
      </form>
    </div>
  );
}

export default Form;
