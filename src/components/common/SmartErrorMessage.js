import React from 'react'
import { Message } from 'semantic-ui-react'

export default ({
  err,
  setField,
  ...rest
}) => {
  const { title: header, message: content, items, isDismissable, fieldName } = err
  const messageProps = {
    ...rest,
    ...isDismissable && {
        onDismiss: () => setField(fieldName, { err: null })
    }
  }
  return (
    <Message
      error
      {...messageProps}
    >
      <Message.Header>{header}</Message.Header>
      {content &&
        <p>
          {content}
        </p>
      }
      {items && 
        <Message.List>
          {items.map((item, i) => 
            <Message.Item key={i} content={item} />
          )}
        </Message.List>
      }
    </Message>
  )
}
