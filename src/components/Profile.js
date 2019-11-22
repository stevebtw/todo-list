import React from 'react';
import { Grid, Avatar, Typography } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ListIcon from '@material-ui/icons/List';

export const Profile = (props) => {

    const { user, getListHandler } = props;

    if (user) {
        return (
            <>

                <Grid container spacing={2} alignItems="center" style={{
                    padding: '16px'
                }}>
                    <Grid item>
                        <Avatar alt={user.name} src={process.env.PUBLIC_URL + `/images/${user.avatar}`} />
                    </Grid>
                    <Grid item >
                        <Typography>
                            {user.name}
                        </Typography>
                    </Grid>
                </Grid>
                <List component="nav">
                    {user.lists.map((item) => {
                        return (
                            <ListItem button key={item.id} onClick={() => getListHandler(item.id)} style={{ backgroundColor: '#f0f0f0' }}>
                                <ListItemIcon>
                                    <ListIcon />
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        )
                    })}

                </List>

            </>
        )
    } else {
        return "Loading"
    }
};