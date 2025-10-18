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

            // Check if this is a message-type trigger
            if (trigger.type === 'message') {
              // Check bot mention requirement
              if (trigger.botMention && !botMention) {
                addLog(`[messageCreate] Bot mention required but not found`, client, 'info')
                match = false
              } else if (trigger.pattern && trigger.value) {
                // Prepare content for comparison
                const compareContent = trigger.caseSensitive ? content : content.toLowerCase()
                const compareValue = trigger.caseSensitive ? trigger.value : trigger.value.toLowerCase()

                addLog(`[messageCreate] Pattern: ${trigger.pattern}, Value: ${trigger.value}, Case sensitive: ${trigger.caseSensitive}`, client, 'info')

                switch (trigger.pattern) {
                  case 'equal':
                    match = compareContent === compareValue
                    break
                  case 'start':
                    match = compareContent.startsWith(compareValue)
                    break
                  case 'contain':
                    match = compareContent.includes(compareValue)
                    break
                  case 'end':
                    match = compareContent.endsWith(compareValue)
                    break
                  case 'regex':
                    try {
                      const flags = trigger.caseSensitive ? 'g' : 'gi'
                      const reg = new RegExp(trigger.value, flags)
                      match = reg.test(content)
                      addLog(`[messageCreate] Regex test with pattern: ${trigger.value}, flags: ${flags}, result: ${match}`, client, 'info')
                    } catch (e) {
                      addLog(`[messageCreate] Invalid regex pattern: ${trigger.value}`, client, 'error')
                      match = false
                    }
                    break
                  default:
                    addLog(`[messageCreate] Unknown pattern type: ${trigger.pattern}`, client, 'warn')
                    match = false
                }
              } else if (trigger.botMention && botMention) {
                // Bot mention without specific pattern
                addLog(`[messageCreate] Bot mention matched`, client, 'info')
                match = true
              }
            } else {
              // For backward compatibility with old messageRegex field
              if (trigger.messageRegex) {
                addLog(`[messageCreate] Using legacy messageRegex: ${trigger.messageRegex}`, client, 'info')
                const reg = new RegExp(trigger.messageRegex, 'gim')
                match = reg.test(content)
              } else if (botMention) {
                addLog(`[messageCreate] Bot mention: ${botMention}`, client, 'info')
                match = true
              }
            }

            addLog(`[messageCreate] Match result: ${match}`, client, 'info')

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
