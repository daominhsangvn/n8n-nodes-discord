import { INodeProperties } from 'n8n-workflow'

export const options: INodeProperties[] = [
  {
    displayName: 'Listen To Names or IDs',
    name: 'channelIds',
    type: 'multiOptions',
    typeOptions: {
      loadOptionsMethod: 'getChannels',
    },
    default: [],
    description: 'Let you select the text channels you want to listen to for triggering the workflow. If none selected, all channels will be listen to. Your credentials must be set and the bot running, you also need at least one text channel available. If you do not meet these requirements, make the changes then close and reopen the modal (the channels list is loaded when the modal opens). Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'From Role Names or IDs',
    name: 'roleIds',

    type: 'multiOptions',
    displayOptions: {
      show: {
        type: [
          'message',
          'thread',
          'command',
          'userLeaves',
          'userPresenceUpdate',
          'userNickUpdated',
          'userRoleAdded',
          'userRoleRemoved',
          'interaction',
        ],
      },
    },
    typeOptions: {
      loadOptionsMethod: 'getRoles',
    },
    default: [],
    description: 'The same logic apply here for roles, except it is optional. If you don\'t select any role it will listen to @everyone. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Trigger Type',
    name: 'type',

    type: 'options',
    options: [
      {
        name: 'Command',
        value: 'command',
        description: 'When a command is sent in the selected channels',
      },
      {
        name: 'Interaction',
        value: 'interaction',
        description: 'When a user interact with a persisted button/select',
      },
      {
        name: 'Message Update',
        value: 'message_update',
        description: 'When a message is updated in the selected channels',
      },
      {
        name: 'New Message',
        value: 'message',
        description: 'When a message is sent in the selected channels',
      },
      {
        name: 'New Thread',
        value: 'thread',
        description: 'When a thread is created in the selected channels',
      },
      {
        name: 'User Joins',
        value: 'userJoins',
        description: 'When a user joins the server',
      },
      {
        name: 'User Leaves',
        value: 'userLeaves',
        description: 'When a user leaves the server',
      },
      {
        name: 'User Nick Updated',
        value: 'userNickUpdated',
        description: 'When a user\'s nick is updated',
      },
      {
        name: 'User Presence Update',
        value: 'userPresenceUpdate',
        description: 'When a user presence is updated',
      },
      {
        name: 'User Role Added',
        value: 'userRoleAdded',
        description: 'When a user role is added',
      },
      {
        name: 'User Role Removed',
        value: 'userRoleRemoved',
        description: 'When a user role is removed',
      },
    ],
    default: 'message',
    description:
      'Type of event to listen to. User events must specify a channel to listen to if you want to use a placeholder or the option "send to the trigger channel" in a Discord Send node.',
  },
  {
    displayName: 'Which Role Names or IDs',
    name: 'roleUpdateIds',

    type: 'multiOptions',
    displayOptions: {
      show: {
        type: ['userRoleAdded', 'userRoleRemoved'],
      },
    },
    typeOptions: {
      loadOptionsMethod: 'getRoles',
    },
    default: [],
    description: 'If you don\'t select any role it will listen to @everyone. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Presence',
    name: 'presence',

    type: 'options',
    displayOptions: {
      show: {
        type: ['userPresenceUpdate'],
      },
    },
    options: [
      {
        name: 'Any Change',
        value: 'any',
        description: 'When a user presence is updated',
      },
      {
        name: 'Do Not Disturb',
        value: 'dnd',
        description: 'When a user presence is set to do not disturb',
      },
      {
        name: 'Idle',
        value: 'idle',
        description: 'When a user presence is set to idle',
      },
      {
        name: 'Offline',
        value: 'offline',
        description: 'When a user presence is set to offline',
      },
      {
        name: 'Online',
        value: 'online',
        description: 'When a user presence is set to online',
      },
    ],
    default: 'any',
    description: 'Type of presence change to listen to',
  },
  {
    displayName: 'Pattern',
    name: 'pattern',

    type: 'options',
    displayOptions: {
      show: {
        type: ['message', 'thread'],
      },
    },
    options: [
      {
        name: 'Contains',
        value: 'contain',
        description: 'Match the value in any position in the message',
      },
      {
        name: 'Ends With',
        value: 'end',
        description: 'Match the message ending with the specified value',
      },
      {
        name: 'Equals',
        value: 'equal',
        description: 'Match the exact same value',
      },
      {
        name: 'Regex',
        value: 'regex',
        description: 'Match the custom ECMAScript regex provided',
      },
      {
        name: 'Starts With',
        value: 'start',
        description: 'Match the message beginning with the specified value',
      },
    ],
    default: 'start',
    description:
      'Select how the value below will be recognized. ⚠ Keep in mind that the value will be tested with all mentions removed and a trim applied (whitespaces removed at the beginning and at the end). For example "@bot hello" will be tested on "hello"',
  },
  {
    displayName: 'Value',
    name: 'value',
    type: 'string',
    displayOptions: {
      show: {
        type: ['message', 'thread'],
      },
    },
    required: true,
    default: '',
    description: 'The value you will test on all messages listened to',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    displayOptions: {
      show: {
        type: ['command'],
      },
    },
    required: true,
    default: '',
    description:
      "The name of the command you want to listen to (use only alphanumeric characters). If the command don't show up in Discord, check if the trigger is active and restart your Discord client.",
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    displayOptions: {
      show: {
        type: ['command'],
      },
    },
    required: true,
    default: '',
    description: 'The description of the command you want to listen to',
  },
  {
    displayName: 'Input Field Type',
    name: 'commandFieldType',
    required: true,
    type: 'options',
    displayOptions: {
      show: {
        type: ['command'],
      },
    },
    options: [
      {
        name: 'Boolean',
        value: 'boolean',
      },
      {
        name: 'Integer',
        value: 'integer',
      },
      {
        name: 'None',
        value: 'none',
      },
      {
        name: 'Number',
        value: 'number',
      },
      {
        name: 'Text',
        value: 'text',
      },
    ],
    default: 'none',
    description: 'The type of the input field',
  },
  {
    displayName: 'Input Field Description',
    name: 'commandFieldDescription',
    type: 'string',
    displayOptions: {
      show: {
        type: ['command'],
        commandFieldType: ['text', 'number', 'integer', 'boolean'],
      },
    },
    required: true,
    default: '',
    description: 'The description of the input field',
  },
  {
    displayName: 'Input Field Required',
    name: 'commandFieldRequired',
    type: 'boolean',
    displayOptions: {
      show: {
        type: ['command'],
        commandFieldType: ['text', 'number', 'integer', 'boolean'],
      },
    },

    default: false,
    description: 'Whether the input field is required or not',
  },
  {
    displayName: 'Case Sensitive',
    name: 'caseSensitive',
    type: 'boolean',
    displayOptions: {
      show: {
        type: ['message', 'thread'],
      },
    },

    default: false,
    description: 'Whether it will be sensible to the case when matching the value',
  },
  {
    displayName: 'Bot Mention',
    name: 'botMention',
    type: 'boolean',
    displayOptions: {
      show: {
        type: ['message', 'thread'],
      },
    },

    default: false,
    description: 'Whether a message will also need to mention the bot to trigger the workflow (this does not exclude the other criteria)',
  },
  {
    displayName: 'Message ID',
    name: 'interactionMessageId',
    type: 'string',
    displayOptions: {
      show: {
        type: ['interaction'],
      },
    },
    required: true,
    default: '',
    description: 'The message ID of the button/select to listen to',
  },
  {
    displayName: 'Placeholder',
    name: 'placeholder',
    type: 'string',

    default: '',
    description:
      'The placeholder is a message that will appear in the channel that triggers the workflow. Three animated dots added to the placeholder indicate that the workflow is running. From a Discord Send node, you can set up a response message which will then take the place of this placeholder.',
  },
]
