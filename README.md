# RemindMeGPT
This is a simple reminder app proof-of-concept developed with GPT-4. Here users can create reminders, change their status and ask ChatGPT about them. For example, the user could ask chat gpt to:
- `Please summarise all my reminders in a simple and comprehensive way whilst giving me advice on how to complete them`
- `What reminders do I have today?`
- `Can you tell me something about Luís de Camões`

## Running RemindMeGPT
To run this project run the following commands:
```bash
npm install
npm run dev
```
A local version of the web-app can be accessed in `localhost:3000`

## How it works

### Technologies
This PoC uses the following stack:
- Next JS Typescript
- Tailwind CSS
- React Redux
- OpenAI GPT-4

### Implementation
All the chats are bundled up appropriately in a format that Chat GPT-4 understands. This whole formatting process occurs within the custom `openAIHooks` file. Here every reminder is bundled up into the form:

    Reminder: <REMINDER CONTENTS> recorded on: <REMINDER TIMESTAMP> and is complete? <COMPLETE STATUS>, ...

These bundled reminders are then slotted into a dictionary with different prompt formatting, the following cases are considered:

1. If there is no agent response within the chat history then they are just sent as:
```javascript
{role:'user', content: 'Reminder: <REMINDER CONTENTS> recorded on: <REMINDER TIMESTAMP> and is complete? <COMPLETE STATUS>, ...'}
```
2. In the case that there are reminders
#### Key takeaways 
1. The reminders are bundled up until an agent response message is encountered. Every agent response is also put into a dictionary entry in the following format:
```javascript
{role: 'assistant', content: '<AGENT RESPONSE>'}
```
 > This was done to allow the system to preserve contextual history. 

2. The blue boxes that are displayed to the user displaying the asked question is not sent along within the API request. 

These reminders are then put into the `message` section of the dictionary sent to the OpenAI GPT-4 Chat API. 


![RMG GIF](public/rmg.gif)



[![IMAGE ALT TEXT](http://img.youtube.com/vi/LTZo8bf_YnM/0.jpg)](https://www.youtube.com/watch?v=LTZo8bf_YnM "RemindMEGPT Walkthrough")