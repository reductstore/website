from reduct import Client, Permissions


async def remove_token():
    # Create a client with the base URL and API token
    with Client("http://localhost:8383", api_token="my-token") as client:
        # Remove the token with the name "token-to-remove"
        await client.remove_token("token-to-remove")


if __name__ == "__main__":
    import asyncio

    asyncio.run(remove_token())
