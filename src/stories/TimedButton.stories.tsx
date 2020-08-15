import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { ReactTimeoutButtonProps, ReactTimeoutButton } from '../'

export default {
  title: 'Vanilla/ReactTimeoutButton',
  component: ReactTimeoutButton,
} as Meta

const Template: Story<ReactTimeoutButtonProps> = (args) => <ReactTimeoutButton {...args} />

export const InlineStyledOrange = Template.bind({})
InlineStyledOrange.args = {
  timeout: 8000,
  text: 'Continue to next episode ${in ($countdown)}',
  style: {
    background: 'orange',
    color: 'white',
    fontSize: '15px',
    fontWeight: 500,
    border: '0 none',
    outline: 'none',
    padding: '0 25px',
    borderRadius: '3px',
    lineHeight: '38px',
    width: '500px',
  },
}

export const InlineStyledOrangeWithOverlay = Template.bind({})
InlineStyledOrangeWithOverlay.args = {
  timeout: 80000,
  text: 'Continue to next episode ${in ($countdown)}',
  overlay: true,
  style: {
    background: 'orange',
    color: 'white',
    fontSize: '15px',
    fontWeight: 500,
    border: '0 none',
    outline: 'none',
    padding: '0 25px',
    borderRadius: '3px',
    lineHeight: '38px',
    width: '500px',
  },
}

export const InlineStyledBluePauseOnHover = Template.bind({})
InlineStyledBluePauseOnHover.args = {
  timeout: 8000,
  text: 'Continue to next episode ${in ($countdown)}',
  overlay: true,
  pauseOnHover: true,
  style: {
    background: 'blue',
    color: 'white',
    fontSize: '15px',
    fontWeight: 500,
    border: '0 none',
    outline: 'none',
    padding: '0 25px',
    borderRadius: '3px',
    lineHeight: '38px',
    width: '500px',
  },
}

export const InlineStyledGreenCancelOnHover = Template.bind({})
InlineStyledGreenCancelOnHover.args = {
  timeout: 4000,
  text: 'Next ${in ($countdown)}',
  overlay: true,
  cancelTimeoutOnHover: true,
  style: {
    background: 'green',
    color: 'white',
    fontSize: '15px',
    fontWeight: 500,
    border: '0 none',
    outline: 'none',
    padding: '0 25px',
    borderRadius: '3px',
    lineHeight: '38px',
    width: '500px',
  },
}
