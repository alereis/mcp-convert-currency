import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create the Server Instance
const server = new McpServer({
    name: "Weather MCP Server",
    version: "1.0.0",
});

// Define tool to convert currency
server.tool(
  'convert-currency',
  'Tool to convert currency from one to another',
  {
    from: z.string().describe("The currency to convert from (e.g., USD)"),
    to: z.string().describe("The currency to convert to (e.g., EUR)"),
    amount: z.number().describe("The amount of currency to convert"),
  },
  async ({ from, to, amount }) => {
    try {
      // Fetch exchange rates
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await response.json();

      // Check if the target currency exists in the rates
      if (!data.rates[to]) {
        return {
          content: [
            {
              type: "text",
              text: `Currency "${to}" not found in exchange rates for "${from}".`
            }
          ]
        };
      }

      // Calculate converted amount
      const convertedAmount = (amount * data.rates[to]).toFixed(2);

      return {
        content: [
          {
            type: "text",
            text: `${amount} ${from} is approximately ${convertedAmount} ${to}.`
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching exchange rates: ${error.message}`
          }
        ]
      };
    }
  }
);

// Create the transport
const transport = new StdioServerTransport();
server.connect(transport);

