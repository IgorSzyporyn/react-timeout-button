import { Button } from '@material-ui/core'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import { ReactTimeoutButton } from '../'

export default {
  title: 'Compatibility/Material UI',
  component: ReactTimeoutButton,
  includeStories: [
    'PrimaryContained',
    'PrimaryContained2Digits',
    'PrimaryContained3Digits',
    'PrimaryContainedRemoveCountdown',
    'PrimaryContainedPauseOnHover',
    'PrimaryContainedWithOverlay',
    'PrimaryOutlined',
    'PrimaryOutlinedWithOverlay',
    'PrimaryContained1Digit',
    'PrimaryText',
    'SecondaryContained',
  ],
} as Meta

export const PrimaryContained = () => (
  <Button
    component={ReactTimeoutButton}
    color="primary"
    variant="contained"
    timeout={8000}
    text="View Next Item in ($countdown)"
  />
)

export const PrimaryOutlined = () => (
  <Button
    component={ReactTimeoutButton}
    color="primary"
    variant="outlined"
    timeout={8000}
    text="View Next Item in ($countdown)"
  />
)

export const PrimaryText = () => (
  <Button
    component={ReactTimeoutButton}
    color="primary"
    variant="text"
    timeout={8000}
    text="View Next Item in ($countdown)"
  />
)

export const SecondaryContained = () => (
  <Button
    component={ReactTimeoutButton}
    color="secondary"
    variant="contained"
    timeout={8000}
    text="View Next Item in ($countdown)"
  />
)

export const PrimaryContainedWithOverlay = () => (
  <Button
    component={ReactTimeoutButton}
    color="primary"
    variant="contained"
    timeout={8000}
    text="View Next Item in ($countdown)"
    overlay={true}
  />
)

export const PrimaryOutlinedWithOverlay = () => (
  <Button
    component={ReactTimeoutButton}
    color="primary"
    variant="outlined"
    timeout={8000}
    text="View Next Item in ($countdown)"
    overlay={true}
  />
)

export const PrimaryContainedRemoveCountdown = () => (
  <Button
    component={ReactTimeoutButton}
    color="primary"
    variant="contained"
    timeout={65000}
    text="View Next Item ${in ($countdown)}"
    overlay={true}
  />
)

export const PrimaryContained1Digit = () => (
  <Button
    component={ReactTimeoutButton}
    color="primary"
    variant="contained"
    timeout={65000}
    text="View Next Item in ($countdown)"
    digits={1}
    pauseOnHover={true}
  />
)

export const PrimaryContained2Digits = () => (
  <Button
    component={ReactTimeoutButton}
    color="primary"
    variant="contained"
    timeout={65000}
    text="View Next Item in ($countdown)"
    digits={2}
    pauseOnHover={true}
  />
)

export const PrimaryContained3Digits = () => (
  <Button
    component={ReactTimeoutButton}
    color="primary"
    variant="contained"
    timeout={18000}
    text="View Next Item in ($countdown)"
    digits={3}
    overlay={true}
    pauseOnHover={true}
  />
)

export const PrimaryContainedPauseOnHover = () => (
  <Button
    component={ReactTimeoutButton}
    color="primary"
    variant="contained"
    timeout={8000}
    text="View Next Item in ($countdown)"
    overlay={true}
    pauseOnHover={true}
  />
)
