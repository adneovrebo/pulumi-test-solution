import * as fs from "fs";
import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { execSync } from "child_process";
import { Output } from "@pulumi/pulumi";
import { Bucket } from "@pulumi/aws/s3";
import { GetValue } from "./values";

type EnvVariables = { apiEndpoint: Output<string>; bucket: Bucket };

export const buildReactApp = async ({ apiEndpoint, bucket }: EnvVariables) => {
  const res = execSync(
    `cd ./app && export REACT_APP_API_ENDPOINT=${await GetValue(
      apiEndpoint
    )} && npm run build`
  );

  // Log the output from the build process to the console for debugging purposes.
  console.log(res.toString());

  // Get all files in folder app/build
  fs.readdirSync("./app/build").forEach((file) => {
    if (fs.lstatSync("./app/build/" + file).isFile()) {
      new aws.s3.BucketObject(`${file}`, {
        bucket: bucket,
        acl: "public-read",
        contentType: "text/html",
        source: new pulumi.asset.FileAsset(`./app/build/${file}`),
      });
    }
  });

  fs.readdirSync("./app/build/static/js").forEach((file) => {
    new aws.s3.BucketObject(`static/js/${file}`, {
      bucket: bucket,
      acl: "public-read",
      contentType: "text/html",
      source: new pulumi.asset.FileAsset(`./app/build/static/js/${file}`),
    });
  });
};
