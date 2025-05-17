import { INodeProperties } from 'n8n-workflow'

export const options: INodeProperties[] = [
  {
    displayName: 'Replace the Trigger Placeholder',
    name: 'triggerPlaceholder',
    type: 'boolean',
    displayOptions: {
      hide: {
        triggerChannel: [true],
        persistent: [true],
      },
    },
    default: false,
    description:
      'Whether active, the message produced by this node will replace the previous placeholder set. It can be a placeholder set by the Discord Trigger node or by another Discord Send node.',
  },
  {
    displayName: 'Send to the Trigger Channel',
    name: 'triggerChannel',
    type: 'boolean',
    displayOptions: {
      show: {
        type: ['message', 'button', 'select', 'action'],
      },
      hide: {
        triggerPlaceholder: [true],
        persistent: [true],
      },
    },
    default: false,
    description: 'Whether active, the message produced will be sent to the same channel were the workflow was triggered (but not replace the placeholder if there is one)',
  },
  {
    displayName: 'Send To Name or ID',
    name: 'channelId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getChannels',
    },
    displayOptions: {
      hide: {
        triggerPlaceholder: [true],
        triggerChannel: [true],
        type: ['none'],
      },
    },
    default: '',
    description: 'Let you specify the text channels where you want to send the message. Your credentials must be set and the bot running, you also need at least one text channel available. If you do not meet these requirements, make the changes then close and reopen the modal (the channels list is loaded when the modal opens). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Type',
    name: 'type',

    type: 'options',
    options: [
      {
        name: 'Action',
        value: 'action',
        description: 'Instead of sending a message, it will perform an action defined in the next field',
      },
      {
        name: 'Button Prompt',
        value: 'button',
        description:
          'It allows you to send an interactive dialog along with buttons users can click on. The workflow execution will wait untill someone answer.',
      },
      {
        name: 'Message',
        value: 'message',
        description: 'This is the default type, it allows you to send a message without requiering any form of response',
      },
      {
        name: 'None',
        value: 'none',
        description: 'Useful if you just want to clear a pending placeholder or update the bot status without any other action',
      },
      {
        name: 'Select Prompt',
        value: 'select',
        description: 'Same as button prompt, but it will display dropdown list instead of buttons',
      },
    ],
    default: 'message',
    description: 'Let you choose the type of interaction you want to perform',
  },
  {
    displayName: 'Action',
    name: 'actionType',

    displayOptions: {
      show: {
        type: ['action'],
      },
    },
    type: 'options',
    options: [
      {
        name: 'Remove Messages',
        value: 'removeMessages',
        description: 'Remove last messages from the "send to" channel',
      },
      {
        name: 'Add Role to User',
        value: 'addRole',
        description: 'Add a role to a user',
      },
      {
        name: 'Remove Role From User',
        value: 'removeRole',
        description: 'Remove a role from a user',
      },
    ],
    default: 'removeMessages',
    description: 'Let you choose the type of action you want to perform',
  },
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        type: ['action'],
        actionType: ['addRole', 'removeRole'],
      },
    },
    default: '',
    description: 'The ID of the user you want to add or remove the role from',
  },
  {
    displayName: 'Which Role Names or IDs',
    name: 'roleUpdateIds',
    required: true,
    type: 'multiOptions',
    displayOptions: {
      show: {
        type: ['action'],
        actionType: ['addRole', 'removeRole'],
      },
    },
    typeOptions: {
      loadOptionsMethod: 'getRoles',
    },
    default: [],
    description: 'Let you specify the roles you want to add or remove from the user. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'How Many?',
    name: 'removeMessagesNumber',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        type: ['action'],
        actionType: ['removeMessages'],
      },
    },
    default: 100,
    description: 'Number of last messages to remove (Discord API allow max 150 and messages < 4 weeks old)',
  },
  {
    displayName: 'Content',
    name: 'content',
    type: 'string',
    displayOptions: {
      show: {
        type: ['message', 'button', 'select'],
      },
    },
    typeOptions: {
      rows: 4,
    },
    default: '',
    description: 'Displayed text message. Cannot be empty when using button/select prompt.',
  },
  {
    displayName: 'Embed',
    name: 'embed',
    type: 'boolean',
    displayOptions: {
      show: {
        type: ['message'],
      },
    },

    default: false,
    description: 'Whether active it will enable the creation of rich messages. See documentation for more information.',
  },
  {
    displayName: 'Color',
    name: 'color',
    type: 'color',
    default: '', // Initially selected color
    displayOptions: {
      show: {
        embed: [true],
        type: ['message'],
      },
    },
  },
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',

    displayOptions: {
      show: {
        embed: [true],
        type: ['message'],
      },
    },
    default: '',

  },
  {
    displayName: 'URL',
    name: 'url',
    type: 'string',

    displayOptions: {
      show: {
        embed: [true],
        type: ['message'],
      },
    },
    default: '',

  },
  {
    displayName: 'Author Name',
    name: 'authorName',
    type: 'string',

    displayOptions: {
      show: {
        embed: [true],
        type: ['message'],
      },
    },
    default: '',

  },
  {
    displayName: 'Author Icon URL or Base64',
    name: 'authorIconUrl',
    type: 'string',

    displayOptions: {
      show: {
        embed: [true],
        type: ['message'],
      },
      hide: {
        authorName: [''],
      },
    },
    default: '',
    description: 'URL/base64 of the image (png, jpg)',
  },
  {
    displayName: 'Author URL',
    name: 'authorUrl',
    type: 'string',

    displayOptions: {
      show: {
        embed: [true],
        type: ['message'],
      },
      hide: {
        authorName: [''],
      },
    },
    default: '',

  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',

    displayOptions: {
      show: {
        embed: [true],
        type: ['message'],
      },
    },
    default: '',

  },
  {
    displayName: 'Thumbnail URL or Base64',
    name: 'thumbnailUrl',
    type: 'string',

    displayOptions: {
      show: {
        embed: [true],
        type: ['message'],
      },
    },
    default: '',
    description: 'URL/base64 of the image (png, jpg)',
  },
  {
    displayName: 'Fields',
    name: 'fields',
    placeholder: 'Add Field',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: {
      show: {
        embed: [true],
        type: ['message', 'action'],
      },
    },

    default: {},
    options: [
      {
        name: 'field',
        displayName: 'Field',
        values: [
          {
            displayName: 'Title',
            name: 'name',
            type: 'string',
            default: '',

          },
          {
            displayName: 'Value',
            name: 'value',
            type: 'string',
            default: '',

          },
          {
            displayName: 'Inline',
            name: 'inline',
            type: 'boolean',

            default: false,

          },
        ],
      },
    ],
  },
  {
    displayName: 'Image URL or Base64',
    name: 'imageUrl',
    type: 'string',

    displayOptions: {
      show: {
        embed: [true],
        type: ['message'],
      },
    },
    default: '',
    description: 'URL/base64 of the image (png, jpg)',
  },
  {
    displayName: 'Buttons',
    name: 'buttons',
    placeholder: 'Add Button',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: {
      show: {
        type: ['button'],
      },
    },
    description: 'Discord allows to add up to 5 buttons',
    default: {},
    options: [
      {
        name: 'button',
        displayName: 'Button',
        values: [
          {
            displayName: 'Label',
            name: 'label',
            type: 'string',
            default: '',
            description: 'Displayed label on the button',
            required: true,
          },
          {
            displayName: 'Value',
            name: 'value',
            type: 'string',
            default: '',
            description: 'Value returned by the node if clicked',
            required: true,
          },
          {
            displayName: 'Style',
            name: 'style',
            type: 'options',
            options: [
              {
                name: 'Primary',
                value: 1,
              },
              {
                name: 'Secondary',
                value: 2,
              },
              {
                name: 'Success',
                value: 3,
              },
              {
                name: 'Danger',
                value: 4,
              },
            ],
            required: true,
            default: 1,
            description: 'You can choose between 4 different styles',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Select',
    name: 'select',
    placeholder: 'Add Option',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: {
      show: {
        type: ['select'],
      },
    },

    default: {},
    options: [
      {
        name: 'select',
        displayName: 'Select',
        values: [
          {
            displayName: 'Label',
            name: 'label',
            type: 'string',
            default: '',
            description: 'Displayed label on the option',
            required: true,
          },
          {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
            description: 'Optional displayed description',

          },
          {
            displayName: 'Value',
            name: 'value',
            type: 'string',
            default: '',
            description: 'Value returned by the node if selected',
            required: true,
          },
        ],
      },
    ],
  },
  {
    displayName: 'Persistent',
    name: 'persistent',
    type: 'boolean',
    displayOptions: {
      show: {
        type: ['button', 'select'],
      },
      hide: {
        triggerPlaceholder: [true],
        triggerChannel: [true],
      },
    },

    default: false,
    description: 'Whether active the button/select will stay visible even when the workflow is done',
  },
  {
    displayName: 'Min Select',
    name: 'minSelect',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        persistent: [true],
        type: ['select'],
      },
    },
    default: 0,
    description: 'Minimum number of options that have to be selected',
  },
  {
    displayName: 'Max Select',
    name: 'maxSelect',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        persistent: [true],
        type: ['select'],
      },
    },
    default: 1,
    description: 'Maximum number of options that can be selected',
  },
  {
    displayName: 'Message ID',
    name: 'updateMessageId',
    type: 'string',
    displayOptions: {
      show: {
        persistent: [true],
      },
    },

    default: '',
    description: 'The ID of the message to update. If not set the message will be send as new.',
  },
  {
    displayName: 'Footer Text',
    name: 'footerText',
    type: 'string',

    displayOptions: {
      show: {
        embed: [true],
        type: ['message'],
      },
    },
    default: '',

  },
  {
    displayName: 'Footer Icon URL or Base64',
    name: 'footerIconUrl',
    type: 'string',

    displayOptions: {
      show: {
        embed: [true],
        type: ['message'],
      },
      hide: {
        footerText: [''],
      },
    },
    default: '',
    description: 'URL/base64 of the image (png, jpg)',
  },
  {
    displayName: 'Displayed Date',
    name: 'timestamp',
    type: 'dateTime',
    default: '',

    displayOptions: {
      show: {
        embed: [true],
        type: ['message'],
      },
    },
  },
  {
    displayName: 'Timeout',
    name: 'timeout',
    type: 'number',
    required: true,
    displayOptions: {
      show: {
        type: ['button', 'select'],
      },
      hide: {
        persistent: [true],
      },
    },
    default: 0,
    description:
      'Time (seconds) your workflow will wait until it passes to the next node (or stops the execution). The time left will be displayed and updated at the end of the text message. If the timeout is equal 0, it will wait indefinitely.',
  },
  {
    displayName: 'Restrict to Triggering User',
    name: 'restrictToTriggeringUser',
    type: 'boolean',
    displayOptions: {
      show: {
        type: ['button', 'select'],
      },
      hide: {
        restrictToRoles: [true],
        persistent: [true],
      },
    },

    default: false,
    description: 'Whether only the user triggering the workflow will be able to interact (others will be ignored)',
  },
  {
    displayName: 'Restrict to Mentioned Roles',
    name: 'restrictToRoles',
    type: 'boolean',
    displayOptions: {
      show: {
        type: ['button', 'select'],
      },
      hide: {
        restrictToTriggeringUser: [true],
        persistent: [true],
      },
    },

    default: false,
    description: 'Whether only the user having one of the mentioned roles will be able to interact (others will be ignored)',
  },
  {
    displayName: 'Files',
    name: 'files',
    placeholder: 'Add File',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: {
      show: {
        type: ['message'],
      },
    },
    description: 'Allows to attach up to 5 images to the message',
    default: {},
    options: [
      {
        name: 'file',
        displayName: 'File',
        values: [
          {
            displayName: 'URL or Base64',
            name: 'url',
            type: 'string',
            default: '',
            description: 'URL/base64 of the image to attach (png, jpg)',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Mention Role Names or IDs',
    name: 'mentionRoles',

    type: 'multiOptions',
    typeOptions: {
      loadOptionsMethod: 'getRoles',
    },
    displayOptions: {
      show: {
        type: ['message', 'button', 'select'],
      },
      hide: {
        persistent: [true],
      },
    },
    default: [],
    description: 'Let you specify roles you want to mention in the message. Your credentials must be set and the bot running, you also need at least one role (apart from @everyone) available. If you do not meet these requirements, make the changes then close and reopen the modal. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
  },
  {
    displayName: 'Placeholder',
    name: 'placeholder',
    type: 'string',

    displayOptions: {
      show: {
        type: ['button', 'select'],
      },
      hide: {
        persistent: [true],
      },
    },
    default: '',
    description:
      'The placeholder is a message that will appear in the channel where the button or select prompt is displayed. Three animated dots added to the placeholder indicate that the workflow is running. From another Discord Send node, you can set up a response message which will then take the place of this placeholder.',
  },
  {
    displayName: 'Bot Customizaion',
    name: 'botCustomization',
    type: 'boolean',

    displayOptions: {
      hide: {
        persistent: [true],
      },
    },
    default: false,
    description: 'Whether active this option to customize the bot activity and status',
  },
  {
    displayName: 'Bot Activity',
    name: 'botActivity',
    type: 'string',

    displayOptions: {
      show: {
        botCustomization: [true],
      },
    },
    default: '',
    description:
      'When you set a bot activity, it will be displayed in the "Now Playing" section of the bot profile. You need to refresh the activity periodically if you want to keep it.',
  },
  {
    displayName: 'Bot Activity Type',
    name: 'botActivityType',

    displayOptions: {
      show: {
        botCustomization: [true],
      },
    },
    type: 'options',
    options: [
      {
        name: 'Playing',
        value: 0,
      },
      {
        name: 'Streaming',
        value: 1,
      },
      {
        name: 'Listening',
        value: 2,
      },
      {
        name: 'Watching',
        value: 3,
      },
    ],
    default: 0,
    description: 'Let you customize the type of activity displayed on the bot profile',
  },
  {
    displayName: 'Bot Status',
    name: 'botStatus',

    displayOptions: {
      show: {
        botCustomization: [true],
      },
    },
    type: 'options',
    options: [
      {
        name: 'Online',
        value: 'online',
      },
      {
        name: 'Idle',
        value: 'idle',
      },
      {
        name: 'Do Not Disturb',
        value: 'dnd',
      },
      {
        name: 'Invisible',
        value: 'invisible',
      },
    ],
    default: 'online',
    description: 'Let you customize the status of the bot (if a bot activity is also set)',
  },
  {
    displayName: 'Audit Log Reason',
    name: 'auditLogReason',
    type: 'string',
    default: '',
    description: 'Reason for the action to be logged in the audit log',
  },
]
