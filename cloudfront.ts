import * as aws from "@pulumi/aws";
import { Bucket } from "@pulumi/aws/s3";

// Create cloudfront distribution for s3 bucket
export const createS3CloudfrontDistribution = (bucket: Bucket) => {
  return new aws.cloudfront.Distribution("s3Distribution", {
    origins: [
      {
        domainName: bucket.bucketRegionalDomainName,
        originId: bucket.bucketRegionalDomainName,
      },
    ],
    enabled: true,
    isIpv6Enabled: true,
    defaultRootObject: "index.html",
    defaultCacheBehavior: {
      allowedMethods: [
        "DELETE",
        "GET",
        "HEAD",
        "OPTIONS",
        "PATCH",
        "POST",
        "PUT",
      ],
      cachedMethods: ["GET", "HEAD"],
      targetOriginId: bucket.bucketRegionalDomainName,
      viewerProtocolPolicy: "allow-all",
      minTtl: 0,
      defaultTtl: 3600,
      maxTtl: 86400,
      forwardedValues: {
        queryString: false,
        cookies: {
          forward: "none",
        },
      },
    },
    restrictions: {
      geoRestriction: {
        restrictionType: "none",
      },
    },
    viewerCertificate: {
      cloudfrontDefaultCertificate: true,
    },
  });
};
