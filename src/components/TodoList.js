import React from 'react';
import { Box, Card, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';


import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
    cardHeader: {
        padding: '64px 16px 16px 16px',
        backgroundColor: '#460ad9',
        color: '#fff',
        fontWeight: 'normal',
        background: 'linear-gradient(#460ad9cc,#460ad9cc), url(/images/rocks.jpg)',
        backgroundSize: 'cover'
    },
    taskCompleted: {
        textDecoration: 'line-through',
        color: '#aaa'
    },
    buttonAdd: {
        color: '#460ad9',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    margin: {
        boxSizing: 'border-box',
        padding: '16px'
    }
});

export const TodoList = (props) => {

    const classes = useStyles();

    return (
        <Card>
            <Box color="text.primary" align="left" className={classes.cardHeader}>
                <Typography variant="h4">
                    {props.list ? props.list.label : ""}
                </Typography>
                <Typography variant="subtitle1">
                    Tues 12 December
                </Typography>
            </Box>

            {props.list && props.list.data ?
                <List>
                    {props.list.data.map((item, index) => {
                        return (
                            <ListItem key={index} role={undefined} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        onClick={() => props.setCheckboxHandler(index)}
                                        edge="start"
                                        checked={item.is_completed}
                                        tabIndex={-1}
                                        disableRipple
                                        color='secondary'
                                        inputProps={{ 'aria-labelledby': item.id }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    id={index}
                                    primary={item.label}
                                    className={
                                        item.is_completed ? classes.taskCompleted : null} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="comments"
                                        onClick={() => props.deleteItem(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}


                    {!props.is_adding_new_todo ?
                        <ListItem key="add" role={undefined}
                            onClick={() => props.handleAddNewItem()}>
                            <ListItemIcon>
                                <AddCircle
                                    edge="start"
                                    color='primary'
                                />
                            </ListItemIcon>
                            <ListItemText
                                className={classes.buttonAdd}
                                color='primary'
                                primary="Add to-do"
                            />
                        </ListItem> : null}

                </List> : null}


            {props.is_adding_new_todo ?
                <FormControl
                    fullWidth
                    className={classes.margin}
                    variant="outlined"
                >
                    <Input
                        fullWidth
                        placeholder="New to-do"
                        className={classes.input}
                        onKeyPress={props.onInputKeyPress}
                        inputProps={{
                            'aria-label': 'entry',
                        }}
                    />
                </FormControl> : ""}
        </Card>
    )

}

export default TodoList;