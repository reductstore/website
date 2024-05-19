from reduct import Client, Permissions

# Create a client with the base URL and API token
client = Client("http://localhost:8383", api_token="my-token")


async def remove_token():
    # Remove the token with the name "token-to-remove"
    await client.remove_token("token-to-remove")


if __name__ == "__main__":
    import asyncio

    asyncio.run(remove_token())
