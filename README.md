# Pulumi application

Testing out creating aws infrastructure as code with Pulumi.

- React app hosted on AWS s3.
- Simple API hosted on AWS via Fargate.
- Created API-endpoint is passed along to the web page for further use.

### Before getting started

Install pulumi

```bash
# For macOS
brew install pulumi

# Else see https://www.pulumi.com/docs/get-started/aws/begin/
```

Set aws variables if not logged into aws-cli:

```bash
export AWS_ACCESS_KEY_ID=<your_access_key_id>
export AWS_SECRET_ACCESS_KEY=<your_secret_access_key>
```

### Deploy resources

Endpoint to reactapp and api is outputted to the console.

```bash
pulumi up
```

### Destroy resources

```bash
pulumi destroy
```

### Change stack

Easily change the stack by running the following command. This can be different environments (e.g. test, prod, staging, develop).

```bash
pulumi stack select <stack-name>
```
