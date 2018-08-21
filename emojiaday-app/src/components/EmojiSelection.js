import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { connect } from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import EmojiSelect from './EmojiSelect';
import EmojiPicker from './EmojiPicker/index';
import * as userEntries from '../actions/userEntriesActions';
import * as entryEditor from '../actions/entryEditorActions';

class EmojiSelection extends Component {

  componentDidMount() {
    if (!this.props.userEntries.fetching && !this.props.userEntries.fetched) {
      this.props.dispatch(userEntries.fetchUserEntries());
    }
  }

  isToday() {
    return (this.props.day === moment().format('YYYYMMDD'));
  }

  handleEmojiSelectClick(day, index, entry) {
    if (this.isToday()) {
      this.props.dispatch(entryEditor.openDialog(day, index, entry));
    }
  }

  handleCloseDialog() {
    this.props.dispatch(entryEditor.closeDialog());
  }

  handleEmojiPickerSelect(emoji) {
    this.props.dispatch(entryEditor.closeDialog());

    if (this.props.entryEditor.entry) {
      this.props.dispatch(userEntries.updateUserEntry(this.props.entryEditor.entry, emoji));
    }
    else{
      this.props.dispatch(userEntries.addUserEntry(emoji, this.props.entryEditor.index, moment().format('YYYYMMDD')));
    }
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
                <Typography variant="subheading" color="inherit">
                    {
                      this.isToday() ?
                        'Your emojis Today'
                        : `Your emojis for ${moment(this.props.day).format('D MMMM YYYY')}` 
                    }
                </Typography>
            </Grid>
            {[0,1,2].map(i => (
              <EmojiSelect key={i} 
                          day={this.props.day}
                          index={i}
                          onClick={this.handleEmojiSelectClick.bind(this)}
                          entry={this.props.userEntries
                                  && this.props.userEntries.entries
                                  && this.props.userEntries.entries[this.props.day]
                                  && this.props.userEntries.entries[this.props.day][i]} />
            ))}
          </Grid>
        </CardContent>
        <Dialog
          open={this.props.entryEditor.dialogOpen}
          onClose={this.handleCloseDialog.bind(this)}>
          <EmojiPicker onSelect={this.handleEmojiPickerSelect.bind(this)} />
          <DialogActions>
            <Button onClick={this.handleCloseDialog.bind(this)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    )
  }
}

export default connect((store) => {
  return {
    entryEditor: store.entryEditor,
    userEntries: store.userEntries,
  };
})(EmojiSelection);
