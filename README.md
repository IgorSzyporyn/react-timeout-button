# react-timeout-button

Simple unstyled button that will call a given function when specified time has elapsed.

The component plays very well with frameworks such as [styled-components](http://www.styled-components.com), [emotion](https://emotion.sh/) and [Material UI](http://www.material-ui.com).

- Use simple templated string to display text with remaining time (including a remove on completed syntax)
- Display time remaining with animated overlay, and customize
  - overlay color and opacity
  - direction of overlay animation (ltr or rtl)
- Pause timer on hover
- Complete timer on hover
- Display remaining time with 0-3 digits

The templated in remaining time text will format itself if timeout is higher than 60 seconds.

As example 90 seconds timeout will present itself as `1m 30s`, and only switch to `60` when 30 seconds has passed, and timer is at 1 minute.

<p>&nbsp;</p>

## Overview

- **[1. Installation and usage](#installation)**
  - **[1.1 With frameworks](#with-frameworks)**
- **[2. Options](#options)**
- **[3. DOM output](#dom)**

<p>&nbsp;</p>

## <a name="installation"></a>Usage

Install the component

```
$ npm i react-timeout-button
```

Use it as you wish

```js
import { TimedButton } from 'react-timeout-button'

....

<TimedButton timeout={8000} text="Continue in $timeout" />
```

This will render a basic HTML button with a 8 second timer and show the text inside replacing `$timeout` with time remaining in full seconds ...and not look very good.

<p>&nbsp;</p>

> **TimedButton accepts any property that a normal `<button>` tag would do, as well as children - so just pour on.**

<p>&nbsp;</p>

### <a name="with-frameworks"></a>With frameworks

TimedButton can also be used as a referenced component by frameworks such as [Material UI](http://www.material-ui.com).

```js
import { Button } from '@material-ui/core'
import { TimedButton } from 'react-timeout-button'

...

<Button
  variant="contained"
  color="primary"
  component={TimedButton}
  timeout={8000}
  text="Continue ${in ($timeout)}"
  overlay={true}
/>
```

Or you can style it with [styled-components](http://www.styled-components.com) or [emotion](https://emotion.sh/).

```js
import { styled } from 'styled-components'
import { TimedButton } from 'react-timeout-button'

...

const Button = styled(TimedButton)`
  border-radius: 3px;
  background-color: #ff0000;
  color: #ffffff;
  border: 0 none;
  outline: none;
`

...

<Button
  timeout={8000}
  text="Continue ${in ($timeout)}"
  overlay={true}
/>
```

<p>&nbsp;</p>

## Options

```js
<TimedButton
  cancelTimeoutOnHover?: boolean
  digits?: 0 | 1 | 2 | 3
  overlay?: boolean
  overlayBackground?: string
  overlayOpacity?: number
  overlayPosition?: 'before' | 'after'
  overlayRtl?: boolean
  pauseOnHover?: boolean
  text?: string
  timeout: number
  onTimeout?: () => void
/>
```

- ### cancelTimeoutOnHover?: boolean

  If set to true then the timer will run out when user hovers over button.

- ### digits?: 0 | 1 | 2 | 3

  **_Default: 0_**

  How many digits to show in the `$timeout` replaced string.

- ### overlay?: boolean

  Set to `true` to show an animation of the remaining time with a opaque color retracting from left-to-right or right-to-left.

- ### overlayBackground?: string

  **_Default: "#000000"_**

  Set the color used for overlay.

- ### overlayOpacity?: number

  **_Default: 0.15_**

  Set the opacity used for overlay.

- ### overlayPosition?: "before" | "after"

  **_Default: "before"_**

  Control if the overlay should be behind of in front of any possibly shown text.

- ### overlayRtl?: boolean

  Set to `true` to make overlay animation go right-to-left.

- ### pauseOnHover?: boolean

  Set to `true` to pause the timer when user hovers over button.

- ### text?: string

  **_Default: "\$timeout"_**

  Enter text to display on button with a simple templated syntax to do it.

  - **\$timeout** - This string will be replaced by the time remaining with as many digits as configured (default 0)
  - **\${}** - Any text inside the curly braces will be removed when the timer is done.

- ### timeout: number

  How long the timer should be set to in miliseconds (e.g. 1000 equals 1 second).

- ### onTimeout?: () => void

  A function that will be called when the timer has completed.

<p>&nbsp;</p>

## <a name="dom"></a>DOM output

The regular usage of the component, and the output when used as a referenced component will vary - but generally the inner DOM structure of the wrapper will remain when referenced.

### Regular output

Note that only one of the overlays are visible at the time depending on the value of the `overlayPosition` property.

```html
<button class="react-timeout-button">
  <span class="react-timeout-button__overlay react-timeout-button__overlay--before" />
  <span class="react-timeout-button__text">Continue in (3)</span>
  <span class="react-timeout-button__overlay react-timeout-button__overlay--after" />
</button>
```
