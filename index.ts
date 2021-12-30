import * as pulumi from "@pulumi/pulumi";
import { buildReactApp } from "./buildApp";
import { buildAPI } from "./buildAPI";
import { Bucket } from "@pulumi/aws/s3";
import { createS3CloudfrontDistribution } from "./cloudfront";

// ----------------------------------------------------------------------------
// API
// ----------------------------------------------------------------------------
// Export the load balancer's address so that it's easy to access.
const apiLoadBalancer = buildAPI();
export const apiURL = pulumi.interpolate`https://${apiLoadBalancer.endpoint.hostname}`;

// ----------------------------------------------------------------------------
// React application
// ----------------------------------------------------------------------------

// Create S3 bucket for react-app
const appBucket = new Bucket("my-bucket", {
  website: {
    indexDocument: "index.html",
  },
});

// Build react-app and upload to bucket
buildReactApp({
  bucket: appBucket,
  apiEndpoint: apiURL,
});

// Create cloudfront distribution
const appDistribution = createS3CloudfrontDistribution(appBucket);

// Export endpoint for application
export const reactAppURL = pulumi.interpolate`https://${appDistribution.domainName}`;
