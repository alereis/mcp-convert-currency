# mcp-convert-currency

A Model Context Protocol (MCP) server for converting currency values between different currencies using up-to-date exchange rates.

## Features
- Convert an amount from one currency to another (e.g., BRL to EUR)
- Simple command-line interface
- Built with TypeScript and tsx

## Usage

### Prerequisites
- Node.js (v16 or higher recommended)
- `tsx` (installed automatically via `npx`)

### Running the Server

The server is configured to run via MCP using the following command:

```
npx -y tsx main.ts
```

Or, if using MCP tooling, ensure your `mcp.json` includes:

```jsonc
{
  "servers": {
    "mcp-convert-currency": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "main.ts"
      ]
    }
  }
}
```

### Example Command

To convert 1000 BRL to EUR:

```
convert-currency BRL EUR 1000
```

## Project Structure
- `main.ts` — Main entry point for the MCP server
- `package.json` — Project dependencies and scripts

## License
MIT
