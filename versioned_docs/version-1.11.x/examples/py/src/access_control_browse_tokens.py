from typing import List

from reduct import Client, Permissions, Token, FullTokenInfo


async def browse_tokens():
    # Create a client with the base URL and API token
    async with Client("http://localhost:8383", api_token="my-token") as client:
        #  Browse all tokens and print their information
        tokens: List[Token] = await client.get_token_list()
        for token in tokens:
            print(f"Token: {token.name}")
            print(f"Created: {token.created_at}")
            print(f"Provisioned: {token.is_provisioned}")

            # Get detailed information about a specific token
            details: FullTokenInfo = await client.get_token(token.name)
            print(f"Permissions: {details.permissions}")


if __name__ == "__main__":
    import asyncio

    asyncio.run(browse_tokens())
