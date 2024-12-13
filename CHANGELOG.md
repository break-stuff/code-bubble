# Changelog

## 1.1.9

- Fixed timeout issue with reloaded code
- Removed redundant `slotchange` handler

## 1.1.8

- Fixed code reload when preview content changes
- Fixed console error when resizing content

## 1.1.7

- Fixed issue when preview content doesn't load

## 1.1.6

- Fixed timing issues with delayed code formatters

## 1.1.5

- Fixed issue where preview content is not correctly positioned

## 1.1.4

- Fixed bug that was assigning all slots to `html`

## 1.1.3

- Fix issue if no code language is specified.

## 1.1.2

- Fixed issue where CodeBubble will crash due to infinite loops due to `slotchange` event handling
- Fixed timing issue that occurs when using code formatting libraries like PrismJS.

## 1.1.1

- Fixed with preview content getting cut off or misaligned

## 1.1.0

- Added feature to assign `slot` attribute to immediate child of the Code Bubble regardless of how the markdown is parsed
- Added feature to update content is when the slotted content is changed. This is nice for environments where the markdown parsing is done at runtime.

## 1.0.0

- initial commit