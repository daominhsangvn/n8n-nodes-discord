import { Client, Message } from 'discord.js'

import { addLog, setCurrentWorkflowId, triggerWorkflow } from '../helpers'
import state from '../state'

export default function (client: Client): void {
  client.on('messageCreate', async (message: Message) => {
    try {
      const content = message.content
      addLog(`[messageCreate] Message created: ${content}`, client, 'info')
      addLog(`[messageCreate] Message author: ${JSON.stringify(message.author)}`, client, 'info')
      if (!content || message.author.bot) return
      addLog(`[messageCreate] channels: ${JSON.stringify(state.channels)}`, client, 'info')
      const channelId = message.channelId
      addLog(`[messageCreate] Message channel ID: ${channelId}`, client, 'info')
      const messageChannel = state.channels[channelId]
      addLog(`[messageCreate] Message channel: ${JSON.stringify(messageChannel)}`, client, 'info')

      if (messageChannel) {
        await Promise.allSettled(
          messageChannel.map(async (trigger) => {
            addLog(`[messageCreate] Trigger: ${JSON.stringify(trigger)}`, client, 'info')
            if (!trigger.active) return

            let match = false
            const botMention = message.mentions.users.has(state.clientId)

            if (trigger.messageRegex) {
              addLog(`[messageCreate] Message regex: ${trigger.messageRegex}`, client, 'info')
              const reg = new RegExp(trigger.messageRegex, 'gim')
              match = reg.test(content)
              addLog(`[messageCreate] Match: ${match}`, client, 'info')
            } else if (botMention) {
              addLog(`[messageCreate] Bot mention: ${botMention}`, client, 'info')
              match = true
            }

            addLog(`[messageCreate] Match: ${match}`, client, 'info')

            if (match) {
              // Set workflow context for logging
              const previousWorkflowId = setCurrentWorkflowId(trigger.workflowId || null)
              try {
                addLog(
                  `[messageCreate] Triggering workflow for message from ${message.author.username}: "${content.substring(0, 50)}..."`,
                  client,
                  'info',
                )
                const isEnabled = await triggerWorkflow(trigger.webhookId, message, '', state.baseUrl).catch(
                  (e: Error) => {
                    addLog(`[messageCreate] Error triggering workflow: ${e.message}`, client, 'error')
                    return false
                  },
                )

                if (!isEnabled && trigger.active) {
                  trigger.active = false
                }
              } finally {
                // Restore previous workflow context
                setCurrentWorkflowId(previousWorkflowId)
              }
            } else {
              addLog(`[messageCreate] No match found for trigger ${JSON.stringify(trigger)}`, client, 'info')
            }
          }),
        )
      } else {
        addLog(`[messageCreate] No triggers found for channel ${channelId}`, client, 'info')
      }
    } catch (e) {
      // Clear any workflow context on error
      setCurrentWorkflowId(null)
      addLog(`[messageCreate] Error in messageCreate: ${e instanceof Error ? e.message : String(e)}`, client, 'error')
    }
  })
}
