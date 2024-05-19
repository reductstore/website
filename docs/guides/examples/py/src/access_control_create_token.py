from reduct import Client, Permissions

# Create a client with the base URL and API token
client = Client("http://localhost:8383", api_token="my-token")


async def create_token():
    # Create a token with read/write access to the bucket "example-bucket"
    permissions = Permissions(
        full_access=False,
        read=["example-bucket"],
        write=["example-bucket"],
    )
    token = await client.create_token("example-bucket", permissions)
    print(f"generated token: {token}")


if __name__ == "__main__":
    import asyncio

    asyncio.run(create_token())
