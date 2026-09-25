from reduct import Client, Permissions


async def create_token():
    # Create a client with the base URL and API token
    async with Client("http://localhost:8383", api_token="my-token") as client:
        # Create a token with read/write access, a 1 hour inactivity TTL,
        # and an IP allowlist for local access.
        permissions = Permissions(
            full_access=False,
            read=["example-bucket"],
            write=["example-bucket"],
        )
        token = await client.create_token(
            "new-token",
            permissions,
            ttl=3600,
            ip_allowlist=["127.0.0.1", "::1"],
        )
        print(f"generated token: {token}")


if __name__ == "__main__":
    import asyncio

    asyncio.run(create_token())
