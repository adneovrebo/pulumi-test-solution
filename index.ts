import * as pulumi from "@pulumi/pulumi";
import { buildReactApp } from "./buildApp";
import { buildAPI } from "./buildAPI";
import { Bucket } from "@pulumi/aws/s3";

// ----------------------------------------------------------------------------
// API
// ----------------------------------------------------------------------------
// Export the load balancer's address so that it's easy to access.
const apiLoadBalancer = buildAPI();
export const url = pulumi.interpolate`http://${apiLoadBalancer.endpoint.hostname}`;

// ----------------------------------------------------------------------------
// React application
// ----------------------------------------------------------------------------

// Create S3 bucket for react-app
const appBucket = new Bucket("my-bucket", {
  website: {
    indexDocument: "index.html",
  },
});

buildReactApp({
  bucket: appBucket,
  apiEndpoint: url,
});

// Export the name of the bucket and endpoint for index.html
export const bucketName = appBucket.id;
export const bucketEndpoint = pulumi.interpolate`http://${appBucket.websiteEndpoint}`;
