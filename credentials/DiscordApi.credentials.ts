import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class DiscordApi implements ICredentialType {
	name = 'discordApi';
	displayName = 'Discord API';
	documentationUrl = 'https://github.com/shawndao/n8n-nodes-discord';

	properties: INodeProperties[] = [
		{
			displayName: 'Client ID',
			name: 'clientId',
			description: 'The OAuth2 client ID of the Discord App',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Bot Token',
			name: 'token',
			description: 'The bot token of the Discord App',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'n8n API key',
			name: 'apiKey',
			description: 'The API key of the n8n server',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			description: 'The API URL of the n8n instance',
			type: 'string',
			default: '',
			placeholder: 'https://n8n.example.com/api/v1',
		},
	];
}
