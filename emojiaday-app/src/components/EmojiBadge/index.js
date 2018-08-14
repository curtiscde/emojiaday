import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { Emoji } from 'emoji-mart';

const EmojiBadge = (props) => {
  const styles = {
    badge: {
      top: 1,
      right: -15,
      border: '2px solid #ccc',
    },
  };

  const getBackgroundColor = index => {
    return index === 0  ? 'rgba(255, 215, 0, 0.3)'
        : index === 1 ? 'rgba(211, 211, 211, 0.3)'
        : index === 2 ? 'rgba(205, 127, 50, 0.3)'
        : '';
  }

  if (!props.emoji) return null;

  return (
    <IconButton key={props.emoji._id} style={{ backgroundColor: getBackgroundColor(props.index) }}>
      {
        props.emoji.count > 10
          ? (
            <Badge badgeContent={props.emoji.count} color="primary" classes={{ badge: styles.badge }}>
              <Emoji emoji={props.emoji._id} set="twitter" size={32} />
            </Badge>
          )
          : (
            <Emoji emoji={props.emoji._id} set="twitter" size={32} />
          )
      }
    </IconButton>
  );
}

export default EmojiBadge;
