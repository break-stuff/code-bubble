# Changelog

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